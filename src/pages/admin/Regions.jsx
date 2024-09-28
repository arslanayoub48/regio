import { Link } from "react-router-dom";
import TableContainer from "../../components/table/TableContainerReact";
import { useEffect, useMemo, useState } from "react";
import {
  RegionDataValidate,
  RegisterRegion,
  getUsers,
} from "../../services/api/user";
import moment from "moment";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import RegionStep1 from "../../components/admin/RegionStep1";
import { Form, Formik } from "formik";
import RegionStep2 from "../../components/admin/RegionStep2";
import { RegionStep1Schema, RegionStep2Schema } from "../../utils/validations";
import toast from "react-hot-toast";

const Regions = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const initialValues = {
    full_name: "",
    country_id: "",
    email: "",
    hex_id: "",
    full_region_name: "",
    local_email: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const fetchData = async (page, search) => {
    setLoading(true);
    try {
      const res = await getUsers(page, search);
      setUsers(res.data);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  const columns = useMemo(
    () => [
      {
        header: "ID",
        cell: (cell) => {
          return (
            <Link to="#" className="fw-medium">
              {cell.getValue()}
            </Link>
          );
        },
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        header: "Name",
        accessorKey: "full_name",
        enableColumnFilter: false,
      },
      {
        header: "Phone Number",
        accessorKey: "userBasic.phone_no",
        enableColumnFilter: false,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Street",
        accessorKey: "userBasic.street",
        enableColumnFilter: false,
      },
      {
        header: "Zip",
        accessorKey: "userBasic.zip_code",
        enableColumnFilter: false,
      },
      {
        header: "Village",
        accessorKey: "userBasic.village",
        enableColumnFilter: false,
      },
      {
        header: "Level",
        accessorKey: "userLevel.level",
        enableColumnFilter: false,
      },
      {
        header: "Relation",
        accessorKey: "relation",
        enableColumnFilter: false,
      },
      {
        header: "Role",
        accessorKey: "roles.0.name",
        enableColumnFilter: false,
      },
      {
        header: "Status",
        accessorKey: "status.title",
        enableColumnFilter: false,
      },
      {
        header: "Reference Text",
        accessorKey: "userBasic.reference_text",
        enableColumnFilter: false,
      },
      {
        header: "Member Since",
        accessorKey: "email_verified_at",
        cell: (cell) => {
          return <time>{moment(cell.getValue()).format("DD-MM-YYYY")}</time>;
        },
        enableColumnFilter: false,
      },
    ],
    []
  );
  const handleSubmitSteps = async (
    values,
    { setSubmitting, setFieldValue, resetForm }
  ) => {
    try {
      await (step == 1 ? RegionStep1Schema : RegionStep2Schema).validate(
        values,
        { abortEarly: false }
      );
      if (step == 1) {
        const res = await RegionDataValidate({
          full_name: values.full_name,
          country_id: values.country_id.value,
          email: values.email,
        });
        const updated_obj = {
          ...formData,
          ...res.data.data,
          country_id: values.country_id,
        };
        setFormData(updated_obj);
        Object.keys(updated_obj).forEach((item) => {
          setFieldValue(item, updated_obj[item]);
        });
        setStep(2);
      } else if (step == 2) {
        await RegisterRegion({
          ...formData,
          country_id: formData.country_id.value,
        });
        toast.success("Region User has been added successfully");
        Object.keys(formData).forEach((item) => {
          setFieldValue(item, "");
        });
        setShow(false);
      }
    } catch (errors) {
      const { response } = errors;
      toast.success(response.data.message || "Something went wrong");
    }
    setSubmitting(false);
  };
  useEffect(() => {
    if (show == false) {
      setStep(1);
      setFormData(initialValues);
    }
  }, [show]);
  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom">
          <h5 className="mb-0">Users</h5>
          <Button
            type="button"
            color="success"
            onClick={() => setShow(true)}
            className="py-2 addon-btn"
          >
            <i className="ri-add-line"></i>&nbsp;Add Region
          </Button>
        </div>
        <div className="profile-body p-3">
          <TableContainer
            columns={columns || []}
            data={users || []}
            customPageSize={5}
            tableClass="table-centered align-middle table-nowrap mb-0"
            theadClass="text-muted table-light"
            SearchPlaceholder="Search Products..."
            request={fetchData}
            loader={loading}
          />
        </div>
      </div>
      <Modal isOpen={show}>
        <ModalHeader className="border-bottom p-3 border-success">
          Add Region
        </ModalHeader>
        <ModalBody className="px-0">
          <Formik
            initialValues={formData}
            validationSchema={
              step === 1 ? RegionStep1Schema : RegionStep2Schema
            }
            onSubmit={handleSubmitSteps}
          >
            {(formik) => (
              <Form>
                <div className="px-3">
                  {step === 1 ? (
                    <RegionStep1 formik={formik} show={show} />
                  ) : (
                    <RegionStep2 formik={formik} />
                  )}
                </div>
                <div className="modal-footer-wrap text-end border-top px-3 mt-4 pt-3">
                  <Button
                    type="button"
                    onClick={() =>
                      step == 1 ? setShow(false) : setStep(step - 1)
                    }
                    className="me-3"
                    color="light"
                    disabled={formik.isSubmitting}
                  >
                    {step == 1 ? "Cancel" : "Back"}
                  </Button>
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    color="success"
                  >
                    {step === 1 ? "Next" : "Submit"}
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

export default Regions;
