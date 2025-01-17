import React, { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase";
import ApiService from "../../../core/services/ApiService";
import { serverTimestamp } from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import moment from "moment/moment";
import Search from "../../../assets/user/images/search1.svg";
import locationImage from "../../../assets/admin/images/Google_Map.svg";
import AttachImg from "../../../assets/user/images/attachemnt.svg";
import StarImg from "../../../assets/user/images/star.svg";
import DollarImg from "../../../assets/user/images/dollar-circle.svg";
import BreifImg from "../../../assets/user/images/briefcase.svg";
import HouseImg from "../../../assets/user/images/house.svg";
import HandImg from "../../../assets/user/images/Handshake.svg";
import StarWhImg from "../../../assets/user/images/starwh.svg";
import SearchImg from "../../../assets/user/images/search-normal.svg";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { api } from "../../../utlis/user/api.utlis";
import WhCalen from "../../../assets/user/images/whcalendar.svg";
import RepeatImg from "../../../assets/user/images/Repeat.svg";
import Loader from "../../../layouts/loader/Loader";
import { Modal, ModalBody } from "react-bootstrap";
import toast from "react-hot-toast";
import { decode } from "base-64";

const ProviderChat = () => {
  const bottomRef = useRef(null);
  let userId = JSON.parse(localStorage.getItem("careexchange")).userId;
  const localData = useLocation();
  const id = localData.state?.id;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [providers, setProvider] = useState([]);
  const [myDetails, setMyDetails] = useState();
  const [details, setDetails] = useState();
  const [bookingStatus, setBookingStatus] = useState({
    open: false,
    status: null,
    id: null,
    providerUserId: null,
  });
  const [list, setList] = useState([]);
  const [sendInfo, setSenderData] = useState({
    userId: null,
    senderId: null,
    name: "",
    image:
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp",
  });
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
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

  const userDetails = async () => {
    const response = await ApiService.getAPIWithAccessToken(
      api.providerDetail + `${decode(id)}`
    );
    if (response.data.status && response.data.statusCode === 200) {
      setSenderData({
        userId: response.data.data.userid,
        senderId: response.data.data.id,
        name: response.data.data.business_name
          ? response.data.data.business_name
          : response.data.data.fullname,
        image:
          response.data.data.logo !== null &&
          response.data.data.logo !== "" &&
          response.data.data.logo !== undefined
            ? response.data.data.logo
            : response.data.data.profile_image,
      });
      setDetails(response.data.data);
    } else setDetails();
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

  const bookingRequest = async (id, status, providerUserId) => {
    setLoading(true);
    let form = JSON.stringify({
      status: status,
      userid: providerUserId,
    });
    const response = await ApiService.putAPIWithAccessToken(
      api.serviceRequest + id,
      form
    );
    if (response.data.status && response.data.statusCode === 200) {
      bookingList(api.bookingList + `?providerid=${sendInfo.senderId}`);
      setBookingStatus({
        open: false,
        status: null,
        id: null,
        providerUserId: null,
      });
      toast.success(response.data.message);
    } else toast.error(response.data.message);
    setLoading(false);
  };

  const createGroup = async (userid, id, name, image, exist = false) => {
    setSenderData({ userId: userid, senderId: id, name: name, image: image });
    setMessagesData([]);
    setStatus(0);
    const response = await ApiService.getAPIWithAccessToken(
      api.providerDetail + `${id}`
    );
    if (response.data.status && response.data.statusCode === 200) {
      setDetails(response.data.data);
    } else setDetails();
    bookingList(api.bookingList + `?providerid=${id}`);
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
        // const docid = userId + "-" + sendInfo.senderId;
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
      api.bookingList + `?providerid=${sendInfo.senderId}&search=${name}`
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
    getProviders(api.providerChatList);
    userDetails();
    getMyProfile(api.profile);
  }, []);

  useEffect(() => {
    if (sendInfo.senderId) {
      // const docid = userId + "-" + sendInfo.senderId;
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
                  <div className="chat-panel-sidebar-icon">
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
                        getProviders(api.providerList + `?search=${search}`)
                      }
                    >
                      <img src={SearchImg} />
                    </button>
                    <button
                      className="search-btn"
                      type="button"
                      onClick={() => {
                        getProviders(api.providerChatList);
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
                          d="M14.55 21.67C18.84 20.54 22 16.64 22 12C22 6.48 17.56 2 12 2C5.33 2 2 7.56 2 7.56M2 7.56V3M2 7.56H4.01H6.44"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2 12C2 17.52 6.48 22 12 22"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-dasharray="3 3"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="chat-userlist-info">
                    {providers.length !== 0 ? (
                      providers.map((ele, indx) => {
                        return (
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              createGroup(
                                ele.userid,
                                ele.id,
                                ele?.business_name
                                  ? ele?.business_name
                                  : ele?.fullname,
                                ele.logo !== null &&
                                  ele.logo !== "" &&
                                  ele.logo !== undefined
                                  ? ele.logo
                                  : ele.profile_image
                              )
                            }
                            key={indx}
                            className={
                              sendInfo.senderId === ele.id
                                ? "chat-userlist-item active"
                                : "chat-userlist-item"
                            }
                          >
                            <Link to="">
                              <div className="chat-userlist-item-image">
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
                                {/* <span className="user-status"></span> */}
                              </div>
                            </Link>
                            <div className="chat-userlist-item-content">
                              <h4>
                                {ele?.business_name
                                  ? ele?.business_name
                                  : ele?.fullname}
                              </h4>
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
                          className={status === 0 ? "active" : ""}
                          onClick={() => {
                            setStatus(0);
                            bookingList(
                              api.bookingList +
                                `?providerid=${sendInfo.senderId}`
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
                          className={status === 1 ? "active" : ""}
                          onClick={() => {
                            setStatus(1);
                            bookingList(
                              api.bookingList +
                                `?providerid=${sendInfo.senderId}`
                            );
                          }}
                          to=""
                          data-bs-toggle="tab"
                        >
                          Provider Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={status === 2 ? "active" : ""}
                          onClick={() => {
                            setStatus(2);
                            bookingList(
                              api.bookingList +
                                `?providerid=${sendInfo.senderId}`
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
                    {status === 0 ? (
                      <div className="tab-pane active" id="Chat">
                        <div className="chat-panel-section">
                          <div className="chat-panel-chat-header">
                            <div className="chat-panel-user-item">
                              <div className="chat-panel-user-item-image">
                                {sendInfo.image !== null &&
                                sendInfo.image !== "" &&
                                sendInfo.image !== undefined ? (
                                  <img src={sendInfo.image} />
                                ) : (
                                  <img src={NoImage} alt="" />
                                )}
                              </div>
                              <div className="chat-panel-user-item-text">
                                <h4>{sendInfo.name ?? "NA"}</h4>
                                <p>Emp Id: {sendInfo.userId ?? "NA"}</p>
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
                                            ) : sendInfo.image !== null &&
                                              sendInfo.image !== "" &&
                                              sendInfo.image !== undefined ? (
                                              <img src={sendInfo.image} />
                                            ) : (
                                              <img src={NoImage} alt="" />
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
                                        stroke="#292D32"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M12 8V13"
                                        stroke="red"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M11.9946 16H12.0036"
                                        stroke="red"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                    &nbsp; You can confirm the care job by
                                    navigating to the Booking tab and clicking
                                    on the confirmation option.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : status === 1 ? (
                      <div className="tab-pane" id="ProviderProfile">
                        <div className="providerProfile-section">
                          <div className="user-table-item">
                            <div className="row g-1 align-items-center">
                              <div className="col-md-8">
                                <div className="user-profile-item">
                                  <div className="user-profile-media">
                                    {details?.logo !== null &&
                                    details?.logo !== "" &&
                                    details?.logo !== undefined ? (
                                      <img
                                        src={details?.logo}
                                        alt=""
                                        className="me-3"
                                      />
                                    ) : details?.profile_image === null ||
                                      details?.profile_image === "" ||
                                      details?.profile_image === undefined ? (
                                      <img
                                        src={NoImage}
                                        alt=""
                                        className="me-3"
                                      />
                                    ) : (
                                      <img
                                        src={details?.profile_image}
                                        alt=""
                                        className="me-3"
                                      />
                                    )}
                                  </div>
                                  <div className="user-profile-text">
                                    <h2>
                                      {details?.business_name
                                        ? details?.business_name
                                        : details?.fullname}
                                    </h2>
                                    <div className="location-text">
                                      {details?.business_address ?? "NA"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="row g-1 align-items-center">
                                  <div className="col-md-6">
                                    <div className="user-contact-info">
                                      <div className="user-contact-info-icon">
                                        <img src={StarImg} />
                                      </div>
                                      <div className="user-contact-info-content">
                                        <h2>Rating</h2>
                                        <p>
                                          {details?.avarageRating
                                            ?.average_rating ?? "0"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* <div className="col-md-4">
                                    <div className="user-contact-info">
                                      <div className="user-contact-info-icon">
                                        <img src={DollarImg} />
                                      </div>
                                      <div className="user-contact-info-content">
                                        <h2>Rate</h2>
                                        <p>{details?.fee ?? "NA"}</p>
                                      </div>
                                    </div>
                                  </div> */}

                                  <div className="col-md-6">
                                    <div className="user-contact-info">
                                      <div className="user-contact-info-icon">
                                        <img src={BreifImg} />
                                      </div>
                                      <div className="user-contact-info-content">
                                        <h2>Experience</h2>
                                        <p>{details?.experience ?? 0} Years</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="providerProfile-point">
                              <div className="providerprofile-point-item">
                                <img src={HouseImg} /> Cared{" "}
                                {details?.caredFamilys ?? 0} Families
                              </div>
                              <div className="providerprofile-point-item">
                                <img src={HandImg} /> Hired By{" "}
                                {details?.caredFamilyNearBy ?? 0} Families In
                                Your Neighbourhood
                              </div>
                            </div>
                          </div>

                          <div className="providerprofile-overview">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="overview-card">
                                  <div className="overview-content">
                                    <h2>Repeat Clients</h2>
                                    <h4>{details?.repeatClient ?? "0"}</h4>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-4">
                                <div className="overview-card">
                                  <div className="overview-content">
                                    <h2>Response Rate</h2>
                                    <h4>{details?.responseRate ?? "NA"}</h4>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-4">
                                <div className="overview-card">
                                  <div className="overview-content">
                                    <h2>Response Time</h2>
                                    <h4>{details?.responseTime ?? "NA"}</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="providerprofile-about">
                            <h2>About </h2>
                            <p>{details?.description ?? "NA"}</p>
                          </div>

                          <div className="providerprofile-about">
                            <h2>Offering Services</h2>
                            <div>
                              <div className="tags-item">
                                {details?.category ?? "NA"}
                              </div>
                              <div className="tags-item-sub">
                                {details?.subcategory ?? "NA"}
                              </div>
                            </div>
                          </div>

                          {/* <div className="review-card">
                            <div className="review-card-content">
                              <div className="review-card-icon">
                                <img src={StarWhImg} />
                              </div>
                              <div className="review-card-text">
                                <h3>Rating & Review</h3>
                                <p>
                                  {details?.avarageRating?.average_rating ??
                                    "0"}{" "}
                                  (
                                  {details?.avarageRating?.total_reviews ?? "0"}
                                  )
                                </p>
                              </div>
                            </div>
                            <div className="review-card-action">
                              <a href="#">Write your Review</a>
                            </div>
                          </div>

                          <div className="care-comment-list">
                            {details?.reviewsList?.length !== 0
                              ? details?.reviewsList?.map((element, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="care-comment-item"
                                    >
                                      <div className="care-comment-profile">
                                        {element.image === null ||
                                        element.image === "" ||
                                        element.image === undefined ? (
                                          <img src={NoImage} alt="" />
                                        ) : (
                                          <img src={element.image} alt="" />
                                        )}
                                      </div>
                                      <div className="care-comment-content">
                                        <div className="care-comment-head">
                                          <div className="">
                                            <h2>{element.fullname ?? "NA"}</h2>
                                            <div className="care-comment-rating">
                                              <i className="fa-regular fa-star"></i>{" "}
                                              {element.rating ?? 0}
                                            </div>
                                          </div>
                                          <div className="care-date">
                                            <i className="las la-calendar"></i>
                                            {moment(
                                              element.created_date
                                            ).format("MM-DD-yyyy HH:MM")}
                                          </div>
                                        </div>
                                        <div className="care-comment-descr">
                                          {element.review ?? "NA"}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div> */}
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

                                    {ele.request_status == 1 ? (
                                      <div>
                                        <Link
                                          className="btn-gr edit-btn"
                                          to=""
                                          onClick={() =>
                                            setBookingStatus({
                                              open: true,
                                              status: 2,
                                              id: ele.id,
                                              providerUserId:
                                                ele.provider_userid,
                                            })
                                          }
                                        >
                                          Confirm
                                        </Link>
                                        <Link
                                          className="btn-re delete-btn mx-2"
                                          to=""
                                          onClick={() =>
                                            setBookingStatus({
                                              open: true,
                                              status: 3,
                                              id: ele.id,
                                              providerUserId:
                                                ele.provider_userid,
                                            })
                                          }
                                        >
                                          Reject
                                        </Link>
                                      </div>
                                    ) : (
                                      <div className="care-status text-capitalize">
                                        Status:{" "}
                                        <span
                                          className={
                                            ele.request_status == 1
                                              ? "text-warning"
                                              : ele.request_status == 2
                                              ? ""
                                              : "text-danger"
                                          }
                                        >
                                          {ele.request_status_text ?? "NA"}
                                        </span>
                                      </div>
                                    )}
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

      <Modal
        show={bookingStatus.open}
        onHide={() => {
          setBookingStatus({
            open: false,
            status: null,
            id: null,
            providerUserId: null,
          });
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalBody className="">
            <div className="add-items d-flex row">
              <div className="deleteaccount-text my-4">
                <h5 className="text-center pb-0">Change Booking Status</h5>
                <p className="text-center">
                  Do you really want to{" "}
                  {bookingStatus.status == 2 ? "confirm" : "reject"} this
                  booking ?
                </p>
              </div>
              <div className="form-group text-center mb-2">
                <button
                  type="button"
                  onClick={() =>
                    setBookingStatus({
                      open: false,
                      status: null,
                      id: null,
                      providerUserId: null,
                    })
                  }
                  className="btn-re me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gr"
                  data-bs-dismiss="modal"
                  onClick={() =>
                    bookingRequest(
                      bookingStatus.id,
                      bookingStatus.status,
                      bookingStatus.providerUserId
                    )
                  }
                >
                  Yes! {bookingStatus.status == 2 ? "Confirm" : "Reject"}
                </button>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default ProviderChat;
