import React from "react";
import Searchicon from "../../../assets/provider/images/search-normal.svg";
import careuserprofile from "../../../assets/provider/images/user.png";
import attachemnt from "../../../assets/provider/images/attachemnt.svg";
import whcalendar from "../../../assets/provider/images/whcalendar.svg";
import Repeat from "../../../assets/provider/images/Repeat.svg";
const Page = () => {
  return (
    <>
      <div className="container">
        <div className="messages-section">
          <div className="row">
            <div className="col-md-4">
              <div className="chat-userlist-sidebar">
                <div className="chat-userlist-sidebar-head">
                  <div className="chat-panel-sidebar-icon"></div>
                  <h2>
                    New Messages <span>08 New</span>
                  </h2>
                </div>
                <div className="chat-userlist-sidebar-body">
                  <div className="chat-userlist-filter">
                    <input
                      type="text"
                      name=""
                      className="form-control"
                      placeholder="Search by Name"
                    />
                    <button class="search-btn">
                      <img src={Searchicon} alt="" />
                    </button>
                  </div>
                  <div className="chat-userlist-info">
                    <div className="chat-userlist-item">
                      <div className="chat-userlist-item-image">
                        <img src={careuserprofile} alt="" />
                        <span className="user-status"></span>
                      </div>
                      <div className="chat-userlist-item-content">
                        <h4>Patrick Hendricks</h4>
                        <p>hey! there I'm available</p>
                      </div>
                      <div className="chat-userlist-item-content">
                        <div className="chat-userlist-time">02:50 PM</div>
                        <div className="unread-message">
                          <span className="badge">02</span>
                        </div>
                      </div>
                    </div>

                    <div className="chat-userlist-item">
                      <div className="chat-userlist-item-image">
                        <img src={careuserprofile} alt="" />
                        <span className="user-status"></span>
                      </div>
                      <div className="chat-userlist-item-content">
                        <h4>Patrick Hendricks</h4>
                        <p>hey! there I'm available</p>
                      </div>
                      <div className="chat-userlist-item-content">
                        <div className="chat-userlist-time">02:50 PM</div>
                        <div className="unread-message">
                          <span className="badge">02</span>
                        </div>
                      </div>
                    </div>

                    <div className="chat-userlist-item">
                      <div className="chat-userlist-item-image">
                        <img src={careuserprofile} alt="" />
                        <span className="user-status"></span>
                      </div>
                      <div className="chat-userlist-item-content">
                        <h4>Patrick Hendricks</h4>
                        <p>hey! there I'm available</p>
                      </div>
                      <div className="chat-userlist-item-content">
                        <div className="chat-userlist-time">02:50 PM</div>
                        <div className="unread-message">
                          <span className="badge">02</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="messages-tab">
                <ul className="nav nav-tabs">
                  <li>
                    <a className="active" href="#Chat" data-bs-toggle="tab">
                      Chat
                    </a>
                  </li>

                  <li>
                    <a href="#Booking" data-bs-toggle="tab">
                      Booking
                    </a>
                  </li>
                </ul>
              </div>

              <div className="messages-tabs-content-info tab-content">
                <div className="tab-pane active" id="Chat">
                  <div className="chat-panel-section">
                    <div className="chat-panel-chat-header">
                      <div className="chat-panel-user-item">
                        <div className="chat-panel-user-item-image">
                          <img src={careuserprofile} alt="" />
                        </div>
                        <div className="chat-panel-user-item-text">
                          <h4>Patrick Hendricks</h4>
                          <p>Emp Id: 210</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="chat-panel-chat-body"
                      tabindex="1"
                      style={{ overflow: "auto", outline: "none" }}
                    >
                      <div className="chat-panel-chat-content">
                        <div className="messages-list">
                          <div className="message-item  outgoing-message">
                            <div className="message-item-chat-card">
                              <div className="message-item-user">
                                <img src={careuserprofile} alt="" />
                              </div>
                              <div className="message-item-chat-content">
                                <div className="message-content">
                                  Did you make sure to clean the CEO's Cabin? 😃
                                </div>
                                <div className="time">
                                  2 Sep 2023, Sat: 12:03pm
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="message-item ">
                            <div className="message-item-chat-card">
                              <div className="message-item-user">
                                <img src={careuserprofile} alt="" />
                              </div>
                              <div className="message-item-chat-content">
                                <div className="message-content">
                                  Yes Boss, I have taken care of that. I have
                                  also informed to other employees
                                </div>
                                <div className="time">
                                  2 Sep 2023, Sat: 12:05pm
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="message-item outgoing-message">
                            <div className="message-item-chat-card">
                              <div className="message-item-user">
                                <img src={careuserprofile} alt="" />
                              </div>
                              <div className="message-item-chat-content">
                                <div className="message-content">
                                  Click on the add image option Below?
                                </div>
                                <div className="time">
                                  2 Sep 2023, Sat: 12:03pm
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="message-item">
                            <div className="message-item-chat-card">
                              <div className="message-item-user">
                                <img src={careuserprofile} alt="" />
                              </div>
                              <div className="message-item-chat-content">
                                <div className="message-content">
                                  Okay, Understood wait let me check!!!. I have
                                  also informed to other employees
                                </div>
                                <div className="time">
                                  2 Sep 2023, Sat: 12:08pm
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="chat-panel-chat-footer">
                      <form>
                        <div className="row">
                          <div className="col-md-10">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Write a message."
                              />
                              <span className="form-attachemnt-icon">
                                <img src={attachemnt} alt="" />
                              </span>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <button className="btn-send" title="" type="button">
                              Send
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="tab-pane " id="Booking">
                  <div className="care-title-header">
                    <h2 className="heading-title">Booking</h2>
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
                            <img src={Searchicon} alt="" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ProviderProfile-section">
                    <div className="care-card">
                      <div className="care-card-head">
                        <div className="care-status">
                          Status: <span>Confirmed</span>
                        </div>

                        <div className="care-action">
                          <a href="#">View Detail</a>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-content">
                          <div className="title-text">Care For Marry Lane</div>
                          <div className="date-text">
                            <img src={whcalendar} alt="" /> Next Mon, 25 Jul,
                            09:00 Am- 05:00 PM
                          </div>
                        </div>
                        <div className="care-day-Weekly-info">
                          <div className="care-point-box">
                            <div className="care-point-icon">
                              <img src={Repeat} alt="" />
                            </div>
                            <div className="care-point-text">
                              <h4>Repeat Weekly:</h4>
                              <p>Every</p>
                            </div>
                          </div>
                          <div className="care-day-list">
                            <div className="care-day-item">S</div>
                            <div className="care-day-item">T</div>
                            <div className="care-day-item">W</div>
                          </div>
                        </div>
                      </div>
                      <div className="care-card-foot">
                        <div className="care-user-info">
                          <div className="care-user-image">
                            <img src={careuserprofile} alt="" />
                          </div>
                          <div className="care-user-text">
                            <div className="care-user-name">
                              Joseph Will Get Notified About Job Confirmation
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="care-card">
                      <div className="care-card-head">
                        <div className="care-status">
                          Status: <span>Confirmed</span>
                        </div>

                        <div className="care-action">
                          <a href="#">View Detail</a>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-content">
                          <div className="title-text">Care For Marry Lane</div>
                          <div className="date-text">
                            <img src={whcalendar} alt="" /> Next Mon, 25 Jul,
                            09:00 Am- 05:00 PM
                          </div>
                        </div>
                        <div className="care-day-Weekly-info">
                          <div className="care-point-box">
                            <div className="care-point-icon">
                              <img src={Repeat} alt="" />
                            </div>
                            <div className="care-point-text">
                              <h4>Repeat Weekly:</h4>
                              <p>Every</p>
                            </div>
                          </div>
                          <div className="care-day-list">
                            <div className="care-day-item">S</div>
                            <div className="care-day-item">T</div>
                            <div className="care-day-item">W</div>
                          </div>
                        </div>
                      </div>
                      <div className="care-card-foot">
                        <div className="care-user-info">
                          <div className="care-user-image">
                            <img src={careuserprofile} alt="" />
                          </div>
                          <div className="care-user-text">
                            <div className="care-user-name">
                              Joseph Will Get Notified About Job Confirmation
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
