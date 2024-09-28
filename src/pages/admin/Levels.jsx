import { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/table/TableContainerReact";
import {
  deleteLevelRequest,
  editLevels,
  getLevels,
  postLevel,
} from "../../services/api/user";
import {
  Button,
  FormFeedback,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { FormInput } from "../../components/Forms/FormsElements";
import { useFormik } from "formik";
import { levelsSchema } from "../../utils/validations";
import toast from "react-hot-toast";
import { ConfirmDeleteModule } from "../../utils/helpers";

const Levels = () => {
  const [levels, setLevels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const fetchData = async (page, search) => {
    setLoading(true);
    try {
      const res = await getLevels(page, search);
      setLevels(res.data);
    } catch (errors) {
      const { response } = errors;
      toast.error(response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const deleteLevel = async (row) => {
    setActionLoading(true);
    try {
      await deleteLevelRequest(row.id);
      toast.success(`Level has been deleted successfully`);
      fetchData();
    } catch (errors) {
      const { response } = errors;
      toast.error(response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };
  const deleteItem = (row) => {
    ConfirmDeleteModule(deleteLevel, row.title, row);
  };
  const columns = useMemo(
    () => [
      {
        header: "Level",
        accessorKey: "level",
        enableColumnFilter: false,
        cell: (cell) => {
          return <span>Level {cell.getValue()}</span>;
        },
      },
      {
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "Threshold",
        accessorKey: "threshold",
        enableColumnFilter: false,
      },
      {
        header: "Limit Minutes",
        accessorKey: "limit_minutes",
        enableColumnFilter: false,
      },
      {
        header: "Limit Regio",
        accessorKey: "limit_regio",
        enableColumnFilter: false,
      },
      {
        header: "Action",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div>
              <ul className="mb-0 list-unstyled d-flex action-btn align-items-center">
                <li className="me-3">
                  <button
                    type="button"
                    disabled={actionLoading ? "disabled" : ""}
                    onClick={() => setEditRow(cell.cell.row.original)}
                    className="bg-transparent border-0 p-0"
                  >
                    <i className="ri-edit-2-line text-muted"></i>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    disabled={actionLoading ? "disabled" : ""}
                    className="bg-transparent border-0 p-0"
                    onClick={() => deleteItem(cell.cell.row.original)}
                  >
                    <i className="ri-delete-bin-line text-muted"></i>
                  </button>
                </li>
              </ul>
            </div>
          );
        },
      },
    ],
    []
  );
  const formik = useFormik({
    initialValues: {
      title: "",
      threshold: "",
      limit_minutes: "",
      limit_regio: "",
    },
    validationSchema: levelsSchema,
    onSubmit: async (data) => {
      setActionLoading(true);
      try {
        !editRow ? await postLevel(data) : await editLevels(data, editRow.id);
        toast.success(
          `Level has been ${editRow ? "Updated" : "added"} successfully`
        );
        fetchData();
        setShow(false);
      } catch (errors) {
        const { response } = errors;
        toast.error(response?.data?.message || "Something went wrong");
      } finally {
        setActionLoading(false);
      }
    },
  });
  useEffect(() => {
    if (show == false) {
      formik.resetForm();
    }
  }, [show]);
  useEffect(() => {
    if (editRow) {
      levelsSchema._nodes.map((item) => {
        formik.setFieldValue(item, editRow[item]);
      });
      setShow(true);
    }
  }, [editRow]);
  return (
    <>
      <div>
        <div className="profile-header d-flex align-items-center justify-content-between px-3 py-2 border-bottom">
          <h5 className="mb-0">Levels</h5>
          <Button
            type="button"
            color="success"
            onClick={() => setShow(true)}
            className="py-2 addon-btn"
          >
            <i className="ri-add-line"></i>&nbsp;Add Level
          </Button>
        </div>
        <div className="profile-body p-3">
          <TableContainer
            columns={columns || []}
            data={levels || []}
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
          Add Level
        </ModalHeader>
        <ModalBody className="px-0 py-3">
          <form onSubmit={formik.handleSubmit} action="#">
            <div className="px-3">
              <div className="mb-3">
                <Label className="form-label">Title</Label>
                <FormInput
                  name="title"
                  placeholder="Enter Title"
                  formik={formik}
                />
              </div>
              <div className="mb-3">
                <Label className="form-label">Threshold</Label>
                <FormInput
                  name="threshold"
                  placeholder="Enter Threshold"
                  formik={formik}
                />
              </div>
              <div className="mb-3">
                <Label className="form-label">Limit Minutes</Label>
                <FormInput
                  type="number"
                  name="limit_minutes"
                  placeholder="Enter Limit Minutes"
                  formik={formik}
                />
              </div>
              <div>
                <Label className="form-label">Limit Regio</Label>
                <FormInput
                  type="number"
                  name="limit_regio"
                  placeholder="Enter Limit Regio"
                  formik={formik}
                />
              </div>
            </div>
            <div className="modal-footer-wrap text-end border-top px-3 mt-4 pt-3">
              <Button
                type="button"
                onClick={() => setShow(false)}
                className="me-3"
                color="light"
                disabled={actionLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={actionLoading} color="success">
                {editRow ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Levels;
