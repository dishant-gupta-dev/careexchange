import React, { useEffect, useState } from "react";
import Searchicon from "../../../assets/provider/images/search1.svg";
import careuserprofile from "../../../assets/provider/images/user.png";
import WhCalen from "../../../assets/provider/images/whcalendar.svg";
import RepeatImg from "../../../assets/provider/images/Repeat.svg";
import locationImage from "../../../assets/admin/images/Google_Map.svg";
import Verify from "../../../assets/provider/images/verify.svg";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../utlis/provider/routes.utlis";
import { api } from "../../../utlis/provider/api.utlis";
import ApiService from "../../../core/services/ApiService";
import moment from "moment";
import Loader from "../../../layouts/loader/Loader";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { encode } from "base-64";
import { subscribtionAuth } from "../../../utlis/common.utlis";

const LockedJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(2);
  const [list, setList] = useState([]);

  const getJobList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all locked jobs list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setList(response.data.data.requestedJobs);
    } else setList([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    getJobList(api.lockedJobs + `?search=${name}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    subscribtionAuth(api.subscriptionAuth, navigate);
    getJobList(api.lockedJobs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="messages-section">
          <div className="row">
            <div className="col-md-12">
              <div className="messages-tabs-content-info tab-content">
                <div className="tab-pane active" id="Active">
                  <div className="care-title-header">
                    <h2 className="heading-title">
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
                      &nbsp;Locked Job Requests
                    </h2>
                    <div className="search-filter wd30">
                      <div className="form-group">
                        <div className="search-form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Search"
                            onChange={(e) => handleFilter(e)}
                          />
                          <span className="search-icon">
                            <img src={Searchicon} alt="" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ProviderProfile-section">
                    <div className="row">
                      {list.length !== 0 ? (
                        list.map((ele, indx) => {
                          return (
                            <div key={indx} className="col-md-12">
                              <div className="care-card">
                                <div className="care-card-head">
                                  <div className="care-id">
                                    Job ID: <span>{ele.job_id ?? "NA"}</span>
                                  </div>

                                  <div className="care-status">
                                    <Link
                                      className="btn-bl"
                                      to=""
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate(routes.jobDetails, {
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
                                <div className="care-card-body">
                                  <div className="care-content">
                                    <div className="title-text">
                                      {ele.first_name ?? "NA"}
                                    </div>
                                    <div className="date-text">
                                      <img src={WhCalen} />{" "}
                                      {moment(ele.start_date).format(
                                        "MM-DD-yyyy"
                                      )}{" "}
                                      {ele.start_time ?? "NA"}
                                    </div>
                                    <div class="tags-list float-end">
                                      <div class="tags-item-sub">
                                        {ele?.gender == "M" ? "Male" : "Female"}
                                      </div>
                                      <div class="tags-item-sub mx-2">
                                        Age: {ele?.age ?? "NA"}
                                      </div>
                                    </div>
                                    <div className="mb-2">
                                      <div className="row">
                                        <div className="col-md-4">
                                          <div class="jobs-details-point-item">
                                            <h4>Prefered Contact: </h4>
                                            <p className="text-capitalize">
                                              {ele.prefer_contacted ?? "NA"}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div class="jobs-details-point-item">
                                            <h4>Best Time To Call: </h4>
                                            <p className="text-capitalize">
                                              {ele.best_time_to_call ?? "NA"}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div class="jobs-details-point-item">
                                            <h4>Relationship: </h4>
                                            <p>{ele.relationship ?? "NA"}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="care-day-Weekly-info1">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <div className="care-point-box">
                                          <div className="care-point-icon">
                                            <img src={RepeatImg} />
                                          </div>
                                          <div className="care-point-text">
                                            <h4>Frequency:</h4>
                                            <p className="text-capitalize">
                                              {ele.frequency === "O"
                                                ? "One Time"
                                                : ele.frequency === "W"
                                                ? "Repeat Weekly"
                                                : "Repeat Monthly"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="care-point-box">
                                          <div className="care-point-text">
                                            <h4>Payment Type:</h4>
                                            <p className="text-capitalize">
                                              {ele.payment_type ?? "NA"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="care-point-box">
                                          <div className="care-point-icon">
                                            <img src={locationImage} />
                                          </div>
                                          <div className="care-point-text">
                                            <h4>Location:</h4>
                                            <p>{ele.address ?? "NA"}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="care-day-list">
                                      {/* <div className="care-day-item">S</div>
                                        <div className="care-day-item">T</div>
                                        <div className="care-day-item">W</div> */}
                                    </div>
                                  </div>
                                </div>

                                {/* {ele?.providers?.length !== 0
                                  ? ele?.providers?.map((element, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="care-card-foot"
                                        >
                                          <div className="care-user-info">
                                            <div className="care-user-image">
                                              {element?.logo !== null &&
                                              element?.logo !== "" &&
                                              element?.logo !== undefined ? (
                                                <img
                                                  src={element?.logo}
                                                  alt=""
                                                  className="me-3"
                                                />
                                              ) : (
                                                <img
                                                  src={element?.profile_image}
                                                  alt=""
                                                  className="me-3"
                                                />
                                              )}
                                            </div>
                                            <div className="care-user-text">
                                              <div className="care-user-name">
                                                {element?.business_name
                                                  ? element?.business_name
                                                  : element?.fullname}
                                              </div>
                                              <div className="Confirmed-Provider">
                                                <img src={Verify} alt="" />{" "}
                                                {element?.request_status ??
                                                  "NA"}{" "}
                                                Care-Provider
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })
                                  : null} */}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LockedJob;
