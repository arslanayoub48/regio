import React, { Fragment, useEffect, useState } from "react";
import { CardBody, Col, Row, Spinner, Table } from "reactstrap";
import { Link } from "react-router-dom";

import {
  Column,
  Table as ReactTable,
  ColumnFiltersState,
  FilterFn,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { rankItem } from "@tanstack/match-sorter-utils";

// Column Filter
const Filter = ({ column, table }) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
};

// Global Filter
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input
      {...props}
      value={value}
      id="search-bar-0"
      className="form-control border-0 search"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const handlePagination = (o) => {
  console.log(o);
};

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
  request,
  loader,
  CallRequestOnPagination,
}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [countEffect, setCountEffect] = useState(0);
  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  };

  const table = useReactTable({
    columns,
    data: data?.data || [],
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    pageCount: data?.meta?.last_page,
    initialState: { pageIndex: 0 },
    manualPagination: true,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    nextPage,
    previousPage,
    setPageSize,
    getState,
    setPagination,
  } = table;

  useEffect(() => {
    setPageSize(15);
  }, [setPageSize]);
  useEffect(() => {
    if (request && !CallRequestOnPagination)
      request(table.getState().pagination.pageIndex + 1);
  }, [table.getState().pagination]);
  return (
    <Fragment>
      {isGlobalFilter && (
        <Row className="mb-3">
          <CardBody className="border border-dashed border-end-0 border-start-0">
            <form>
              <Row>
                <Col sm={5}>
                  <div className="search-box me-2 mb-2 d-inline-block col-12">
                    <DebouncedInput
                      value={globalFilter ?? ""}
                      onChange={(value) => setGlobalFilter(value)}
                      placeholder={SearchPlaceholder}
                    />
                    <i className="bx bx-search-alt search-icon"></i>
                  </div>
                </Col>
              </Row>
            </form>
          </CardBody>
        </Row>
      )}

      {data && !loader ? (
        <div className={divClass}>
          <div className="table-responsive">
            <Table hover className={tableClass}>
              <thead className={theadClass}>
                {getHeaderGroups().map((headerGroup) => (
                  <tr className={trClass} key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={thClass}
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <React.Fragment>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " ",
                              desc: " ",
                            }[header.column.getIsSorted()] ?? null}
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </React.Fragment>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {getRowModel()?.rows?.map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      ) : loader ? (
        <div className="text-center py-4">
          <Spinner color="success" />
        </div>
      ) : null}
      {!loader ? (
        <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
          <div className="col-sm">
            <div className="text-muted">
              Showing
              <span className="fw-semibold ms-1">{data?.meta?.to}</span> of{" "}
              <span className="fw-semibold">{data?.meta?.total}</span> Results
            </div>
          </div>
          <div className="col-sm-auto">
            <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
              <li
                className={
                  !getCanPreviousPage() ? "page-item disabled" : "page-item"
                }
              >
                <Link
                  to="#"
                  className="page-link"
                  onClick={() => {
                    previousPage();
                    if (CallRequestOnPagination) {
                      CallRequestOnPagination(
                        getState().pagination.pageIndex - 1
                      );
                    }
                  }}
                >
                  Previous
                </Link>
              </li>
              {getPageOptions().map((item, key) => (
                <React.Fragment key={key}>
                  <li className="page-item">
                    <Link
                      to="#"
                      className={
                        getState().pagination.pageIndex === item
                          ? "page-link active"
                          : "page-link"
                      }
                      onClick={() => {
                        setPageIndex(item);
                        if (CallRequestOnPagination) {
                          CallRequestOnPagination(item);
                        }
                      }}
                    >
                      {item + 1}
                    </Link>
                  </li>
                </React.Fragment>
              ))}
              <li
                className={
                  !getCanNextPage() ? "page-item disabled" : "page-item"
                }
              >
                <Link
                  to="#"
                  className="page-link"
                  onClick={() => {
                    nextPage();
                    if (CallRequestOnPagination) {
                      CallRequestOnPagination(
                        getState().pagination.pageIndex + 1
                      );
                    }
                  }}
                >
                  Next
                </Link>
              </li>
            </ul>
          </div>
        </Row>
      ) : null}
    </Fragment>
  );
};

export default TableContainer;
