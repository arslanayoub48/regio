import { useEffect, useMemo, useState } from "react";
import ClockIcon from "../../assets/images/clock.png";
import CurrencyIcon from "../../assets/images/currency.png";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { Formik, Form } from "formik";
import PaymentStep1 from "../admin/PaymentStep1";
import toast from "react-hot-toast";
import {
  PaymentStep1Schema,
  PaymentStep2Schema,
} from "../../utils/validations";
import PaymentStep2 from "../admin/PaymentStep2";
import { useSearchParams } from "react-router-dom";
import { sendTransaction, transactionListing } from "../../services/api/user";
import TableContainer from "../table/TableContainerReact";
import { transactionsSendColumns } from "../constants/tableColumns";
import { useSelector } from "react-redux";
const Payments = ({ router }) => {
  const { userProfile } = useSelector((state) => state.Auth);
  const [show, setShow] = useState({ show: false, type: "" });
  const [data, setData] = useState({
    sent_requests: null,
    received_requests: null,
    get_all: null,
  });
  const [step, setStep] = useState(1);
  const [loader, setLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const columns = useMemo(() => transactionsSendColumns(), []);
  const initialValues = {
    user_id: "",
    purpose: "",
    transferred_fiat: "",
    transferred_minutes: "",
    pin: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const getRequest = async (slug, page) => {
    setLoader(true);
    try {
      const response = await transactionListing(slug, page);
      setData((prevData) => ({
        ...prevData,
        [slug.replace("-", "_")]: response.data,
      }));
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };
  const handleSubmitSteps = async (
    values,
    { setSubmitting, setFieldValue, resetForm }
  ) => {
    try {
      await (show.type == "send"
        ? step == 1
          ? PaymentStep1Schema
          : PaymentStep2Schema
        : PaymentStep1Schema
      ).validate(values, { abortEarly: false });
      const payload = {
        ...values,
        user_id: values.user_id.value,
        transferred_fiat: values.transferred_fiat || 0,
        transferred_minutes: values.transferred_minutes || 0,
      };
      if (show.type == "send") {
        if (step == 1) {
          setStep(2);
        } else if (step == 2) {
          if (payload.pin !== userProfile.pin) {
            toast.error("Pin did not matched");
            return;
          }
          await sendTransaction({
            ...payload,
            payment_type: 0,
          });
          toast.success("Payment send request has been submitted successfully");
          Object.keys(formData).forEach((item) => {
            setFieldValue(item, "");
          });
          setShow({ show: false, type: "" });
          setStep(1);
          await getRequest("sent-requests", 1);
        }
      } else {
        delete payload.pin;
        await sendTransaction({
          ...payload,
          payment_type: 1,
        });
        toast.success(
          "Payment receive request has been submitted successfully"
        );
        setShow({ show: false, type: "" });
        setStep(1);
        await getRequest("received-requests", 1);
      }
    } catch (errors) {
      const { response } = errors;
      console.log(errors);
      toast.error(response.data.message || "Something went wrong");
    }
    setSubmitting(false);
  };
  useEffect(() => {
    if (!show.show) {
      setStep(1);
    }
  }, [show]);
  useEffect(() => {
    if (searchParams.get("type") && searchParams.get("type") == "request") {
      setShow({ show: true, type: "request" });
    } else if (searchParams.get("type") && searchParams.get("type") == "send") {
      setShow({ show: true, type: "send" });
    }
  }, [router]);
  const API_URLS = [
    {
      title: "Sent Requests",
      slug: "sent-requests",
    },
    {
      title: "Received Requests",
      slug: "received-requests",
    },
    {
      title: "Get All",
      slug: "get-all",
    },
  ];
  const fetchData = async () => {
    setLoader(true);
    try {
      for (const url of API_URLS) {
        const slug = url.slug;
        try {
          const response = await delayedRequest(slug, 1000);
          setData((prevData) => ({
            ...prevData,
            [slug.replace("-", "_")]: response.data,
          }));
        } catch (error) {}
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  const delayedRequest = (url, delay) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const response = await transactionListing(url);
        resolve(response);
      }, delay);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="py-4">
        <div>
          <ul className="mb-0 list-unstyled d-flex">
            <li className="me-4 mb-3">
              <div className="">
                <img src={ClockIcon} width="40px" alt="clock" />
                <span className="text-success ms-2">
                  <b>5304min</b>
                </span>
              </div>
            </li>
            <li className="me-4">
              <div className="">
                <img src={CurrencyIcon} width="40px" alt="clock" />
                <span className="text-success ms-2">
                  <b>
                    9.678
                    <sub>R</sub>
                  </b>
                </span>
              </div>
            </li>
            <li className="ms-auto me-3">
              <Button
                type="button"
                color="success"
                onClick={() => setShow({ show: true, type: "send" })}
                className="py-2 addon-btn"
              >
                Send Payment
              </Button>
            </li>
            <li>
              <Button
                type="button"
                color="success"
                onClick={() => setShow({ show: true, type: "request" })}
                className="py-2 addon-btn"
              >
                Receive Payment
              </Button>
            </li>
          </ul>
        </div>
      </div>
      {API_URLS.map((list, key) => (
        <div key={`list-${list.slug}${key + 1}`}>
          {data?.[list.slug.replace("-", "_")]?.data?.length > 0 ? (
            <>
              <h4 className="mb-3 mt-4">
                <b>{list.title}</b>
              </h4>
              <TableContainer
                columns={columns}
                data={data?.[list.slug.replace("-", "_")]}
                customPageSize={3}
                CallRequestOnPagination={(page) =>
                  getRequest(list.slug, page + 1)
                }
                tableClass="table-centered align-middle table-nowrap mb-0"
                theadClass="text-muted table-light"
              />
            </>
          ) : null}
        </div>
      ))}
      {loader ? (
        <div className="text-start py-4">
          <Spinner color="success" />
        </div>
      ) : null}
      <Modal isOpen={show.show}>
        <ModalHeader className="border-bottom p-3 border-success">
          {show.type == "send"
            ? `Send Payment (Step ${step})`
            : "Request Payment"}
        </ModalHeader>
        <ModalBody className="px-0">
          <Formik
            validationSchema={
              show.type == "send"
                ? step == 1
                  ? PaymentStep1Schema
                  : PaymentStep2Schema
                : PaymentStep1Schema
            }
            initialValues={formData}
            onSubmit={handleSubmitSteps}
          >
            {(formik) => (
              <Form>
                <div className="px-3">
                  {step === 1 ? (
                    <PaymentStep1 formik={formik} />
                  ) : (
                    <PaymentStep2 formik={formik} />
                  )}
                </div>
                <div className="modal-footer-wrap text-end border-top px-3 mt-4 pt-3">
                  <Button
                    type="button"
                    onClick={() =>
                      show.type == "send"
                        ? step == 1
                          ? setShow({ show: false, type: "" })
                          : setStep(step - 1)
                        : setShow({ show: false, type: "" })
                    }
                    className="me-3"
                    color="light"
                    disabled={formik.isSubmitting}
                  >
                    {show.type == "send"
                      ? step == 1
                        ? "Cancel"
                        : "Back"
                      : "Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    color="success"
                  >
                    {show.type == "send" && step === 1 ? "Next" : "Submit"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Payments;
