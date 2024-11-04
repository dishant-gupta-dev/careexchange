import React from "react";
import careuserprofile from "../../../assets/provider/images/user.png";
import googlemap from "../../../assets/provider/images/Google_Map.svg";
import Searchicon from "../../../assets/provider/images/search-normal.svg";
import Arrowicon from "../../../assets/provider/images/arrow-right.svg";
import careservicesicon1 from "../../../assets/provider/images/ss-care.svg";
import careservicesicon2 from "../../../assets/provider/images/ch-care.svg";
import { Link } from "react-router-dom";

const Page = () => {
  return (
    <>
      <div className="container">
        <div className="row g-2">
          <div className="col-md-6">
            <div className="care-card">
              <div className="care-card-head-1">
                <div className="care-user-info">
                  <div className="care-user-image">
                    <img src={careuserprofile} alt="" />
                  </div>
                  <div className="care-user-text">
                    <div className="care-user-name">Hello, Joseph Phill</div>
                    <div className="care-user-rating">
                      <i className="mdi mdi-star"></i> 4.2
                    </div>
                  </div>
                </div>
                <div className="care-tag-text mb-0 align-items-center d-flex">
                  <p className="m-0"> Care Staff</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="find-location-section">
              <div className="search-section">
                <div className="search-location-card-1">
                  <div className="search-input-info d-flex align-items-center">
                    <span className="ms-2">
                      <img src={googlemap} alt="" />
                    </span>
                    <p className="m-0 mx-3">Find a Job In Your Area</p>
                  </div>
                  <div className="search-btn-info">
                    <button className="intake-btn-done">
                      <img src={Arrowicon} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            <div className="row">
              <div className="col-lg-12">
                <div className=" schedule-card-1">
                  <div className="schedule-card-content">
                    <div className="schedule-card-text">Network Directory</div>
                  </div>
                  <div className="dropdown-select">
                    <select className="form-control">
                      <option>Gorgia</option>
                      <option>1</option>
                      <option>2</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-lg-12  mt-4">
                <div className="careservices-section">
                  <div className="care-title-header">
                    <h2 className="heading-title">
                      Care Services You Are Looking For?
                    </h2>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <div className="careservices-card">
                        <div className="careservices-icon m-0">
                          <img src={careservicesicon1} alt="" />
                        </div>
                        <Link className="careservices-text d-flex justify-content-between align-items-end">
                          <h2>
                            Active Jobs{" "}
                            <i className="mdi mdi-arrow-right ms-2"></i>
                          </h2>
                          <h3>02</h3>
                        </Link>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="careservices-card">
                        <div className="careservices-icon m-0">
                          <img src={careservicesicon2} alt="" />
                        </div>
                        <Link
                          data-bs-toggle="modal"
                          data-bs-target="#locked-job-requests"
                          data-bs-dismiss="modal"
                          href="#"
                          className="careservices-text d-flex justify-content-between align-items-end"
                        >
                          <h2>
                            Locked Jobs Request{" "}
                            <i className="mdi mdi-arrow-right ms-2"></i>
                          </h2>
                          <h3>18</h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-5">
            <div class="calender-card">
              <div
                id="inline-datepicker"
                class="datepicker datepicker-custom"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
