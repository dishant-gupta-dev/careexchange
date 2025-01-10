import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Searchicon from "../../../assets/provider/images/search1.svg";
import Map from "../../../assets/user/images/Google_Map.svg";
import { api } from "../../../utlis/provider/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import moment from "moment";
import DatePicker from "react-datepicker";
import { routes } from "../../../utlis/provider/routes.utlis";
import { encode } from "base-64";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { subscribtionAuth } from "../../../utlis/common.utlis";

const Page = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("");
  const [startDate, setStartDate] = useState("");
  const [list, setList] = useState([]);

  const getDirectoryList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all network directory list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setList(response.data.data.ProviderList);
    } else setList([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    if (date != null && date != undefined && date != "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getDirectoryList(
      api.networkDirectory + `?user_type=${tab}&search=${name}&date=${date}`
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getDirectoryList(api.networkDirectory + `?user_type=${tab}`);
    subscribtionAuth(api.subscriptionAuth, navigate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="netdirect-section">
          <div className="care-title-header">
            <h2 className="heading-title">Network Directory </h2>
            <div className="search-filter wd50">
              <div className="row g-2">
                <div className="col-md-4">
                  <div className="form-group mb-0">
                    <DatePicker
                      toggleCalendarOnIconClick
                      showIcon
                      dateFormat={"MM-dd-yyyy"}
                      selected={startDate}
                      onChange={(date, e) => {
                        setStartDate(date);
                        handleFilter(e, date);
                      }}
                      className="form-control"
                      isClearable
                      autoComplete="off"
                      name="date"
                      placeholderText="Select Date"
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="form-group mb-0">
                    <div className="search-form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={(e) => handleFilter(e)}
                        name="name"
                      />
                      <span className="search-icon">
                        {" "}
                        <img src={Searchicon} alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="netdirect-content">
            <div className="netdirect-tab">
              <ul className="nav nav-tabs">
                <li>
                  <Link
                    className={tab == "" ? "active" : ""}
                    onClick={() => setTab("")}
                    data-bs-toggle="tab"
                  >
                    Show All
                  </Link>
                </li>
                <li>
                  <Link
                    className={tab == 3 ? "active" : ""}
                    data-bs-toggle="tab"
                    onClick={() => setTab(3)}
                  >
                    Care-Staff
                  </Link>
                </li>
                <li>
                  <Link
                    className={tab == 2 ? "active" : ""}
                    data-bs-toggle="tab"
                    onClick={() => setTab(2)}
                  >
                    Care-Provider
                  </Link>
                </li>
              </ul>
            </div>

            <div className="messages-tabs-content-info tab-content">
              <div className="tab-pane active" id="showall">
                <div className="row mt-2 g-3">
                  {list.length !== 0 ? (
                    list.map((ele, indx) => {
                      return (
                        <div className="col-md-4">
                          <div className="care-card mb-0">
                            <div className="care-card-head">
                              <div className="care-user-info">
                                <div className="care-user-image">
                                  {ele.logo !== null &&
                                  ele.logo !== "" &&
                                  ele.logo !== undefined ? (
                                    <img
                                      src={ele.logo}
                                      alt=""
                                      className="me-3"
                                    />
                                  ) : ele.profile_image === null ||
                                    ele.profile_image === "" ||
                                    ele.profile_image === undefined ? (
                                    <img
                                      src={NoImage}
                                      alt=""
                                      className="me-3"
                                    />
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
                                    {ele.average_rating ?? "0.0"}
                                  </div>
                                </div>
                              </div>
                              <div className="strip-text mt-2">
                                {ele.user_type == 3 ? "Staff" : "Provider"}
                              </div>
                            </div>
                            <div className="care-card-body">
                              <div className="exp-text mb-2">
                                {ele.experience ?? 0} Years Experience
                              </div>
                              <div className="pointtags-list">
                                <div className="tags-item">
                                  {ele.category ?? "NA"}
                                </div>
                                <div className="tags-item-sub">
                                  {ele.subcategory ?? "NA"}
                                </div>
                              </div>

                              <div className="care-location-box">
                                <div className="care-point-icon">
                                  <img src={Map} />
                                </div>
                                <div className="care-location-text">
                                  <h4>Location</h4>
                                  <p>{ele.business_address ?? "NA"}</p>
                                </div>
                              </div>
                              <div className="care-location-box-action">
                                <Link
                                  className="btn-bl"
                                  to=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(routes.userDetail, {
                                      state: {
                                        id: encode(ele.id),
                                      },
                                    });
                                  }}
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "5% 0",
                      }}
                    >
                      <img width={300} src={NoData} alt="" />
                    </div>
                  )}
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
