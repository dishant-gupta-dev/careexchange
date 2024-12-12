import React, { useEffect, useState, useRef } from "react";
import "../../../assets/user/css/home.css";
import Map from "../../../assets/user/images/Google_Map.svg";
import Search from "../../../assets/user/images/search-normal.svg";
import Schedule from "../../../assets/user/images/schedule.svg";
import Post from "../../../assets/user/images/post.svg";
import { api } from "../../../utlis/user/api.utlis";
import ApiService from "../../../core/services/ApiService";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import Loader from "../../../layouts/loader/Loader";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../utlis/user/routes.utlis";
import { decode, encode } from "base-64";
import { GeolocationApiKey } from "../../../utlis/common.utlis";

const Page = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [tab, setTab] = useState(0);
  const [dashboard, setDashboard] = useState({
    category: [],
    ProviderList: [],
    advertisementList: [],
  });
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    address: null,
    state: null,
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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GeolocationApiKey,
    libraries: ["places"],
  });

  function findAddress(type, arr) {
    for (let i in arr) {
      if (arr[i].types.includes(type)) {
        return arr[i].formatted_address;
      }
    }
    return "";
  }

  function findState(type, arr) {
    for (let i in arr) {
      if (arr[i].types.includes(type)) {
        return arr[i].long_name;
      }
    }
    return null;
  }

  function findState2(type, arr) {
    for (let i in arr) {
      if (arr[i].types.includes(type)) {
        for (let j in arr[i].address_components) {
          if (arr[i].address_components[j].types.includes(type)) {
            return arr[i].address_components[j].long_name;
          }
        }
      }
    }
    return null;
  }

  const handlePlaceChange = () => {
    let [address] = inputRef.current.getPlaces();
    setLocation({
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
      address: address.formatted_address,
      state: findState(
        "administrative_area_level_1",
        address.address_components
      ),
    });
  };

  const getCurrentAddress = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        // console.log("Your current position is:");
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${JSON.stringify(crd)} meters.`);
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&key=${GeolocationApiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log(data.results);
            setLocation({
              lat: crd.latitude,
              lng: crd.longitude,
              address: findAddress("street_address", data.results),
              state: findState2("administrative_area_level_1", data.results),
            });
          })
          .catch((error) => console.log(error));
      },
      function errorCallback(error) {
        // console.log("Error => ", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCurrentAddress();
    getDashboardData(api.dashboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="find-location-section">
          <div className="find-location-tab">
            <ul className="nav nav-tabs">
              <li>
                <Link
                  className={tab == 0 ? "active" : ""}
                  to=""
                  onClick={() => setTab(0)}
                >
                  Find Care
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className={tab == 1 ? "active" : ""}
                  onClick={() => setTab(1)}
                >
                  Find A Job
                </Link>
              </li>
              <li>
                <Link to={routes.addPost} className="">
                  Post A Job
                </Link>
              </li>
            </ul>
          </div>
          <div className="find-location-content-info tab-content">
            <div className="tab-pane active" id="findcare">
              <div className="search-section">
                <div className="search-location-card">
                  <div className="search-input-info">
                    {isLoaded && (
                      <StandaloneSearchBox
                        onLoad={(ref) => (inputRef.current = ref)}
                        onPlacesChanged={handlePlaceChange}
                      >
                        <input
                          className="form-control"
                          placeholder="Where are you finding care"
                          defaultValue={location.address}
                        />
                      </StandaloneSearchBox>
                    )}
                    <span className="search-lo-icon">
                      <img src={Map} />
                    </span>
                  </div>
                  <div className="search-btn-info">
                    {tab == 0 ? (
                      <button
                        className="intake-btn-done"
                        onClick={() => {
                          navigate(
                            `${routes.findCareHomeAss}/${location.lat}/${
                              location.lng
                            }/${location.address ?? null}`
                          );
                        }}
                      >
                        <img src={Search} />
                      </button>
                    ) : null}
                    {tab == 1 ? (
                      <button
                        className="intake-btn-done"
                        onClick={() => {
                          navigate(
                            `${routes.careNetwork}/${location.address}/${location.lat}/${location.lng}`
                          );
                        }}
                      >
                        <img src={Search} />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overview-section">
          <div className="row">
            {tab == 0 ? (
              <div className="col-md-6">
                <div className="schedule-card">
                  <div className="schedule-card-content">
                    <div className="schedule-card-icon">
                      <img src={Schedule} />
                    </div>
                    <div className="schedule-card-text pt-2">
                      Schedule A <span>Free!</span>
                      <p className="pt-1">In-Home Care Assessment</p>
                    </div>
                  </div>
                  <div className="schedule-card-action">
                    <Link
                      to={`${routes.findCare}/${location.lat ?? null}/${
                        location.lng ?? null
                      }/${location.address ?? null}`}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}

            {tab == 1 ? (
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
                    <Link to={`${routes.addPost}`}>GO</Link>
                  </div>
                </div>
              </div>
            ) : null}
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
                      <Link
                        to={`${routes.findCare}/${location.lat ?? null}/${
                          location.lng ?? null
                        }/${location.address ?? null}/${ele.id}`}
                      >
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
                      </Link>
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
                    <div
                      key={indx}
                      className="col-md-4"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(routes.userDetail + `/${encode(ele.id)}`);
                      }}
                    >
                      <div className="care-card">
                        <div className="care-card-head">
                          <div className="care-user-info">
                            <div className="care-user-image">
                              {ele.logo !== null &&
                              ele.logo !== "" &&
                              ele.logo !== undefined ? (
                                <img src={ele.logo} alt="" className="me-3" />
                              ) : ele.profile_image === null ||
                                ele.profile_image === "" ||
                                ele.profile_image === undefined ? (
                                <img src={NoImage} alt="" className="me-3" />
                              ) : (
                                <img
                                  src={ele.profile_image}
                                  alt=""
                                  className="me-3"
                                />
                              )}
                            </div>
                            <div className="care-user-text">
                              <div className="care-user-name">
                                {ele?.business_name
                                  ? ele?.business_name
                                  : ele?.fullname}
                              </div>
                              <div className="care-user-rating">
                                <i className="fa fa-star"></i>{" "}
                                {ele.average_rating ?? "0"}
                              </div>
                            </div>
                          </div>
                          <div style={{ color: "green" }}>
                            {ele.user_type == 2 ? "Provider" : "Staff"}
                          </div>
                        </div>
                        <div className="care-card-body">
                          <div className="care-pricetag-content">
                            <div className="care-price-text">
                              {/* <div className="pricehour-text">
                                {ele.fee ?? "NA"}
                              </div> */}
                              <div className="exp-text">
                                {ele.experience ?? 0} Years Experience
                              </div>
                            </div>
                            <div className="care-tag-text">
                              {ele.category ?? "NA"}
                            </div>
                          </div>
                          <div className="care-point-box">
                            <div className="care-point-icon">
                              <img src={Map} />
                            </div>
                            <div className="care-point-text">
                              <h4>Location:</h4>
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
                    <div key={indx} className="col-md-4 mt-2">
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
                          <Link
                            className="viewmorebtn"
                            to={
                              routes.advertisementDetails + `/${encode(ele.id)}`
                            }
                          >
                            View More
                          </Link>
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
