import React, { useEffect, useState } from "react";
import ActiveJob from "../../../assets/images/activejobs.png";
import PendingRequest from "../../../assets/images/pendingrequest.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../utlis/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { decode, encode } from "base-64";
import Calender from "../../../assets/images/whcalendar.svg";
import NoImage from "../../../assets/images/no-image.jpg";
import NoData from "../../../assets/images/no-data-found.svg";
import moment from "moment";
import { status } from "../../../utlis/common.utlis";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { routes } from "../../../utlis/routes.utlis";
import { Modal, ModalBody } from "react-bootstrap";
import toast from "react-hot-toast";

const Details = () => {
  const navigate = useNavigate();
  const [stat, setStat] = useState({ status: false, value: null, name: null });
  const [provider, setProvider] = useState();
  const [startDate, setStartDate] = useState("");
  const [jobStatus, setStatus] = useState(1);
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getProviderDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setProvider(response.data.data);
    } else setProvider();
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    if (date !== null && date != undefined && date !== "")
      date = moment(date).format("MM/DD/YYYY");
    else date = "";
    getProviderDetails(
      api.providerDetail +
        `${decode(id)}?status=${jobStatus}&start_date=${date}`
    );
  };

  const changeStatus = async (status) => {
    setLoading(true);
    const form = JSON.stringify({
      status: parseInt(status),
    });
    const response = await ApiService.putAPIWithAccessToken(
      api.providerChangeStatus + `${decode(id)}`,
      form
    );
    setStat({ status: false, value: null });
    if (response.data.status && response.data.statusCode === 200) {
      getProviderDetails(
        api.providerDetail + `${decode(id)}?status=${jobStatus}`
      );
      toast.success(response.data.message);
    } else toast.error(response.data.message);
    setLoading(false);
  };

  useEffect(() => {
    getProviderDetails(
      api.providerDetail + `${decode(id)}?status=${jobStatus}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobStatus]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="page-header mb-2">
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
              Profile Detail
            </h3>
          </div>
          <div className="form-group mb-0">
            {provider?.status == 0 ? (
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
                    provider?.status == 1 ? "green-select" : "red-select"
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
                    selected={provider?.status == 1 ? true : false}
                    value="1"
                  >
                    Active
                  </option>
                  <option
                    selected={provider?.status == 2 ? true : false}
                    value="2"
                  >
                    Inactive
                  </option>
                  <option
                    selected={provider?.status == 3 ? true : false}
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
          <div className="col-lg-12 mt-3">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title care-for-profile-img text-capitalize">
                    {provider?.profile_image === null ||
                    provider?.profile_image === "" ||
                    provider?.profile_image === undefined ? (
                      <img src={NoImage} alt="" className="me-3" />
                    ) : (
                      <img
                        src={provider?.profile_image}
                        alt=""
                        className="me-3"
                      />
                    )}{" "}
                    {provider?.fullname ?? "NA"}
                  </h4>
                </div>
                <div>
                  <button
                    type="button"
                    style={{ cursor: "default" }}
                    className="btn btn-view-profile px-3"
                  >
                    Care Provider
                  </button>
                </div>
              </div>
              <div className="iq-card-body">
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="form-group col-md-4 mb-0">
                        <label>Account Created Date</label>
                        <p>
                          {moment(provider?.created_date).format("MM-DD-yyyy")}
                        </p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="lname">Email ID</label>
                        <p>{provider?.email ?? "NA"}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Rating</label>
                        <p>
                          <i className="mdi mdi-star-outline"></i>{" "}
                          {provider?.avarageRating?.average_rating ?? "MNA"}
                        </p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Contact Number</label>
                        <p>{provider?.mobile ?? "NA"}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Experience</label>
                        <p>{provider?.experience ?? "NA"} Years</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Business Address</label>
                        <p className="text-capitalize">
                          <i className="mdi mdi-map-outline"></i>{" "}
                          {provider?.business_address ?? "NA"}
                        </p>
                      </div>

                      <div className="form-group col-md-12 mb-0 mt-4">
                        <label for="add1">Offering Services</label>
                        <div className="d-flex mt-2">
                          {provider?.offeringService?.length !== 0
                            ? provider?.offeringService?.map((ele, indx) => {
                                return (
                                  <p key={indx} className="me-2">
                                    <Link
                                      to=""
                                      className="px-4 tags-btn-line"
                                      style={{ cursor: "default" }}
                                    >
                                      {ele.subcategory ?? "NA"}
                                    </Link>
                                  </p>
                                );
                              })
                            : null}
                        </div>
                      </div>

                      <div className="form-group col-md-12 mt-4 mb-0">
                        <label>Business Info</label>
                        <p>{provider?.description ?? "NA"}</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 ">
            <div className="tabs-section">
              <ul className="nav">
                <li className="nav-item">
                  <Link
                    className={tab === 1 ? "nav-link active" : "nav-link"}
                    to=""
                    onClick={() => setTab(1)}
                  >
                    Care Job
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={tab === 2 ? "nav-link active" : "nav-link"}
                    to=""
                    onClick={() => setTab(2)}
                  >
                    Care Network
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={tab === 3 ? "nav-link active" : "nav-link"}
                    to=""
                    onClick={() => setTab(3)}
                  >
                    Advertisement
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 d-flex justify-content-end">
            <button type="button" className="btn btn-gradient-primary">
              <i className="mdi mdi-star-outline"></i> See All Review
            </button>
          </div>

          <div className="col-lg-12 mt-4">
            <div className="iq-card">
              <div className="row p-3">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card bg-card-payment-1 card-img-holder text-dark position-relative">
                      <div className="card-body">
                        <h6 className="font-weight-normal mb-4">Active Jobs</h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <h2 className="mb-0">{provider?.activeJob ?? 0}</h2>
                          <div className="active-jobs-img">
                            <img src={ActiveJob} alt="" height="60px" />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card bg-card-payment-1 card-img-holder text-dark">
                      <div className="card-body">
                        <h6 className="font-weight-normal mb-4">
                          Pending Requests
                        </h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <h2 className="mb-0">{provider?.pendingJob ?? 0}</h2>
                          <div className="active-jobs-img">
                            <img src={PendingRequest} alt="" height="60px" />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card bg-card-payment-1 card-img-holder text-dark">
                      <div className="card-body">
                        <h6 className="font-weight-normal mb-4">
                          Cancelled Jobs
                        </h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <h2 className="mb-0">{provider?.cancellJob ?? 0}</h2>
                          <div className="active-jobs-img">
                            <img src={PendingRequest} alt="" height="60px" />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">
                    {tab === 1
                      ? "Care Job Requests"
                      : tab === 2
                      ? "Care Network"
                      : "Advertisement"}
                  </h4>
                </div>
                {tab === 1 ? (
                  <div className="d-flex">
                    <div className="me-1">
                      <div className="align-items-center d-flex">
                        <div className="tabs-section">
                          <ul className="nav">
                            <li className="nav-item">
                              <Link
                                className={
                                  jobStatus === 1
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                aria-current="page"
                                to=""
                                onClick={() => setStatus(1)}
                              >
                                Active
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className={
                                  jobStatus === 0
                                    ? "nav-link active"
                                    : "nav-link"
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
                                  jobStatus === 3
                                    ? "nav-link active"
                                    : "nav-link"
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
                                  jobStatus === 4
                                    ? "nav-link active"
                                    : "nav-link"
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
                    <div>
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
                ) : null}
              </div>

              {tab === 1 ? (
                <div className="iq-card-body">
                  <div className="new-user-info">
                    <form className="px-3">
                      {provider?.careJobRequestList?.length !== 0 ? (
                        provider?.careJobRequestList?.map((ele, indx) => {
                          return (
                            <div key={indx} className="row card-bg-list">
                              <div className="col-lg-12 d-flex justify-content-between mb-3">
                                <h5 className="text-capitalize">
                                  {ele.first_name ?? "NA"}
                                </h5>
                                <div>
                                  <button
                                    type="button"
                                    className={
                                      ele.status == 1 || ele.status == 4
                                        ? "btn btn-view-active px-4"
                                        : ele.status == 0
                                        ? "btn btn-view-pending px-4"
                                        : "btn btn-view-inactive px-4"
                                    }
                                    style={{ cursor: "default" }}
                                  >
                                    {status(ele.status)}
                                  </button>
                                </div>
                              </div>
                              <div className="form-group col-md-2 mb-0">
                                <label>Job ID</label>
                                <p>{ele.job_id ?? "NA"}</p>
                              </div>
                              <div className="form-group col-md-2 mb-0">
                                <label>Date</label>
                                <p>
                                  {moment(ele.start_date).format("MM-DD-yyyy")}
                                </p>
                              </div>
                              <div className="form-group col-md-3 mb-0">
                                <label for="lname">Time</label>
                                <p>
                                  {ele.start_time} to {ele.end_time}
                                </p>
                              </div>
                              <div className="form-group col-md-5 mb-0">
                                <label for="add1">Repeat Weekly</label>
                                <p>
                                  Every Week &nbsp;{" "}
                                  {ele?.days?.length !== 0
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
                                    : null}
                                </p>
                              </div>
                              <div className="col-md-12">
                                <div className="card">
                                  <div className="card statistics-card-1 card-img-holder text-dark position-relative">
                                    {ele?.user?.length !== 0
                                      ? ele?.user?.map((element, index) => {
                                          return (
                                            <div
                                              key={index}
                                              className="p-3 align-items-center d-flex"
                                            >
                                              <div className="d-flex justify-content-between w-100">
                                                <div className="care-for-profile-img me-3 d-flex align-items-center">
                                                  {element.profile_image ===
                                                    null ||
                                                  element.profile_image ===
                                                    "" ||
                                                  element.profile_image ===
                                                    undefined ? (
                                                    <img
                                                      src={NoImage}
                                                      alt=""
                                                      className="me-3"
                                                    />
                                                  ) : (
                                                    <img
                                                      src={
                                                        element.profile_image
                                                      }
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
                                                      className="btn btn-view-profile"
                                                      onClick={() =>
                                                        navigate(
                                                          routes.careJobDetails +
                                                            `/${encode(ele.id)}`
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
                                        })
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
                    </form>
                  </div>
                </div>
              ) : tab === 2 ? (
                <div className="iq-card-body">
                  <div className="new-user-info">
                    <form className="px-3">
                      {provider?.careNetwork?.length !== 0 ? (
                        provider?.careNetwork?.map((ele, indx) => {
                          return (
                            <div key={indx} className="row card-bg-list">
                              <div className="col-lg-12 d-flex justify-content-between mb-3">
                                <h5>{ele.title ?? "NA"}</h5>
                                <div>
                                  <button
                                    type="button"
                                    className={
                                      ele.status == 1 || ele.status == 4
                                        ? "btn btn-view-active px-4"
                                        : ele.status == 0
                                        ? "btn btn-view-pending px-4"
                                        : "btn btn-view-inactive px-4"
                                    }
                                    style={{ cursor: "default" }}
                                  >
                                    {status(ele.status)}
                                  </button>
                                </div>
                              </div>
                              <div className="form-group col-md-3 mb-0">
                                <label>Job ID</label>
                                <p>{ele.job_id ?? "NA"}</p>
                              </div>
                              <div className="form-group col-md-3 mb-0">
                                <label for="lname">Job Details</label>
                                <p>{ele.description ?? "NA"}</p>
                              </div>
                              <div className="form-group col-md-3 mb-0">
                                <label for="lname">Working Time</label>
                                <p>{ele.working_time_value ?? "NA"}</p>
                              </div>
                              <div className="form-group col-md-3 mb-0">
                                <label for="add1">Work Experience</label>
                                <p>{ele.working_expirence ?? "NA"}</p>
                              </div>
                              <div className="form-group col-md-3 mb-0">
                                <label for="add1">Salary</label>
                                <p>{ele.pay_range ?? "0"}/Annually</p>
                              </div>
                              <div className="form-group col-md-3 mb-0">
                                <label>Address</label>
                                <p>{ele.address ?? "NA"}</p>
                              </div>
                              <div className="form-group col-md-3 mb-0">
                                <label>Posted Date</label>
                                <p>
                                  {moment(ele.posted_date).format("MM-DD-yyyy")}
                                </p>
                              </div>
                              <div className="form-group col-md-3 mb-0">
                                <label>Posted Time</label>
                                <p>
                                  {moment(ele.posted_date).format("hh:mm A")}
                                </p>
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
                    </form>
                  </div>
                </div>
              ) : (
                <div className="iq-card-body">
                  <div className="new-user-info">
                    <form className="px-3 row">
                      {provider?.advertisements?.length !== 0 ? (
                        provider?.advertisements?.map((ele, indx) => {
                          return (
                            <div key={indx} className="col-md-12 mb-3">
                              <div className="advertisement-card">
                                <div className="care-card-head">
                                  <div className="care-id">
                                    {ele.title ?? "NA"}
                                  </div>
                                </div>
                                <div className=" d-flex align-items-center px-3">
                                  <div className="advertisement-image">
                                    {ele.image === null ||
                                    ele.image === "" ||
                                    ele.image === undefined ? (
                                      <img
                                        src={NoImage}
                                        alt=""
                                        height={100}
                                        width={100}
                                        style={{
                                          objectFit: "cover",
                                          objectPosition: "center",
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={ele.image}
                                        alt=""
                                        height={100}
                                        width={100}
                                        style={{
                                          objectFit: "cover",
                                          objectPosition: "center",
                                        }}
                                      />
                                    )}
                                  </div>
                                  <div className="advertisement-content w-100">
                                    <div className="d-flex justify-content-between">
                                      <div className="care-status">
                                        Ad Id: <span>98744526</span>
                                      </div>

                                      <div
                                        className={
                                          ele.status == 1 || ele.status == 4
                                            ? "care-status"
                                            : ele.status == 0
                                            ? "care-status-pending"
                                            : "care-status-inactive"
                                        }
                                      >
                                        Status:{" "}
                                        <span>{status(ele.status)}</span>
                                      </div>
                                    </div>

                                    <div className="advertisement-tags d-flex mt-2">
                                      {ele.category ? (
                                        <p>{ele.category ?? "NA"}</p>
                                      ) : null}
                                      {ele.subcategory ? (
                                        <p>{ele.subcategory ?? "NA"}</p>
                                      ) : null}
                                    </div>
                                    <div className="date-text mt-2">
                                      <img src={Calender} /> Posted on{" "}
                                      {moment(ele.created_date).format(
                                        "MM-DD-yyyy hh:mm A"
                                      )}
                                    </div>
                                    <p>{ele.description ?? "NA"}</p>
                                  </div>
                                </div>
                                {/* <div className="care-card-foot">
                                  <div className="care-user-info">
                                    <div className="care-user-image">
                                      {ele.image === null ||
                                      ele.image === "" ||
                                      ele.image === undefined ? (
                                        <img
                                          src={NoImage}
                                          alt=""
                                          height={40}
                                          width={40}
                                          style={{
                                            objectFit: "cover",
                                            objectPosition: "center",
                                          }}
                                        />
                                      ) : (
                                        <img
                                          src={ele.image}
                                          alt=""
                                          height={40}
                                          width={40}
                                          style={{
                                            objectFit: "cover",
                                            objectPosition: "center",
                                          }}
                                        />
                                      )}
                                    </div>
                                    <div className="care-user-text ms-2">
                                      <div className="care-user-name">
                                        Joseph Phill Will Take Care
                                      </div>
                                      <div className="Confirmed-Provider">
                                        <img src={Verify} /> Posted On:
                                        {moment(ele.created_date).format(
                                          "MM-DD-yyyy hh:mm A"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="care-action1">
                                    <a className="btn-bl" href="">
                                      View Profile
                                    </a>
                                  </div>
                                </div> */}
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
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
                this provider?
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
