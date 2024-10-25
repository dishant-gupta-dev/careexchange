import React, { useEffect, useState } from "react";
import ActiveJob from "../../../assets/admin/images/activejobs.png";
import Face1 from "../../../assets/admin/images/face1.jpg";
import PendingRequest from "../../../assets/admin/images/pendingrequest.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../utlis/admin/routes.utlis";
import { api } from "../../../utlis/admin/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { decode, encode } from "base-64";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import moment from "moment";
import { status } from "../../../utlis/common.utlis";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { Modal, ModalBody } from "react-bootstrap";
import toast from "react-hot-toast";

const Details = () => {
  const navigate = useNavigate();
  const [stat, setStat] = useState({ status: false, value: null, name: null });
  const [jobStatus, setStatus] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [users, setUser] = useState({
    user: null,
    activeJob: null,
    pendingRequests: null,
    careJobRequestList: [],
    confirmProviders: [],
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getUserDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setUser(response.data.data);
    } else {
      setUser({
        activeJob: null,
        pendingRequests: null,
        careJobRequestList: [],
        confirmProviders: [],
      });
    }
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    if (date !== null && date != undefined && date !== "")
      date = moment(date).format("MM/DD/YYYY");
    else date = "";
    getUserDetails(
      api.userDetail + `${decode(id)}?status=${jobStatus}&start_date=${date}`
    );
  };

  const changeStatus = async (status) => {
    setLoading(true);
    const form = JSON.stringify({
      status: parseInt(status),
    });
    const response = await ApiService.putAPIWithAccessToken(
      api.userChangeStatus + `${decode(id)}`,
      form
    );
    setStat({ status: false, value: null });
    if (response.data.status && response.data.statusCode === 200) {
      getUserDetails(api.userDetail + `${decode(id)}?status=${jobStatus}`);
      toast.success(response.data.message);
    } else toast.error(response.data.message);
    setLoading(false);
  };

  useEffect(() => {
    getUserDetails(api.userDetail + `${decode(id)}?status=${jobStatus}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobStatus]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="page-header d-flex justify-content-between">
          <div>
            <h3 className="page-title">
              <Link
                className="btn-back"
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                <i className="mdi mdi-arrow-left-thin"></i>
              </Link>
              Profile Details
            </h3>
          </div>
          <div className="form-group mb-0">
            {users?.user?.status == 0 ? (
              <div>
                <button
                  className="btn btn-gradient-primary me-2"
                  onClick={(e) =>
                    setStat({ status: true, value: 1, name: "Approve" })
                  }
                >
                  Approve
                </button>
                <button
                  className="btn btn-gradient-danger"
                  onClick={(e) =>
                    setStat({ status: true, value: 3, name: "Reject" })
                  }
                >
                  Reject
                </button>
              </div>
            ) : (
              <div className="select">
                <select
                  name="format"
                  id="format"
                  className={
                    users?.user?.status == 1 ? "green-select" : "red-select"
                  }
                  onChange={(e) =>
                    setStat({
                      status: true,
                      value: e.target.value,
                      name: status(e.target.value),
                    })
                  }
                >
                  <option
                    selected={users?.user?.status == 1 ? true : false}
                    value="1"
                  >
                    Active
                  </option>
                  <option
                    selected={users?.user?.status == 2 ? true : false}
                    value="2"
                  >
                    Inactive
                  </option>
                  <option
                    selected={users?.user?.status == 3 ? true : false}
                    value="3"
                  >
                    Suspended
                  </option>
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="user-table-item">
              <div className="row g-1 align-items-center">
                <div className="col-md-3">
                  <div className="user-profile-item">
                    <div className="user-profile-media">
                      {users?.user?.image === null ||
                      users?.user?.image === "" ||
                      users?.user?.image === undefined ? (
                        <img src={NoImage} alt="" className="me-3" />
                      ) : (
                        <img src={users?.user?.image} alt="" className="me-3" />
                      )}
                    </div>
                    <div className="user-profile-text">
                      <h2>{users?.user?.fullname ?? "NA"}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="row g-1 align-items-center">
                    <div className="col-md-4">
                      <div className="user-contact-info">
                        <div className="user-contact-info-icon"></div>
                        <div className="user-contact-info-content">
                          <h2>Account Created on :</h2>
                          <p>
                            {" "}
                            {moment(users?.user?.created_date).format(
                              "MM-DD-yyyy"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="user-contact-info">
                        <div className="user-contact-info-icon"></div>
                        <div className="user-contact-info-content">
                          <h2>Email Address :</h2>
                          <p className="text-lowercase">{users?.user?.email ?? "NA"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="user-contact-info">
                        <div className="user-contact-info-icon"></div>
                        <div className="user-contact-info-content">
                          <h2>Contact Number :</h2>
                          <p>{users?.user?.mobile ?? "NA"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-2">
          <div className="col-md-6">
            <div className="card-overview">
              <div className="card-overview-image">
                <img src={ActiveJob} alt="" height="60px" />
              </div>
              <div className="card-overview-content">
                <h4>On Going Jobs</h4>
                <h2>{users?.activeJob ?? "0"}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-overview">
              <div className="card-overview-image">
                <img src={PendingRequest} alt="" height="60px" />
              </div>
              <div className="card-overview-content">
                <h4>Pending Requests</h4>
                <h2>{users?.pendingRequests ?? "0"}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-4">
            <div className="care-title-header">
              <h2 className="heading-title">Care Job Requests</h2>
              <div className="cc-search-filter wd70">
                <div className="row g-2">
                  <div className="col-md-8">
                    <div className="form-group">
                      <div className="tabs-section">
                        <ul className="nav">
                          <li className="nav-item">
                            <Link
                              className={
                                jobStatus === 0 ? "nav-link active" : "nav-link"
                              }
                              to=""
                              onClick={() => setStatus(0)}
                            >
                              Pending
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className={
                                jobStatus === 1 ? "nav-link active" : "nav-link"
                              }
                              aria-current="page"
                              to=""
                              onClick={() => setStatus(1)}
                            >
                              On Going
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className={
                                jobStatus === 3 ? "nav-link active" : "nav-link"
                              }
                              to=""
                              onClick={() => setStatus(3)}
                            >
                              Cancelled
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className={
                                jobStatus === 4 ? "nav-link active" : "nav-link"
                              }
                              to=""
                              onClick={() => setStatus(4)}
                            >
                              Completed
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
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
                        style={{ padding: "15px 40px" }}
                        isClearable
                        name="date"
                        autoComplete="off"
                        placeholderText="Select Date"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cc-careJobRequestList-card">
              <form>
                <div className="row g-2">
                  {users.careJobRequestList?.length !== 0 ? (
                    users.careJobRequestList?.map((ele, indx) => {
                      return (
                        <div key={indx} className="col-lg-6">
                          <div className="careJobRequest-card">
                            <div className="careJobRequest-card-head">
                              <h5 className="text-capitalize">
                                {ele.first_name ?? "NA"}
                              </h5>
                              {/* <div className="careJobRequest-status">
                                Status:
                                <button
                                  type="button"
                                  className={
                                    ele.status == 1 || ele.status == 4
                                      ? "btn-status btn-view-active px-4"
                                      : ele.status == 0
                                      ? "btn btn-view-pending px-4"
                                      : "btn btn-view-inactive px-4"
                                  }
                                  style={{ cursor: "default" }}
                                >
                                  {status(ele.status)}
                                </button>
                              </div> */}
                            </div>
                            <div className="careJobRequest-card-body">
                              <div className="careJobRequest-point-list">
                                <div className="careJobRequest-point-item">
                                  <h3>Job ID</h3>
                                  <p>{ele.job_id ?? "NA"}</p>
                                </div>

                                <div className="careJobRequest-point-item">
                                  <h3>Date</h3>
                                  <p>
                                    {moment(ele.start_date).format(
                                      "MM-DD-yyyy"
                                    )}
                                  </p>
                                </div>

                                <div className="careJobRequest-point-item">
                                  <h3>Time</h3>
                                  <p>{ele.start_time}</p>
                                </div>

                                <div className="careJobRequest-point-item">
                                  <h3>Frequency</h3>
                                  <p>
                                    {ele?.frequency === "O"
                                      ? "One Time"
                                      : ele?.frequency === "W"
                                      ? "Repeat Weekly"
                                      : "Repeat Monthly"}
                                    {/* {ele?.days?.length !== 0
                                      ? ele?.days?.map((element, index) => {
                                          return (
                                            <label
                                              key={index}
                                              className="badge badge-gradient-success mx-1"
                                            >
                                              {element}
                                            </label>
                                          );
                                        })
                                      : null} */}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="card">
                              <div className="card statistics-card-1 card-img-holder text-dark position-relative">
                                {ele?.confirmProvider?.length !== 0
                                  ? ele?.confirmProvider?.map(
                                      (element, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="p-3 align-items-center d-flex"
                                          >
                                            <div className="d-flex justify-content-between w-100">
                                              <div className="care-for-profile-img me-3 d-flex align-items-center">
                                                {element.image === null ||
                                                element.image === "" ||
                                                element.image === undefined ? (
                                                  <img
                                                    src={NoImage}
                                                    alt=""
                                                    className="me-3"
                                                  />
                                                ) : (
                                                  <img
                                                    src={element.image}
                                                    alt=""
                                                    className="me-3"
                                                  />
                                                )}
                                                <div className="">
                                                  <h5 className="text-capitalize">
                                                    {element.fullname}
                                                  </h5>
                                                  <p className="m-0">
                                                    <i className="mdi mdi-checkbox-multiple-marked-circle-outline"></i>{" "}
                                                    Job Confirmed
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="d-flex align-items-center">
                                                <div>
                                                  <button
                                                    type="button"
                                                    className="btn-view-profile"
                                                    onClick={() =>
                                                      navigate(
                                                        routes.careJobDetails +
                                                          `/${encode(
                                                            element.request_id
                                                          )}`
                                                      )
                                                    }
                                                  >
                                                    View Job Detail
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )
                                  : null}
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
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* {users.confirmProviders.length !== 0
            ? users.confirmProviders.map((ele, indx) => {
                return (
                  <div key={indx} className="col-md-12">
                    <div className="card">
                      <div className="card statistics-card-1 card-img-holder text-dark position-relative">
                        <div className="card-body align-items-center d-flex">
                          <div className="d-flex justify-content-between w-100">
                            <div className="care-for-profile-img me-3 d-flex align-items-center">
                              {ele.image === null ||
                              ele.image === "" ||
                              ele.image === undefined ? (
                                <img src={NoImage} alt="" className="me-3" />
                              ) : (
                                <img src={ele.image} alt="" className="me-3" />
                              )}
                              <div className="">
                                <h5 className="text-capitalize">
                                  {ele.fullname ?? "NA"}
                                </h5>
                                <p className="m-0">
                                  <i className="mdi mdi-checkbox-multiple-marked-circle-outline"></i>
                                  Confirmed Care-Provider
                                </p>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-view-profile mx-1"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(routes.providerDetails + "/" + 1);
                                  }}
                                >
                                  View Care-Provider Profile
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-view-profile"
                                >
                                  View Job Detail
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null} */}

      <Modal
        show={stat.status}
        onHide={() => {
          setStat({
            status: false,
            value: null,
            name: null,
          });
        }}
        className=""
      >
        <div className="modal-content">
          <ModalBody className="">
            <div className="add-items d-flex row">
              <h5 className="text-center">Are you sure</h5>
              <p className="text-center">
                You want to <span className="text-lowercase">{stat.name}</span>{" "}
                this user?
              </p>
              <div className="form-group text-center">
                <button
                  type="button"
                  onClick={() =>
                    setStat({
                      status: false,
                      value: null,
                      name: null,
                    })
                  }
                  className="btn btn-gradient-danger me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gradient-primary me-2"
                  data-bs-dismiss="modal"
                  onClick={() => changeStatus(stat.value)}
                >
                  Yes! {stat.name}
                </button>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default Details;
