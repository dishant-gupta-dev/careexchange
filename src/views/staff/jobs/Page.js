import React, { useEffect, useState } from "react";
import Searchicon from "../../../assets/provider/images/search1.svg";
import whcalendar from "../../../assets/provider/images/whcalendar.svg";
import Repeat from "../../../assets/provider/images/Repeat.svg";
import { Link } from "react-router-dom";
import { routes } from "../../../utlis/staff/routes.utlis";
import { api } from "../../../utlis/staff/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { encode } from "base-64";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(2);
  const [list, setList] = useState([]);

  const getJobList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all jobs list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setList(response.data.data.myjobList);
    } else setList([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    getJobList(api.myJobs + `?status=${tab}&search=${name}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobList(api.myJobs + `?status=${tab}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

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
                      className={tab == 2 ? "active" : ""}
                      onClick={() => setTab(2)}
                      data-bs-toggle="tab"
                    >
                      Ongoing
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={tab == 1 ? "active" : ""}
                      onClick={() => setTab(1)}
                      data-bs-toggle="tab"
                    >
                      Pending
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={tab == 3 ? "active" : ""}
                      onClick={() => setTab(3)}
                      data-bs-toggle="tab"
                    >
                      Cancelled
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={tab == 4 ? "active" : ""}
                      onClick={() => setTab(4)}
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
                                    <div className="date-text">
                                      <img src={whcalendar} alt="" />{" "}
                                      {ele.start_date} {ele.start_time}
                                    </div>
                                  </div>
                                  <div className="care-day-Weekly-info">
                                    <div className="care-point-box">
                                      <div className="care-point-icon">
                                        <img src={Repeat} alt="" />
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
                                    {/* <div className="care-day-list">
                                      <div className="care-day-item">S</div>
                                      <div className="care-day-item">T</div>
                                      <div className="care-day-item">W</div>
                                    </div> */}
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

export default Page;
