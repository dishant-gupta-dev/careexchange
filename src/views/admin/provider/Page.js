import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../../utlis/admin/api.utlis";
import { routes } from "../../../utlis/admin/routes.utlis";
import ApiService from "../../../core/services/ApiService";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import Loader from "../../../layouts/loader/Loader";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { encode } from "base-64";
import { totalPageCalculator, LIMIT } from "../../../utlis/common.utlis";

const Page = () => {
  const [providers, setProvider] = useState([]);
  const [categories, setCategory] = useState([]);
  const [states, setState] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPending, setTotalPending] = useState(0);

  const navigate = useNavigate();

  const getProviderList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all provider list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setProvider(response.data.data.providers);
      setTotal(response.data.data.total);
      setTotalPending(response.data.data.totalPendingRequest);
    } else setProvider([]);
    setLoading(false);
  };

  const getStateList = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("category list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setState(response.data.data.states);
    } else setState([]);
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
    let type = "";
    let state_id = "";
    if (e.target.name === "name") name = e.target.value;
    if (e.target.name === "status") status = e.target.value;
    if (e.target.name === "category") category = e.target.value;
    if (e.target.name === "type") type = e.target.value;
    if (e.target.name === "state_id") state_id = e.target.value;
    if (date != null && date != undefined && date != "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getProviderList(
      api.providerList +
        `?page=${pageNum}&limit=${LIMIT}&search=${name}&status=${status}&categoryid=${category}&date=${date}&user_type=${type}&state_id=${state_id}`
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProviderList(api.providerList + `?page=${pageNum}&limit=${LIMIT}`);
    getCategoryList(api.categoryList);
    getStateList(api.stateList + `?country_id=231`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="care-title-header">
          <h2 className="heading-title">Provider/Staff Directory</h2>
          <div className="cc-search-filter">
            <button
              style={{ marginLeft: "20px" }}
              type="button"
              className="btn-gr"
              onClick={(e) => {
                e.preventDefault();
                navigate(routes.providerRegistration);
              }}
            >
              <i className="fa fa-eye"></i> &nbsp; Pending Approval Request
              &nbsp; <span class="badge badge-light">{totalPending}</span>
            </button>
          </div>
        </div>
        <div className="care-title-header">
          <div className="cc-search-filter wd100">
            <div className="row g-2">
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
                    autoComplete="off"
                    name="date"
                    placeholderText="Select Date"
                  />
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
                    name="status"
                    onChange={(e) => handleFilter(e)}
                  >
                    <option value="">Select Status</option>
                    <option value="0">Pending </option>
                    <option value="1">Active </option>
                    <option value="2">Inactive </option>
                  </select>
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group">
                  <select
                    className="form-control"
                    name="type"
                    onChange={(e) => handleFilter(e)}
                  >
                    <option value="">Select Type</option>
                    <option value="3">Care Staff</option>
                    <option value="2">Provider</option>
                  </select>
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group text-capitalize">
                  <select
                    className="form-control text-capitalize"
                    name="state_id"
                    onChange={(e) => handleFilter(e)}
                  >
                    <option value="">Select State</option>
                    {states.length !== 0
                      ? states.map((ele, indx) => {
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
        <div className="carenetwork-content cc-table-card">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th> Name </th>
                  <th> Business Name </th>
                  <th> Type </th>
                  <th> Contact no. </th>
                  <th> Email ID </th>
                  <th> Category </th>
                  <th> Registered on </th>
                  <th> Status </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                {providers.length !== 0 ? (
                  providers.map((ele, indx) => {
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
                          {ele?.name ?? "NA"}
                        </td>
                        <td className="text-capitalize">
                          {ele.logo === null ||
                          ele.logo === "" ||
                          ele.logo === undefined ? (
                            <img src={NoImage} alt="" className="me-3" />
                          ) : (
                            <img src={ele.logo} alt="" className="me-3" />
                          )}
                          {ele.business_name ?? "NA"}
                        </td>
                        <td> {ele.user_type == 3 ? "Staff" : "Provider"} </td>
                        <td> {ele.mobile ?? "NA"} </td>
                        <td className="text-lowercase">{ele.email ?? "NA"}</td>
                        <td> {ele.category ?? "NA"} </td>
                        <td>{moment(ele.created_date).format("MM-DD-yyyy")}</td>
                        <td> {ele.status} </td>
                        <td>
                          <Link
                            to=""
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(routes.providerDetails, {
                                state: {
                                  id: encode(ele.id),
                                },
                              });
                            }}
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
                    <td colSpan="8">
                      <div>
                        <p>No providers found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="d-flex align-items-center justify-content-center mt-3">
              {providers.length !== 0 ? (
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
