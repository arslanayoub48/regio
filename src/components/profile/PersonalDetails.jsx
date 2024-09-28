import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Form,
} from "reactstrap";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { AsyncFormSelect, FormInput } from "../Forms/FormsElements";
import { fetchCountries } from "../../utils/helpers";
import { updateProfileDataSchema } from "../../utils/validations";
import { updateUser } from "../../services/api/user";
import toast from "react-hot-toast";
import { updateProfileData } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
const PersonalDetails = () => {
  const [toggleModalType, setToggleModalType] = useState("");
  const { userProfile } = useSelector((state) => state.Auth);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const setToggleType = (type) => {
    setToggleModalType(type);
    setShow(true);
  };
  const userBasicsInitialValues = {
    phone_no: "",
    street: "",
    zip_code: "",
    reference_text: "",
    village: "",
  };
  const initalValues = {
    first_name: "",
    last_name: "",
    village: "",
    country_id: {},
    confirm_password: "",
    pin: "",
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: {
      ...initalValues,
      ...userBasicsInitialValues,
    },
    validationSchema: updateProfileDataSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let payload = { ...values };
      if (!payload.country_id) {
        delete payload.country_id;
      } else {
        payload = { ...payload, country_id: payload.country_id.value };
      }
      try {
        const res = await updateUser(userProfile.uuid, payload);
        dispatch(updateProfileData(values));
        toast.success("Personal detail update successfully");
      } catch (errors) {
        const { response } = errors;
        toast.error(response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  const modalContent = {
    pin: [{ label: "New Pin", type: "password", name: "pin" }],
    email: [{ label: "Email Address", type: "email", name: "email" }],
    password: [
      { label: "New Password", type: "password", name: "password" },
      { label: "Confirm Password", type: "password", name: "confirm_password" },
    ],
  };
  useEffect(() => {
    Object.keys(initalValues).forEach((key) => {
      if (key == "country_id") {
        formik.setFieldValue(
          key,
          userProfile[key]
            ? {
                label: userProfile[key].title,
                value: userProfile[key].id,
              }
            : {}
        );
      } else {
        formik.setFieldValue(key, userProfile[key] || "");
      }
    });
    if (userProfile.userBasic) {
      Object.keys(userBasicsInitialValues).forEach((key) => {
        formik.setFieldValue(key, userProfile.userBasic[key]);
      });
    }
  }, [userProfile]);
  const disabledModelButton = () => {
    if (toggleModalType == "pin" && formik.values["pin"]) {
      return false;
    } else if (
      toggleModalType == "password" &&
      formik.values["password"] &&
      formik.values["confirm_password"]
    ) {
      return false;
    } else if (toggleModalType == "email" && formik.values["email"]) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <Form className="py-2" onSubmit={formik.handleSubmit}>
        <Row>
          <Col md={6} className="mt-3">
            <Label className="form-label">First Name</Label>
            <FormInput formik={formik} type="text" name="first_name" />
          </Col>
          <Col md={6} className="mt-3">
            <Label className="form-label">Last Name</Label>
            <FormInput formik={formik} type="text" name="last_name" />
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mt-3">
            <Label className="form-label">Steet, Number</Label>
            <FormInput formik={formik} type="text" name="street" />
          </Col>
          <Col md={2} className="mt-3">
            <Label className="form-label">Zip-Code</Label>
            <FormInput formik={formik} type="text" name="zip_code" />
          </Col>
          <Col md={3} className="mt-3">
            <Label className="form-label">Village</Label>
            <FormInput formik={formik} type="text" name="village" />
          </Col>
          <Col md={3} className="mt-3">
            <Label className="form-label">Country</Label>
            <AsyncFormSelect
              formik={formik}
              name="country_id"
              placeholder="Select Country"
              loadOptions={fetchCountries}
              disabled={true}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mt-3">
            <Label className="form-label">Phone Number</Label>
            <FormInput formik={formik} type="text" name="phone_no" />
          </Col>
          <Col md={6} className="mt-3">
            <Label className="form-label">PIN-Number for Transactions</Label>
            <div className="d-flex align-items-start">
              <div className="flex-1 me-3">
                <FormInput
                  formik={formik}
                  readOnly
                  type="password"
                  name="pin"
                />
              </div>
              <Button
                type="button"
                color="success"
                style={{ fontSize: "20px", height: "37.5px", lineHeight: 1 }}
                onClick={() => setToggleType("pin")}
                disabled={loading}
              >
                <i className="ri-pencil-line" />
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mt-3">
            <Label className="form-label">Email</Label>
            <div className="d-flex align-items-start">
              <div className="me-3 flex-1">
                <FormInput formik={formik} type="text" readOnly name="email" />
              </div>
              <Button
                type="button"
                color="success"
                style={{ fontSize: "20px", height: "37.5px", lineHeight: 1 }}
                onClick={() => setToggleType("email")}
                disabled={loading}
              >
                <i className="ri-pencil-line" />
              </Button>
            </div>
          </Col>
          <Col md={6} className="mt-3">
            <Label className="form-label">Password</Label>
            <div className="d-flex align-items-start">
              <div className="flex-1 me-3">
                <FormInput
                  formik={formik}
                  type="password"
                  readOnly
                  name="password"
                />
              </div>
              <Button
                type="button"
                color="success"
                style={{ fontSize: "20px", height: "37.5px", lineHeight: 1 }}
                onClick={() => setToggleType("password")}
                disabled={loading}
              >
                <i className="ri-pencil-line" />
              </Button>
            </div>
          </Col>
          <Col md={12} className="mt-3">
            <Label className="form-label">Description</Label>
            <FormInput
              type="textarea"
              formik={formik}
              name="reference_text"
              style={{ resize: "none", height: "100px" }}
            />
          </Col>
          <Col xs={12} className="text-end pt-3 mt-3">
            <Button
              color="success"
              className="px-4"
              type="submit"
              disabled={loading}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal isOpen={show}>
        <ModalHeader className="border-bottom modal-header-wrap py-3 px-4">
          Edit <span className="text-capitalize">{toggleModalType}</span>
        </ModalHeader>
        <ModalBody className="px-0">
          <form className="px-4">
            {modalContent[toggleModalType]?.map((item, key) => (
              <div key={`field-${key + 1}`} className="mb-3">
                <Label className="form-label">{item.label}</Label>
                <FormInput formik={formik} type={item.type} name={item.name} />
              </div>
            ))}
          </form>
          <div className="modal-footer-wrap border-top px-4 mt-5">
            <Row>
              <Col xs={12} className="text-end pt-3">
                <Button
                  color="light"
                  onClick={() => {
                    formik.setFieldValue("email", userProfile.email);
                    formik.setFieldValue("pin", userProfile.pin || "");
                    formik.setFieldValue("password", "");
                    formik.setFieldValue("confirm_password", "");
                    setShow(false);
                  }}
                  className="me-3"
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  color="success"
                  type="submit"
                  disabled={disabledModelButton()}
                  onClick={() => {
                    if (toggleModalType == "pin" && formik.errors["pin"]) {
                      return false;
                    } else if (
                      toggleModalType == "password" &&
                      (formik.errors["password"] ||
                        formik.errors["confirm_password"])
                    ) {
                      return false;
                    } else if (
                      toggleModalType == "email" &&
                      formik.errors["email"]
                    ) {
                      return false;
                    } else {
                      setShow(false);
                    }
                  }}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default PersonalDetails;
