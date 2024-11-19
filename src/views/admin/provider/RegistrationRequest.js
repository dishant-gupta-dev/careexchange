import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../../utlis/admin/api.utlis";
import { routes } from "../../../utlis/admin/routes.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { encode } from "base-64";

const RegistrationRequest = () => {
  const navigate = useNavigate();
  const [registration, setRegistration] = useState([]);
  const [categories, setCategory] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const getRegistrationList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all registration list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setRegistration(response.data.data.providers);
      setTotal(response.data.totalPages);
    } else setRegistration([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    let category = "";
    if (e.target.name === "name") name = e.target.value;
    if (e.target.name === "category") category = e.target.value;
    if (date != null && date != undefined && date != "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getRegistrationList(
      api.registrationList +
        `?search=${name}&categoryid=${category}&date=${date}`
    );
  };

  const getCategoryList = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("category list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setCategory(response.data.data.categories);
    } else setCategory([]);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    getRegistrationList(api.registrationList);
    getCategoryList(api.categoryList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="page-header d-flex justify-content-between">
          <h3 className="page-title">
            <Link
              className="btn-back"
              to=""
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              <i className="mdi mdi-arrow-left-thin"></i>
            </Link>
            Provider/Staff Registration Requests
          </h3>
        </div>
        <div className="cc-table-card">
          <div className="cc-search-filter wd100">
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
          <div className="table-responsive mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th> Name </th>
                  <th> Email ID </th>
                  <th> Contact Number </th>
                  <th> Category </th>
                  <th> Account Created on </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                {registration.length !== 0 ? (
                  registration.map((ele, indx) => {
                    return (
                      <tr key={indx}>
                        <td className="care-for-profile-img text-capitalize">
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
                        <td className="text-lowercase">
                          {" "}
                          {ele.email ?? "NA"}{" "}
                        </td>
                        <td className="text-lowercase">
                          {" "}
                          {ele.mobile ?? "NA"}{" "}
                        </td>
                        <td> {ele.category ?? "NA"} </td>
                        <td>
                          {" "}
                          {moment(ele.created_date).format("MM-DD-yyyy")}{" "}
                        </td>
                        <td>
                          <Link
                            to={`${routes.providerDetails}/${encode(ele.id)}`}
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
                        <p>No registration request list found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationRequest;
