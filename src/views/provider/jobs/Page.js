import React from "react";
import Searchicon from "../../../assets/provider/images/search1.svg";
import careuserprofile from "../../../assets/provider/images/user.png";
import whcalendar from "../../../assets/provider/images/whcalendar.svg";
import Repeat from "../../../assets/provider/images/Repeat.svg";
import Verify from "../../../assets/provider/images/verify.svg";
import { Link } from "react-router-dom";

const Page = () => {
  return (
    <>
      <div className="container">
        <div className="messages-section">
          <div className="row">
            <div className="col-md-12">
              <div className="messages-tab">
                <ul className="nav nav-tabs">
                  <li>
                    <a className="active" href="#Active" data-bs-toggle="tab">
                      Active
                    </a>
                  </li>
                  <li>
                    <a href="#Pending" data-bs-toggle="tab">
                      Pending
                    </a>
                  </li>
                  <li>
                    <a href="#Cancelled" data-bs-toggle="tab">
                      Cancelled
                    </a>
                  </li>

                  <li>
                    <a href="#Completed" data-bs-toggle="tab">
                      Completed
                    </a>
                  </li>
                </ul>
              </div>

              <div className="messages-tabs-content-info tab-content">
                <div className="tab-pane active" id="Active">
                  <div className="care-title-header">
                    <h2 className="heading-title">Active Care Job Requests</h2>
                    <div className="search-filter wd30">
                      <div className="form-group">
                        <div className="search-form-group">
                          <input
                            type="text"
                            name=""
                            className="form-control"
                            placeholder="Search "
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
                      <div className="col-md-12">
                        <div className="care-card">
                          <div className="care-card-head">
                            <div className="care-id">
                              Job ID:<span>7983489</span>
                            </div>

                            <div className="care-status">
                              Status: <span>Active</span>
                            </div>
                          </div>
                          <div className="care-card-body">
                            <div className="care-content">
                              <div className="title-text">
                                Care For Marry Lane
                              </div>
                              <div className="date-text">
                                <img src={whcalendar} alt="" /> Next Mon, 25
                                Jul, 09:00 Am- 05:00 PM
                              </div>
                            </div>
                            <div className="care-day-Weekly-info">
                              <div className="care-point-box">
                                <div className="care-point-icon">
                                  <img src={Repeat} alt="" />
                                </div>
                                <div className="care-point-text">
                                  <h4>Repeat Weekly:</h4>
                                  <p>Every</p>
                                </div>
                              </div>
                              <div className="care-day-list">
                                <div className="care-day-item">S</div>
                                <div className="care-day-item">T</div>
                                <div className="care-day-item">W</div>
                              </div>
                            </div>
                          </div>
                          <div className="care-card-foot">
                            <div className="care-user-info">
                              <div className="care-user-image">
                                <img src={careuserprofile} alt="" />
                              </div>
                              <div className="care-user-text">
                                <div className="care-user-name">
                                  Joseph Phill Will Take Care
                                </div>
                                <div className="Confirmed-Provider">
                                  <img src={Verify} alt="" /> Confirmed
                                  Care-Provider
                                </div>
                              </div>
                            </div>
                            <div className="care-action1">
                              <Link className="btn-gr">
                                View Care-Provider Profile
                              </Link>
                              <Link className="btn-bl">View Job Detail</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane " id="Pending">
                  <div className="care-title-header">
                    <h2 className="heading-title">Pending Care Job Requests</h2>
                    <div className="search-filter wd30">
                      <div className="form-group">
                        <div className="search-form-group">
                          <input
                            type="text"
                            name=""
                            className="form-control"
                            placeholder="Search "
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
                      <div className="col-md-12">
                        <div className="care-card">
                          <div className="care-card-head">
                            <div className="care-id">
                              Job ID:<span>7983489</span>
                            </div>

                            <div className="care-status">
                              Status: <span>Active</span>
                            </div>
                          </div>
                          <div className="care-card-body">
                            <div className="care-content">
                              <div className="title-text">
                                Care For Marry Lane
                              </div>
                              <div className="date-text">
                                <img src={whcalendar} alt="" /> Next Mon, 25
                                Jul, 09:00 Am- 05:00 PM
                              </div>
                            </div>
                            <div className="care-day-Weekly-info">
                              <div className="care-point-box">
                                <div className="care-point-icon">
                                  <img src={Repeat} alt="" />
                                </div>
                                <div className="care-point-text">
                                  <h4>Repeat Weekly:</h4>
                                  <p>Every</p>
                                </div>
                              </div>
                              <div className="care-day-list">
                                <div className="care-day-item">S</div>
                                <div className="care-day-item">T</div>
                                <div className="care-day-item">W</div>
                              </div>
                            </div>
                          </div>
                          <div className="care-card-foot">
                            <div className="care-user-info">
                              <div className="care-user-image-2">
                                <img
                                  src={careuserprofile}
                                  alt=""
                                  className="img1"
                                />
                                <img
                                  src={careuserprofile}
                                  alt=""
                                  className="img2"
                                />
                                <img
                                  src={careuserprofile}
                                  alt=""
                                  className="img3"
                                />
                              </div>
                              <div className="care-user-text">
                                <div className="care-user-name">
                                  Joseph Phill, +2
                                </div>
                                <div className="submitted-date">
                                  Request Submitted On:{" "}
                                  <span>07/29/2024; 09:34 Am</span>
                                </div>
                              </div>
                            </div>
                            <div className="care-action1">
                              <Link className="btn-bl">View Job Detail</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane " id="Cancelled">
                  <div className="care-title-header">
                    <h2 className="heading-title">
                      Cancelled Care Job Requests
                    </h2>
                    <div className="search-filter wd30">
                      <div className="form-group">
                        <div className="search-form-group">
                          <input
                            type="text"
                            name=""
                            className="form-control"
                            placeholder="Search "
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
                      <div className="col-md-12">
                        <div className="care-card">
                          <div className="care-card-head">
                            <div className="care-id">
                              Job ID:<span>7983489</span>
                            </div>

                            <div className="care-status">
                              Status: <span>Cancelled</span>
                            </div>
                          </div>
                          <div className="care-card-body">
                            <div className="care-content">
                              <div className="title-text">
                                Care For Marry Lane
                              </div>
                              <div className="date-text">
                                <img src={whcalendar} alt="" /> Next Mon, 25
                                Jul, 09:00 Am- 05:00 PM
                              </div>
                            </div>
                            <div className="care-day-Weekly-info">
                              <div className="care-point-box">
                                <div className="care-point-icon">
                                  <img src={Repeat} alt="" />
                                </div>
                                <div className="care-point-text">
                                  <h4>Repeat Weekly:</h4>
                                  <p>Every</p>
                                </div>
                              </div>
                              <div className="care-day-list">
                                <div className="care-day-item">S</div>
                                <div className="care-day-item">T</div>
                                <div className="care-day-item">W</div>
                              </div>
                            </div>
                          </div>
                          <div className="care-card-foot">
                            <div className="care-user-info">
                              <div className="care-user-image-2">
                                <img
                                  src={careuserprofile}
                                  alt=""
                                  className="img1"
                                />
                                <img
                                  src={careuserprofile}
                                  alt=""
                                  className="img2"
                                />
                                <img
                                  src={careuserprofile}
                                  alt=""
                                  className="img3"
                                />
                              </div>
                              <div className="care-user-text">
                                <div className="care-user-name">
                                  Joseph Phill, +2
                                </div>
                                <div className="submitted-date">
                                  Request Submitted On:{" "}
                                  <span>07/29/2024; 09:34 Am</span>
                                </div>
                              </div>
                            </div>
                            <div className="care-action1">
                              <Link className="btn-bl">View Job Detail</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane " id="Cancelled">
                  <div className="care-title-header">
                    <h2 className="heading-title">
                      Cancelled Care Job Requests
                    </h2>
                    <div className="search-filter wd30">
                      <div className="form-group">
                        <div className="search-form-group">
                          <input
                            type="text"
                            name=""
                            className="form-control"
                            placeholder="Search "
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
                      <div className="col-md-12">
                        <div className="care-card">
                          <div className="care-card-head">
                            <div className="care-id">
                              Job ID:<span>7983489</span>
                            </div>

                            <div className="care-status">
                              Status: <span>Cancelled</span>
                            </div>
                          </div>
                          <div className="care-card-body">
                            <div className="care-content">
                              <div className="title-text">
                                Care For Marry Lane
                              </div>
                              <div className="date-text">
                                <img src={whcalendar} alt="" /> Next Mon, 25
                                Jul, 09:00 Am- 05:00 PM
                              </div>
                            </div>
                            <div className="care-day-Weekly-info">
                              <div className="care-point-box">
                                <div className="care-point-icon">
                                  <img src={Repeat} alt="" />
                                </div>
                                <div className="care-point-text">
                                  <h4>Repeat Weekly:</h4>
                                  <p>Every</p>
                                </div>
                              </div>
                              <div className="care-day-list">
                                <div className="care-day-item">S</div>
                                <div className="care-day-item">T</div>
                                <div className="care-day-item">W</div>
                              </div>
                            </div>
                          </div>
                          <div className="care-card-foot">
                            <div className="care-user-info">
                              <div className="care-user-image-2">
                                <img
                                  src={careuserprofile}
                                  alt=""
                                  className="img1"
                                />
                                <img
                                  src={careuserprofile}
                                  alt=""
                                  className="img2"
                                />
                                <img
                                  src={careuserprofile}
                                  alt=""
                                  className="img3"
                                />
                              </div>
                              <div className="care-user-text">
                                <div className="care-user-name">
                                  Joseph Phill, +2
                                </div>
                                <div className="submitted-date">
                                  Request Submitted On:{" "}
                                  <span>07/29/2024; 09:34 Am</span>
                                </div>
                              </div>
                            </div>
                            <div className="care-action1">
                              <Link className="btn-bl">View Job Detail</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane " id="Completed">
                  <div className="care-title-header">
                    <h2 className="heading-title">
                      Completed Care Job Requests
                    </h2>
                    <div className="search-filter wd30">
                      <div className="form-group">
                        <div className="search-form-group">
                          <input
                            type="text"
                            name=""
                            className="form-control"
                            placeholder="Search "
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
                      <div className="col-md-12">
                        <div className="care-card">
                          <div className="care-card-head">
                            <div className="care-id">
                              Job ID:<span>7983489</span>
                            </div>

                            <div className="care-status">
                              Status: <span>Completed</span>
                            </div>
                          </div>
                          <div className="care-card-body">
                            <div className="care-content">
                              <div className="title-text">
                                Care For Marry Lane
                              </div>
                              <div className="date-text">
                                <img src={whcalendar} alt="" /> Next Mon, 25
                                Jul, 09:00 Am- 05:00 PM
                              </div>
                            </div>
                            <div className="care-day-Weekly-info">
                              <div className="care-point-box">
                                <div className="care-point-icon">
                                  <img src={Repeat} alt="" />
                                </div>
                                <div className="care-point-text">
                                  <h4>Repeat Weekly:</h4>
                                  <p>Every</p>
                                </div>
                              </div>
                              <div className="care-day-list">
                                <div className="care-day-item">S</div>
                                <div className="care-day-item">T</div>
                                <div className="care-day-item">W</div>
                              </div>
                            </div>
                          </div>
                          <div className="care-card-foot">
                            <div className="care-user-info">
                              <div className="care-user-image">
                                <img src={careuserprofile} alt="" />
                              </div>
                              <div className="care-user-text">
                                <div className="care-user-name">
                                  Joseph Phill{" "}
                                </div>
                                <div className="Confirmed-Provider">
                                  <img src={Verify} alt="" /> Confirmed
                                  Care-Provider
                                </div>
                              </div>
                            </div>
                            <div className="care-action1">
                              <a className="btn-gr" href="#">
                                View Care-Provider Profile
                              </a>
                              <a className="btn-bl" href="#">
                                View Job Detail
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
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
