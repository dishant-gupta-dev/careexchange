import React from "react";
import "../../../assets/user/css/home.css";
import Map from "../../../assets/user/images/Google_Map.svg";
import Search from "../../../assets/user/images/search-normal.svg";
import Schedule from "../../../assets/user/images/schedule.svg";
import Post from "../../../assets/user/images/post.svg";
import SsCare from "../../../assets/user/images/ss-care.svg";
import ChCare from "../../../assets/user/images/ch-care.svg";
import MdCare from "../../../assets/user/images/md-care.svg";
import PetCare from "../../../assets/user/images/pet-care.svg";
import UserImg from "../../../assets/user/images/user.png";
import Ad1 from "../../../assets/user/images/ad1.jpg";
import Ad2 from "../../../assets/user/images/ad2.jpg";
import Ad3 from "../../../assets/user/images/ad3.jpg";

const Page = () => {
  return (
    <>
      <div className="container">
        <div className="find-location-section">
          <div className="find-location-tab">
            <ul className="nav nav-tabs">
              <li>
                <a className="active" href="#findcare" data-bs-toggle="tab">
                  Find Care
                </a>
              </li>
              <li>
                <a href="#findajob" data-bs-toggle="tab">
                  Find A Job
                </a>
              </li>
            </ul>
          </div>
          <div className="find-location-content-info tab-content">
            <div className="tab-pane active" id="findcare">
              <div className="search-section">
                <div className="search-location-card">
                  <div className="search-input-info">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Address Or Zip Code"
                    />
                    <span className="search-lo-icon">
                      <img src={Map}/>
                    </span>
                  </div>
                  <div className="search-btn-info">
                    <button className="intake-btn-done">
                      <img src={Search} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>

        <div className="overview-section">
          <div className="row">
            <div className="col-md-6">
              <div className="schedule-card">
                <div className="schedule-card-content">
                  <div className="schedule-card-icon">
                    <img src={Schedule} />
                  </div>
                  <div className="schedule-card-text">
                    Schedule A <span>Free !</span> In-Home Care Assessment
                  </div>
                </div>
                <div className="schedule-card-action">
                  <a href="#">Book Now</a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="opportunity-card">
                <div className="opportunity-card-content">
                  <div className="opportunity-card-icon">
                    <img src={Post} />
                  </div>
                  <div className="opportunity-card-text">
                    Post Job Opportunity In Your Area
                  </div>
                </div>
                <div className="opportunity-card-action">
                  <a href="#">GO</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="careservices-section">
          <div className="care-title-header">
            <h2 className="heading-title">
              Care Services You Are Looking For?
            </h2>
            <div className="search-filter wd30"></div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <div className="careservices-card">
                <div className="careservices-icon">
                  <img src={SsCare} />
                </div>
                <div className="careservices-text">
                  <h2>Senior Care</h2>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="careservices-card">
                <div className="careservices-icon">
                  <img src={ChCare} />
                </div>
                <div className="careservices-text">
                  <h2>Child Care</h2>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="careservices-card">
                <div className="careservices-icon">
                  <img src={PetCare} />
                </div>
                <div className="careservices-text">
                  <h2>Pet Care</h2>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="careservices-card">
                <div className="careservices-icon">
                  <img src={MdCare} />
                </div>
                <div className="careservices-text">
                  <h2>Medical Care</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="featured-section">
          <div className="care-title-header">
            <h2 className="heading-title">Featured</h2>
            <div className="search-filter wd30"></div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="care-card">
                <div className="care-card-head">
                  <div className="care-user-info">
                    <div className="care-user-image">
                      <img src={UserImg} />
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
                    <div className="care-price-text">
                      <div className="pricehour-text">$20-30/Hr</div>
                      <div className="exp-text">3+ Years Exp</div>
                    </div>
                    <div className="care-tag-text">Senior Care</div>
                  </div>
                  <div className="care-location-box">
                    <div className="care-location-text">
                      <h4>Location</h4>
                      <p>Atlanta GA, 63993</p>
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
                      <img src={UserImg} />
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
                    <div className="care-price-text">
                      <div className="pricehour-text">$20-30/Hr</div>
                      <div className="exp-text">3+ Years Exp</div>
                    </div>
                    <div className="care-tag-text">Senior Care</div>
                  </div>
                  <div className="care-location-box">
                    <div className="care-location-text">
                      <h4>Location</h4>
                      <p>Atlanta GA, 63993</p>
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
                      <img src={UserImg} />
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
                    <div className="care-price-text">
                      <div className="pricehour-text">$20-30/Hr</div>
                      <div className="exp-text">3+ Years Exp</div>
                    </div>
                    <div className="care-tag-text">Senior Care</div>
                  </div>
                  <div className="care-location-box">
                    <div className="care-location-text">
                      <h4>Location</h4>
                      <p>Atlanta GA, 63993</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="advertisement-section">
          <div className="care-title-header">
            <h2 className="heading-title">Advertisement</h2>
            <div className="search-filter wd30"></div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="advertisement-card">
                <div className="advertisement-user-image">
                  <img src={Ad1} />
                </div>
                <div className="advertisement-content">
                  <h4>Looking For Home Care For Seniors</h4>
                  <a className="viewmorebtn" href="">
                    View More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="advertisement-card">
                <div className="advertisement-user-image">
                  <img src={Ad2} />
                </div>
                <div className="advertisement-content">
                  <h4>Flat 60% Off On Pet Care</h4>
                  <a className="viewmorebtn" href="">
                    View More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="advertisement-card">
                <div className="advertisement-user-image">
                  <img src={Ad3} />
                </div>
                <div className="advertisement-content">
                  <h4>Smile Behind Your Grand-Parents Care..</h4>
                  <a className="viewmorebtn" href="">
                    View More
                  </a>
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
