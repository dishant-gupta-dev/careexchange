import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../../utlis/admin/api.utlis";
import { routes } from "../../../utlis/admin/routes.utlis";
import ApiService from "../../../core/services/ApiService";
import { Link } from "react-router-dom";
import { encode } from "base-64";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import Loader from "../../../layouts/loader/Loader";
import { status } from "../../../utlis/common.utlis";
import { totalPageCalculator, LIMIT } from "../../../utlis/common.utlis";

const Page = () => {
  const [jobs, setJob] = useState([]);
  const [categories, setCategory] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const getJobList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("posted job list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setJob(response.data.data.postedJob);
      setTotal(response.data.data.total);
    } else setJob([]);
    setLoading(false);
  };

  const getCategoryList = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("category list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setCategory(response.data.data.categories);
    } else setCategory([]);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    let status = "";
    let category = "";
    if (e.target.name === "name") name = e.target.value;
    if (e.target.name === "status") status = e.target.value;
    if (e.target.name === "category") category = e.target.value;
    if (date != null && date != undefined && date != "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getJobList(
      api.postedJobList +
        `?page=${pageNum}&limit=${LIMIT}&search=${name}&categoryid=${category}&date=${date}`
    );
  };

  useEffect(() => {
    getJobList(api.postedJobList + `?page=${pageNum}&limit=${LIMIT}`);
    getCategoryList(api.categoryList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="care-title-header">
          <h2 className="heading-title">Posted Job Opportunities</h2>
          <div className="cc-search-filter">
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
                    style={{ padding: "15px 40px" }}
                    isClearable
                    autoComplete="off"
                    name="date"
                    placeholderText="Select Date"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group dropdown-select">
                  <select
                    className="form-control"
                    name="category"
                    onChange={(e) => handleFilter(e)}
                  >
                    <option value="">Select Category</option>
                    {categories.length !== 0
                      ? categories.map((ele, indx) => {
                          return (
                            <option key={indx} value={ele.id}>
                              {ele.name ?? "NA"}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group search-form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => handleFilter(e)}
                    name="name"
                  />
                  <span className="search-icon">
                    <i className="cc-input-group-text  mdi mdi-magnify"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cc-table-card">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th> Title </th>
                  <th> Job ID</th>
                  <th> Job Details</th>
                  <th> Work Experience </th>
                  <th> Salary </th>
                  <th> Work Timing </th>
                  <th> Status</th>
                  <th> View Job </th>
                  <th> Address</th>
                  <th> Posted Date</th>
                  <th> Posted Time</th>
                  <th> View Profile</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length !== 0 ? (
                  jobs.map((ele, indx) => {
                    return (
                      <tr key={indx}>
                        <td>{ele.title ?? "NA"}</td>
                        <td> {ele.job_id ?? "NA"} </td>
                        <td>{ele.description ?? "NA"}</td>
                        <td>{ele.working_expirence ?? "NA"}</td>
                        <td>{ele.pay_range ?? "$0"}/Annually</td>
                        <td>{ele.working_time_value ?? "NA"}</td>
                        <td>{status(ele.status)}</td>
                        <td>
                          <Link
                            to={`${routes.jobOpportunityDetail}/${encode(
                              ele.id
                            )}`}
                          >
                            <label
                              className="badge badge-gradient-success"
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fa fa-eye"></i>
                            </label>
                          </Link>
                        </td>
                        <td>{ele.address ?? "NA"}</td>
                        <td>{moment(ele.posted_date).format("MM-DD-yyyy")}</td>
                        <td>{moment(ele.posted_date).format("hh:mm A")}</td>
                        <td>
                          <Link
                            to={`${routes.providerDetails}/${encode(
                              ele.care_provider_id
                            )}`}
                          >
                            <label
                              className="badge badge-gradient-success"
                              style={{ cursor: "pointer" }}
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
                    <td colSpan="12">
                      <div>
                        <p>No posted jobs found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="d-flex align-items-center justify-content-center mt-3">
              {jobs.length !== 0 ? (
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
    </>
  );
};

export default Page;
