import { useMemo } from "react";
import ClockIcon from "../../assets/images/clock.png";
import CurrencyIcon from "../../assets/images/currency.png";
import moment from "moment";
export const transactionsSendColumns = () => {
  return [
    {
      header: "Title",
      accessorKey: "payment_title_title",
      enableColumnFilter: false,
      cell: (cell) => {
        return <span>{cell.getValue()}</span>;
      },
    },
    {
      header: (
        <div>
          <img src={ClockIcon} width="30px" alt="Clock" />
        </div>
      ),
      accessorKey: "transferred_minutes",
      enableColumnFilter: false,
      cell: (cell) => {
        return <span>{cell.getValue()}</span>;
      },
    },
    {
      header: (
        <div>
          <img src={CurrencyIcon} width="30px" alt="Regio" />
        </div>
      ),
      accessorKey: "transferred_fiat",
      enableColumnFilter: false,
      cell: (cell) => {
        return <span>{cell.getValue()}</span>;
      },
    },
    {
      header: "Created At",
      accessorKey: "created_at",
      enableColumnFilter: false,
      cell: (cell) => {
        return (
          <span>
            {moment(cell.getValue()).format("DD.MM.YYYY")}
            <br />
            {moment(cell.getValue()).format("hh:mm a")}
          </span>
        );
      },
    },
    {
      header: "Status",
      enableColumnFilter: false,
      accessorKey: "status",
      cell: (cell) => {
        return <div>{cell.getValue().title}</div>;
      },
    },
  ];
};
