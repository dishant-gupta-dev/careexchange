import React, { useEffect, useState } from "react";
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
import { api } from "../../../utlis/user/api.utlis";
import ApiService from "../../../core/services/ApiService";
import NoImage from "../../../assets/admin/images/no-image.jpg";

const Page = () => {
  const [dashboard, setDashboard] = useState({
    category: [],
    ProviderList: [],
    advertisementList: [],
  });
  const [loading, setLoading] = useState(false);

  const getDashboardData = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all dashboard => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setDashboard(response.data.data);
    } else
      setDashboard({
        totalUserCount: 0,
        totalCareProviderCount: 0,
        totalCareStaffCount: 0,
        totalCareJobRequests: [],
        totalActiveJobsCount: 0,
        totalPendingJobsCount: 0,
        careNetwork: [],
        AdvertisementList: [],
      });
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    getDashboardData(api.dashboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                      <img src={Map} />
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
            {dashboard?.category.length !== 0
              ? dashboard?.category.map((ele, indx) => {
                  return (
                    <div key={indx} className="col-md-2">
                      <div className="careservices-card">
                        <div className="careservices-icon">
                          {ele.image === null ||
                          ele.image === "" ||
                          ele.image === undefined ? (
                            <img src={NoImage} alt="" />
                          ) : (
                            <img src={ele.image} alt="" height={100} />
                          )}
                        </div>
                        <div className="careservices-text">
                          <h2>{ele.name ?? "NA"}</h2>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>

        <div className="featured-section">
          <div className="care-title-header">
            <h2 className="heading-title">Featured</h2>
            <div className="search-filter wd30"></div>
          </div>
          <div className="row">
            {dashboard?.ProviderList.length !== 0
              ? dashboard?.ProviderList.map((ele, indx) => {
                  return (
                    <div key={indx} className="col-md-4">
                      <div className="care-card">
                        <div className="care-card-head">
                          <div className="care-user-info">
                            <div className="care-user-image">
                              {ele.profile_image === null ||
                              ele.profile_image === "" ||
                              ele.profile_image === undefined ? (
                                <img src={NoImage} alt="" />
                              ) : (
                                <img src={ele.profile_image} alt="" />
                              )}
                            </div>
                            <div className="care-user-text">
                              <div className="care-user-name">
                                {ele.fullname ?? "NA"}
                              </div>
                              <div className="care-user-rating">
                                <i className="fa-regular fa-star"></i> NA
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="care-card-body">
                          <div className="care-pricetag-content">
                            <div className="care-price-text">
                              <div className="pricehour-text">
                                {ele.fee ?? "NA"}
                              </div>
                              <div className="exp-text">
                                {ele.experience ?? 0} Years Exp
                              </div>
                            </div>
                            <div className="care-tag-text">
                              {ele.category ?? "NA"}
                            </div>
                          </div>
                          <div className="care-location-box">
                            <div className="care-location-text">
                              <h4>Location</h4>
                              <p>{ele.business_address ?? "NA"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>

        <div className="advertisement-section">
          <div className="care-title-header">
            <h2 className="heading-title">Advertisement</h2>
            <div className="search-filter wd30"></div>
          </div>
          <div className="row">
            {dashboard?.advertisementList.length !== 0
              ? dashboard?.advertisementList.map((ele, indx) => {
                  return (
                    <div key={indx} className="col-md-4">
                      <div className="advertisement-card">
                        <div className="advertisement-user-image">
                          {ele.image === null ||
                          ele.image === "" ||
                          ele.image === undefined ? (
                            <img src={NoImage} alt="" />
                          ) : (
                            <img src={ele.image} alt="" height={100} />
                          )}
                        </div>
                        <div className="advertisement-content">
                          <h4>{ele.title ?? "NA"}</h4>
                          <a className="viewmorebtn" href="">
                            View More
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
