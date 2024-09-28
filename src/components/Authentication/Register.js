import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";
import ParticlesAuth from "../../HOC/ParticlesAuth";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

// action
// import { registerUser, apiError, resetRegisterFlag } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

//import images
import enLogoWhite from "../../assets/images_/logo_white_en.png";
import { registerSchema } from "../../utils/validations";
import { signUpRequest } from "../../store/auth/authThunk";
import TwoStepVerification from "../../pages/auth/TwoStepVerification";
import {
  sendforgetPasswordOtp,
  verifySignupOtp,
} from "../../services/api/user";
import { setCookie } from "../../utils/helpers";
import withRouter from "../common/withRouter";

const Register = (props) => {
  const dispatch = useDispatch();
  const { status, token, userProfile } = useSelector((state) => state.Auth);
  const [isOpenVerify, setIsOpenVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    validationSchema: registerSchema,
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
      first_name: "",
      last_name: "",
      phone_no: "",
      street: "",
      village: "",
      reference_text: "",
      zip_code: "",
    },
    onSubmit: (values) => {
      onFormSubmit(values);
    },
  });
  const callback = () => {
    sendOtp();
  };
  const onFormSubmit = async (data) => {
    await dispatch(signUpRequest({ data, callback }));
  };

  document.title = "Register";

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await sendforgetPasswordOtp({ email: formik.values.email });
      toast.success(res?.data?.message);
      setIsOpenVerify(true);
    } catch (errors) {
      const { response } = errors;
      toast.error(response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const successRegister = () => {
    setCookie("regio-auth", token, 24);
    props.router.navigate("/dashboard");
  };

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={enLogoWhite} alt="" height="60" width="250" />
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
            {!isOpenVerify ? (
              <Row className="justify-content-center">
                <Col md={8} lg={8} xl={8}>
                  <Card className="mt-4">
                    <CardBody className="p-4">
                      <div className="text-center mt-2">
                        <h5 className="text-primary">Create New Account</h5>
                      </div>
                      <div className="p-2 mt-4">
                        <Form
                          onSubmit={formik.handleSubmit}
                          className="needs-validation row"
                          action="#"
                        >
                          <div className="mb-2 col-4">
                            <Label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              First Name <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="first_name"
                              type="text"
                              placeholder="First Name"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.first_name || ""}
                              invalid={
                                formik.touched.first_name &&
                                formik.errors.first_name
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.first_name &&
                            formik.errors.first_name ? (
                              <FormFeedback type="invalid">
                                <div>{formik.errors.first_name}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-2 col-4">
                            <Label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              Last Name <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="last_name"
                              type="text"
                              placeholder="Last Name"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.last_name || ""}
                              invalid={
                                formik.touched.last_name &&
                                formik.errors.last_name
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.last_name &&
                            formik.errors.last_name ? (
                              <FormFeedback type="invalid">
                                <div>{formik.errors.last_name}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-2 col-4">
                            <Label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              Phone Number{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="phone_no"
                              type="text"
                              placeholder="Phone Number"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.phone_no || ""}
                              invalid={
                                formik.touched.phone_no &&
                                formik.errors.phone_no
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.phone_no &&
                            formik.errors.phone_no ? (
                              <FormFeedback type="invalid">
                                <div>{formik.errors.phone_no}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-4">
                            <Label htmlFor="street" className="form-label">
                              Street <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="street"
                              type="text"
                              placeholder="Enter street"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.street || ""}
                              invalid={
                                formik.touched.street && formik.errors.street
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.street && formik.errors.street ? (
                              <FormFeedback type="invalid">
                                <div>{formik.errors.street}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-2 col-4">
                            <Label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              Zip Code <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="zip_code"
                              type="text"
                              placeholder="Zip Code"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.zip_code || ""}
                              invalid={
                                formik.touched.zip_code &&
                                formik.errors.zip_code
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.zip_code &&
                            formik.errors.zip_code ? (
                              <FormFeedback type="invalid">
                                <div>{formik.errors.zip_code}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-2 col-4">
                            <Label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              Village <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="village"
                              type="text"
                              placeholder="Village"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.village || ""}
                              invalid={
                                formik.touched.village && formik.errors.village
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.village && formik.errors.village ? (
                              <FormFeedback type="invalid">
                                <div>{formik.errors.village}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-4">
                            <Label htmlFor="useremail" className="form-label">
                              Email <span className="text-danger">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter email address"
                              type="email"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email || ""}
                              invalid={
                                formik.touched.email && formik.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.email && formik.errors.email ? (
                              <FormFeedback type="invalid">
                                <div>{formik.errors.email}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-4">
                            <Label
                              htmlFor="userpassword"
                              className="form-label"
                            >
                              Password <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="password"
                              type="password"
                              placeholder="Enter Password"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password || ""}
                              invalid={
                                formik.touched.password &&
                                formik.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                              <FormFeedback type="invalid">
                                <div>{formik.errors.password}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-2 col-4">
                            <Label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              Confirm Password{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="password_confirmation"
                              type="password"
                              placeholder="Confirm Password"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password_confirmation || ""}
                              invalid={
                                formik.touched.password_confirmation &&
                                formik.errors.password_confirmation
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.password_confirmation &&
                            formik.errors.password_confirmation ? (
                              <FormFeedback type="invalid">
                                <div>{formik.errors.password_confirmation}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-2 col-12">
                            <Label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              Why you wanted to join{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="reference_text"
                              type="textarea"
                              style={{ height: "100px", width: "100%" }}
                              placeholder="Address"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.reference_text || ""}
                              invalid={
                                formik.touched.reference_text &&
                                formik.errors.reference_text
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.reference_text &&
                            formik.errors.reference_text ? (
                              <FormFeedback type="invalid">
                                <div>{formik.errors.reference_text}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-4">
                            <p className="mb-0 fs-12 text-muted fst-italic">
                              By registering you agree to the Velzon
                              <Link
                                to="#"
                                className="text-primary text-decoration-underline fst-normal fw-medium"
                              >
                                Terms of Use
                              </Link>
                            </p>
                          </div>

                          <div className="mt-4">
                            <button
                              className="btn btn-success w-100"
                              type="submit"
                              disabled={status == "loading" ? "disabled" : ""}
                            >
                              Sign Up
                            </button>
                          </div>

                          <div className="mt-4 text-center">
                            <div className="signin-other-title">
                              <h5 className="fs-13 mb-4 title text-muted">
                                Create account with
                              </h5>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </CardBody>
                  </Card>
                  <div className="mt-4 text-center">
                    <p className="mb-0">
                      Already have an account ?{" "}
                      <Link
                        to="/login"
                        className="fw-semibold text-primary text-decoration-underline"
                      >
                        Signin
                      </Link>
                    </p>
                  </div>
                </Col>
              </Row>
            ) : (
              <TwoStepVerification
                loading={loading}
                setLoading={setLoading}
                email={formik.values.email}
                resendOtp={sendOtp}
                onSuccess={successRegister}
                request={verifySignupOtp}
                payload={{ id: userProfile.id }}
              />
            )}
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Register);
