import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import CartIcon from "../../assets/images/cart.png";
import ClockIcon from "../../assets/images/clock.png";
import CurrencyIcon from "../../assets/images/currency.png";
import { FormSelect, FormInput, AsyncFormSelect } from "../Forms/FormsElements";
import { useFormik } from "formik";
import productSchema from "../../utils/validations";
import { useEffect, useState } from "react";
import {
  getAdminUsers,
  getScopeUsers,
  getVisibilityRegions,
  postProductModule,
  updateProductModule,
} from "../../services/api/user";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/modules/moduleThunk";
import toast from "react-hot-toast";
import { loadAdminUsersData } from "../../utils/helpers";
const AddProductForm = ({
  setShowAttachment,
  attachmentShow,
  icon,
  setModalVisible,
  schema,
  setFormik,
  moduleType,
  router,
  editData,
  setUploadedFiles,
  updateRecordRequest,
}) => {
  const [loading, setLoading] = useState(false);
  const [optionsVisibilty, setVisibilityOptions] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { adminRole } = useSelector((state) => state.Auth);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      user_id: "",
      price_in_minutes: "",
      price_in_regio: "",
      visibility_region_id: "",
      location: "",
      event_mode_id: "",
      start_time: "",
      end_time: "",
      interval: "",
      created_at: 1,
      attachments: [],
      scope_users: [],
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {};
      schema._nodes.map((item) => {
        if (item == "scope_users") {
          return (payload[item] = values.scope_users.map((list) => {
            return list.value;
          }));
        }
        if (item == "visibility_region_id") {
          return (payload[item] = values[item]?.value);
        }
        if (item == "user_id" && adminRole == "super-admin") {
          return (payload[item] = values[item]?.value || "");
        }
        if (item == "attachments") {
          return (payload[item] = values.attachments.map((list) => {
            const { id, ...rest } = list;
            return { ...rest, is_primary: false };
          }));
        }
        if (item == "user_id" && adminRole !== "super-admin") {
          return false;
        }
        return (payload[item] = values[item]);
      });
      try {
        const res = !editData
          ? await postProductModule(payload, moduleType.slug.replace(/s$/, ""))
          : await updateProductModule(
              payload,
              moduleType.slug.replace(/s$/, ""),
              editData.uuid
            );
        setModalVisible(false);
        toast.success(
          `${moduleType.slug.replace(/s$/, "")} ${
            editData ? "updated" : "added"
          } been added successfully`
        );
        if (updateRecordRequest) {
          return updateRecordRequest();
        }
        router.navigate("/module/" + moduleType.slug);
        dispatch(
          getProducts({
            data: "",
            callback: null,
            slug: moduleType.slug.replace(/s$/, ""),
          })
        );
      } catch (errors) {
        const { response } = errors;
        toast.error(response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    setFormik(formik);
  }, []);

  const loadMoreVisibleData = async () => {
    const initialOptions = await getVisibilityRegions(1, 10);
    const result = initialOptions.data;
    return initialOptions.data.data.map((x) => {
      return { label: x.title, value: x.id };
    });
  };

  useEffect(() => {
    if (editData && formik) {
      Object.keys(editData).forEach((key) => {
        if (key == "scope_users") {
          return formik.setFieldValue(
            key,
            editData[key].map((list) => {
              return { value: list.user.id, label: list.user.hex_name };
            })
          );
        }
        if (key == "visibility_region") {
          return formik.setFieldValue("visibility_region_id", {
            value: editData[key].id,
            label: editData[key].title,
          });
        }
        if (key == "user" && adminRole == "super-admin") {
          return formik.setFieldValue("user_id", {
            value: editData[key].id,
            label: editData[key].full_name,
          });
        }
        if (key == "event_mode") {
          return formik.setFieldValue("event_mode_id", editData[key].id);
        }
        if (key == "attachments") {
          setUploadedFiles(editData[key]);
        }
        formik.setFieldValue(key, editData[key]);
      });
    } else {
      formik.resetForm();
    }
  }, [editData]);
  return (
    <Form onSubmit={formik.handleSubmit} action="#">
      <div className="pt-2 pb-3 modal-body-content-scroll">
        {adminRole == "super-admin" ? (
          <div className="mb-3">
            <Label className="form-label" htmlFor="password">
              Write Post for
            </Label>
            <AsyncFormSelect
              formik={formik}
              name="user_id"
              placeholder="Select User"
              loadOptions={loadAdminUsersData}
            />
          </div>
        ) : null}
        <div className="d-flex align-items-end">
          <div className="flex-1 me-4">
            <Label className="form-label">
              Title&nbsp;<span className="text-danger">*</span>
            </Label>
            <FormInput
              formik={formik}
              type="text"
              classes="pe-5"
              name="title"
              placeholder="Title"
            />
          </div>
          <div>
            <img src={moduleType?.icon || CartIcon} height="40px" alt="cart" />
          </div>
        </div>
        <div className="mt-3">
          <Label className="form-label" htmlFor="password">
            Description&nbsp;<span className="text-danger">*</span>
          </Label>
          <FormInput
            formik={formik}
            type="textarea"
            name="description"
            placeholder="Description"
            classes="pe-5"
            style={{ height: "80px" }}
          />
        </div>
        {moduleType.slug == "events" ||
        moduleType.slug == "food-events" ||
        moduleType.slug == "orders" ||
        moduleType.slug == "car-pooling" ? (
          <Row>
            <Col
              md={
                moduleType.slug == "events" ||
                moduleType.slug == "orders" ||
                moduleType.slug == "car-pooling"
                  ? 8
                  : 12
              }
            >
              <Row>
                <Col lg={6} className="mt-3">
                  <Label className="form-label" htmlFor="password">
                    Start Date&nbsp;<span className="text-danger">*</span>
                  </Label>
                  <FormInput
                    formik={formik}
                    type="datetime-local"
                    name="start_time"
                    placeholder="Start date"
                  />
                </Col>
                <Col lg={6} className="mt-3">
                  <Label className="form-label" htmlFor="password">
                    End Date&nbsp;<span className="text-danger">*</span>
                  </Label>
                  <FormInput
                    formik={formik}
                    type="datetime-local"
                    name="end_time"
                    placeholder="End date"
                  />
                </Col>
              </Row>
            </Col>
            {moduleType.slug == "events" ||
            moduleType.slug == "orders" ||
            moduleType.slug == "car-pooling" ? (
              <Col md={4} className="mt-3">
                <Label className="form-label" htmlFor="password">
                  Interval
                </Label>
                <FormInput
                  formik={formik}
                  type="text"
                  name="interval"
                  placeholder="Interval"
                />
              </Col>
            ) : null}
            {moduleType.slug !== "car-pooling" ? (
              <Col md={moduleType.slug == "events" ? 6 : 12} className="mt-3">
                <Label className="form-label" htmlFor="password">
                  Location&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput
                  formik={formik}
                  type="text"
                  name="location"
                  placeholder="Location"
                />
              </Col>
            ) : null}
            {moduleType.slug == "car-pooling" ? (
              <>
                <Col md={6} className="mt-3">
                  <Label className="form-label" htmlFor="password">
                    Start&nbsp;<span className="text-danger">*</span>
                  </Label>
                  <FormInput
                    formik={formik}
                    type="text"
                    name="start"
                    placeholder="Start"
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <Label className="form-label" htmlFor="password">
                    Destination&nbsp;<span className="text-danger">*</span>
                  </Label>
                  <FormInput
                    formik={formik}
                    type="text"
                    name="start"
                    placeholder="Start"
                  />
                </Col>
                <Col md={12} className="mt-3">
                  <Label className="form-label" htmlFor="password">
                    Fix stops
                  </Label>
                  <FormInput
                    formik={formik}
                    type="text"
                    name="fix-stops"
                    placeholder="Fix stops"
                  />
                </Col>
                <Col md={12} className="mt-3">
                  <Label className="form-label" htmlFor="password">
                    Optional stops
                  </Label>
                  <FormInput
                    formik={formik}
                    type="text"
                    name="optional-stops"
                    placeholder="Optional stops"
                  />
                </Col>
              </>
            ) : null}
            {moduleType.slug == "events" ? (
              <Col md={6} className="mt-3">
                <Label className="form-label" htmlFor="password">
                  Mode&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput
                  formik={formik}
                  type="text"
                  name="event_mode_id"
                  placeholder="Mode"
                />
              </Col>
            ) : null}
          </Row>
        ) : null}
        <Row>
          <>
            <Col md={6} className="mt-3">
              <Label className="form-label" htmlFor="password">
                Visibilty&nbsp;<span className="text-danger">*</span>
              </Label>
              <AsyncFormSelect
                formik={formik}
                type="text"
                name="visibility_region_id"
                placeholder="Select Visiblity"
                loadOptions={loadMoreVisibleData}
              />
            </Col>
            <Col md={6} className="mt-3">
              <Label className="form-label" htmlFor="password">
                Scope&nbsp;<span className="text-danger">*</span>
              </Label>
              <AsyncFormSelect
                formik={formik}
                name="scope_users"
                placeholder="Select Scope"
                multiple={true}
                loadOptions={loadAdminUsersData}
              />
            </Col>
          </>
          {setShowAttachment && moduleType.attachment ? (
            <Col xs={12} className="mt-3">
              <Label className="form-label" htmlFor="password">
                Attachments&nbsp;<span className="text-danger">*</span>
              </Label>
              <div
                className="card mb-0 cursor-pointer"
                style={{ backgroundColor: "#f1f0ef" }}
                onClick={() => setShowAttachment(true)}
              >
                <div className="card-body">
                  {formik.values.attachments.length > 0 ? (
                    <ul className="mb-0">
                      {formik.values.attachments.map((item, key) => (
                        <li
                          className={`${
                            key + 1 !== formik.values.attachments.length
                              ? "mb-2"
                              : ""
                          }`}
                          key={`attachment-${key + 1}`}
                        >
                          {item.original_name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "Click to Attach files"
                  )}
                </div>
              </div>
              {formik.touched.attachments && formik.errors.attachments ? (
                <FormFeedback className="d-block" type="invalid">
                  {formik.errors.attachments}
                </FormFeedback>
              ) : null}
            </Col>
          ) : null}
        </Row>
        {moduleType?.prices ? (
          <Row>
            <Col xs={12} className="mt-3">
              <Label className="form-label" htmlFor="password">
                Prices&nbsp;<span className="text-danger">*</span>
              </Label>
            </Col>
            <Col md={6} className="mb-3">
              <div className="d-flex">
                <img
                  src={ClockIcon}
                  alt="clock icon"
                  height="30px"
                  className="me-3"
                />
                <FormInput
                  formik={formik}
                  type="text"
                  noError={true}
                  name="price_in_minutes"
                  placeholder="Price in minutes"
                  classes="pe-5"
                />
              </div>
              {formik.touched.price_in_minutes &&
              formik.errors.price_in_minutes ? (
                <FormFeedback className="d-block" type="invalid">
                  {formik.errors.price_in_minutes}
                </FormFeedback>
              ) : null}
            </Col>
            <Col md={6} className="mb-3">
              <div className="d-flex">
                <img
                  src={CurrencyIcon}
                  alt="clock icon"
                  height="30px"
                  className="me-3"
                />
                <FormInput
                  type="text"
                  name="price_in_regio"
                  formik={formik}
                  noError={true}
                  placeholder="Price in Regio"
                  classes="align-self-start"
                />
              </div>
              {formik.touched.price_in_regio && formik.errors.price_in_regio ? (
                <FormFeedback className="d-block" type="invalid">
                  {formik.errors.price_in_regio}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>
        ) : null}
      </div>
      <div className="modal-footer-wrap border-top">
        <Row>
          <Col xs={12} className="text-end mt-3">
            <Button
              color="light"
              onClick={() => setModalVisible(false)}
              className="me-3"
              type="button"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button color="success" disabled={loading} type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default AddProductForm;
