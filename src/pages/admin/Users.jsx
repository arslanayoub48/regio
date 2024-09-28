import { Link } from "react-router-dom";
import TableContainer from "../../components/table/TableContainerReact";
import { useMemo, useState } from "react";
import { getUsers } from "../../services/api/user";
import moment from "moment";
import UsersUpdateModal from "../../components/admin/UsersUpdateModal";

const Users = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editRow, setEditRow] = useState(null);
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
        header: "First Name",
        accessorKey: "first_name",
        enableColumnFilter: false,
      },
      {
        header: "Last Name",
        accessorKey: "last_name",
        enableColumnFilter: false,
      },
      {
        header: "Full Name",
        accessorKey: "full_name",
        enableColumnFilter: false,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Phone Number",
        accessorKey: "userBasic.phone_no",
        enableColumnFilter: false,
      },
      {
        header: "Country",
        accessorKey: "country_id.name",
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
        accessorKey: "user_level_id.title",
        enableColumnFilter: false,
      },
      {
        header: "Role",
        accessorKey: "roles.0.name",
        enableColumnFilter: false,
      },
      {
        header: "Pin",
        accessorKey: "pin",
        enableColumnFilter: false,
      },
      {
        header: "Guide",
        accessorKey: "guide_id.hex_name",
        enableColumnFilter: false,
      },
      {
        header: "Fee to project",
        accessorKey: "fee_to_project_id.hex_name",
        enableColumnFilter: false,
      },
      {
        header: "Fee plan id",
        accessorKey: "fee_plan_id.title",
        enableColumnFilter: false,
      },
      {
        header: "Translation Language",
        accessorKey: "translation_language_id.name",
        enableColumnFilter: false,
      },
      {
        header: "Status",
        accessorKey: "status_id.title",
        enableColumnFilter: false,
      },
      {
        header: "Agreed Terms",
        accessorKey: "agreed_terms",
        enableColumnFilter: false,
        cell: (cell) => {
          return <span>{cell.getValue() ? "Yes" : "No"}</span>;
        },
      },
      {
        header: "OTP Verified",
        accessorKey: "is_otp_verified",
        enableColumnFilter: false,
        cell: (cell) => {
          return <span>{cell.getValue() ? "Yes" : "No"}</span>;
        },
      },
      {
        header: "Total Minutes",
        accessorKey: "userBasic.total_activity_minutes",
        enableColumnFilter: false,
      },
      {
        header: "Total Regions",
        accessorKey: "userBasic.total_activity_fiat",
        enableColumnFilter: false,
      },
      {
        header: "About",
        accessorKey: "userBasic.about",
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
                    // disabled={actionLoading ? "disabled" : ""}
                    onClick={() => setEditRow(cell.cell.row.original)}
                    className="bg-transparent border-0 p-0"
                  >
                    <i className="ri-edit-2-line text-muted"></i>
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
  return (
    <div>
      <div className="profile-header p-3 border-bottom">
        <h5 className="mb-0">Users</h5>
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
      <UsersUpdateModal
        setCancel={() => setEditRow(false)}
        show={editRow ? true : false}
        data={editRow}
        setData={setEditRow}
        request={fetchData}
      />
    </div>
  );
};

export default Users;
