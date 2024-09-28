import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row, Button, Alert } from "reactstrap";
import toast from "react-hot-toast";

const TwoStepVerification = ({
  email,
  request,
  loading,
  resendOtp,
  onSuccess,
  setLoading,
  payload,
}) => {
  document.title = "Two Step Verification | Regional";

  const getInputElement = (index) => {
    return document.getElementById("digit" + index + "-input");
  };

  const [values, setValues] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  const moveToNext = (index, value) => {
    if (getInputElement(index).value.length === 1) {
      if (index !== 4) {
        getInputElement(index + 1).focus();
      } else {
        getInputElement(index).blur();
      }
    }
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index - 1] = value;
      return newValues;
    });
  };
  const handleSubmit = async () => {
    if (request) {
      setLoading(true);
      try {
        const res = await request(
          payload
            ? { ...payload, otp: values.join("") }
            : { email: email, otp: values.join("") }
        );
        toast.success(res?.data?.message);
        onSuccess(true);
      } catch (errors) {
        const { response } = errors;
        setError(response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let intervalId;

    const startTimer = () => {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    };

    if (timer > 0) {
      startTimer();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);
  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="mt-4">
            <CardBody className="p-4">
              <div className="mb-4">
                <div className="avatar-lg mx-auto">
                  <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                    <i className="ri-mail-line"></i>
                  </div>
                </div>
              </div>

              <div className="p-2 mt-4">
                <div className="text-muted text-center mb-4 mx-lg-3">
                  <h4 className="">Verify Your Email</h4>
                  <p>
                    Please enter the 4 digit code sent to{" "}
                    <span className="fw-semibold">{email}</span>
                  </p>
                  {error && error ? (
                    <Alert color="danger" style={{ marginTop: "13px" }}>
                      {error}
                    </Alert>
                  ) : null}
                </div>

                <form>
                  <Row>
                    <Col className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="digit1-input"
                          className="visually-hidden"
                        >
                          Digit 1
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg bg-light border-light text-center"
                          maxLength="1"
                          id="digit1-input"
                          onKeyUp={(e) => moveToNext(1, e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="digit2-input"
                          className="visually-hidden"
                        >
                          Digit 2
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg bg-light border-light text-center"
                          maxLength="1"
                          id="digit2-input"
                          onKeyUp={(e) => moveToNext(2, e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="digit3-input"
                          className="visually-hidden"
                        >
                          Digit 3
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg bg-light border-light text-center"
                          maxLength="1"
                          id="digit3-input"
                          onKeyUp={(e) => moveToNext(3, e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="digit4-input"
                          className="visually-hidden"
                        >
                          Digit 4
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg bg-light border-light text-center"
                          maxLength="1"
                          id="digit4-input"
                          onKeyUp={(e) => moveToNext(4, e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                </form>
                <div className="mt-3">
                  <Button
                    color="success"
                    disabled={loading}
                    className="w-100"
                    onClick={handleSubmit}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="mt-4 text-center">
            <p className="mb-0">
              {timer === 0 ? (
                <>
                  Didn't receive a code ?
                  <Link
                    className="fw-semibold text-primary text-decoration-underline"
                    onClick={() => {
                      resendOtp();
                      setTimer(30);
                      setError("");
                    }}
                  >
                    Resend
                  </Link>
                </>
              ) : (
                <>
                  Resend OTP will be available in:&nbsp;<b>{timer}</b>
                </>
              )}
            </p>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TwoStepVerification;
