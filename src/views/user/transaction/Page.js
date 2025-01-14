import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchImg from "../../../assets/provider/images/search1.svg";
import { api } from "../../../utlis/user/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { LIMIT, totalPageCalculator } from "../../../utlis/common.utlis";

const Page = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const getTransactionList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all transaction => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setTransaction(response.data.data.data);
      setTotal(response.data.data.total);
    } else setTransaction([]);
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getTransactionList(api.transactionList + `?page=${pageNum}&limit=${LIMIT}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="carenetwork-section">
          <div className="care-title-header">
            <h2 className="heading-title">Transaction History</h2>
            <div className="search-filter">
              <div className="row g-2">
                <div className="col-md-6 ">
                  <div className="form-group mb-0">
                    <DatePicker
                      toggleCalendarOnIconClick
                      showIcon
                      dateFormat={"MM-dd-yyyy"}
                      className="form-control"
                      style={{ padding: "15px 40px" }}
                      isClearable
                      autoComplete="off"
                      name="date"
                      placeholderText="To Date"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-0 search-form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="name"
                    />
                    <span class="search-icon">
                      <img src={SearchImg} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carenetwork-content">
            <div className="transaction-card care-card">
              <div className="transactiontable table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Transaction ID</th>
                      <th>Payment Status</th>
                      <th>Payment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.length !== 0 ? (
                      transaction.map((ele, indx) => {
                        return (
                          <tr key={indx}>
                            <td>
                              <div className="sno">
                                {pageNum === 1
                                  ? indx + 1
                                  : indx + 1 + LIMIT * (pageNum - 1)}
                              </div>
                            </td>
                            <td> {ele.fullname ?? "NA"}</td>
                            <td>
                              <div className="jobs-point-item">
                                <span>${ele.amount ?? "0"}</span>
                              </div>
                            </td>
                            <td>{ele.transaction_id ?? "NA"}</td>
                            <td>{ele.payment_status ?? "NA"}</td>
                            <td>{ele.payment_date ?? "NA"}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="text-center">
                        <td colSpan="6">
                          <div>
                            <p>No transaction history found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="d-flex align-items-center justify-content-center mt-3">
                  {transaction.length !== 0 ? (
                    <div className="care-table-pagination">
                      <ul className="care-pagination">
                        {pageNum !== 1 && (
                          <li
                            className="disabled"
                            id="example_previous"
                            onClick={() => setPageNum(pageNum - 1)}
                          >
                            <Link
                              to=""
                              aria-controls="example"
                              data-dt-idx="0"
                              tabIndex="0"
                              className="page-link"
                            >
                              Previous
                            </Link>
                          </li>
                        )}

                        {totalPageCalculator(total, LIMIT).length === 1
                          ? null
                          : totalPageCalculator(total, LIMIT).map(
                              (pageNo, indx) => {
                                return (
                                  <li
                                    className={
                                      pageNo === pageNum ? "active" : ""
                                    }
                                    key={indx}
                                    onClick={() => setPageNum(pageNo)}
                                  >
                                    <Link to="" className="page-link">
                                      {pageNo}
                                    </Link>
                                  </li>
                                );
                              }
                            )}

                        {pageNum !== Math.ceil(total / LIMIT) && (
                          <li
                            className="next"
                            id="example_next"
                            onClick={() => setPageNum(pageNum + 1)}
                          >
                            <Link
                              to=""
                              aria-controls="example"
                              data-dt-idx="7"
                              tabIndex="0"
                              className="page-link"
                            >
                              Next
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
