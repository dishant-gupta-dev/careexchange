import React, { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase";
import ApiService from "../../../core/services/ApiService";
import { serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import Search from "../../../assets/provider/images/search1.svg";
import Searchicon from "../../../assets/provider/images/search-normal.svg";
import locationImage from "../../../assets/admin/images/Google_Map.svg";
import careuserprofile from "../../../assets/provider/images/user.png";
import AttachImg from "../../../assets/provider/images/attachemnt.svg";
import WhCalen from "../../../assets/provider/images/whcalendar.svg";
import RepeatImg from "../../../assets/provider/images/Repeat.svg";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { api } from "../../../utlis/provider/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import { subscribtionAuth } from "../../../utlis/common.utlis";

const Page = () => {
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  let userId = JSON.parse(localStorage.getItem("careexchange")).userId;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(1);
  const [users, setUser] = useState([]);
  const [myDetails, setMyDetails] = useState();
  const [details, setDetails] = useState();
  const [list, setList] = useState([]);
  const [sendInfo, setSenderData] = useState({
    senderId: null,
    name: "",
    image:
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp",
  });
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [messagesData, setMessagesData] = useState([]);

  const getUsers = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all users list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setUser(response.data.data.userList);
    } else setUser([]);
    setLoading(false);
  };

  const bookingList = async (api) => {
    const res = await ApiService.getAPIWithAccessToken(api);
    if (
      res.data.status &&
      res.data.statusCode === 200 &&
      res.data?.data?.bookingList
    ) {
      setList(res.data?.data?.bookingList);
    } else setList([]);
  };

  const createGroup = async (id, name, image, exist = false) => {
    setSenderData({ senderId: id, name: name, image: image });
    setMessagesData([]);
    setStatus(1);
    bookingList(api.userBookingList + `?userId=${id}`);
  };

  const convertTime = (time) => {
    if (time && time.seconds && time.nanoseconds) {
      const fireBaseTime = new Date(
        time.seconds * 1000 + time.nanoseconds / 1000000
      );
      return fireBaseTime.toString();
    } else return new Date();
  };

  const handleKey = (e) => {
    e.code === "Enter" && sendMessage();
  };

  const sendMessage = async () => {
    if (message == "") {
    } else {
      try {
        // const docid = sendInfo.senderId + "-" + userId;
        const docid =
          sendInfo.senderId > userId
            ? userId + "-" + sendInfo.senderId
            : sendInfo.senderId + "-" + userId;
        const data = {
          text: message,
          image: "",
          sendBy: userId,
          sendto: sendInfo.senderId,
          username: sendInfo.name,
          userimage: sendInfo.image,
          user: {
            _id: userId,
          },
        };
        db.collection("provider_chats")
          .doc(docid)
          .collection("messages")
          .add({ ...data, createdAt: serverTimestamp() });
        setMessage("");

        const res = await db
          .collection("provider_chats")
          .doc(docid)
          .collection("messages")
          .get();
      } catch (error) {
        // console.log("Error in send message function :- ", error);
      }
    }
  };

  const handleFilter = (e) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    bookingList(
      api.userBookingList + `?userId=${sendInfo.senderId}&search=${name}`
    );
  };

  const getMyProfile = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log(response.data.data);
    if (response.data.status && response.data.statusCode === 200) {
      setMyDetails(response.data.data);
    } else setMyDetails();
    setLoading(false);
  };

  useEffect(() => {
    getUsers(api.userChatList);
    subscribtionAuth(api.subscriptionAuth, navigate);
    getMyProfile(api.profile);
  }, []);

  useEffect(() => {
    if (sendInfo.senderId) {
      // const docid = sendInfo.senderId + "-" + userId;
      const docid =
        sendInfo.senderId > userId
          ? userId + "-" + sendInfo.senderId
          : sendInfo.senderId + "-" + userId;

      const getMessage = db
        .collection("provider_chats")
        .doc(docid)
        .collection("messages")
        .orderBy("createdAt", "asc");

      const allMessgae = getMessage.onSnapshot((ele) => {
        setMessagesData(
          ele.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendInfo, message]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="messages-section">
          <div className="row">
            <div className="col-md-4">
              <div className="chat-userlist-sidebar">
                <div className="chat-userlist-sidebar-head">
                  <div className="chat-panel-sidebar-icon"></div>
                  <h2>
                    New Messages
                    {/* <span>08 New</span> */}
                  </h2>
                </div>
                <div className="chat-userlist-sidebar-body">
                  <div className="chat-userlist-filter">
                    <input
                      type="text"
                      name=""
                      className="form-control"
                      id="searchInput"
                      placeholder="Search by Name"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className="search-btn"
                      type="button"
                      onClick={() =>
                        getUsers(api.userChatList + `?search=${search}`)
                      }
                    >
                      <img src={Searchicon} />
                    </button>
                    <button
                      className="search-btn"
                      type="button"
                      onClick={() => {
                        getUsers(api.userChatList);
                        document.getElementById("searchInput").value = "";
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.16992 14.83L14.8299 9.16998"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.8299 14.83L9.16992 9.16998"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="chat-userlist-info">
                    {users.length !== 0 ? (
                      users.map((ele, indx) => {
                        return (
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              createGroup(
                                ele.userid,
                                ele?.fullname ? ele?.fullname : "NA",
                                ele.image !== null &&
                                  ele.image !== "" &&
                                  ele.image !== undefined
                                  ? ele.image
                                  : NoImage
                              )
                            }
                            key={indx}
                            className={
                              sendInfo.senderId === ele.userid
                                ? "chat-userlist-item active"
                                : "chat-userlist-item"
                            }
                          >
                            <Link to="">
                              <div className="chat-userlist-item-image">
                                {ele.image !== null &&
                                ele.image !== "" &&
                                ele.image !== undefined ? (
                                  <img
                                    src={ele.image}
                                    alt=""
                                    className="me-3"
                                  />
                                ) : (
                                  <img src={NoImage} alt="" className="me-3" />
                                )}
                                {/* <span className="user-status"></span> */}
                              </div>
                            </Link>
                            <div className="chat-userlist-item-content">
                              <h4>{ele?.fullname ?? ""}</h4>
                              <p>{ele.email ?? "NA"}</p>
                            </div>
                            {/* <div className="chat-userlist-item-content">
                                <div className="chat-userlist-time">02:50 PM</div>
                                <div className="unread-message">
                                  <span className="badge">02</span>
                                </div>
                              </div> */}
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
            <div className="col-md-8">
              {sendInfo.senderId && (
                <>
                  <div className="messages-tab">
                    <ul className="nav nav-tabs">
                      <li>
                        <Link
                          className={status === 1 ? "active" : ""}
                          onClick={() => {
                            setStatus(1);
                            bookingList(
                              api.userBookingList +
                                `?userId=${sendInfo.senderId}`
                            );
                          }}
                          to=""
                          data-bs-toggle="tab"
                        >
                          Chat
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={status === 2 ? "active" : ""}
                          onClick={() => {
                            setStatus(2);
                            bookingList(
                              api.userBookingList +
                                `?userId=${sendInfo.senderId}`
                            );
                          }}
                          to=""
                          data-bs-toggle="tab"
                        >
                          Booking
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="messages-tabs-content-info tab-content">
                    {status === 1 ? (
                      <div className="tab-pane active" id="Chat">
                        <div className="chat-panel-section">
                          <div className="chat-panel-chat-header">
                            <div className="chat-panel-user-item">
                              <div className="chat-panel-user-item-image">
                                <img src={sendInfo.image} />
                              </div>
                              <div className="chat-panel-user-item-text">
                                <h4>{sendInfo.name ?? "NA"}</h4>
                                <p>Emp Id: {sendInfo.senderId ?? "NA"}</p>
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
                                {messagesData.length !== 0 ? (
                                  messagesData.map(({ data }, i) => {
                                    return (
                                      <div
                                        key={i}
                                        className={
                                          parseInt(data.sendBy) === userId
                                            ? "message-item outgoing-message"
                                            : "message-item"
                                        }
                                      >
                                        <div className="message-item-chat-card">
                                          <div className="message-item-user">
                                            {parseInt(data.sendBy) ===
                                            userId ? (
                                              myDetails?.logo !== null &&
                                              myDetails?.logo !== "" &&
                                              myDetails?.logo !== undefined ? (
                                                <img
                                                  src={myDetails?.logo}
                                                  alt=""
                                                />
                                              ) : myDetails?.image === null ||
                                                myDetails?.image === "" ||
                                                myDetails?.image ===
                                                  undefined ? (
                                                <img src={NoImage} alt="" />
                                              ) : (
                                                <img
                                                  src={myDetails?.image}
                                                  alt=""
                                                />
                                              )
                                            ) : (
                                              <img src={sendInfo.image} />
                                            )}
                                          </div>
                                          <div className="message-item-chat-content">
                                            <div className="message-content">
                                              {data.text}
                                            </div>
                                            <div className="time">
                                              {moment(
                                                convertTime(data.createdAt)
                                              ).format("h:mm A | DD MMM YYYY")}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <div className="d-flex justify-content-center align-items-center mt-5 w-100">
                                    <h5 className="mt-5">No messages found</h5>
                                  </div>
                                )}
                              </div>
                              <div ref={bottomRef} />
                            </div>
                          </div>
                          <div className="chat-panel-chat-footer pb-0">
                            <div className="form">
                              <div className="row">
                                <div className="col-md-10">
                                  <div className="form-group mb-0">
                                    <input
                                      type="text"
                                      autoComplete="off"
                                      value={message ?? ""}
                                      className="form-control"
                                      id="exampleFormControlInput2"
                                      placeholder={`Message ${
                                        sendInfo.name ?? ""
                                      }`}
                                      onKeyDown={handleKey}
                                      onChange={(e) =>
                                        setMessage(e.target.value)
                                      }
                                    />
                                    {/* <span className="form-attachemnt-icon">
                                      <img src={AttachImg} />
                                    </span> */}
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <button
                                    className="btn-send"
                                    title=""
                                    type="button"
                                    onClick={() => sendMessage()}
                                  >
                                    Send
                                  </button>
                                </div>
                                <div className="col-md-12">
                                  <p
                                    className="text-danger mt-3"
                                    style={{ fontSize: "0.8rem" }}
                                  ></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="tab-pane" id="Booking">
                        <div className="care-title-header">
                          <h2 className="heading-title">Booking</h2>
                          <div className="search-filter wd30">
                            <div className="form-group">
                              <div className="search-form-group">
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  placeholder="Search "
                                  onChange={(e) => handleFilter(e)}
                                />
                                <span className="search-icon">
                                  <img src={Search} />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ProviderProfile-section">
                          {list.length !== 0 ? (
                            list.map((ele, indx) => {
                              return (
                                <div key={indx} className="care-card">
                                  <div className="care-card-head">
                                    <div className="care-id">
                                      Job ID: <span>{ele.job_id ?? "NA"}</span>
                                    </div>
                                    <div className="care-status">
                                      Status:{" "}
                                      <span>
                                        {ele.request_status_text ?? "NA"}
                                      </span>
                                    </div>

                                    {/* <div className="care-action">
                                      <Link to="">View Detail</Link>
                                    </div> */}
                                  </div>
                                  <div className="care-card-body">
                                    <div className="care-content">
                                      <div className="title-text">
                                        {ele.first_name ?? "NA"}
                                      </div>
                                      <div className="row d-flex justify-content-between w-100">
                                        <div className="col-md-8">
                                          <div className="date-text">
                                            <img src={WhCalen} />{" "}
                                            {moment(ele.start_date).format(
                                              "MM-DD-yyyy"
                                            )}{" "}
                                            {ele.start_time ?? "NA"}
                                          </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                          <div class="tags-list float-end">
                                            <div class="tags-item-sub">
                                              {ele?.gender == "M"
                                                ? "Male"
                                                : "Female"}
                                            </div>
                                            <div class="tags-item-sub mx-2">
                                              Age: {ele?.age ?? "NA"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row d-flex justify-content-between w-100">
                                        <div className="col-md-12 d-flex justify-content-between">
                                          <div class="jobs-details-point-item">
                                            <h4>Prefered Contact: </h4>
                                            <p className="text-capitalize">
                                              {ele.prefer_contacted ?? "NA"}
                                            </p>
                                          </div>
                                          <div class="jobs-details-point-item">
                                            <h4>Best Time To Call: </h4>
                                            <p className="text-capitalize">
                                              {ele.best_time_to_call ?? "NA"}
                                            </p>
                                          </div>
                                          <div class="jobs-details-point-item">
                                            <h4>Relationship: </h4>
                                            <p>{ele.relationship ?? "NA"}</p>
                                          </div>
                                          <div class="jobs-details-point-item">
                                            <h4>Payment Type: </h4>
                                            <p>{ele.payment_type ?? "NA"}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="care-day-Weekly-info mt-3">
                                      <div className="row w-100">
                                        <div className="col-md-3">
                                          <div className="care-point-box">
                                            <div className="care-point-icon">
                                              <img src={RepeatImg} />
                                            </div>
                                            <div className="care-point-text">
                                              <h4>Frequency:</h4>
                                              <p className="text-capitalize">
                                                {ele.frequency === "O"
                                                  ? "One Time"
                                                  : ele.frequency === "W"
                                                  ? "Repeat Weekly"
                                                  : "Repeat Monthly"}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-9">
                                          <div className="care-point-box">
                                            <div className="care-point-icon">
                                              <img src={locationImage} />
                                            </div>
                                            <div className="care-point-text">
                                              <h4>Location:</h4>
                                              <p>{ele.address ?? "NA"}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="care-day-list">
                                        {/* <div className="care-day-item">S</div>
                                        <div className="care-day-item">T</div>
                                        <div className="care-day-item">W</div> */}
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="care-card-foot">
                                      <div className="care-user-info">
                                        <div className="care-user-image">
                                          <img src="images/user.png" />
                                        </div>
                                        <div className="care-user-text">
                                          <div className="care-user-name">
                                            Joseph Will Get Notified About Job
                                            Confirmation
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
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
                    )}
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
