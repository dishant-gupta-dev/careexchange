import React, { useEffect, useState, useRef } from "react";
import Arrowicon from "../../../assets/provider/images/arrow-right.svg";
import { api } from "../../../utlis/provider/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import {
  GeolocationApiKey,
  subscribtionAuth,
} from "../../../utlis/common.utlis";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { routes } from "../../../utlis/provider/routes.utlis";
import moment from "moment";
import { encode } from "base-64";
let events = [];

const Page = () => {
  const options = [];
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [dateVal, setDate] = useState("");
  const inputRef = useRef(null);
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    address: null,
    state: null,
  });

  const hasEvent = (date) => {
    return events.some(
      (event) => event.date === moment(date).format("yyyy-MM-DD")
    );
  };

  const getDashboardData = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all dashboard => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setDashboard(response.data.data);
      events = [];
      response.data.data.calendarEvents.days.map((element) => {
        events.push({
          date: moment(element.start_date).format("yyyy-MM-DD"),
          title: element.job_id ?? "NA",
        });
      });
    } else setDashboard();
    setLoading(false);
  };

  const getStateList = async (api) => {
    const response = await ApiService.getAPI(api);
    // console.log("state list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      response.data.data.states.forEach((element) => {
        options.push({ value: element.id, label: element.name });
      });
      setState(options);
    } else setState([]);
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
    getDashboardData(api.dashboard);
    getCurrentAddress();
    subscribtionAuth(api.subscriptionAuth, navigate);
    getStateList(api.stateList + `?country_id=231`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="row g-2">
          <div className="col-md-6">
            <div className="care-card">
              <div className="care-card-head-1">
                <div className="care-user-info">
                  <div className="care-user-image">
                    {dashboard?.ProviderDetail?.logo !== null &&
                    dashboard?.ProviderDetail?.logo !== "" &&
                    dashboard?.ProviderDetail?.logo !== undefined ? (
                      <img src={dashboard?.ProviderDetail?.logo} alt="" />
                    ) : dashboard?.ProviderDetail?.profile_image === null ||
                      dashboard?.ProviderDetail?.profile_image === "" ||
                      dashboard?.ProviderDetail?.profile_image === undefined ? (
                      <img src={NoImage} alt="" />
                    ) : (
                      <img
                        src={dashboard?.ProviderDetail?.profile_image}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="care-user-text">
                    <div className="care-user-name">
                      Hello,{" "}
                      {dashboard?.ProviderDetail?.business_name
                        ? dashboard?.ProviderDetail?.business_name
                        : dashboard?.ProviderDetail?.fullname}
                    </div>
                    <div className="care-user-rating">
                      <i className="mdi mdi-star"></i>{" "}
                      {dashboard?.avarageRating?.average_rating ?? "0.0"}
                    </div>
                  </div>
                </div>
                <div
                  className="align-items-center justify-content-center d-flex"
                  style={{ height: "100px !important" }}
                >
                  <div className="strip-text">Provider</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="network-schedule-card">
              <div className="network-schedule-card-content">
                <div className="network-schedule-card-text">
                  Network Directory
                </div>
              </div>
              <div className="network-dropdown-select dropdown-select">
                <select className="form-control text-capitalize">
                  <option value="">Select State</option>
                  {state.length !== 0
                    ? state.map((ele, indx) => {
                        return (
                          <option key={indx} value={ele.value}>
                            {ele.label}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            <div className="row">
              <div className="col-lg-12">
                <div className="careservices-section">
                  <div className="care-title-header">
                    <h2 className="heading-title">
                      Ongoing Jobs ({dashboard?.activeJobCount ?? 0})
                    </h2>
                    <Link className="btn-gr" to={routes.myJobs}>
                      {" "}
                      View All{" "}
                    </Link>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-12">
                      <div className="job-table-content">
                        <div className="job-table-box">
                          {dashboard?.activeJobs.length !== 0
                            ? dashboard?.activeJobs.map((ele, indx) => {
                                return (
                                  <div key={indx} className="job-table-item">
                                    <div className="job-table-col-3">
                                      <div className="job-task-item">
                                        <p>Job ID</p>
                                        <h4>{ele.job_id ?? "NA"}</h4>
                                      </div>
                                    </div>
                                    <div className="job-table-col-3">
                                      <div className="job-task-item">
                                        <p>Name</p>
                                        <h4>{ele.first_name ?? "NA"}</h4>
                                      </div>
                                    </div>

                                    <div className="job-table-col-2">
                                      <div className="job-task-item">
                                        <p>Date</p>
                                        <h4>
                                          {ele.start_date ?? "NA"}{" "}
                                          {ele.start_time ?? ""}
                                        </h4>
                                      </div>
                                    </div>
                                    <div className="job-table-col-2">
                                      <div className="job-task-item">
                                        <p>Gender</p>
                                        <h4>
                                          {ele.gender == "M"
                                            ? "Male"
                                            : "Female"}
                                        </h4>
                                      </div>
                                    </div>

                                    <div className="job-table-col-1">
                                      <div className="job-task-item">
                                        <p>Age</p>
                                        <h4>{ele.age ?? "NA"}</h4>
                                      </div>
                                    </div>

                                    <div className="job-table-col-1">
                                      <div className="action-btn-info">
                                        <Link
                                          className="action-btn"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            navigate(routes.jobDetails, {
                                              state: {
                                                id: encode(ele.id),
                                              },
                                            });
                                          }}
                                        >
                                          <img src={Arrowicon} alt="" />
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
                  </div>
                </div>
              </div>

              <div className="col-lg-12  mt-2">
                <div className="careservices-section">
                  <div className="care-title-header">
                    <h2 className="heading-title">
                      Locked Jobs Request ({dashboard?.lockedJobCount ?? 0})
                    </h2>
                    <Link className="btn-gr" to={routes.lockedJobs}>
                      {" "}
                      View All{" "}
                    </Link>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-12">
                      <div className="job-table-content">
                        <div className="job-table-box">
                          {dashboard?.lockedJobs.length !== 0
                            ? dashboard?.lockedJobs.map((ele, indx) => {
                                return (
                                  <div key={indx} className="job-table-item">
                                    <div className="job-table-col-3">
                                      <div className="job-task-item">
                                        <p>Job ID</p>
                                        <h4>{ele.job_id ?? "NA"}</h4>
                                      </div>
                                    </div>
                                    <div className="job-table-col-3">
                                      <div className="job-task-item">
                                        <p>Name</p>
                                        <h4>{ele.first_name ?? "NA"}</h4>
                                      </div>
                                    </div>

                                    <div className="job-table-col-2">
                                      <div className="job-task-item">
                                        <p>Date</p>
                                        <h4>
                                          {ele.start_date ?? "NA"}{" "}
                                          {ele.start_time ?? ""}
                                        </h4>
                                      </div>
                                    </div>
                                    <div className="job-table-col-2">
                                      <div className="job-task-item">
                                        <p>Gender</p>
                                        <h4>
                                          {ele.gender == "M"
                                            ? "Male"
                                            : "Female"}
                                        </h4>
                                      </div>
                                    </div>

                                    <div className="job-table-col-1">
                                      <div className="job-task-item">
                                        <p>Age</p>
                                        <h4>{ele.age ?? "NA"}</h4>
                                      </div>
                                    </div>

                                    <div className="job-table-col-1">
                                      <div className="action-btn-info">
                                        <Link
                                          className="action-btn"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            navigate(routes.jobDetails, {
                                              state: {
                                                id: encode(ele.id),
                                              },
                                            });
                                          }}
                                        >
                                          <img src={Arrowicon} alt="" />
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="care-title-header">
              <h2 className="heading-title">Calender</h2>
            </div>
            <div className="calender-card">
              <Calendar
                onChange={(e) => {
                  setDate(e);
                  navigate(routes.calendar, {
                    state: {
                      dates: moment(e).format('DD'),
                      months: moment(e).format('MM'),
                      years: moment(e).format('yyyy'),
                    },
                  });
                }}
                defaultView="month"
                value={dateVal}
                tileClassName={({ date, view }) =>
                  view === "month" && hasEvent(date) ? "highlight" : null
                }
              />
            </div>

            <div className="care-title-header mt-3">
              <h2 className="heading-title">Today's Schedule Jobs</h2>
            </div>

            <div className="job-table-content">
              <div className="job-table-box">
                {dashboard?.calendarEvents?.days.length !== 0
                  ? dashboard?.calendarEvents?.days.map((ele, indx) => {
                      return (
                        <div key={indx} className="job-table-item">
                          <div className="job-table-col-3">
                            <div className="job-task-item">
                              <p>Job ID</p>
                              <h4>{ele.job_id ?? "NA"}</h4>
                            </div>
                          </div>
                          <div className="job-table-col-3">
                            <div className="job-task-item">
                              <p>Name</p>
                              <h4>{ele.first_name ?? "NA"}</h4>
                            </div>
                          </div>

                          <div className="job-table-col-3">
                            <div className="job-task-item">
                              <p>Date</p>
                              <h4>
                                {moment(ele.start_date).format("MM-DD-yyyy")}
                              </h4>
                            </div>
                          </div>
                          <div className="job-table-col-2">
                            <div className="job-task-item">
                              <p>Frequency</p>
                              <h4>
                                {ele.frequency === "O"
                                  ? "One Time"
                                  : ele.frequency === "W"
                                  ? "Repeat Weekly"
                                  : "Repeat Monthly"}
                              </h4>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
