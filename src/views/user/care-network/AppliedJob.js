import React, { useEffect, useState } from "react";
import Search from "../../../assets/user/images/search1.svg";
import { api } from "../../../utlis/user/api.utlis";
import { routes } from "../../../utlis/user/routes.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { Link, useNavigate } from "react-router-dom";
import Clock from "../../../assets/user/images/clock.svg";
import Dollar from "../../../assets/user/images/dollar.svg";
import SuitCase from "../../../assets/user/images/jobs-suitcase.svg";
import Map from "../../../assets/user/images/Google_Map.svg";
import moment from "moment";
import { encode } from "base-64";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";

const AppliedJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [appliedJob, setAppliedJob] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [jobRequestCount, setJobRequestCount] = useState(0);

  const getAppliedJob = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all applied job => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setAppliedJob(response.data.data.appliedjobList);
    } else setAppliedJob([]);
    setLoading(false);
  };

  const getJobRequestCount = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("job request count => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setJobRequestCount(response.data.data.jobRequestCount);
    } else setJobRequestCount(0);
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
    getJobRequestCount(api.jobRequestCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div className="messages-tab">
          <ul className="nav nav-tabs">
            <li>
              <Link class="btn-wh" to={routes.careNetwork}>
                Find A Job
              </Link>
            </li>
            <li>
              <Link className="btn-wh" to={routes.addPost}>
                Post A Job
              </Link>
            </li>
            <li>
              <Link to={routes.appliedJob} class="btn-wh active">
                {" "}
                Applied Jobs
              </Link>
            </li>
            <li>
              <Link to={routes.postedJob} class="btn-wh">
                Posted Job
              </Link>
            </li>
            <li className="position-relative">
              <Link to={routes.jobRequest} className="btn-bl">
                Job Requests
              </Link>
              {jobRequestCount != 0 &&
              jobRequestCount != undefined &&
              jobRequestCount != null ? (
                <span class="bg-danger dots"></span>
              ) : null}
            </li>
          </ul>
        </div>
        <div class="carenetwork-section">
          <div class="care-title-header">
            <h2 class="heading-title">Applied Jobs</h2>
            <Link class="bottom-buttons" to={routes.addPost} title="Add Post">
              <i className="fa fa-plus"></i>
            </Link>
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
                        <div className="care-card-body">
                          <div className="care-content">
                            <div className="title-text">
                              {ele.title ?? "NA"}
                            </div>
                            <div className="tags-list">
                              <div className="tags-item">
                                {ele.categoryname ?? "NA"}
                              </div>
                              <div className="tags-item-sub">
                                {ele.subcategoryname ?? "NA"}
                              </div>
                            </div>

                            <div className="jobs-point">
                              <div className="jobs-point-item">
                                <img src={Clock} /> Work Timing:
                                <span>{ele.working_time_value ?? "NA"}</span>
                              </div>
                              <div className="jobs-point-item">
                                <img src={Dollar} /> Salary:
                                <span className="text-capitalize">
                                  {ele.currency ?? "$"}
                                  {ele.pay_range ?? "$0"}/
                                  {ele.pay_range_type ?? ""}
                                </span>
                              </div>
                              <div className="jobs-point-item">
                                <img src={SuitCase} /> Work Experience:
                                <span>
                                  {ele.working_expirence ?? "NA"} Years
                                  Experience{" "}
                                </span>
                              </div>
                              <div className="jobs-point-item">
                                <img className="mx-1" src={Map} /> Location:
                                <span className="job-location">
                                  {ele.address ?? "NA"}
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
                              class="btn-gr"
                              to=""
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(routes.careNetworkDetails, {
                                  state: {
                                    id: encode(ele.id),
                                  },
                                });
                              }}
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
