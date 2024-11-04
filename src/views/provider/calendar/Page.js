import React from "react";
import Searchicon from "../../../assets/provider/images/search1.svg";
import DatePicker from "../../../assets/provider/images/Date-Picker.png";
import Repeat from "../../../assets/provider/images/Repeat.svg";
import whcalendar from "../../../assets/provider/images/whcalendar.svg";
import careuserprofile from "../../../assets/provider/images/user.png";
import SuitcaseIcon from "../../../assets/provider/images/jobs-suitcase.svg";
import DollarIcon from "../../../assets/provider/images/dollar.svg";
import StarIcon from "../../../assets/provider/images/star1.svg";

const Page = () => {
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
                    <img src={Searchicon} alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="calendar-card">
                <img src={DatePicker} alt="" />
              </div>
            </div>

            <div className="col-md-8">
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
                    <div className="title-text">Care For Marry Lane</div>
                    <div className="date-text">
                      <img src={whcalendar} alt="" />
                      Next Mon, 25 Jul, 09:00 Am- 05:00 PM
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
                      <div className="care-user-info-list">
                        <div className="Exp-text">
                          <img src={SuitcaseIcon} alt="" /> 3+ Years Exp
                        </div>
                        <div className="rating-text">
                          <img src={StarIcon} alt="" />
                          4.2
                        </div>
                        <div className="rate-text">
                          <img src={DollarIcon} alt="" />
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
