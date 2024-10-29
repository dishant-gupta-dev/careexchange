import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import ApiService from "../../../core/services/ApiService";
import { serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import VerifyImg from "../../../assets/user/images/verify.svg";
import SearchImg from "../../../assets/user/images/search-normal.svg";
import { api } from "../../../utlis/user/api.utlis";

const Page = () => {
  let userId = JSON.parse(localStorage.getItem("careexchange")).userId;
  const [loading, setLoading] = useState(false);
  const [providers, setProvider] = useState([]);
  const [status, setStatus] = useState(0);
  const [sendInfo, setSenderData] = useState({
    senderId: null,
    name: "",
    image:
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp",
  });
  const [message, setMessage] = useState("");
  const [messagesData, setMessagesData] = useState([]);

  const getProviders = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all providers list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setProvider(response.data.data.ProviderList);
    } else setProvider([]);
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProviders(api.providerList + `?user_type=2`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div class="container">
        <div class="messages-section">
          <div class="row">
            <div class="col-md-4">
              <div class="chat-userlist-sidebar">
                <div class="chat-userlist-sidebar-head">
                  <div class="chat-panel-sidebar-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      {" "}
                      <path
                        d="M17 9C17 12.87 13.64 16 9.5 16L8.57001 17.12L8.02 17.78C7.55 18.34 6.65 18.22 6.34 17.55L5 14.6C3.18 13.32 2 11.29 2 9C2 5.13 5.36 2 9.5 2C12.52 2 15.13 3.67001 16.3 6.07001C16.75 6.96001 17 7.95 17 9Z"
                        stroke="#4F5168"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M22 12.86C22 15.15 20.82 17.18 19 18.46L17.66 21.41C17.35 22.08 16.45 22.21 15.98 21.64L14.5 19.86C12.08 19.86 9.92001 18.79 8.57001 17.12L9.5 16C13.64 16 17 12.87 17 9C17 7.95 16.75 6.96001 16.3 6.07001C19.57 6.82001 22 9.57999 22 12.86Z"
                        stroke="#4F5168"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M7 9H12"
                        stroke="#7BC043"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </svg>
                  </div>
                  <h2>
                    New Messages <span>08 New</span>
                  </h2>
                </div>
                <div class="chat-userlist-sidebar-body">
                  <div class="chat-userlist-filter">
                    <input
                      type="text"
                      name=""
                      class="form-control"
                      placeholder="Search by Name"
                    />
                    <button class="search-btn">
                      <img src={SearchImg} />
                    </button>
                  </div>
                  <div class="chat-userlist-info">
                    {providers.length !== 0
                      ? providers.map((ele, indx) => {
                          return (
                            <div key={indx} class="chat-userlist-item">
                              <div class="chat-userlist-item-image">
                                {ele.logo !== null &&
                                ele.logo !== "" &&
                                ele.logo !== undefined ? (
                                  <img src={ele.logo} alt="" className="me-3" />
                                ) : (
                                  <img
                                    src={ele.profile_image}
                                    alt=""
                                    className="me-3"
                                  />
                                )}
                                <span class="user-status"></span>
                              </div>
                              <div class="chat-userlist-item-content">
                                <h4>
                                  {ele?.business_name
                                    ? ele?.business_name
                                    : ele?.fullname}
                                </h4>
                                <p>{ele.email ?? "NA"}</p>
                              </div>
                              {/* <div class="chat-userlist-item-content">
                                <div class="chat-userlist-time">02:50 PM</div>
                                <div class="unread-message">
                                  <span class="badge">02</span>
                                </div>
                              </div> */}
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              {sendInfo.senderId && (
                <>
                  <div class="messages-tab">
                    <ul class="nav nav-tabs">
                      <li>
                        <a class="active" href="#Chat" data-bs-toggle="tab">
                          Chat
                        </a>
                      </li>
                      <li>
                        <a href="#ProviderProfile" data-bs-toggle="tab">
                          Provider Profile
                        </a>
                      </li>
                      <li>
                        <a href="#Booking" data-bs-toggle="tab">
                          Booking
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="messages-tabs-content-info tab-content">
                    <div class="tab-pane active" id="Chat">
                      <div class="chat-panel-section">
                        <div class="chat-panel-chat-header">
                          <div class="chat-panel-user-item">
                            <div class="chat-panel-user-item-image">
                              <img src="images/user-default.png" />
                            </div>
                            <div class="chat-panel-user-item-text">
                              <h4>Patrick Hendricks</h4>
                              <p>Emp Id: 210</p>
                            </div>
                          </div>
                        </div>
                        <div
                          class="chat-panel-chat-body"
                          tabindex="1"
                          style={{ overflow: "auto", outline: "none" }}
                        >
                          <div class="chat-panel-chat-content">
                            <div class="messages-list">
                              <div class="message-item  outgoing-message">
                                <div class="message-item-chat-card">
                                  <div class="message-item-user">
                                    <img src="images/user-default.png" />
                                  </div>
                                  <div class="message-item-chat-content">
                                    <div class="message-content">
                                      Did you make sure to clean the CEO's
                                      Cabin? 😃
                                    </div>
                                    <div class="time">
                                      2 Sep 2023, Sat: 12:03pm
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="message-item ">
                                <div class="message-item-chat-card">
                                  <div class="message-item-user">
                                    <img src="images/user-default.png" />
                                  </div>
                                  <div class="message-item-chat-content">
                                    <div class="message-content">
                                      Yes Boss, I have taken care of that. I
                                      have also informed to other employees
                                    </div>
                                    <div class="time">
                                      2 Sep 2023, Sat: 12:05pm
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="message-item outgoing-message">
                                <div class="message-item-chat-card">
                                  <div class="message-item-user">
                                    <img src="images/user-default.png" />
                                  </div>
                                  <div class="message-item-chat-content">
                                    <div class="message-content">
                                      Click on the add image option Below?
                                    </div>
                                    <div class="time">
                                      2 Sep 2023, Sat: 12:03pm
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="message-item">
                                <div class="message-item-chat-card">
                                  <div class="message-item-user">
                                    <img src="images/user-default.png" />
                                  </div>
                                  <div class="message-item-chat-content">
                                    <div class="message-content">
                                      Okay, Understood wait let me check!!!. I
                                      have also informed to other employees
                                    </div>
                                    <div class="time">
                                      2 Sep 2023, Sat: 12:08pm
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="chat-panel-chat-footer">
                          <form>
                            <div class="row">
                              <div class="col-md-10">
                                <div class="form-group">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Write a message."
                                  />
                                  <span class="form-attachemnt-icon">
                                    <img src="images/attachemnt.svg" />
                                  </span>
                                </div>
                              </div>
                              <div class="col-md-2">
                                <button class="btn-send" title="" type="button">
                                  Send
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    {/* <div class="tab-pane " id="ProviderProfile">
                  <div class="providerProfile-section">
                    <div class="user-table-item">
                      <div class="row g-1 align-items-center">
                        <div class="col-md-4">
                          <div class="user-profile-item">
                            <div class="user-profile-media">
                              <img src="images/user.png" />
                            </div>
                            <div class="user-profile-text">
                              <h2>Joseph Phill</h2>
                              <div class="location-text">Atlanta GA, 63993</div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div class="row g-1 align-items-center">
                            <div class="col-md-4">
                              <div class="user-contact-info">
                                <div class="user-contact-info-icon">
                                  <img src="images/star.svg" />
                                </div>
                                <div class="user-contact-info-content">
                                  <h2>Rating</h2>
                                  <p>4.2</p>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="user-contact-info">
                                <div class="user-contact-info-icon">
                                  <img src="images/dollar-circle.svg" />
                                </div>
                                <div class="user-contact-info-content">
                                  <h2>Rate</h2>
                                  <p>22.50 Per Hr</p>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="user-contact-info">
                                <div class="user-contact-info-icon">
                                  <img src="images/briefcase.svg" />
                                </div>
                                <div class="user-contact-info-content">
                                  <h2>Experience</h2>
                                  <p>+3 Years</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="providerProfile-point">
                        <div class="providerprofile-point-item">
                          <img src="images/house.svg" /> Cared 3 Families
                        </div>
                        <div class="providerprofile-point-item">
                          <img src="images/Handshake.svg" /> Hired By 8 Families
                          In Your Neighbourhood
                        </div>
                      </div>
                    </div>

                    <div class="providerprofile-overview">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="overview-card">
                            <div class="overview-content">
                              <h2>Repeat Clients</h2>
                              <h4>02</h4>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="overview-card">
                            <div class="overview-content">
                              <h2>Response Rate</h2>
                              <h4>90%</h4>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="overview-card">
                            <div class="overview-content">
                              <h2>Response Time</h2>
                              <h4>01 Hr</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="providerprofile-about">
                      <h2>About Joseph</h2>
                      <p>
                        I Have Prior Experience Working With Children And Senior
                        Person As A Nanny Sitter And As Father For Over 10
                        Years, I Am A Preschool Teacher{" "}
                      </p>
                    </div>

                    <div class="providerprofile-about">
                      <h2>Offering Services</h2>
                      <div class="providerprofile-tag-list">
                        <div class="providerprofile-tag">Senior Care</div>
                        <div class="providerprofile-tag">Home Care</div>
                        <div class="providerprofile-tag">Assisted Living</div>
                        <div class="providerprofile-tag">Pet Care</div>
                        <div class="providerprofile-tag">Grooming</div>
                      </div>
                    </div>

                    <div class="review-card">
                      <div class="review-card-content">
                        <div class="review-card-icon">
                          <img src="images/starwh.svg" />
                        </div>
                        <div class="review-card-text">
                          <h3>Rating & Review</h3>
                          <p>4.7(400k +)</p>
                        </div>
                      </div>
                      <div class="review-card-action">
                        <a href="#">Write your Review</a>
                      </div>
                    </div>

                    <div class="care-comment-list">
                      <div class="care-comment-item">
                        <div class="care-comment-profile">
                          <img src="images/user.png" />
                        </div>
                        <div class="care-comment-content">
                          <div class="care-comment-head">
                            <div class="">
                              <h2>Robert Fox</h2>
                              <div class="care-comment-rating">
                                <i class="fa-regular fa-star"></i> 4.2
                              </div>
                            </div>
                            <div class="care-date">
                              <i class="las la-calendar"></i>08 Jan, 2023,
                              09:30PM
                            </div>
                          </div>
                          <div class="care-comment-descr">
                            Exellent course learnt so many things
                          </div>
                        </div>
                      </div>

                      <div class="care-comment-item">
                        <div class="care-comment-profile">
                          <img src="images/user.png" />
                        </div>
                        <div class="care-comment-content">
                          <div class="care-comment-head">
                            <div class="">
                              <h2>Robert Fox</h2>
                              <div class="care-comment-rating">
                                <i class="fa-regular fa-star"></i> 4.2
                              </div>
                            </div>
                            <div class="care-date">
                              <i class="las la-calendar"></i>08 Jan, 2023,
                              09:30PM
                            </div>
                          </div>
                          <div class="care-comment-descr">
                            Exellent course learnt so many things
                          </div>
                        </div>
                      </div>

                      <div class="care-comment-item">
                        <div class="care-comment-profile">
                          <img src="images/user.png" />
                        </div>
                        <div class="care-comment-content">
                          <div class="care-comment-head">
                            <div class="">
                              <h2>Robert Fox</h2>
                              <div class="care-comment-rating">
                                <i class="fa-regular fa-star"></i> 4.2
                              </div>
                            </div>
                            <div class="care-date">
                              <i class="las la-calendar"></i>08 Jan, 2023,
                              09:30PM
                            </div>
                          </div>
                          <div class="care-comment-descr">
                            Exellent course learnt so many things
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                    {/* <div class="tab-pane " id="Booking">
                  <div class="care-title-header">
                    <h2 class="heading-title">Booking</h2>
                    <div class="search-filter wd30">
                      <div class="form-group">
                        <div class="search-form-group">
                          <input
                            type="text"
                            name=""
                            class="form-control"
                            placeholder="Search "
                          />
                          <span class="search-icon">
                            <img src="images/search1.svg" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="ProviderProfile-section">
                    <div class="care-card">
                      <div class="care-card-head">
                        <div class="care-status">
                          Status: <span>Confirmed</span>
                        </div>

                        <div class="care-action">
                          <a href="#">View Detail</a>
                        </div>
                      </div>
                      <div class="care-card-body">
                        <div class="care-content">
                          <div class="title-text">Care For Marry Lane</div>
                          <div class="date-text">
                            <img src="images/whcalendar.svg" /> Next Mon, 25
                            Jul, 09:00 Am- 05:00 PM
                          </div>
                        </div>
                        <div class="care-day-Weekly-info">
                          <div class="care-point-box">
                            <div class="care-point-icon">
                              <img src="images/Repeat.svg" />
                            </div>
                            <div class="care-point-text">
                              <h4>Repeat Weekly:</h4>
                              <p>Every</p>
                            </div>
                          </div>
                          <div class="care-day-list">
                            <div class="care-day-item">S</div>
                            <div class="care-day-item">T</div>
                            <div class="care-day-item">W</div>
                          </div>
                        </div>
                      </div>
                      <div class="care-card-foot">
                        <div class="care-user-info">
                          <div class="care-user-image">
                            <img src="images/user.png" />
                          </div>
                          <div class="care-user-text">
                            <div class="care-user-name">
                              Joseph Will Get Notified About Job Confirmation
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="care-card">
                      <div class="care-card-head">
                        <div class="care-status">
                          Status: <span>Confirmed</span>
                        </div>

                        <div class="care-action">
                          <a href="#">View Detail</a>
                        </div>
                      </div>
                      <div class="care-card-body">
                        <div class="care-content">
                          <div class="title-text">Care For Marry Lane</div>
                          <div class="date-text">
                            <img src="images/whcalendar.svg" /> Next Mon, 25
                            Jul, 09:00 Am- 05:00 PM
                          </div>
                        </div>
                        <div class="care-day-Weekly-info">
                          <div class="care-point-box">
                            <div class="care-point-icon">
                              <img src="images/Repeat.svg" />
                            </div>
                            <div class="care-point-text">
                              <h4>Repeat Weekly:</h4>
                              <p>Every</p>
                            </div>
                          </div>
                          <div class="care-day-list">
                            <div class="care-day-item">S</div>
                            <div class="care-day-item">T</div>
                            <div class="care-day-item">W</div>
                          </div>
                        </div>
                      </div>
                      <div class="care-card-foot">
                        <div class="care-user-info">
                          <div class="care-user-image">
                            <img src="images/user.png" />
                          </div>
                          <div class="care-user-text">
                            <div class="care-user-name">
                              Joseph Will Get Notified About Job Confirmation
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
