import React, { useEffect, useState } from "react";
import Search from "../../../assets/user/images/search1.svg";
import { api } from "../../../utlis/user/api.utlis";
import { routes } from "../../../utlis/user/routes.utlis";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import WhCalen from "../../../assets/user/images/whcalendar.svg";
import RepeatImg from "../../../assets/user/images/Repeat.svg";
import VerifyImg from "../../../assets/user/images/verify.svg";
import locationImage from "../../../assets/admin/images/Google_Map.svg";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import moment from "moment";
import { encode } from "base-64";
import { Link } from "react-router-dom";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState(0);

  const getJobs = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    console.log("all my jobs => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setJobs(response.data.data.myjobList);
    } else setJobs([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    getJobs(api.myJobs + `?status=${status}&search=${name}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobs(api.myJobs + `?status=${status}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="messages-section">
          <div className="row">
            <div className="col-md-12">
              <div className="messages-tab">
                <ul className="nav nav-tabs">
                  <li>
                    <Link
                      className={status === 0 ? "active" : ""}
                      to=""
                      onClick={() => setStatus(0)}
                      data-bs-toggle="tab"
                    >
                      Pending
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={status === 1 ? "active" : ""}
                      to=""
                      onClick={() => setStatus(1)}
                      data-bs-toggle="tab"
                    >
                      Ongoing
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={status === 3 ? "active" : ""}
                      to=""
                      onClick={() => setStatus(3)}
                      data-bs-toggle="tab"
                    >
                      Cancelled
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={status === 4 ? "active" : ""}
                      to=""
                      onClick={() => setStatus(4)}
                      data-bs-toggle="tab"
                    >
                      Completed
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="messages-tabs-content-info tab-content">
                <div className="tab-pane active" id="Active">
                  <div className="care-title-header">
                    <h2 className="heading-title">Care Job Requests</h2>
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
                            <img src={Search} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ProviderProfile-section">
                    <div className="row">
                      {jobs.length !== 0 ? (
                        jobs.map((ele, indx) => {
                          return (
                            <div key={indx} className="row">
                              <div className="col-md-12">
                                <div className="care-card">
                                  <div className="care-card-head">
                                    <div className="care-id">
                                      Job ID:<span> {ele.job_id ?? "NA"}</span>
                                    </div>

                                    <div className="care-status">
                                      {/* Status: <span>{ele.request_status ?? "NA"}</span> */}
                                      <Link
                                        className="btn-bl"
                                        to={`${routes.jobDetails}/${encode(
                                          ele.id
                                        )}`}
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
                                      <div className="row d-flex justify-content-between w-100">
                                        <div className="col-md-7">
                                          <div className="date-text">
                                            <img src={WhCalen} />{" "}
                                            {moment(ele.start_date).format(
                                              "MM-DD-yyyy"
                                            )}{" "}
                                            {ele.start_time ?? "NA"}
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div class="tags-list float-end">
                                            <div class="tags-item-sub">
                                              {ele?.gender == "M"
                                                ? "Male"
                                                : "Female"}
                                            </div>
                                            <div class="tags-item-sub mx-2">
                                              Age: {ele?.age ?? "NA"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="care-day-Weekly-info">
                                      <div className="row w-100">
                                        <div className="col-md-4">
                                          <div className="care-point-box">
                                            <div className="care-point-icon">
                                              <img src={RepeatImg} />
                                            </div>
                                            <div className="care-point-text">
                                              <h4>Frequency:</h4>
                                              <p>
                                                {ele.frequency === "O"
                                                  ? "One Time"
                                                  : ele.frequency === "W"
                                                  ? "Repeat Weekly"
                                                  : "Repeat Monthly"}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-8">
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

                                  {/* {ele.providers.length !== 0
                                    ? ele.providers.map((element, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="care-card-foot"
                                          >
                                            <div className="care-user-info py-1">
                                              <div className="care-user-image">
                                                {element.logo !== null &&
                                                element.logo !== "" &&
                                                element.logo !== undefined ? (
                                                  <img
                                                    src={element.logo}
                                                    alt=""
                                                    className="me-3"
                                                  />
                                                ) : (
                                                  <img
                                                    src={element.profile_image}
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
                                                <div className="Confirmed-Provider text-capitalize">
                                                  <img src={VerifyImg} />{" "}
                                                  {element.request_status ??
                                                    "NA"}{" "}
                                                  Care-Provider
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })
                                    : null} */}
                                  {/* <div className="care-action1">
                                      <a className="btn-gr mt-1" href="#">
                                        View Care-Provider Profile
                                      </a>
                                    </div> */}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
