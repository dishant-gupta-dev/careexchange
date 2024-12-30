import React from "react";
import SearchImg from "../../../assets/user/images/search1.svg";

const Payment = () => {
  return (
    <div className="payment-page-section">
      <div className="container">
        <div className="care-title-header">
          <h2 className="heading-title">Subscription Plan</h2>
          <div className="search-filter wd30">
            <div className="form-group">
              <div className="search-form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name"
                  aria-label="Username"
                  name="name"
                />
                <span className="search-icon">
                  <img src={SearchImg} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-2">
            <div className="subscription-card">
              <div className="subscription-info">
                <div className="planname-text">Job Opportunity Posting</div>
                <p>
                  Post your job openings and solicit for qualified candidates
                </p>
              </div>
              <div className="subscription-price-info">
                <div className="plan-price-text">$50 USD</div>
                <div className="plan-persave-content">
                  <div className="plan-per-text">30 days</div>
                </div>
              </div>
              <div className="subscription-point-info">
                <div className="cc-plan-point-list">
                  <div className="ccradiobox">
                    <input
                      type="radio"
                      id="Postedjob1"
                      name="site_name"
                      value=""
                    />
                    <label for="Postedjob1">
                      $50 per Job Opportunity Posted/month (30 days)
                    </label>
                  </div>
                </div>
                <div className="cc-plan-point-list">
                  <div className="ccradiobox">
                    <input
                      type="radio"
                      id="Postedjob2"
                      name="site_name"
                      value=""
                    />
                    <label for="Postedjob2">
                      $100 per Job Opportunity Posted/3 months (90 days)
                    </label>
                  </div>
                </div>
                <div className="plan-action">
                  <a href="">Buy Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
