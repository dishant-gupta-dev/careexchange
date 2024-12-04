import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchImg from "../../../assets/user/images/search1.svg";
import { api } from "../../../utlis/user/api.utlis";
import { routes } from "../../../utlis/user/routes.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import CallImg from "../../../assets/user/images/call.svg";
import SmsImg from "../../../assets/user/images/sms.svg";
import moment from "moment";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { encode } from "base-64";

const JobRequest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState([]);
  const [myJob, setMyJob] = useState([]);
  const [startDate, setStartDate] = useState("");

  const getJobRequest = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all job request => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setJob(response.data.data.jobRequestList);
    } else setJob([]);
    setLoading(false);
  };

  const getMyJob = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all posted job => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setMyJob(response.data.data.postedJob);
    } else setMyJob([]);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    let postedJobId = "";
    if (e.target.name === "name") name = e.target.value;
    if (e.target.name === "postedJobId") postedJobId = e.target.value;
    if (date != null && date != undefined && date != "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getJobRequest(api.jobRequest + `?search=${name}&date=${date}&postedJobId=${postedJobId}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobRequest(api.jobRequest);
    getMyJob(api.postedJob);
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
              <Link to={routes.jobRequest} className="btn-bl active">
                Job Requests
              </Link>
            </li>
            <li>
              <Link to={routes.appliedJob} class="btn-wh">
                {" "}
                Applied Jobs
              </Link>
            </li>
            <li>
              <Link to={routes.postedJob} class="btn-wh">
                Posted Job
              </Link>
            </li>
          </ul>
        </div>
        <div class="carenetwork-section">
          <div class="care-title-header">
            <h2 class="heading-title">Job Requests</h2>
            <Link class="bottom-buttons" to={routes.addPost} title="Add Post">
              <i className="fa fa-plus"></i>
            </Link>
            <div class="search-filter wd70">
              <div class="row g-2">
                <div class="col-md-3">
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

                <div class="col-md-3">
                  <div class="form-group">
                    <div class="search-form-group">
                      <select name="postedJobId" className="form-control" onChange={(e) => handleFilter(e)} id="">
                        <option value="">Select Job</option>
                        {
                          myJob.length !== 0 ? (
                            myJob.map((ele, indx) => {
                              return (
                                <option key={indx} value={ele.id}>{ele.title}</option>
                              )
                            })
                          ) : null
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
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
                        <img src={SearchImg} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carenetwork-content">
            <div class="row">
              {job.length !== 0 ? (
                job.map((ele, indx) => {
                  return (
                    <div key={indx} class="col-md-4">
                      <div class="care-card">
                        <div class="care-card-head">
                          <div class="care-id">
                            Job ID: <span>{ele.job_id ?? "NA"}</span>
                          </div>

                          <div class="care-date">
                            Applied On:{" "}
                            <span>
                              {moment(ele.apply_date).format(
                                "MM-DD-yyyy"
                              )}
                            </span>
                          </div>
                        </div>
                        <div class="care-card-body">
                          <div class="care-content">
                            <div class="title-text">{ele.title ?? "NA"}</div>

                            <div class="jobs-point">
                              <div class="jobs-point-item">
                                {ele.full_name ?? "NA"}
                              </div>
                              <div class="jobs-point-item">
                                <img src={CallImg} />{" "}
                                <span>{ele.mobile ?? "NA"}</span>
                              </div>
                              <div class="jobs-point-item">
                                <img src={SmsImg} />{" "}
                                <span>{ele.email ?? "NA"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="care-card-foot">
                          <div class="care-action">
                            {ele.resume !== null &&
                            ele.resume !== undefined &&
                            ele.resume !== "" ? (
                              <Link
                                class="btn-bl"
                                target="_blank"
                                to={ele.resume}
                              >
                                Download CV
                              </Link>
                            ) : null}
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

export default JobRequest;
