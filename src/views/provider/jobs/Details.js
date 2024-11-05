import React from "react";
import { Link } from "react-router-dom";
import locationImage from "../../../assets/admin/images/Google_Map.svg";
import NoImage from "../../../assets/admin/images/no-image.jpg";

const Details = () => {
  return (
    <>
      <div className="container">
        <div className="page-header">
          <h3 className="page-title">
            <Link className="btn-back" to="">
              <i className="mdi mdi-arrow-left-thin"></i>
            </Link>
            Care Job Details
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="cc-care-card">
              <div className="cc-care-card-head">
                <div className="cc-care-id">
                  Job ID: <span>#2000000</span>
                </div>

                <div className="cc-care-status">Status:Active</div>
              </div>
              <div className="cc-care-card-body">
                <div className="cc-care-content">
                  <div className="cc-title-text">Care For Marry Lane</div>

                  <div className="cc-tags-list">
                    <button type="button" className="cc-tags-item">
                      Male
                    </button>
                    <button type="button" className="cc-tags-item mx-2">
                      Age: 40
                    </button>
                  </div>

                  <div className="cc-date-text">
                    <i className="mdi mdi-calendar-clock-outline"></i> Date &
                    Time: <span>Next Mon, 25 Jul, 09:00 Am- 05:00 PM</span>
                  </div>
                </div>
                <div className="cc-care-day-Weekly-info">
                  <div className="cc-care-point-box">
                    <div className="cc-care-point-icon">
                      <i className="mdi mdi-calendar-sync"></i>
                    </div>
                    <div className="cc-care-point-text">
                      <h4>Frequency:</h4>
                      <p>Repeat Monthly</p>
                    </div>
                  </div>
                  <div className="care-day-list">
                    <div className="care-day-item">S</div>
                    <div className="care-day-item">T</div>
                    <div className="care-day-item">W</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="jobs-details-info-card">
              <div className="jobs-details-phone">(817) 237-7205</div>

              <div className="jobs-details-point">
                <div className="jobs-details-point-item">
                  <h4>Best Time to Call: </h4>
                  <p>Anytime</p>
                </div>
                <div className="jobs-details-point-item">
                  <h4>Relationship: </h4>
                  <p> Parent, Grandparent</p>
                </div>
              </div>

              <div className="jobsdetails-location-item">
                <div className="jobsdetails-location-item-icon">
                  <img src={locationImage} />
                </div>
                <div className="jobsdetails-location-item-text">
                  <h4>Location:</h4>
                  <p>4233 Benson Park Drive, YOUNG Atlanta, 55394</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="care-bob-user-card">
              <div className="care-bob-user-card-box">
                <div className="care-bob-user-card-image">
                  <img src={NoImage} className="me-3" alt="" />
                </div>
                <div className="care-bob-user-card-content">
                  <h5 className="">Kristiana Requested Care Job For…</h5>
                  <p className="m-0">
                    <i className="mdi mdi-checkbox-multiple-marked-circle-outline"></i>
                    Care-Provider
                  </p>
                </div>
              </div>
              <div className="care-bob-user-card-box">
                <button type="button" className="btn-gr">
                  View Care-Provider Profile
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="jobs-details-desc-card">
              <h3>Description</h3>
              <p>
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                Phasellus Nibh Velit, Consequat Et Magna Ut, Convallis Commodo
                Odio. Donec Feugiat Viverra Metus Non Tristique.
              </p>
              <div className="jobs-details-desc-image">
                <img src={NoImage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
