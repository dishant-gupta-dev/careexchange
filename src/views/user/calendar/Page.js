import React, { useState } from "react";
import DollarImg from "../../../assets/user/images/dollar-circle.svg";
import StarImg from "../../../assets/user/images/star1.svg";
import SuitcaseImg from "../../../assets/user/images/jobs-suitcase.svg";
import WhcalenImg from "../../../assets/user/images/whcalendar.svg";
import SearchImg from "../../../assets/user/images/search1.svg";
import RepeatImg from "../../../assets/user/images/Repeat.svg";
import UserImg from "../../../assets/user/images/user.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Page = () => {
  const [dateVal, setDate] = useState("");

  return (
    <>
      <div className="container">
        <div className="subscription-section">
          <div className="care-title-header">
            <h2 className="heading-title">Calendar</h2>
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
                    <img src={SearchImg} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="calendar-card">
                <Calendar onChange={(e) => setDate(e)} defaultView="month" value={dateVal} />
              </div>
            </div>

            <div className="col-md-8">
              <div className="care-card">
                <div className="care-card-head">
                  <div className="care-id">
                    Job ID: <span>7983489</span>
                  </div>

                  <div className="care-status">
                    Status: <span>Active</span>
                  </div>
                </div>
                <div className="care-card-body">
                  <div className="care-content">
                    <div className="title-text">Care For Marry Lane</div>
                    <div className="date-text">
                      <img src={WhcalenImg} /> Next Mon, 25 Jul, 09:00 Am- 05:00
                      PM
                    </div>
                  </div>
                  <div className="care-day-Weekly-info">
                    <div className="care-point-box">
                      <div className="care-point-icon">
                        <img src={RepeatImg} />
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
                      <img src={UserImg} />
                    </div>
                    <div className="care-user-text">
                      <div className="care-user-name">
                        Joseph Phill Will Take Care
                      </div>
                      <div className="care-user-info-list">
                        <div className="Exp-text">
                          <img src={SuitcaseImg} /> 3+ Years Exp
                        </div>
                        <div className="rating-text">
                          <img src={StarImg} />
                          4.2
                        </div>
                        <div className="rate-text">
                          <img src={DollarImg} />
                          $20-30/Hr
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
