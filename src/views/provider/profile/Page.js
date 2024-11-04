import React from "react";
import googlemapIcon from "../../../assets/provider/images/Google_Map.svg";
import careuserprofile from "../../../assets/provider/images/user.png";
import caresuccessful from "../../../assets/provider/images/successful.svg";
import { Link } from "react-router-dom";

const Page = () => {
  return (
    <>
      <div className="container">
        <div className="messages-section">
          <div className="row">
            <div className="col-md-12">
              <div className="care-title-header">
                <div className="care-title-header-1">
                  <h6 className="heading-name-title p-0">
                    Hello, Joseph Phill
                  </h6>
                  <h2 className="heading-title">Your Profile Looks Great !</h2>
                </div>
                <div>
                  <div className="">
                    <Link class="btn-delete" href="#">
                      <i className="fa-solid fa-trash ms-2"></i> Delete Account
                    </Link>
                  </div>
                </div>
              </div>
              <div className="providerProfile-section">
                <div className="user-table-item">
                  <div className="row g-1 align-items-center">
                    <div className="col-md-4">
                      <div className="user-profile-item">
                        <div className="user-profile-media">
                          <img src={careuserprofile} alt="" />
                        </div>
                        <div className="user-profile-text">
                          <h2>Joseph Phill</h2>
                          <div className="d-flex">
                            <div className="email-text">
                              <i className="fa-solid fa-envelope ms-2"></i>{" "}
                              janedoe7839@gmail.com
                            </div>
                            <div className="email-text ms-3">
                              <i className="fa-solid fa-phone ms-2"></i> (817)
                              237-7205
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="user-profile-action">
                        <a
                          className="btn-gr"
                          data-bs-toggle="modal"
                          data-bs-target="#EditProfile"
                        >
                          <i class="fa-solid fa-edit ms-2"></i> Edit Profile
                        </a>
                        <a className="btn-re" href="">
                          Delete Account
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="providerprofile-overview">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="overview-card">
                        <div className="overview-content">
                          <h2>Active Jobs</h2>
                          <h4>02</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="overview-card">
                        <div className="overview-content">
                          <h2>Pending Request</h2>
                          <h4>90</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="overview-card">
                        <div className="overview-content">
                          <h2>Cancelled Jobs</h2>
                          <h4>08</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="providerprofile-about d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img className="me-3" src={caresuccessful} alt="" />
                    <h2 className="m-0">
                      Want To Get Featured on The Home Page Listing ?
                    </h2>
                  </div>
                  <a className="btn-plan" href="#">
                    @ Just $59/Monthly
                  </a>
                </div>

                <div className="Address-card">
                  <div className="care-location-box d-flex justify-content-between mt-3">
                    <div className="care-location-text">
                      <h4>Payment Accepted</h4>
                      <p>Debit Cards</p>
                    </div>
                    <div className="care-location-text">
                      <h4>Experience </h4>
                      <p>3+ Years</p>
                    </div>
                    <div className="care-location-text">
                      <h4>Lorem Ipsum</h4>
                      <p>$20/Hour</p>
                    </div>
                  </div>

                  <div className="divider col-md-12"></div>

                  <div className="care-location-text">
                    <h4>Best Info</h4>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English.
                    </p>
                  </div>

                  <div className="divider col-md-12"></div>
                  <div className="care-location-text mb-3">
                    <h4>Address</h4>
                  </div>
                  <div className="full-address-detail">
                    <img src={googlemapIcon} alt="" />
                    <h6>4233 Benson Park Drive, Young Atlanta, 55394</h6>
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
