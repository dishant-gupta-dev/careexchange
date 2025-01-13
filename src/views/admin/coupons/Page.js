import React from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import bgcoupon from "../../../assets/admin/images/couponbg.svg";

const Page = () => {
  return (
    <>
      <div className="content-wrapper">
        <div className="care-title-header">
          <h3 className="heading-title">Manage Coupon </h3>
          <div className="cc-search-filter ">
            <div className="row g-2">
              <div className="col-md-3">
                <div className="form-group">
                  <DatePicker
                    toggleCalendarOnIconClick
                    showIcon
                    className="DatePicker-control"
                    isClearable
                    autoComplete="off"
                    name="date"
                    placeholderText="Select Date"
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <select className="form-control" name="type">
                    <option value="">Select All Coupon</option>
                    <option value="1">Offer & Discounts</option>
                    <option value="2">Subscription Plans</option>
                    <option value="3">Giveaways</option>
                    <option value="4">Contests</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <select className="form-control" name="type">
                    <option value="1">Active Coupons</option>
                    <option value="2">Inactive Coupons</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <button type="button" className="btn-gr">
                    Add New Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div chassName="care-content-coupon-list">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="coupon-card">
                <div
                  className="coupon-card-coupon-name"
                  style={{
                    backgroundImage: `url(${bgcoupon})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h2>CARELEAD5</h2>
                </div>
                <div className="coupon-card-content">
                  <h4>5 FREE Care Leads!</h4>
                  <h3>
                    Apply This Coupon Code To Get First 5 free Care Leads
                    Unlocked!
                  </h3>
                  <div className="coupon-cat-status-box">
                    <div className="coupon-cat-text">Care Lead</div>
                    <div className="coupon-status status-active">
                      Status: <span>Active</span>
                    </div>
                  </div>
                  <div className="coupon-date">
                    Offer Start From: <span>01 Oct 2024</span>
                  </div>
                  <div className="coupon-date">
                    Offer valid till: <span>31 Dec 2024</span>
                  </div>
                </div>
                <div className="coupon-card-action">
                  <Link className="coupon-offer-btn">Offers & Discount</Link>
                  <Link className="coupon-Delete-btn">Delete</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="coupon-card">
                <div
                  className="coupon-card-coupon-name"
                  style={{
                    backgroundImage: `url(${bgcoupon})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "var(--green)",
                  }}
                >
                  <h2>CARE15</h2>
                </div>
                <div className="coupon-card-content">
                  <h4>15 Days Free Trial</h4>
                  <h3>
                    If You Sign Up Today For 03 Months Commitment, You Get First
                    15 Days Free Trial!
                  </h3>
                  <div className="coupon-cat-status-box">
                    <div className="coupon-cat-text">Subscription</div>
                    <div className="coupon-status status-inactive">
                      Status: <span>Inactive</span>
                    </div>
                  </div>
                  <div className="coupon-date">
                    Offer Start From: <span>01 Oct 2024</span>
                  </div>
                  <div className="coupon-date">
                    Offer valid till: <span>31 Dec 2024</span>
                  </div>
                </div>
                <div className="coupon-card-action">
                  <Link className="coupon-offer-btn">Subscription Plans</Link>
                  <Link className="coupon-Delete-btn">Delete</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="coupon-card">
                <div
                  className="coupon-card-coupon-name"
                  style={{
                    backgroundImage: `url(${bgcoupon})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h2>JOBFREE</h2>
                </div>
                <div className="coupon-card-content">
                  <h4>Post Job Opportunity</h4>
                  <h3>You Will Get 2 FREE Job Post Opportunities!</h3>
                  <div className="coupon-cat-status-box">
                    <div className="coupon-cat-text">Care-Staff Registry</div>
                    <div className="coupon-status status-active">
                      Status: <span>Active</span>
                    </div>
                  </div>
                  <div className="coupon-date">
                    Offer Start From: <span>01 Oct 2024</span>
                  </div>
                  <div className="coupon-date">
                    Offer valid till: <span>31 Dec 2024</span>
                  </div>
                </div>
                <div className="coupon-card-action">
                  <Link className="coupon-offer-btn">Giveaways</Link>
                  <Link className="coupon-Delete-btn">Delete</Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="coupon-card">
                <div
                  className="coupon-card-coupon-name"
                  style={{
                    backgroundImage: `url(${bgcoupon})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h2>CAREEXPERT</h2>
                </div>
                <div className="coupon-card-content">
                  <h4>Get 4.5 Ratings</h4>
                  <h3>
                    You Will Get 2 Care Lead Free If You Get 4.5 Ratings
                    Continue For 2 Months
                  </h3>
                  <div className="coupon-cat-status-box">
                    <div className="coupon-cat-text">Care Lead</div>
                    <div className="coupon-status status-active">
                      Status: <span>Active</span>
                    </div>
                  </div>
                  <div className="coupon-date">
                    Offer Start From: <span>01 Oct 2024</span>
                  </div>
                  <div className="coupon-date">
                    Offer valid till: <span>31 Dec 2024</span>
                  </div>
                </div>
                <div className="coupon-card-action">
                  <Link className="coupon-offer-btn">Contest</Link>
                  <Link className="coupon-Delete-btn">Delete</Link>
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
