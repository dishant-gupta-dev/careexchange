import React, { useEffect, useState } from "react";
import Search from "../../../assets/user/images/search1.svg";
import { api } from "../../../utlis/staff/api.utlis";
import { routes } from "../../../utlis/staff/routes.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { Link, useNavigate } from "react-router-dom";
import Clock from "../../../assets/user/images/clock.svg";
import Dollar from "../../../assets/user/images/dollar.svg";
import SuitCase from "../../../assets/user/images/jobs-suitcase.svg";
import moment from "moment";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { encode } from "base-64";

const AppliedJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [appliedJob, setAppliedJob] = useState([]);
  const [startDate, setStartDate] = useState("");

  const getAppliedJob = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all applied job => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setAppliedJob(response.data.data.appliedjobList);
    } else setAppliedJob([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    if (date != null && date != undefined && date != "")
      date = moment(date).format("DD/MM/yyyy");
    else date = "";
    getAppliedJob(api.appliedJob + `?search=${name}&date=${date}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAppliedJob(api.appliedJob);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div class="carenetwork-section">
          <div class="page-header">
            <h2 class="page-title">
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
              &nbsp;Applied Jobs
            </h2>
            <div class="search-filter wd50">
              <div class="row g-2">
                <div class="col-md-5">
                  <div class="form-group">
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

                <div class="col-md-7">
                  <div class="form-group">
                    <div class="search-form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => handleFilter(e)}
                        name="name"
                      />
                      <span class="search-icon">
                        <img src={Search} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carenetwork-content">
            <div class="row">
              {appliedJob.length !== 0 ? (
                appliedJob.map((ele, indx) => {
                  return (
                    <div key={indx} class="col-md-6">
                      <div class="care-card">
                        <div class="care-card-head">
                          <div class="care-id">
                            Job ID: <span>{ele.job_id ?? "NA"}</span>
                          </div>

                          <div class="care-date">
                            Posted On:{" "}
                            <span>
                              {moment(ele.created_date).format("MM-DD-yyyy")}
                            </span>
                          </div>
                        </div>
                        <div class="care-card-body">
                          <div class="care-content">
                            <div class="title-text">{ele.title ?? "NA"}</div>
                            <div class="tags-list">
                              <div class="tags-item">
                                {ele.categoryname ?? "NA"}
                              </div>
                            </div>

                            <div class="jobs-point">
                              <div class="jobs-point-item">
                                <img src={Clock} /> Work Timing:
                                <span>{ele.working_time_value ?? "NA"}</span>
                              </div>
                              <div class="jobs-point-item">
                                <img src={Dollar} /> Salary:
                                <span>{ele.pay_range ?? "$0"}/Annually</span>
                              </div>
                              <div class="jobs-point-item">
                                <img src={SuitCase} /> Work Exp:
                                <span>
                                  {ele.working_expirence ?? "NA"} Experience{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="care-card-foot">
                          <div class="care-action">
                            <Link class="btn-gra" to="">
                              Applied
                            </Link>
                            <Link
                              className="btn-bl"
                              to={`${routes.careNetworkDetails}/${encode(
                                ele.id
                              )}`}
                            >
                              View Job Detail
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "5% 0",
                  }}
                >
                  <img width={300} src={NoData} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppliedJob;
