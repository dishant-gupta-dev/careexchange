import React, { useCallback, useState, useEffect } from "react";
import Logo from "../../assets/user/images/logo.svg";
import User from "../../assets/user/images/user.png";
import NoData from "../../assets/admin/images/no-data-found.svg";
import deleteaccountImg from "../../assets/user/images/delete-account.svg";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Nav,
} from "reactstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { routes } from "../../utlis/provider/routes.utlis";
import { api } from "../../utlis/provider/api.utlis";
import ApiService from "../../core/services/ApiService";
import NoImage from "../../assets/admin/images/no-image.jpg";
import { Modal, ModalBody } from "react-bootstrap";
import moment from "moment/moment";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/slices/Auth";

const FirstHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState();
  const [count, setCount] = useState(0);
  const [notify, setNotification] = useState([]);
  const [deleteModal, setDelete] = useState(false);

  const dispatch = useDispatch();
  const signOut = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  const getUserDetails = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setUser(response.data.data);
    } else setUser();
  };

  const getNotifications = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("Notification => ", response.data.body);
    if (response.data.status && response.data.statusCode === 200) {
      setNotification(response?.data?.data?.notificationList);
    } else setNotification([]);
  };

  const getUnseenCount = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("Notification => ", response.data.body);
    if (response.data.status && response.data.statusCode === 200) {
      setCount(response?.data?.data?.unseenCount);
    } else setCount(0);
  };

  const seenNotification = async (id) => {
    const response = await ApiService.postAPIWithAccessToken(
      api.seenNotification + `${id}`
    );
    if (response.data.status && response.data.statusCode === 200) {
      getUnseenCount(api.unseenNotification);
      getNotifications(api.notification);
    } else {
      toast.error(response.data.message);
    }
  };

  const deleteTrash = async () => {
    const response = await ApiService.deleteAPIWithAccessToken(
      api.clearNotification
    );
    if (response.data.status && response.data.statusCode === 200) {
      setDelete(false);
      toast.success(response.data.message);
      getNotifications(api.notification);
    }
  };

  useEffect(() => {
    getUserDetails(api.profile);
    getNotifications(api.notification);
  }, []);

  useEffect(() => {
    getUnseenCount(api.unseenNotification);
  }, [location.pathname]);

  return (
    <>
      <div className="top-header">
        <div className="container-fliud">
          <div className="top-header-content">
            <div className="logo">
              <Link>
                <img src={Logo} />
              </Link>
            </div>
            <div className="top-header-rightnav text-right">
              <ul className="navbar-nav d-flex align-items-center justify-content-center mb-0">
                <li className="nav-item dropdown notification_dropdown">
                  <UncontrolledDropdown
                    className="nav-item profile-dropdown dropdown"
                    nav
                  >
                    <DropdownToggle
                      className="nav-link dropdown-toggle show"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      nav
                      onClick={(e) => {
                        e.preventDefault();
                        getNotifications(api.notification);
                      }}
                    >
                      <a
                        className="nav-link mt-1"
                        href="javascript:void(0);"
                        data-bs-toggle="dropdown"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M5.10317 19.6315C4.85704 19.6315 4.65213 19.5493 4.48844 19.3848C4.32476 19.2202 4.24292 19.0162 4.24292 18.7725C4.24292 18.5289 4.32476 18.3263 4.48844 18.1647C4.65213 18.0031 4.85616 17.9223 5.10055 17.9223H6.39672V10.4397C6.39672 9.03281 6.81719 7.75736 7.65814 6.61333C8.49908 5.4693 9.61249 4.7488 10.9984 4.45185V3.75925C10.9984 3.34602 11.1438 3.00394 11.4346 2.733C11.7255 2.46209 12.0786 2.32663 12.4941 2.32663C12.9096 2.32663 13.2647 2.46209 13.5595 2.733C13.8542 3.00394 14.0016 3.34602 14.0016 3.75925V4.45185C15.3915 4.7488 16.5111 5.4693 17.3603 6.61333C18.2096 7.75736 18.6342 9.03281 18.6342 10.4397V17.9223H19.9054C20.1453 17.9223 20.3483 18.0045 20.5142 18.1691C20.6801 18.3336 20.763 18.5377 20.763 18.7813C20.763 19.0249 20.6801 19.2276 20.5142 19.3891C20.3483 19.5507 20.1453 19.6315 19.9054 19.6315H5.10317ZM12.503 22.6495C11.9559 22.6495 11.4773 22.449 11.0673 22.0479C10.6572 21.6469 10.4522 21.1648 10.4522 20.6016H14.5538C14.5538 21.1676 14.3525 21.6504 13.95 22.05C13.5474 22.4496 13.0651 22.6495 12.503 22.6495V22.6495ZM8.09999 17.9223H16.925V10.4397C16.925 9.18966 16.5042 8.13549 15.6625 7.27716C14.8208 6.41882 13.7792 5.98966 12.5375 5.98966C11.2958 5.98966 10.2458 6.41882 9.38749 7.27716C8.52916 8.13549 8.09999 9.18966 8.09999 10.4397V17.9223Z"
                            fill="#fff"
                          ></path>
                        </svg>
                      </a>
                      {count != 0 && count != undefined && count != null ? (
                        <span class="bg-danger dots"></span>
                      ) : null}
                    </DropdownToggle>
                    <DropdownMenu
                      end
                      className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
                      data-bs-popper="none"
                    >
                      <div className="parent-notification">
                        <div className="notification-head">
                          <h2>
                            Notifications &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp;{" "}
                            <small class="badge  badge-light float-right pt-1">
                              {count ?? 0} Unseen Messages
                            </small>
                          </h2>
                        </div>
                        <div className="notification-body">
                          {notify.length !== 0 ? (
                            notify.map((ele, indx) => {
                              return (
                                <div
                                  key={indx}
                                  className={
                                    ele.is_seen == 0
                                      ? "notification-item seen cursor-pointer"
                                      : "notification-item"
                                  }
                                  onClick={() => {
                                    seenNotification(ele.id);
                                  }}
                                >
                                  <div className="notification-item-icon">
                                    <i className="fa fa-bell"></i>
                                  </div>
                                  <div className="notification-item-text">
                                    <h2>{ele.message ?? "NA"}</h2>
                                    <p style={{ color: "#626568" }}>
                                      <span>
                                        <i className="fas fa-clock"></i>
                                        {/* {moment(ele.created_date).format(
                                          "LLLL"
                                        )} */}
                                        {ele.time
                                          ? ele.time + " Ago"
                                          : moment(ele.created_date).format(
                                              "LLLL"
                                            )}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="d-flex mt-5 justify-content-center">
                              <div className="text-center">
                                <img
                                  className="mb-3"
                                  width={150}
                                  height={150}
                                  src={NoData}
                                  alt="no-data"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <Link
                          to=""
                          onClick={(e) => {
                            e.preventDefault();
                            setDelete(true);
                          }}
                        >
                          <div className="notification-foot">
                            Clear All Notifications
                          </div>
                        </Link>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>

                <li className="nav-item ps-3">
                  <div className="user-profile text-right">
                    <div className="user-profile-nav">
                      <UncontrolledDropdown
                        nav
                        className="nav-item profile-dropdown dropdown"
                      >
                        <DropdownToggle
                          nav
                          className="nav-link dropdown-toggle show"
                          id="profile"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <div className="profile-pic">
                            {user?.logo !== null &&
                            user?.logo !== "" &&
                            user?.logo !== undefined ? (
                              <img src={user?.logo} alt="" />
                            ) : user?.profile_image === null ||
                              user?.profile_image === "" ||
                              user?.profile_image === undefined ? (
                              <img src={NoImage} alt="" />
                            ) : (
                              <img src={user?.profile_image} alt="" />
                            )}
                          </div>
                        </DropdownToggle>

                        <DropdownMenu end className="dropdown-menu">
                          <DropdownItem
                            onClick={() => navigate(routes.profile)}
                            className="dropdown-item"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.1202 12.78C12.0502 12.77 11.9602 12.77 11.8802 12.78C10.1202 12.72 8.72021 11.28 8.72021 9.50998C8.72021 7.69998 10.1802 6.22998 12.0002 6.22998C13.8102 6.22998 15.2802 7.69998 15.2802 9.50998C15.2702 11.28 13.8802 12.72 12.1202 12.78Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>{" "}
                            &nbsp; Profile
                          </DropdownItem>
                          <DropdownItem
                            onClick={signOut}
                            className="dropdown-item"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.8999 7.55999C9.2099 3.95999 11.0599 2.48999 15.1099 2.48999H15.2399C19.7099 2.48999 21.4999 4.27999 21.4999 8.74999V15.27C21.4999 19.74 19.7099 21.53 15.2399 21.53H15.1099C11.0899 21.53 9.2399 20.08 8.9099 16.54"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M15.0001 12H3.62012"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M5.85 8.65002L2.5 12L5.85 15.35"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>{" "}
                            &nbsp; Logout
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={deleteModal}
        onHide={() => {
          setDelete(false);
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalBody className="">
            <div className="add-items d-flex row">
              <div className="deleteaccount-Img">
                <img src={deleteaccountImg} />
              </div>
              <div className="deleteaccount-text mb-4">
                <h5 className="text-center pb-0">Clear Notification</h5>
                <p className="text-center">
                  This action can't be undone. Do you really want to clear all
                  notifications ?
                </p>
              </div>
              <div className="form-group text-center mb-2">
                <button
                  type="button"
                  onClick={() => setDelete(false)}
                  className="btn-re me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gr"
                  data-bs-dismiss="modal"
                  onClick={() => deleteTrash()}
                >
                  Yes! Clear All
                </button>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default FirstHeader;
