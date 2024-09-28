import ClockIcon from "../../assets/images/clock.png";
import { Button, Col, Row, Spinner } from "reactstrap";
import CurrencyIcon from "../../assets/images/currency.png";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../assets/images/users/avatar-1.jpg";
import Scope from "../../assets/images/scope.jpg";
import VisibliityID from "../../assets/images/visibility_id.jpg";
import moment from "moment";
import { ConfirmDeleteModule, generateLink } from "../../utils/helpers";
import {
  DeleteSingleModule,
  getProducts,
} from "../../store/modules/moduleThunk";
import { useEffect, useRef } from "react";
const DetailSidebar = ({
  page,
  current,
  setShow,
  modifyData,
  updateSlugRecord,
}) => {
  const state = useSelector((state) => state.Module);
  const { adminRole } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);
  const callback = () => {
    setShow(false);
    if (updateSlugRecord) {
      updateSlugRecord();
      return;
    }
    if (state?.data?.data?.length == 1) {
      page.set(1);
      dispatch(
        getProducts({ slug: current, page: page.current, callback: null })
      );
    } else {
      dispatch(
        getProducts({ slug: current, page: page.current, callback: null })
      );
    }
  };
  const deleteItem = () => {
    const onConfirm = () => {
      dispatch(
        DeleteSingleModule({
          id: state.detail?.uuid,
          slug: current,
          callback: callback,
        })
      );
    };
    ConfirmDeleteModule(onConfirm, state.detail.title);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        event.target.classList[0] == "backdrop-aside"
      ) {
        setShow(false);
        document.body.classList.remove("overflow-hidden");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const imageTypes = ["jpg", "jpeg", "png", "gif"];
  return (
    <div className="backdrop-aside">
      <aside className="sidebar-right border-start border-top" ref={sidebarRef}>
        {state.detailStatus == "loading" ? (
          <div className="p-5 h-100 d-flex align-items-center justify-content-center">
            <Spinner color="success" />
          </div>
        ) : (
          <>
            <div className="detail-sidebar-header border-bottom ">
              <div className="p-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <button
                    className="border-0 p-0 me-3 bg-transparent"
                    type="button"
                    onClick={() => setShow(false)}
                  >
                    <i className="ri-arrow-left-line"></i>
                  </button>
                  <h5 className="mb-0">{state.detail?.title}</h5>
                </div>
                <div className="d-flex me-2 justify-content-between align-items-center">
                  <div className="me-2 text-end">
                    <h6 className="mb-0 text-success">
                      {state?.detail?.user?.full_name}
                    </h6>
                    <small> {state?.detail?.user?.email}</small>
                  </div>
                  <div>
                    <img
                      src={Avatar}
                      className="rounded-circle border-2-success border-success"
                      height="45px"
                      width="45px"
                      alt="avatar"
                    />
                  </div>
                </div>
              </div>
              <div className="border-top px-4 py-2 d-flex align-items-center justify-content-between">
                <time className="me-3">
                  {moment(state?.detail?.created_at).format("DD.MM.yyyy")}
                </time>
                {state?.detail?.visibility_region?.id ||
                state?.detail?.scope_users?.length > 0 ? (
                  <ul className="mb-0 list-unstyled d-flex align-items-center">
                    {state?.detail?.visibility_region?.id ? (
                      <li
                        className="me-2"
                        style={{
                          color: "var(--vz-heading-color)",
                        }}
                      >
                        <img src={Scope} alt="scope" height="20px" />
                      </li>
                    ) : null}
                    {state?.detail?.scope_users?.length > 0 ? (
                      <li className="me-2">
                        <img
                          src={VisibliityID}
                          alt="visibility Id"
                          height="20px"
                        />
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </div>
            </div>
            <div className="px-4 detail-sidebar-body">
              <Row className="h-100">
                <Col
                  md={8}
                  className="border-md-end border-bottom border-bottom-md-0 py-4 pe-4"
                >
                  <p className="mb-3">{state.detail?.description}</p>
                  {state.detail?.attachments?.filter((list) =>
                    imageTypes.includes(list.type.toLowerCase())
                  ).length > 0 ? (
                    <>
                      <h5 className="mb-3">Attached Images</h5>
                      <Row className="mb-3">
                        {state.detail?.attachments
                          ?.filter((list) =>
                            imageTypes.includes(list.type.toLowerCase())
                          )
                          .map((list, key) => (
                            <Col
                              xs={6}
                              lg={4}
                              xl={3}
                              className="mb-2"
                              key={`attachment-image-${key + 1}`}
                            >
                              <a
                                href={generateLink(list.path)}
                                className="text-underline d-block"
                                target="_blank"
                              >
                                <img
                                  className="w-100 object-fit-cover border"
                                  height="100px"
                                  style={{ borderRadius: "6px" }}
                                  src={generateLink(list.path)}
                                />
                              </a>
                            </Col>
                          ))}
                      </Row>
                    </>
                  ) : null}
                  {state.detail?.attachments?.length > 0 ? (
                    <div className="mt-3">
                      {state.detail?.attachments?.filter(
                        (list) => !imageTypes.includes(list.type.toLowerCase())
                      ).length > 0 ? (
                        <>
                          <h5>Attached Documents</h5>
                          <ul className="mb-3">
                            {state.detail?.attachments
                              ?.filter(
                                (list) =>
                                  !imageTypes.includes(list.type.toLowerCase())
                              )
                              .map((list, key) => (
                                <li
                                  className="mb-2"
                                  key={`attachment-${key + 1}`}
                                >
                                  <a
                                    href={generateLink(list.path)}
                                    className="text-underline"
                                    target="_blank"
                                  >
                                    <i>{list.original_name}</i>
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </>
                      ) : null}
                    </div>
                  ) : null}
                </Col>
                <Col md={4} className="py-4">
                  <div>
                    <Button
                      disabled={state.actionStatus == "loading"}
                      className="w-100 radius-30"
                      color="success"
                      onClick={() =>
                        state.detail?.is_user_post || adminRole
                          ? modifyData(state.detail)
                          : false
                      }
                    >
                      {state.detail?.is_user_post || adminRole
                        ? "Modify"
                        : "Contact"}
                    </Button>
                    <Button
                      disabled={state.actionStatus == "loading"}
                      className="w-100 radius-30 mt-3"
                      color="danger"
                      onClick={deleteItem}
                    >
                      Delete
                    </Button>
                  </div>
                  {state.detail?.price_in_minutes ||
                  state.detail?.price_in_regio ? (
                    <div className="mt-4">
                      <h6>
                        <b className="mb-2 d-block">Prices:</b>
                      </h6>
                      <ul className="mb-0 list-unstyled mt-3">
                        {state.detail?.price_in_minutes ? (
                          <li className="me-3 mb-3">
                            <div className="">
                              <img
                                src={ClockIcon}
                                width="20px"
                                height="20px"
                                alt="clock"
                              />
                              <span className="text-success ms-2 text-underline">
                                <b>
                                  {state.detail?.price_in_minutes}
                                  <sub>x</sub>
                                </b>
                              </span>
                            </div>
                          </li>
                        ) : null}
                        {state.detail?.price_in_regio ? (
                          <li className="me-4">
                            <div className="">
                              <img
                                src={CurrencyIcon}
                                width="20px"
                                height="20px"
                                alt="clock"
                              />
                              <span className="text-success ms-2 text-underline">
                                <b>
                                  {state.detail?.price_in_regio}
                                  <sub>R</sub>
                                </b>
                              </span>
                            </div>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  ) : null}
                  {state.detail?.visibility_region ? (
                    <div className="mt-4">
                      <h6>
                        <b className="mb-2 d-block">Visibility:</b>
                      </h6>
                      <p className="mb-0">
                        {state.detail?.visibility_region?.title}
                      </p>
                    </div>
                  ) : null}
                  {state.detail?.scope_users?.length > 0 ? (
                    <div className="mt-4">
                      <h6>
                        <b className="mb-2 d-block">Scope Users:</b>
                      </h6>
                      <ul className="mb-3">
                        {state.detail?.scope_users?.map((list, key) => (
                          <li className="mb-1" key={`scope-user-${key + 1}`}>
                            {list?.user?.full_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <div className="mt-4">
                    {state.detail?.start_time ? (
                      <h6 className="mb-4">
                        <b className="mb-2 d-block">Start Time:</b>&nbsp;
                        <span>
                          {moment(state.detail?.start_time).format(
                            "DD, MMM yyy hh:mm A"
                          )}
                        </span>
                      </h6>
                    ) : null}
                    {state.detail?.end_time ? (
                      <h6 className=" mb-4">
                        <b className="mb-2 d-block">End Date:</b>&nbsp;
                        <span>
                          {moment(state.detail?.end_time).format(
                            "DD, MMM yyy hh:mm A"
                          )}
                        </span>
                      </h6>
                    ) : null}
                    {state.detail?.location ? (
                      <h6 className="mb-4">
                        <b className="mb-2 d-block">Location:</b>&nbsp;
                        <span>{state.detail?.location}</span>
                      </h6>
                    ) : null}
                    {state.detail?.mode ? (
                      <h6 className="mb-4">
                        <b className="mb-2 d-block">Mode:</b>&nbsp;
                        <span>{state.detail?.mode}</span>
                      </h6>
                    ) : null}
                    {state.detail?.mode ? (
                      <h6 className="mb-4">
                        <b className="mb-2 d-block">Interval:</b>&nbsp;
                        <span>{state.detail?.mode}</span>
                      </h6>
                    ) : null}
                  </div>
                </Col>
              </Row>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default DetailSidebar;
