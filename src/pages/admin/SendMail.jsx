import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  AsyncFormSelect,
  FormInput,
} from "../../components/Forms/FormsElements";
import { Button, Col, Form, Label, Row } from "reactstrap";
import { loadAdminUsersData } from "../../utils/helpers";
import { sendMailValidation } from "../../utils/validations";
import { sendMailRequest } from "../../services/api/user";
import toast from "react-hot-toast";
const SendMail = () => {
  const [actionLoading, setActionLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      user_ids: [],
      subject: "",
      message: "",
      send_to_all: false,
    },
    validationSchema: sendMailValidation,
    onSubmit: async (data) => {
      setActionLoading(true);
      const payload = { ...data };
      if (payload.send_to_all == true) {
        delete payload.user_ids;
      } else {
        payload.user_ids = payload.user_ids.map((list) => list.value);
      }
      try {
        const res = await sendMailRequest(payload);
        toast.success(res.data.message);
        formik.resetForm();
      } catch (errors) {
        const { response } = errors;
        toast.error(response.data.message || "Something went wrong");
      } finally {
        setActionLoading(false);
      }
    },
  });
  return (
    <>
      <div className="profile-header p-3 border-bottom">
        <h5 className="mb-0">Send Mail</h5>
      </div>
      <div className="profile-body">
        <div className="text-white bg-success p-3">
          As an admin, you can use this form to send e-mails to the contributors
          (and also to people with pending activation).These then appear to the
          recipient as `official` regional concept messages.
        </div>
        <Form className="p-3 mt-2" onSubmit={formik.handleSubmit}>
          <Row>
            <Col lg={6} className="mb-3">
              <div>
                <Label className="form-label">Subject</Label>
                <FormInput
                  name="subject"
                  placeholder="Enter Subject"
                  formik={formik}
                />
              </div>
            </Col>
            <Col lg={6} className="mb-3">
              <div>
                <Label className="form-label" htmlFor="password">
                  Select Users
                </Label>
                <AsyncFormSelect
                  formik={formik}
                  name="user_ids"
                  placeholder="Select User"
                  multiple={true}
                  loadOptions={loadAdminUsersData}
                  disabled={formik.values.send_to_all}
                />
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkAllUsers"
                    name="send_to_all"
                    onChange={formik.handleChange}
                    checked={formik.values.send_to_all ? "checked" : ""}
                  />
                  <label className="form-check-label" htmlFor="checkAllUsers">
                    Send to all users in regio
                  </label>
                </div>
              </div>
            </Col>
            <Col xs={12} className="mb-3">
              <div>
                <Label className="form-label">Subject</Label>
                <FormInput
                  name="message"
                  style={{ height: "150px" }}
                  type="textarea"
                  placeholder="Enter Message"
                  formik={formik}
                />
              </div>
            </Col>
            <Col xs={12} className="text-end">
              <Button
                color="success"
                type="submit"
                className="px-5"
                disabled={actionLoading}
              >
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default SendMail;
