import React, { useEffect, useState } from "react";
import Clock from "../../../assets/user/images/clock.svg";
import Dollar from "../../../assets/user/images/dollar.svg";
import SuitCase from "../../../assets/user/images/jobs-suitcase.svg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { Link } from "react-router-dom";

const Details = () => {
  return (
    <div className="container">
      <div className="carenetwork-section">
        <div className="care-title-header">
          <h2 className="heading-title">
            <Link className="btn-back">
              <i class="mdi mdi-arrow-left-thin"></i>
            </Link>{" "}
            Care Network
          </h2>
          <div className="search-filter wd82"></div>
        </div>
        <div className="carenetwork-content">
          <div className="row">
            <div className="col-md-12">
              <div className="care-card">
                <div className="care-card-head">
                  <div className="details-care-id">
                    Job ID:<span> 100120242</span>
                  </div>

                  <div className="details-care-date">
                    Posted On: <span>09-27-2024 01:14 PM</span>
                  </div>
                </div>
                <div className="care-card-body">
                  <div className="details-care-content">
                    <div className="details-title-text">
                      Looking For Clinic Staff
                    </div>
                    <div className="details-tags-list">
                      <div className="details-tags-item">Medical Care</div>
                      <div className="details-tags-item">Home Care</div>
                    </div>

                    <div className="jobs-details-point-list">
                      <div className="jobs-details-item">
                        <img src={Clock} /> Work Timing:
                        <span></span>
                      </div>
                      <div className="jobs-details-item">
                        <img src={Dollar} /> Salary:
                        <span>/Annually</span>
                      </div>
                      <div className="jobs-details-item">
                        <img src={SuitCase} /> Work Exp:
                        <span> Experience </span>
                      </div>
                    </div>

                    <div className="jobs-requirement-info">
                      <h3>Job Requirement</h3>
                      <p>
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                        Phasellus Gravida Ut Ipsum Quis Mattis. Donec Ut
                        Tincidunt Nunc. Cras Pharetra Blandit Felis, A Iaculis
                        Nibh Convallis Mattis.
                      </p>
                    </div>
                    <div className="Applicant-text">
                      23+ Applicant Applied for this job
                    </div>
                    <Link className="btn-bl">Apply</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
