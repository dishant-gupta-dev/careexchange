import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../../utlis/admin/api.utlis";
import { routes } from "../../../utlis/admin/routes.utlis";
import ApiService from "../../../core/services/ApiService";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import Loader from "../../../layouts/loader/Loader";
import { status } from "../../../utlis/common.utlis";
import { encode } from "base-64";
import { totalPageCalculator, LIMIT } from "../../../utlis/common.utlis";

const Page = () => {
  const [jobs, setJob] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [categories, setCategory] = useState([]);
  const [subCategories, setSubCategory] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const getJobList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("care job list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setJob(response.data.data.jobs);
      setTotal(response.data.data.total);
    } else setJob([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    let status = "";
    let category = "";
    let subcategory = "";
    if (e.target.name === "name") name = e.target.value;
    if (e.target.name === "status") status = e.target.value;
    if (e.target.name === "category") {
      getSubCategoryList(e.target.value);
      category = e.target.value;
    }
    if (e.target.name === "subcategory") subcategory = e.target.value;
    if (date !== null && date != undefined && date !== "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getJobList(
      api.careJobList +
        `?page=${pageNum}&limit=${LIMIT}&status=${status}&search=${name}&start_date=${date}&categoryid=${category}&subcategoryid=${subcategory}`
    );
  };

  const getCategoryList = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("category list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setCategory(response.data.data.categories);
    } else setCategory([]);
  };

  const getSubCategoryList = async (id) => {
    const response = await ApiService.getAPIWithAccessToken(
      api.categoryList + `?categoryid=${id}`
    );
    // console.log("sub category list => ", response.data);
    if (response?.data?.status && response?.data?.statusCode === 200) {
      setSubCategory(response?.data?.data?.categories);
    } else setSubCategory([]);
  };

  useEffect(() => {
    getJobList(api.careJobList + `?page=${pageNum}&limit=${LIMIT}`);
    getCategoryList(api.categoryList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="heading-title">Care Jobs</h3>
        </div>

        <div className="care-title-header">
          <div className="cc-search-filter wd100">
            <div className="row g-2">
              <div className="col-md-4">
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
              <div className="col-md-2">
                <div className="form-group">
                  <select
                    className="form-control"
                    name="status"
                    onChange={(e) => handleFilter(e)}
                  >
                    <option value="">Select Status</option>
                    <option value="0">Pending</option>
                    <option value="1">Active</option>
                    <option value="3">Cancelled</option>
                    <option value="4">Completed</option>
                  </select>
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group">
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

              <div className="col-md-2">
                <div className="form-group">
                  <select
                    className="form-control"
                    name="subcategory"
                    onChange={(e) => handleFilter(e)}
                  >
                    <option value="">Select Sub Category</option>
                    {subCategories.length !== 0
                      ? subCategories.map((ele, indx) => {
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

              <div className="col-md-2">
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
            </div>
          </div>
        </div>

        <div className="cc-table-card">
          <div className="table-responsive ">
            <table className="table">
              <thead>
                <tr>
                  <th> Name </th>
                  <th> Job ID </th>
                  <th> Status </th>
                  <th> Start Date </th>
                  <th> Time</th>
                  <th> Frequency </th>
                  {/* <th> Care Provider Name </th>
                          <th> Care Provider Status </th>
                          <th> View Care Provider Profile </th> */}
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                {jobs.length !== 0 ? (
                  jobs.map((ele, indx) => {
                    return (
                      <tr key={indx}>
                        <td className="text-capitalize">
                          {ele.first_name ?? "NA"}
                        </td>
                        <td>{ele.job_id ?? "NA"}</td>
                        <td>{status(ele.status)}</td>
                        <td>{moment(ele.start_date).format("MM-DD-yyyy")}</td>
                        <td>
                          {ele.start_time}
                        </td>
                        <td>
                          {ele.frequency === "O" ? "One Time" : (ele.frequency === "W" ? "Repeat Weekly" : "Repeat Monthly")}
                        </td>
                        {/* <td>Joseph Phill Will Take Care</td>
                                <td>Confirmed Care Provider </td>
                                <td>
                                  <label className="badge badge-gradient-success">
                                    <i className="fa fa-eye"></i>
                                  </label>
                                </td> */}
                        <td>
                          <Link
                            to={`${routes.careJobDetails}/${encode(ele.id)}`}
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
                    <td colSpan="7">
                      <div>
                        <p>No care jobs found</p>
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
