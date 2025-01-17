import React, { useEffect, useState, useRef } from "react";
import careuserprofile from "../../../assets/provider/images/user.png";
import googlemap from "../../../assets/provider/images/Google_Map.svg";
import Searchicon from "../../../assets/provider/images/search-normal.svg";
import Arrowicon from "../../../assets/provider/images/arrow-right.svg";
import careservicesicon1 from "../../../assets/provider/images/ss-care.svg";
import careservicesicon2 from "../../../assets/provider/images/ch-care.svg";
import { api } from "../../../utlis/staff/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import { GeolocationApiKey } from "../../../utlis/common.utlis";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NoImage from "../../../assets/admin/images/no-image.jpg";

const Page = () => {
  const options = [];
  const [dashboard, setDashboard] = useState();
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateVal, setDate] = useState("");
  const inputRef = useRef(null);
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    address: null,
    state: null,
  });

  const getDashboardData = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all dashboard => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setDashboard(response.data.data);
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
                <div className="align-items-center justify-content-center d-flex" style={{height: "100px !important"}}>
                  <div className="strip-text">Care Staff</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="find-location-section">
              <div className="search-section">
                <div className="search-location-card-1">
                  <div className="search-input-info d-flex align-items-center">
                    <span className="ms-2">
                      <img src={googlemap} alt="" />
                    </span>
                    {isLoaded && (
                      <StandaloneSearchBox
                        onLoad={(ref) => (inputRef.current = ref)}
                        onPlacesChanged={handlePlaceChange}
                      >
                        <input
                          className="form-control"
                          placeholder="Where are you going?"
                          style={{ width: "220%", padding: "10px 11px" }}
                          defaultValue={location.address}
                        />
                      </StandaloneSearchBox>
                    )}
                  </div>
                  <div className="search-btn-info">
                    <button className="intake-btn-done">
                      <img src={Arrowicon} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            <div className="row">
              <div className="col-lg-12">
                <div className=" schedule-card-1">
                  <div className="schedule-card-content">
                    <div className="schedule-card-text">Network Directory</div>
                  </div>
                  <div className="dropdown-select">
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
              <div className="col-lg-12  mt-4">
                <div className="careservices-section">
                  <div className="care-title-header">
                    <h2 className="heading-title">
                      Care Services You Are Looking For?
                    </h2>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <div className="careservices-card">
                        <div className="careservices-icon m-0">
                          <img src={careservicesicon1} alt="" />
                        </div>
                        <Link className="careservices-text d-flex justify-content-between align-items-end">
                          <h2>
                            Active Jobs{" "}
                            <i className="mdi mdi-arrow-right ms-2"></i>
                          </h2>
                          <h3>{dashboard?.activeJobCount ?? 0}</h3>
                        </Link>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="careservices-card">
                        <div className="careservices-icon m-0">
                          <img src={careservicesicon2} alt="" />
                        </div>
                        <Link
                          data-bs-toggle="modal"
                          data-bs-target="#locked-job-requests"
                          data-bs-dismiss="modal"
                          href="#"
                          className="careservices-text d-flex justify-content-between align-items-end"
                        >
                          <h2>
                            Locked Jobs Request{" "}
                            <i className="mdi mdi-arrow-right ms-2"></i>
                          </h2>
                          <h3>{dashboard?.lockedJobCount ?? 0}</h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="calender-card">
              <Calendar
                onChange={(e) => setDate(e)}
                defaultView="month"
                value={dateVal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
