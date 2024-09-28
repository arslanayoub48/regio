import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";

//redux

import { Link } from "react-router-dom";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
// import profile from "../../assets/images/bg.png";
import enLogoWhite from "../../assets/images_/logo_white_en.png";
import withRouter from "../../components/common/withRouter";
import ParticlesAuth from "../../HOC/ParticlesAuth";
import {
  sendforgetPasswordOtp,
  verifyforgetPasswordOtp,
} from "../../services/api/user";
import TwoStepVerification from "./TwoStepVerification";
import toast from "react-hot-toast";
import PasswordReset from "./PasswordReset";

const ForgetPasswordPage = (props) => {
  const [forgetError, setForgetError] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await sendforgetPasswordOtp(values);
        toast.success(res?.data?.message);
        setIsEmailSent(true);
      } catch (errors) {
        const { response } = errors;
        setForgetError(response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  document.title = "Reset Password | Regional";
  return (
    <ParticlesAuth>
      <div className="auth-page-content mt-lg-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link to="/" className="d-inline-block auth-logo">
                    <img
                      src={enLogoWhite}
                      alt="regional"
                      height="60"
                      width="250"
                    />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>

          {!isEmailSent ? (
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Forgot Password?</h5>
                      <p className="text-muted">Reset password with regional</p>

                      <lord-icon
                        src="https://cdn.lordicon.com/rhvddzym.json"
                        trigger="loop"
                        colors="primary:#0ab39c"
                        className="avatar-xl"
                        style={{ width: "120px", height: "120px" }}
                      ></lord-icon>
                    </div>
                    <Alert
                      className="border-0 alert-warning text-center mb-2 mx-2"
                      role="alert"
                    >
                      Enter your email and instructions will be sent to you!
                    </Alert>
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    <div className="p-2">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <div className="mb-4">
                          <Label className="form-label">Email</Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.email}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="text-center mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                            disabled={loading ? "disabled" : ""}
                          >
                            Send Reset OTP
                          </button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Wait, I remember my password...{" "}
                    <Link
                      to="/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Click here{" "}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          ) : !isPasswordReset ? (
            <TwoStepVerification
              email={validation.values.email}
              request={verifyforgetPasswordOtp}
              loading={loading}
              setLoading={setLoading}
              resendOtp={validation.handleSubmit}
              onSuccess={(val) => setIsPasswordReset(true)}
            />
          ) : (
            <PasswordReset
              router={props.router.navigate}
              email={validation.values.email}
              setLoading={setLoading}
            />
          )}
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
