import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../../utlis/api.utlis";
import { routes } from "../../../utlis/routes.utlis";
import ApiService from "../../../core/services/ApiService";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import Loader from "../../../layouts/loader/Loader";
import NoImage from "../../../assets/images/no-image.jpg";
import { encode } from "base-64";
import { totalPageCalculator, LIMIT } from "../../../utlis/common.utlis";

const Page = () => {
  const [providers, setProvider] = useState([]);
  const [categories, setCategory] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getProviderList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all provider list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setProvider(response.data.data.providers);
      setTotal(response.data.data.total);
    } else setProvider([]);
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
    getProviderList(
      api.providerList +
        `?page=${pageNum}&limit=${LIMIT}&search=${name}&status=${status}&categoryid=${category}&date=${date}`
    );
  };

  useEffect(() => {
    getProviderList(api.providerList + `?page=${pageNum}&limit=${LIMIT}`);
    getCategoryList(api.categoryList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Provider/Staff Directory</h3>
          <div className="d-flex">
            <button
              style={{ marginLeft: "20px" }}
              type="button"
              className="btn btn-gradient-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate(routes.providerRegistration);
              }}
            >
              Registration Request
            </button>
          </div>
        </div>
        <div className="">
          <div className="row mt-3">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-3">
                      <div className="">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => handleFilter(e)}
                            name="name"
                          />
                          <div className="input-group-prepend">
                            <i className="input-group-text border-0 mdi mdi-magnify"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 dropdown-select">
                      <select
                        className="form-select"
                        name="status"
                        onChange={(e) => handleFilter(e)}
                      >
                        <option value="">Select Status</option>
                        <option value="0">Pending Provider</option>
                        <option value="1">Active Provider</option>
                        <option value="2">Inactive Provider</option>
                      </select>
                    </div>
                    <div className="col-lg-3 dropdown-select">
                      <select
                        className="form-select"
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
                    <div className="col-lg-3">
                      <DatePicker
                        toggleCalendarOnIconClick
                        showIcon
                        dateFormat={"MM-dd-yyyy"}
                        selected={startDate}
                        onChange={(date, e) => {
                          setStartDate(date);
                          handleFilter(e, date);
                        }}
                        className="form-control"
                        style={{ padding: "15px 40px" }}
                        isClearable
                        autoComplete="off"
                        name="date"
                        placeholderText="Select Date"
                      />
                    </div>
                  </div>
                  <div className="table-responsive mt-4">
                    <table className="table">
                      <thead>
                        <tr>
                          <th> Name </th>
                          <th> Contact Number </th>
                          <th> Email ID </th>
                          <th> Category </th>
                          <th> Account Created on </th>
                          <th> Status </th>
                          <th> View Profile </th>
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
                                    <img
                                      src={NoImage}
                                      alt=""
                                      className="me-3"
                                    />
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
                                  {ele.email ?? "NA"}
                                </td>
                                <td> {ele.category ?? "NA"} </td>
                                <td>
                                  {moment(ele.created_date).format(
                                    "MM-DD-yyyy"
                                  )}
                                </td>
                                <td> {ele.status} </td>
                                <td>
                                  <Link
                                    to={`${routes.providerDetails}/${encode(
                                      ele.id
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
        </div>
      </div>
    </>
  );
};

export default Page;
