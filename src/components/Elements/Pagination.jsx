import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row } from "reactstrap";

const Pagination = ({ total, currentPage, setCurrentPage, perPageData }) => {
  const handleClick = (e) => {
    setCurrentPage(e);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / perPageData); i++) {
    pageNumbers.push(i);
  }
  const handleprevPage = () => {
    let prevPage = currentPage - 1;
    setCurrentPage(prevPage);
  };
  const handlenextPage = () => {
    let nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    if (pageNumbers.length && pageNumbers.length < currentPage) {
      setCurrentPage(pageNumbers.length);
    }
  }, [pageNumbers.length, currentPage, setCurrentPage]);
  return (
    <React.Fragment>
      <Row className="g-0 justify-content-end mb-4">
        <div className="col-sm-auto">
          <ul className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
            {currentPage <= 1 ? (
              <Link
                className="page-item pagination-prev disabled"
                to="javascript:void(0)"
              >
                Previous
              </Link>
            ) : (
              <li
                className={
                  currentPage <= 1 ? "page-item disabled" : "page-item"
                }
              >
                <Link
                  to="javascript:void(0)"
                  className="page-link"
                  onClick={handleprevPage}
                >
                  Previous
                </Link>
              </li>
            )}
            {pageNumbers.map((item, key) => (
              <React.Fragment key={key}>
                <li className="page-item">
                  <Link
                    to="javascript:void(0)"
                    className={
                      currentPage === item ? "page-link active" : "page-link"
                    }
                    onClick={() => handleClick(item)}
                  >
                    {item}
                  </Link>
                </li>
              </React.Fragment>
            ))}

            <li
              className={
                currentPage >= pageNumbers.length
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              {currentPage >= pageNumbers.length ? (
                <Link to="javascript:void(0)" className="page-link disabled">
                  Next
                </Link>
              ) : (
                <Link
                  to="javascript:void(0)"
                  className="page-link"
                  onClick={handlenextPage}
                >
                  Next
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default Pagination;
