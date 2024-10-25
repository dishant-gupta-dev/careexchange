import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../../utlis/admin/api.utlis";
import { routes } from "../../../utlis/admin/routes.utlis";
import ApiService from "../../../core/services/ApiService";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import Loader from "../../../layouts/loader/Loader";
import { encode } from "base-64";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { totalPageCalculator, LIMIT } from "../../../utlis/common.utlis";

const Page = () => {
  const [users, setUser] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const getUserList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all users list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setUser(response.data.data.users);
      setTotal(response.data.data.total);
    } else setUser([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    let status = "";
    if (e.target.name === "name") name = e.target.value;
    if (e.target.name === "status") status = e.target.value;
    if (date !== null && date != undefined && date !== "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getUserList(
      api.userList +
        `?page=${pageNum}&limit=${LIMIT}&search=${name}&status=${status}&date=${date}`
    );
  };

  useEffect(() => {
    getUserList(api.userList + `?page=${pageNum}&limit=${LIMIT}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="carenetwork-section">
          <div className="care-title-header">
            <h2 className="heading-title">User Management</h2>
            <div className="cc-search-filter wd70">
              <div className="row g-2">
                <div className="col-md-4">
                  <div className="form-group">
                    <DatePicker
                      toggleCalendarOnIconClick
                      showIcon
                      dateFormat={"MM-dd-yyyy"}
                      selected={startDate}
                      onChange={(date, e) => {
                        setStartDate(date);
                        handleFilter(e, date);
                      }}
                      className="DatePicker-control"
                      isClearable
                      name="date"
                      autoComplete="off"
                      placeholderText="Select Date"
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      onChange={(e) => handleFilter(e)}
                    >
                      <option value="">Select Status</option>
                      <option value="0">Pending Users</option>
                      <option value="1">Active Users</option>
                      <option value="2">Inactive Users</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="form-group search-form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => handleFilter(e)}
                    />
                    <span className="search-icon">
                      <i className="cc-input-group-text  mdi mdi-magnify"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carenetwork-content cc-table-card">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th> Name </th>
                    <th> Contact Number </th>
                    <th> Email ID </th>
                    <th> Registered On </th>
                    <th> Status </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length !== 0 ? (
                    users.map((ele, indx) => {
                      return (
                        <tr key={indx}>
                          <td className="text-capitalize">
                            {ele.profile_image === null ||
                            ele.profile_image === "" ||
                            ele.profile_image === undefined ? (
                              <img src={NoImage} alt="" className="me-3" />
                            ) : (
                              <img
                                src={ele.profile_image}
                                alt=""
                                className="me-3"
                              />
                            )}
                            {ele.name ?? "NA"}
                          </td>
                          <td> {ele.mobile ?? "NA"} </td>
                          <td className="text-lowercase">
                            {" "}
                            {ele.email ?? "NA"}{" "}
                          </td>
                          <td>
                            {moment(ele.created_date).format("MM-DD-yyyy")}
                          </td>
                          <td> {ele.status} </td>
                          <td>
                            <Link
                              to={`${routes.userManagementDetail}/${encode(
                                ele.userid
                              )}`}
                            >
                              <label
                                style={{ cursor: "pointer" }}
                                className="badge badge-gradient-success"
                              >
                                <i className="fa fa-eye"></i>
                              </label>
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="text-center">
                      <td colSpan="6">
                        <div>
                          <p>No users found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="d-flex align-items-center justify-content-center mt-3">
                {users.length !== 0 ? (
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
                                  className={pageNo === pageNum ? "active" : ""}
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
    </>
  );
};

export default Page;
