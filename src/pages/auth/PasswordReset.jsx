import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Form,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { resetPassword } from "../../services/api/user";

const PasswordReset = ({ email, loading, router, setLoading }) => {
  document.title = "Create New Password | Regional";

  const [passwordShow, setPasswordShow] = useState(false);
  const [confrimPasswordShow, setConfrimPasswordShow] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(RegExp("(.*[a-z].*)"), "At least lowercase letter")
        .matches(RegExp("(.*[A-Z].*)"), "At least uppercase letter")
        .matches(RegExp("(.*[0-9].*)"), "At least one number")
        .required("This field is required"),
      password_confirmation: Yup.string()
        .required("Confirm password is required")
        .min(8, "Password must be at least 8 characters")
        .oneOf([Yup.ref("password")], "Confirm Password must match."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await resetPassword({
          email: email,
          password: values.password,
        });
        toast.success(res?.data?.message);
        router("/login");
      } catch (errors) {
        const { response } = errors;
        toast.error(response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6} xl={5}>
        <Card className="mt-4">
          <CardBody className="p-4">
            <div className="text-center mt-2">
              <h5 className="text-primary">Create new password</h5>
              <p className="text-muted">
                Your new password must be different from previous used password.
              </p>
            </div>

            <div className="p-2">
              <Form onSubmit={validation.handleSubmit}>
                <div className="mb-3">
                  <Label className="form-label" htmlFor="password-input">
                    Password
                  </Label>
                  <div className="position-relative auth-pass-inputgroup">
                    <Input
                      type={passwordShow ? "text" : "password"}
                      className="form-control pe-5 password-input"
                      placeholder="Enter password"
                      id="password-input"
                      name="password"
                      value={validation.values.password}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.password &&
                        validation.touched.password
                          ? true
                          : false
                      }
                    />
                    {validation.errors.password &&
                    validation.touched.password ? (
                      <FormFeedback type="invalid">
                        {validation.errors.password}
                      </FormFeedback>
                    ) : null}
                    <Button
                      color="link"
                      onClick={() => setPasswordShow(!passwordShow)}
                      className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                      type="button"
                      id="password-addon"
                    >
                      <i className="ri-eye-fill align-middle"></i>
                    </Button>
                  </div>
                  <div id="passwordInput" className="form-text">
                    Must be at least 8 characters.
                  </div>
                </div>

                <div className="mb-3">
                  <Label
                    className="form-label"
                    htmlFor="confirm-password-input"
                  >
                    Confirm Password
                  </Label>
                  <div className="position-relative auth-pass-inputgroup mb-3">
                    <Input
                      type={confrimPasswordShow ? "text" : "password"}
                      className="form-control pe-5 password-input"
                      placeholder="Confirm password"
                      id="confirm-password-input"
                      name="password_confirmation"
                      value={validation.values.password_confirmation}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.password_confirmation &&
                        validation.touched.password_confirmation
                          ? true
                          : false
                      }
                    />
                    {validation.errors.password_confirmation &&
                    validation.touched.password_confirmation ? (
                      <FormFeedback type="invalid">
                        {validation.errors.password_confirmation}
                      </FormFeedback>
                    ) : null}
                    <Button
                      color="link"
                      onClick={() =>
                        setConfrimPasswordShow(!confrimPasswordShow)
                      }
                      className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                      type="button"
                    >
                      <i className="ri-eye-fill align-middle"></i>
                    </Button>
                  </div>
                </div>

                <div
                  id="password-contain"
                  className="p-3 bg-light mb-2 rounded"
                >
                  <h5 className="fs-13">Password must contain:</h5>
                  <p id="pass-length" className="invalid fs-12 mb-2">
                    Minimum <b>8 characters</b>
                  </p>
                  <p id="pass-lower" className="invalid fs-12 mb-2">
                    At <b>lowercase</b> letter (a-z)
                  </p>
                  <p id="pass-upper" className="invalid fs-12 mb-2">
                    At least <b>uppercase</b> letter (A-Z)
                  </p>
                  <p id="pass-number" className="invalid fs-12 mb-0">
                    A least <b>number</b> (0-9)
                  </p>
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
                    disabled={loading ? "disabled" : ""}
                    color="success"
                    className="w-100"
                    type="submit"
                  >
                    Reset Password
                  </Button>
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
  );
};

export default PasswordReset;
