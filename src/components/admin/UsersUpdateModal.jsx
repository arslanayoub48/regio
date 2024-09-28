import {
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Form,
  Row,
  Col,
  Button,
  FormGroup,
} from "reactstrap";
import { useFormik } from "formik";
import { AsyncFormSelect, FormInput } from "../Forms/FormsElements";
import { fecthSelectModule, fetchCountries } from "../../utils/helpers";
import {
  getFeeProjects,
  getLanguages,
  getLevels,
  getRegions,
  getStatuses,
  updateUserProfile,
} from "../../services/api/user";
import { useEffect, useState } from "react";
import { userUpdateSchema } from "../../utils/validations";
import { profileUpdateValues } from "../constants/variables";
import toast from "react-hot-toast";
const UsersUpdateModal = ({ show, setCancel, data, request }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      ...profileUpdateValues.initialValues(),
    },
    validationSchema: userUpdateSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let payload = {};
      Object.keys(profileUpdateValues.initialValues()).forEach((index) => {
        if (Array.isArray(values[index])) {
          payload[index] = values[index].map((list) => list.value);
          return;
        } else if (values[index] instanceof Object) {
          payload[index] = values[index].id || values[index].value;
        } else {
          if (
            index == "total_activity_fiat" ||
            index == "total_activity_minutes"
          ) {
            payload[index] = parseInt(values[index]);
          } else if (index == "is_otp_verified" || index == "agreed_terms") {
            payload[index] = values[index] ? 1 : 0;
          } else {
            payload[index] = values[index];
          }
        }
      });
      try {
        await updateUserProfile({ id: data.id, ...payload });
        setCancel(false);
        toast.success("Prouct has been updated successfully");
        request();
      } catch (errors) {
        const { response } = errors;
        toast.error(response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    if (data) {
      Object.keys(profileUpdateValues.mainValues).forEach((key) => {
        if (data?.[key]) {
          const current = data[key];
          formik.setFieldValue(key, current);
        }
      });
      Object.keys(profileUpdateValues.userBasic).forEach((key) => {
        if (data?.userBasic?.[key])
          formik.setFieldValue(key, data.userBasic[key]);
      });
      Object.keys(profileUpdateValues.booleanValues).forEach((key) => {
        formik.setFieldValue(key, data[key] == 1 ? true : false);
      });
      Object.keys(profileUpdateValues.selectListValues).forEach((key) => {
        const current = data[key];
        if (Array.isArray(current)) {
          if (current.length > 0) {
            formik.setFieldValue(
              key,
              current.map((list) => {
                return {
                  label:
                    list?.hex_name ||
                    list?.title ||
                    list?.full_name ||
                    list?.name,
                  value: list.id,
                };
              })
            );
          }
        } else if (current) {
          formik.setFieldValue(key, {
            label:
              current?.hex_name ||
              current?.title ||
              current?.full_name ||
              current?.name,
            value: current.id,
          });
        }
      });
    }
  }, [data]);
  return (
    <>
      <Modal isOpen={show} size="lg">
        <ModalHeader className="border-bottom p-3 border-success">
          Edit User
        </ModalHeader>
        <ModalBody className="pt-2 pb-3 px-0">
          <Form className="w-100" action="#" onSubmit={formik.handleSubmit}>
            <Row className="px-3 pb-3 pt-3">
              <Col className="mb-3" md={6}>
                <Label className="form-label">
                  First Name&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput name="first_name" formik={formik} />
              </Col>
              <Col className="mb-3" md={6}>
                <Label className="form-label">
                  Last Name&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput name="last_name" formik={formik} />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Email&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput type="email" name="email" formik={formik} />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Pin&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput type="number" name="pin" formik={formik} />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Phone number&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput type="text" name="phone_no" formik={formik} />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Country&nbsp;<span className="text-danger">*</span>
                </Label>
                <AsyncFormSelect
                  placeholder="Select Country"
                  name="country_id"
                  formik={formik}
                  loadOptions={fetchCountries}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Village&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput name="village" formik={formik} />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Street&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput name="street" formik={formik} />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Zip Code&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput name="zip_code" formik={formik} />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Total Minutes&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput name="total_activity_minutes" formik={formik} />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Total Regio&nbsp;<span className="text-danger">*</span>
                </Label>
                <FormInput name="total_activity_fiat" formik={formik} />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Level&nbsp;<span className="text-danger">*</span>
                </Label>
                <AsyncFormSelect
                  placeholder="Select Level"
                  name="user_level_id"
                  formik={formik}
                  loadOptions={(e) => fecthSelectModule(e, getLevels)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Language&nbsp;<span className="text-danger">*</span>
                </Label>
                <AsyncFormSelect
                  placeholder="Select Language"
                  name="language_id"
                  formik={formik}
                  loadOptions={(e) => fecthSelectModule(e, getLanguages)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Region&nbsp;<span className="text-danger">*</span>
                </Label>
                <AsyncFormSelect
                  placeholder="Select Region"
                  name="region_ids"
                  formik={formik}
                  multiple={true}
                  loadOptions={(e) => fecthSelectModule(e, getRegions)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Fee Project&nbsp;<span className="text-danger">*</span>
                </Label>
                <AsyncFormSelect
                  placeholder="Select Fee Project"
                  name="fee_to_project_id"
                  formik={formik}
                  loadOptions={(e) => fecthSelectModule(e, getFeeProjects)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Label className="form-label">
                  Status&nbsp;<span className="text-danger">*</span>
                </Label>
                <AsyncFormSelect
                  placeholder="Select Fee Project"
                  name="status_id"
                  formik={formik}
                  loadOptions={(e) => fecthSelectModule(e, getStatuses)}
                />
              </Col>
              <Col className="mb-3 d-flex align-items-end">
                <div className="me-4">
                  <Label check>OTP Verified</Label>
                  <FormGroup switch>
                    <FormInput
                      type="switch"
                      formik={formik}
                      name="is_otp_verified"
                      style={{ width: "40px", height: "20px" }}
                    />
                  </FormGroup>
                </div>
                <div className="me-4">
                  <Label check>Agreed terms</Label>
                  <FormGroup switch>
                    <FormInput
                      type="switch"
                      formik={formik}
                      name="agreed_terms"
                      style={{ width: "40px", height: "20px" }}
                    />
                  </FormGroup>
                </div>
              </Col>
              <Col md={12} className="mb-3">
                <Label className="form-label">Reference Text</Label>
                <FormInput
                  type="textarea"
                  name="reference_text"
                  formik={formik}
                />
              </Col>
              <Col md={12} className="mb-3">
                <Label className="form-label">About</Label>
                <FormInput type="textarea" name="about" formik={formik} />
              </Col>
            </Row>
            <div className="modal-footer-wrap border-top">
              <Row>
                <Col xs={12} className="text-end mt-3">
                  <Button
                    color="light"
                    className="me-3"
                    type="button"
                    onClick={setCancel}
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
        </ModalBody>
      </Modal>
    </>
  );
};

export default UsersUpdateModal;
