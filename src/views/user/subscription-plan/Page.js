import React from "react";
import SearchImg from "../../../assets/user/images/search1.svg";

const Page = () => {
  return (
    <>
      <div className="container">
        <div className="subscription-section">
          <div className="care-title-header">
            <h2 className="heading-title">Subscription Plan</h2>
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
              <div className="subscription-card">
                <div className="subscription-info">
                  <div className="planname-text">Plan A</div>
                  <p>Care Referrals Monthly Plan</p>
                </div>
                <div className="subscription-price-info">
                  <div className="plan-price-text">$200</div>
                  <div className="plan-persave-content">
                    <div className="plan-per-text">Per Month</div>
                    <div className="plan-save-text">Save 33%</div>
                  </div>
                </div>
                <div className="subscription-point-info">
                  <div className="plan-point-list">
                    <ul>
                      <li>
                        <i className="fa-solid fa-circle-check"></i> 10
                        Leads/Referrals Max Per Month
                      </li>
                      <li>
                        <i className="fa-solid fa-circle-check"></i> Required
                        Deposit: $200/Month
                      </li>
                      <li>
                        <i className="fa-solid fa-circle-xmark"></i> Unlimited
                        Access To The Care-Staff Registry And Matched Job
                        Candidates Profile
                      </li>
                      <li>
                        <i className="fa-solid fa-circle-xmark"></i> Required
                        Deposit: $200/Month
                      </li>
                    </ul>
                  </div>
                  <div className="plan-action">
                    <a href="">Buy Now</a>
                  </div>
                  <p>No credit card required</p>
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
