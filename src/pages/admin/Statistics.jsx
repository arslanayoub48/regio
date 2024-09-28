import { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/table/TableContainerReact";
import { Link } from "react-router-dom";
import { getStatistics } from "../../services/api/user";

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async (page, search) => {
    setLoading(true);
    try {
      const res = await getStatistics(page, search);
      setStatistics(res.data);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  const columns = useMemo(
    () => [
      {
        header: "Hex ID",
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
        header: "Days With Login (Past 30 days)",
        accessorKey: "days_with_login",
        enableColumnFilter: false,
      },
      {
        header: "New Posts (Past 30 days)",
        accessorKey: "new_posts",
        enableColumnFilter: false,
      },
      {
        header: "All Active Posts",
        accessorKey: "all_active_posts",
        enableColumnFilter: false,
      },
      {
        header: "Current Balance Time (Min)",
        accessorKey: "current_balance_time",
        enableColumnFilter: false,
      },
      {
        header: "Current Balance Regio (Regios)",
        accessorKey: "current_balance_regio",
        enableColumnFilter: false,
      },
    ],
    []
  );
  return (
    <div>
      <div className="profile-header p-3 border-bottom">
        <h5 className="mb-0">Statistics</h5>
      </div>
      <div className="profile-body p-3">
        <TableContainer
          columns={columns || []}
          data={statistics || []}
          customPageSize={5}
          tableClass="table-centered align-middle table-nowrap mb-0"
          theadClass="text-muted table-light"
          SearchPlaceholder="Search Products..."
          request={fetchData}
          loader={loading}
        />
      </div>
    </div>
  );
};
export default Statistics;
