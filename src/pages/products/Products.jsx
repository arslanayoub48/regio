import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Modal,
  ModalBody,
  Row,
  Spinner,
} from "reactstrap";
import { useEffect, useState } from "react";
import ProductsAttachments from "../../components/Products/ProductAttachments";
import AddProductForm from "../../components/Products/AddProductForm";
import FindListIcon from "../../assets/images/find-list.png";
import CarPoolingIcon from "../../assets/images/car-pooling.png";
import FoodIcon from "../../assets/images/foods.png";
import helpSearchIcon from "../../assets/images/help-search.png";
import bulbIcon from "../../assets/images/bulb.png";
import orderListIcon from "../../assets/images/order-list.png";
import cartIcon from "../../assets/images/cart.png";
import ClockIcon from "../../assets/images/clock.png";
import HelpOfferdIcon from "../../assets/images/help-offered.png";
import EventsIcon from "../../assets/images/events.png";
import Avatar from "../../assets/images/users/avatar-1.jpg";
import CurrencyIcon from "../../assets/images/currency.png";
import RentalIcon from "../../assets/images/rentals.png";
import productSchema, {
  eventSchema,
  foodEventSchema,
  moduleSchema,
  ordersSchema,
  searchFindSchema,
} from "../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getSingleModule } from "../../store/modules/moduleThunk";
import { timeAgo } from "../../utils/helpers";
import moment from "moment";
import withRouter from "../../components/common/withRouter";
import Pagination from "../../components/Elements/Pagination";
import DetailSidebar from "../../components/Products/DetailSidebar";
export let postTypes = [
  {
    options: [
      {
        label: "Products",
        value: "product",
        icon: cartIcon,
        component: AddProductForm,
        schema: productSchema,
        attachment: true,
        prices: true,
        slug: "products",
        color: "#b10000",
      },
      {
        label: "Search & Find",
        value: "search & find",
        attachment: false,
        prices: false,
        icon: FindListIcon,
        component: AddProductForm,
        schema: searchFindSchema,
        slug: "search-find",
        color: "#48A0A2",
      },
      {
        label: "Help offered",
        value: "help offered",
        icon: HelpOfferdIcon,
        schema: productSchema,
        prices: true,
        attachment: true,
        component: AddProductForm,
        slug: "help-offered",
        color: "#9f3781",
      },
      {
        label: "Help Searched",
        value: "help searched",
        attachment: true,
        prices: false,
        icon: helpSearchIcon,
        schema: moduleSchema,
        component: AddProductForm,
        slug: "help-searched",
        color: "#aaaa40",
      },
      {
        label: "Events",
        value: "events",
        icon: EventsIcon,
        prices: true,
        attachment: true,
        schema: eventSchema,
        component: AddProductForm,
        slug: "events",
        color: "#3476a8",
      },
      {
        label: "Food Events",
        value: "food-events",
        prices: false,
        icon: FoodIcon,
        attachment: true,
        schema: foodEventSchema,
        component: AddProductForm,
        slug: "food-events",
        color: "#d77829",
      },
      {
        label: "Rentals",
        value: "rentals",
        icon: RentalIcon,
        prices: false,
        attachment: true,
        schema: moduleSchema,
        component: AddProductForm,
        slug: "rentals",
        color: "#8e4ab4",
      },
      {
        label: "Car Pooling",
        value: "car pooling",
        icon: CarPoolingIcon,
        prices: false,
        attachment: false,
        schema: ordersSchema,
        component: AddProductForm,
        slug: "car-pooling",
        color: "#295493",
      },
      {
        label: "Orders",
        value: "orders",
        icon: orderListIcon,
        prices: false,
        attachment: true,
        schema: ordersSchema,
        component: AddProductForm,
        slug: "orders",
        color: "#287a66",
      },
      {
        label: "Resources",
        value: "resources",
        icon: bulbIcon,
        attachment: true,
        prices: false,
        schema: moduleSchema,
        component: AddProductForm,
        slug: "resources",
        color: "#d64a4a",
      },
    ],
  },
];
const Products = (props) => {
  document.title = "Products | Regional";
  const [modalVisible, setModalVisible] = useState(false);
  const [formik, setFormik] = useState(null);
  const [show, setShow] = useState(false);
  const [detailAside, setDetailAside] = useState(false);
  const [type, setType] = useState(null);
  const [pageType, setPageType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modifyRow, setModifyRow] = useState(null);
  const dispatch = useDispatch();
  const { adminRole } = useSelector((state) => state.Auth);
  const state = useSelector((state) => state.Module);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const router = props.router;
  const getType = postTypes[0].options.find(
    (x) => router.location.pathname.split("/").pop() == x.slug
  );
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      fontSize: "15px",
      width: "250px",
      fontWeight: 500,
    }),
    menu: (provided, state) => ({
      ...provided,
      width: "250px",
    }),
  };
  const callback = () => console.log("");
  const fetchData = (val) => {
    dispatch(
      getProducts({
        data: "",
        callback: callback,
        slug: getType.slug.replace(/s$/, ""),
        page: currentPage,
        search: val || "",
      })
    );
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [router]);
  useEffect(() => {
    setType(getType);
    setPageType(getType);
    fetchData();
  }, [router, currentPage]);
  const getSingle = (id) => {
    setDetailAside(true);
    dispatch(getSingleModule({ slug: type.slug.replace(/s$/, ""), id: id }));
  };
  useEffect(() => {
    if (detailAside) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [detailAside]);
  useEffect(() => {
    if (modifyRow) {
      setDetailAside(false);
      setModalVisible(true);
    }
  }, [modifyRow]);
  useEffect(() => {
    if (!modalVisible) {
      setModifyRow(null);
    }
  }, [modalVisible]);
  const DynamicComponent = type?.component;
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex me-3">
          <div className="me-3">
            <img src={pageType?.icon || cartIcon} alt="cart icon" />
          </div>
          <div className="pt-1">
            <h5 className="mb-1" style={{ color: pageType?.color }}>
              {pageType?.label} - offered stuff
            </h5>
            <p className="mb-0">
              Here you can find all things which are offered, from homebaked
              bread to use a bicycle
            </p>
          </div>
        </div>
        <div className="text-end d-flex align-items-center">
          <Input
            type="text"
            placeholder="Search this page..."
            style={{ height: "40px", width: "300px" }}
            className="me-3"
            onChange={(e) => fetchData(e.target.value)}
          />
          <Button
            color="success"
            className="p-0"
            onClick={() => setModalVisible(true)}
            style={{ height: "40px", width: "40px", flexShrink: 0 }}
          >
            <i
              className="ri ri-add-line"
              style={{ fontSize: "25px", lineHeight: 1 }}
            ></i>
          </Button>
        </div>
      </div>

      <>
        <Row className="mb-4">
          {state?.status == "success" && state?.data?.meta?.total > 0 ? (
            <>
              {state?.data?.data?.map((list, key) => (
                <Col className="mt-4" lg="4" md="6" key={key}>
                  <Card
                    className="px-0 mb-0"
                    style={{ borderBottom: `3px solid ${pageType?.color}` }}
                  >
                    <CardHeader className="px-2 py-2 d-flex justify-content-between">
                      <h6
                        className="mb-0 text-success cursor-pointer"
                        onClick={() => getSingle(list.uuid)}
                      >
                        {list.title}
                      </h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="me-2 text-end">
                          <h6 className="mb-0">{list?.user?.full_name}</h6>
                          <small>{list?.user?.email}</small>
                        </div>
                        <div>
                          <img
                            src={Avatar}
                            className="rounded-circle border-success"
                            height="40px"
                            width="40px"
                            alt="avatar"
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody className="py-0 px-0">
                      <div
                        className="border-bottom px-2"
                        style={{ paddingTop: "2px", paddingBottom: "2px" }}
                      >
                        <small>
                          <b>{timeAgo(moment(list?.created_at))}</b>
                        </small>
                      </div>
                      <div className="p-2">
                        <p
                          className="mb-0 cursor-pointer"
                          style={{ fontSize: "12px" }}
                          onClick={() => getSingle(list.uuid)}
                        >
                          {list?.description}
                        </p>
                        <button
                          type="button"
                          className="bg-transparent text-success ms-auto d-flex align-items-center border-0"
                          onClick={() => getSingle(list.uuid)}
                        >
                          Read More&nbsp;
                          <i className="ri-arrow-right-s-line"></i>
                        </button>
                      </div>
                      <div className="text-end p-2 border-top">
                        <ul className="mb-0 list-unstyled justify-content-start d-flex align-items-center">
                          <li>
                            <span className="text-success text-underline">
                              <b>{list?.attachments?.length || 0}pic</b>
                            </span>
                          </li>
                          <li className="ms-auto me-3">
                            <div className="">
                              <span className="text-success me-2 text-underline">
                                <b>
                                  {list.price_in_minutes}
                                  <sub>x</sub>
                                </b>
                              </span>
                              <img
                                src={ClockIcon}
                                width="20px"
                                height="20px"
                                alt="clock"
                              />
                            </div>
                          </li>
                          <li className="me-4">
                            <div className="">
                              <span className="text-success me-2 text-underline">
                                <b>
                                  {list.price_in_regio}
                                  <sub>R</sub>
                                </b>
                              </span>
                              <img
                                src={CurrencyIcon}
                                width="20px"
                                height="20px"
                                alt="clock"
                              />
                            </div>
                          </li>
                          <li>
                            <Button
                              color="success"
                              onClick={() =>
                                list.is_user_post || adminRole
                                  ? setModifyRow(list)
                                  : false
                              }
                              className="px-4 py-1"
                            >
                              {list.is_user_post || adminRole
                                ? "Modify"
                                : "Contact"}
                            </Button>
                          </li>
                        </ul>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </>
          ) : state?.status == "loading" ? (
            <Col xs={12} className="mt-4">
              <Spinner color="success" />{" "}
            </Col>
          ) : null}
          {state?.data?.meta?.last_page > 1 ? (
            <Col xs={12} className="mt-3">
              <Pagination
                total={state?.data?.meta?.total}
                perPageData={15}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </Col>
          ) : null}
        </Row>
        {state?.status == "success" && state?.data?.meta?.total <= 0 ? (
          <div
            className="border-danger p-3 text-center my-5 border"
            style={{ borderRadius: "6px" }}
          >
            <b className="text-danger">
              Sorry, no entries / results on this page
            </b>
          </div>
        ) : null}
        <Modal
          isOpen={modalVisible}
          size="lg"
          modalClassName="d-flex justify-content-center flex-column"
          className="modal-md-s-lg customized-modal"
        >
          <ModalBody className="pt-2 pb-3 px-0">
            <div className="modal-header-wrap d-flex border-bottom pb-2 align-items-center mb-0 justify-content-between">
              <div>
                <h5 className="mb-0">
                  <b>{!modifyRow ? "Create" : "Edit"} Post</b>
                </h5>
              </div>
              <div className="d-flex align-items-center">
                <Select
                  options={postTypes}
                  placeholder="Select Post Type"
                  className="mb-0"
                  name="owner"
                  styles={customStyles}
                  value={type}
                  onChange={(e) => setType(e)}
                  isDisabled={modifyRow ? true : false}
                />
                {/* <button
                type="button"
                className="border-0 ms-2 bg-danger action-btn-del text-white py-2 px-3"
              >
                <i className="ri-delete-bin-line"></i>
              </button> */}
              </div>
            </div>
            <DynamicComponent
              moduleType={type}
              setModalVisible={setModalVisible}
              setShowAttachment={setShow}
              attachmentShow={show}
              schema={type?.schema}
              setFormik={setFormik}
              router={router}
              editData={modifyRow}
              setUploadedFiles={setUploadedFiles}
            />
          </ModalBody>
        </Modal>
        {detailAside ? (
          <DetailSidebar
            current={type?.slug?.replace(/s$/, "")}
            setShow={setDetailAside}
            page={{ current: currentPage, set: setCurrentPage }}
            modifyData={setModifyRow}
          />
        ) : null}
        <ProductsAttachments
          editAttachments={modifyRow?.attachments || []}
          formik={formik}
          show={show}
          setShow={setShow}
          setUploadedFiles={setUploadedFiles}
          uploadedFiles={uploadedFiles}
        />
      </>
    </div>
  );
};

export default withRouter(Products);
