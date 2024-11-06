import React, { useEffect, useState } from "react";
import Search from "../../../assets/user/images/search1.svg";
import { api } from "../../../utlis/user/api.utlis";
import { routes } from "../../../utlis/user/routes.utlis";
import Clock from "../../../assets/user/images/clock.svg";
import Dollar from "../../../assets/user/images/dollar.svg";
import SuitCase from "../../../assets/user/images/jobs-suitcase.svg";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import moment from "moment";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { encode } from "base-64";
import { Link } from "react-router-dom";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [careNetwork, setCareNetwork] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState(0);

  const getCareNetwork = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all care network => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setCareNetwork(response.data.data.postedJob);
    } else setCareNetwork([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    if (date != null && date != undefined && date != "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getCareNetwork(api.careNetworkList + `?search=${name}&date=${date}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCareNetwork(api.careNetworkList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div class="carenetwork-section">
          <div class="care-title-header">
            <h2 class="heading-title">Care Network</h2>
            <div class="search-filter wd82">
              <div class="row g-2">
                <div class="col-md-7">
                  <div class="carenetwork-tab">
                    <ul class="carenetwork-btn-action">
                      <li>
                        <a class="btn-bl" href="#">
                          Find A Job
                        </a>
                      </li>
                      <li>
                        <a href="jobs-request.html" class="btn-gr">
                          Job Requests
                        </a>
                      </li>
                      <li>
                        <a href="view-applied-jobs.html" class="btn-wh">
                          {" "}
                          Applied Jobs
                        </a>
                      </li>
                      <li>
                        <a href="#" class="btn-wh">
                          Sort By Filter
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-md-2">
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
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name"
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
              {careNetwork.length !== 0 ? (
                careNetwork.map((ele, indx) => {
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
                              {moment(ele.posted_date).format(
                                "MM-DD-yyyy hh:mm A"
                              )}
                            </span>
                          </div>
                        </div>
                        <div class="care-card-body">
                          <div class="care-content">
                            <div class="title-text">{ele.title ?? "NA"}</div>
                            <div class="tags-list">
                              <div class="tags-item">
                                {ele.category ?? "NA"}
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
                            <a
                              class="btn-gr"
                              data-bs-toggle="modal"
                              data-bs-target="#Applyjob"
                            >
                              Apply
                            </a>
                            <Link
                              class="btn-bl"
                              to={`${routes.careNetworkDetails}/${encode(
                                ele.id
                              )}`}
                            >
                              View Details
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

export default Page;
