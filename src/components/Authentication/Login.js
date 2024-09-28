import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Spinner,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import enLogoWhite from "../../assets/images_/logo_white_en.png";
import ParticlesAuth from "../../HOC/ParticlesAuth";
import withRouter from "../../components/common/withRouter";
import { signInSchema } from "../../utils/validations";
import { loginRequest } from "../../store/auth/authThunk";
import TwoStepVerification from "../../pages/auth/TwoStepVerification";
import {
  sendforgetPasswordOtp,
  verifySignupOtp,
} from "../../services/api/user";
import toast from "react-hot-toast";
import { setCookie } from "../../utils/helpers";
function LoginComponent(props) {
  const dispatch = useDispatch();
  const { status, token, userProfile } = useSelector((state) => state.Auth);
  const [loading, setLoading] = useState(false);
  const [togglePasswordType, setTogglePasswordType] = useState(false);
  document.title = "SignIn";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      onFormSubmit(values);
    },
  });
  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await sendforgetPasswordOtp({ email: formik.values.email });
      toast.success(res?.data?.message);
    } catch (errors) {
      const { response } = errors;
      toast.error(response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const callback = (res) => {
    if (res?.is_otp_verified == 0) sendOtp(res.email);
  };
  const onFormSubmit = async (payload) => {
    const router = props.router.navigate;
    await dispatch(loginRequest({ payload, router, callback }));
  };
  const successLogin = () => {
    setCookie("regio-auth", token, 24);
    window.location.href = "/dashboard";
  };
  return (
    <>
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
            <>
              {userProfile?.is_otp_verified !== 0 ? (
                <Row className="justify-content-center">
                  <Col md={8} lg={6} xl={5}>
                    <Card className="mt-4">
                      <CardBody className="p-4">
                        <div className="text-center mt-2">
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p className="text-muted">
                            Sign in to continue to Reginal Concept.
                          </p>
                        </div>
                        <div className="p-2 mt-4">
                          <Form onSubmit={formik.handleSubmit} action="#">
                            <div className="mb-3">
                              <Label htmlFor="email" className="form-label">
                                Email
                              </Label>
                              <Input
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email || ""}
                                onBlur={formik.handleBlur}
                                invalid={
                                  formik.touched.email && formik.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {formik.touched.email && formik.errors.email ? (
                                <FormFeedback type="invalid">
                                  {formik.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <div className="float-end">
                                <Link
                                  to="/forgot-password"
                                  className="text-muted"
                                >
                                  Forgot password?
                                </Link>
                              </div>
                              <Label
                                className="form-label"
                                htmlFor="password-input"
                              >
                                Password
                              </Label>
                              <div className="position-relative auth-pass-inputgroup mb-3">
                                <Input
                                  name="password"
                                  type={
                                    togglePasswordType ? "text" : "password"
                                  }
                                  className="form-control pe-5"
                                  placeholder="Enter Password"
                                  onChange={formik.handleChange}
                                  value={formik.values.password || ""}
                                  onBlur={formik.handleBlur}
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
                                    {formik.errors.password}
                                  </FormFeedback>
                                ) : null}
                                <button
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                  type="button"
                                  onClick={() =>
                                    setTogglePasswordType(!togglePasswordType)
                                  }
                                >
                                  <i
                                    className={` ${
                                      togglePasswordType
                                        ? "ri-eye-off-fill"
                                        : "ri-eye-fill"
                                    } align-middle`}
                                  ></i>
                                </button>
                              </div>
                            </div>

                            <div className="form-check">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="auth-remember-check"
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="auth-remember-check"
                              >
                                Remember me
                              </Label>
                            </div>

                            <div className="mt-4">
                              <Button
                                color="success"
                                disabled={status == "loading" ? "disabled" : ""}
                                className="btn btn-success w-100"
                                type="submit"
                              >
                                {status == "loading" ? (
                                  <Spinner size="sm" className="me-2">
                                    {" "}
                                    Loading...{" "}
                                  </Spinner>
                                ) : null}
                                Sign In
                              </Button>
                            </div>
                          </Form>
                        </div>
                      </CardBody>
                    </Card>

                    <div className="mt-4 text-center">
                      <p className="mb-0">
                        Don't have an account ?{" "}
                        <Link
                          to="/register"
                          className="fw-semibold text-primary text-decoration-underline"
                        >
                          {" "}
                          Signup{" "}
                        </Link>{" "}
                      </p>
                    </div>
                  </Col>
                </Row>
              ) : (
                <TwoStepVerification
                  loading={loading}
                  setLoading={setLoading}
                  email={userProfile?.email}
                  payload={{ id: userProfile?.id }}
                  resendOtp={sendOtp}
                  request={verifySignupOtp}
                  onSuccess={successLogin}
                />
              )}
            </>
          </Container>
        </div>
      </ParticlesAuth>
    </>
  );
}
export default withRouter(LoginComponent);
