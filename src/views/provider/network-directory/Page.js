import React from "react";
import { Link } from "react-router-dom";
import careuserprofile from "../../../assets/provider/images/user.png";

const Page = () => {
  return (
    <>
      <div className="container">
        <div className="netdirect-section">
          <div className="care-title-header">
            <h2 className="heading-title">Network Directory </h2>
            <div className="search-filter">
              <div className="row g-2">
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <select class="form-control">
                      <option>Select</option>
                      <option>Alabama</option>
                      <option>Alaska</option>
                      <option>Arizona</option>
                      <option>Arkanas</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <select class="form-control">
                      <option>Senior Care</option>
                      <option>Child Care</option>
                      <option>Pet Care</option>
                      <option>Medical Care</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="netdirect-content">
            <div class="netdirect-tab">
              <ul class="nav nav-tabs">
                <li>
                  <a class="active" href="#showall" data-bs-toggle="tab">
                    Show All
                  </a>
                </li>
                <li>
                  <a href="#CareStaff" data-bs-toggle="tab">
                    Care-Staff
                  </a>
                </li>
                <li>
                  <a href="#CareProvider" data-bs-toggle="tab">
                    Care-Provider
                  </a>
                </li>
              </ul>
            </div>

            <div className="messages-tabs-content-info tab-content">
              <div className="tab-pane active" id="showall">
                <div className="row mt-4">
                  <div className="col-md-4">
                    <div className="care-card">
                      <div className="care-card-head">
                        <div className="care-user-info">
                          <div className="care-user-image">
                            <img src={careuserprofile} alt="" />
                          </div>
                          <div className="care-user-text">
                            <div className="care-user-name">Joseph Phill</div>
                            <div className="care-user-rating">
                              <i className="fa-regular fa-star"></i> 4.2
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-pricetag-content">
                          <div className="care-price-text d-flex align-items-center">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M12 17.99V14.99"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </svg>
                            <div className="pricehour-text mt-2 ms-2">
                              {" "}
                              Cared 3 Families
                            </div>
                          </div>
                        </div>
                        <div className="care-location-box d-flex justify-content-between mt-3">
                          <div className="care-location-text">
                            <h4>Location</h4>
                            <p>Atlanta GA, 63993</p>
                          </div>
                          <div className="care-location-text ">
                            <h4>Experience</h4>
                            <p>3+ Years Exp</p>
                          </div>
                        </div>
                        <div className="care-location-box-action">
                          <div className="exp-text mb-0">Senior Care</div>
                          <div className="care-tag-text  mb-0">
                            View Profile
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="care-card">
                      <div className="care-card-head">
                        <div className="care-user-info">
                          <div className="care-user-image">
                            <img src={careuserprofile} alt="" />
                          </div>
                          <div className="care-user-text">
                            <div className="care-user-name">Joseph Phill</div>
                            <div className="care-user-rating">
                              <i className="fa-regular fa-star"></i> 4.2
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-pricetag-content">
                          <div className="care-price-text d-flex align-items-center">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M12 17.99V14.99"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </svg>
                            <div className="pricehour-text mt-2 ms-2">
                              {" "}
                              Cared 3 Families
                            </div>
                          </div>
                        </div>
                        <div className="care-location-box d-flex justify-content-between mt-3">
                          <div className="care-location-text">
                            <h4>Location</h4>
                            <p>Atlanta GA, 63993</p>
                          </div>
                          <div className="care-location-text ">
                            <h4>Experience</h4>
                            <p>3+ Years Exp</p>
                          </div>
                        </div>
                        <div className="care-location-box-action">
                          <div className="exp-text mb-0">Senior Care</div>
                          <div className="care-tag-text  mb-0">
                            View Profile
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="care-card">
                      <div className="care-card-head">
                        <div className="care-user-info">
                          <div className="care-user-image">
                            <img src={careuserprofile} alt="" />
                          </div>
                          <div className="care-user-text">
                            <div className="care-user-name">Joseph Phill</div>
                            <div className="care-user-rating">
                              <i className="fa-regular fa-star"></i> 4.2
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-pricetag-content">
                          <div className="care-price-text d-flex align-items-center">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M12 17.99V14.99"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </svg>
                            <div className="pricehour-text mt-2 ms-2">
                              {" "}
                              Cared 3 Families
                            </div>
                          </div>
                        </div>
                        <div className="care-location-box d-flex justify-content-between mt-3">
                          <div className="care-location-text">
                            <h4>Location</h4>
                            <p>Atlanta GA, 63993</p>
                          </div>
                          <div className="care-location-text ">
                            <h4>Experience</h4>
                            <p>3+ Years Exp</p>
                          </div>
                        </div>
                        <div className="care-location-box-action">
                          <div className="exp-text mb-0">Senior Care</div>
                          <div className="care-tag-text  mb-0">
                            View Profile
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane active" id="CareStaff">
                <div className="row mt-4">
                  <div className="col-md-4">
                    <div className="care-card">
                      <div className="care-card-head">
                        <div className="care-user-info">
                          <div className="care-user-image">
                            <img src={careuserprofile} alt="" />
                          </div>
                          <div className="care-user-text">
                            <div className="care-user-name">Joseph Phill</div>
                            <div className="care-user-rating">
                              <i className="fa-regular fa-star"></i> 4.2
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-pricetag-content">
                          <div className="care-price-text d-flex align-items-center">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M12 17.99V14.99"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </svg>
                            <div className="pricehour-text mt-2 ms-2">
                              {" "}
                              Cared 3 Families
                            </div>
                          </div>
                        </div>
                        <div className="care-location-box d-flex justify-content-between mt-3">
                          <div className="care-location-text">
                            <h4>Location</h4>
                            <p>Atlanta GA, 63993</p>
                          </div>
                          <div className="care-location-text ">
                            <h4>Experience</h4>
                            <p>3+ Years Exp</p>
                          </div>
                        </div>
                        <div className="care-location-box-action">
                          <div className="exp-text mb-0">Senior Care</div>
                          <div className="care-tag-text  mb-0">
                            View Profile
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="care-card">
                      <div className="care-card-head">
                        <div className="care-user-info">
                          <div className="care-user-image">
                            <img src={careuserprofile} alt="" />
                          </div>
                          <div className="care-user-text">
                            <div className="care-user-name">Joseph Phill</div>
                            <div className="care-user-rating">
                              <i className="fa-regular fa-star"></i> 4.2
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-pricetag-content">
                          <div className="care-price-text d-flex align-items-center">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M12 17.99V14.99"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </svg>
                            <div className="pricehour-text mt-2 ms-2">
                              {" "}
                              Cared 3 Families
                            </div>
                          </div>
                        </div>
                        <div className="care-location-box d-flex justify-content-between mt-3">
                          <div className="care-location-text">
                            <h4>Location</h4>
                            <p>Atlanta GA, 63993</p>
                          </div>
                          <div className="care-location-text ">
                            <h4>Experience</h4>
                            <p>3+ Years Exp</p>
                          </div>
                        </div>
                        <div className="care-location-box-action">
                          <div className="exp-text mb-0">Senior Care</div>
                          <div className="care-tag-text  mb-0">
                            View Profile
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="care-card">
                      <div className="care-card-head">
                        <div className="care-user-info">
                          <div className="care-user-image">
                            <img src={careuserprofile} alt="" />
                          </div>
                          <div className="care-user-text">
                            <div className="care-user-name">Joseph Phill</div>
                            <div className="care-user-rating">
                              <i className="fa-regular fa-star"></i> 4.2
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-pricetag-content">
                          <div className="care-price-text d-flex align-items-center">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M12 17.99V14.99"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </svg>
                            <div className="pricehour-text mt-2 ms-2">
                              {" "}
                              Cared 3 Families
                            </div>
                          </div>
                        </div>
                        <div className="care-location-box d-flex justify-content-between mt-3">
                          <div className="care-location-text">
                            <h4>Location</h4>
                            <p>Atlanta GA, 63993</p>
                          </div>
                          <div className="care-location-text ">
                            <h4>Experience</h4>
                            <p>3+ Years Exp</p>
                          </div>
                        </div>
                        <div className="care-location-box-action">
                          <div className="exp-text mb-0">Senior Care</div>
                          <div className="care-tag-text  mb-0">
                            View Profile
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane active" id="CareProvider">
                <div className="row mt-4">
                  <div className="col-md-4">
                    <div className="care-card">
                      <div className="care-card-head">
                        <div className="care-user-info">
                          <div className="care-user-image">
                            <img src={careuserprofile} alt="" />
                          </div>
                          <div className="care-user-text">
                            <div className="care-user-name">Joseph Phill</div>
                            <div className="care-user-rating">
                              <i className="fa-regular fa-star"></i> 4.2
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-pricetag-content">
                          <div className="care-price-text d-flex align-items-center">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M12 17.99V14.99"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </svg>
                            <div className="pricehour-text mt-2 ms-2">
                              {" "}
                              Cared 3 Families
                            </div>
                          </div>
                        </div>
                        <div className="care-location-box d-flex justify-content-between mt-3">
                          <div className="care-location-text">
                            <h4>Location</h4>
                            <p>Atlanta GA, 63993</p>
                          </div>
                          <div className="care-location-text ">
                            <h4>Experience</h4>
                            <p>3+ Years Exp</p>
                          </div>
                        </div>
                        <div className="care-location-box-action">
                          <div className="exp-text mb-0">Senior Care</div>
                          <div className="care-tag-text  mb-0">
                            View Profile
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="care-card">
                      <div className="care-card-head">
                        <div className="care-user-info">
                          <div className="care-user-image">
                            <img src={careuserprofile} alt="" />
                          </div>
                          <div className="care-user-text">
                            <div className="care-user-name">Joseph Phill</div>
                            <div className="care-user-rating">
                              <i className="fa-regular fa-star"></i> 4.2
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-pricetag-content">
                          <div className="care-price-text d-flex align-items-center">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M12 17.99V14.99"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </svg>
                            <div className="pricehour-text mt-2 ms-2">
                              {" "}
                              Cared 3 Families
                            </div>
                          </div>
                        </div>
                        <div className="care-location-box d-flex justify-content-between mt-3">
                          <div className="care-location-text">
                            <h4>Location</h4>
                            <p>Atlanta GA, 63993</p>
                          </div>
                          <div className="care-location-text ">
                            <h4>Experience</h4>
                            <p>3+ Years Exp</p>
                          </div>
                        </div>
                        <div className="care-location-box-action">
                          <div className="exp-text mb-0">Senior Care</div>
                          <div className="care-tag-text  mb-0">
                            View Profile
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="care-card">
                      <div className="care-card-head">
                        <div className="care-user-info">
                          <div className="care-user-image">
                            <img src={careuserprofile} alt="" />
                          </div>
                          <div className="care-user-text">
                            <div className="care-user-name">Joseph Phill</div>
                            <div className="care-user-rating">
                              <i className="fa-regular fa-star"></i> 4.2
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-pricetag-content">
                          <div className="care-price-text d-flex align-items-center">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M12 17.99V14.99"
                                stroke="#132A3A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </svg>
                            <div className="pricehour-text mt-2 ms-2">
                              {" "}
                              Cared 3 Families
                            </div>
                          </div>
                        </div>
                        <div className="care-location-box d-flex justify-content-between mt-3">
                          <div className="care-location-text">
                            <h4>Location</h4>
                            <p>Atlanta GA, 63993</p>
                          </div>
                          <div className="care-location-text ">
                            <h4>Experience</h4>
                            <p>3+ Years Exp</p>
                          </div>
                        </div>
                        <div className="care-location-box-action">
                          <div className="exp-text mb-0">Senior Care</div>
                          <div className="care-tag-text  mb-0">
                            View Profile
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
