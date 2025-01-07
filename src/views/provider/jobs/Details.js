import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import locationImage from "../../../assets/admin/images/Google_Map.svg";
import WhCalen from "../../../assets/user/images/whcalendar.svg";
import RepeatImg from "../../../assets/user/images/Repeat.svg";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { api } from "../../../utlis/provider/api.utlis";
import { decode, encode } from "base-64";
import { routes } from "../../../utlis/provider/routes.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { status } from "../../../utlis/common.utlis";
import moment from "moment";
import toast from "react-hot-toast";

const Details = () => {
  const navigate = useNavigate();
  const localData = useLocation();
  const id = localData.state?.id;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();

  const getJobDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    console.log(response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setDetails(response.data.data);
    } else setDetails();
    setLoading(false);
  };

  const makePayment = async (id, amount) => {
    setLoading(true);
    let form = JSON.stringify({
      request_id: id,
      amount: amount,
    });
    const response = await ApiService.postAPIWithAccessToken(
      api.paymentUnlockRequest,
      form
    );
    if (response.data.status && response.data.statusCode === 200) {
      window.location.href = response.data.data.approvalUrl;
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobDetails(api.jobDetails + `${decode(id)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="page-header">
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
            &nbsp;Care Job Details
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="cc-care-card">
              <div className="cc-care-card-head">
                <div className="cc-care-id">
                  Job ID: <span>{details?.job_id ?? "NA"}</span>
                </div>

                <div className="cc-care-status">
                  Status:{" "}
                  <span
                    style={{ cursor: "default" }}
                    type="button"
                    className={
                      details?.status == 1 || details?.status == 4
                        ? "btn-status btn-view-active px-4"
                        : details?.status == 0
                        ? "btn-status btn-view-pending px-4"
                        : "btn-status btn-view-inactive px-4"
                    }
                  >
                    {status(details?.status)}
                  </span>
                </div>
              </div>
              <div class="care-card-body">
                <div class="care-content">
                  <div class="title-text">{details?.first_name ?? "NA"}</div>
                  <div className="row d-flex justify-content-between w-100">
                    <div className="col-md-2">
                      <div className="date-text">
                        <img src={WhCalen} />{" "}
                        {moment(details?.start_date).format("MM-DD-yyyy")}{" "}
                        {details?.start_time ?? "NA"}
                      </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-between">
                      <div class="jobs-details-point-item">
                        <h4>Email Address: </h4>
                        <p className="text-capitalize">
                          {details?.email_id ?? "NA"}
                        </p>
                      </div>
                      <div class="jobs-details-point-item">
                        <h4>Fax Number: </h4>
                        <p className="text-capitalize">
                          {details?.fax ?? "NA"}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-2 mt-2">
                      <div class="tags-list float-end">
                        <div class="tags-item-sub">
                          {details?.gender == "M" ? "Male" : "Female"}
                        </div>
                        <div class="tags-item-sub mx-2">
                          Age: {details?.age ?? "NA"}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div class="tags-list">
                            <div class="tags-item-sub">
                              {details?.gender == "M" ? "Male" : "Female"}
                            </div>
                            <div class="tags-item-sub mx-2">
                              Age: {details?.age ?? "NA"}
                            </div>
                          </div>
                          <div class="date-text">
                            <img src={WhCalen} />{" "}
                            {moment(details?.start_date).format("MM-DD-yyyy")}{" "}
                            {details?.start_time ?? "NA"}
                          </div> */}
                </div>
                <div class="care-day-Weekly-info">
                  <div class="care-point-box">
                    <div class="care-point-icon">
                      <img src={RepeatImg} />
                    </div>
                    <div class="care-point-text">
                      <h4>Frequency: </h4>
                      <p>
                        {details?.frequency === "O"
                          ? "One Time"
                          : details?.frequency === "W"
                          ? "Repeat Weekly"
                          : "Repeat Monthly"}
                      </p>
                    </div>
                  </div>
                  <div class="care-point-box">
                    <div class="care-point-text">
                      <h4>Prefered Contact: </h4>
                      <p className="text-capitalize">
                        {details?.prefer_contacted ?? "NA"}
                      </p>
                    </div>
                  </div>
                  <div class="care-point-box">
                    <div class="care-point-text">
                      <h4>Payment Type: </h4>
                      <p className="text-capitalize">
                        {details?.payment_type ?? "NA"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="jobs-details-info-card">
              <div class="jobs-details-phone">{details?.phone ?? "NA"}</div>

              <div class="jobs-details-point">
                <div class="jobs-details-point-item">
                  <h4>Best Time To Call: </h4>
                  <p className="text-capitalize">
                    {details?.best_time_to_call ?? "NA"}
                  </p>
                </div>
                <div class="jobs-details-point-item">
                  <h4>Relationship: </h4>
                  <p>{details?.relationship ?? "NA"}</p>
                </div>
              </div>

              <div class="jobsdetails-location-item">
                <div class="jobsdetails-location-item-icon">
                  <img src={locationImage} />
                </div>
                <div class="jobsdetails-location-item-text">
                  <h4>Location:</h4>
                  <p>{details?.address ?? "NA"}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="jobs-details-desc-card">
              <h3>Description</h3>
              <p>{details?.description ?? "NA"}</p>
            </div>
          </div>

          {/* {details?.providers?.length !== 0
            ? details?.providers?.map((ele, indx) => {
                return (
                  <div className="col-md-12" key={indx}>
                    <div className="care-bob-user-card">
                      <div className="care-bob-user-card-box">
                        <div className="care-bob-user-card-image">
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
                        </div>
                        <div className="care-bob-user-card-content">
                          <h5 className="">{ele.fullname ?? "NA"}</h5>
                          <p className="m-0">
                            <i className="mdi mdi-checkbox-multiple-marked-circle-outline"></i>{" "}
                            {ele.provider_status} Care-Provider
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null} */}

          {!details?.makePaymentStatus ? (
            <div className="col-md-12 text-center mt-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  makePayment(details?.id, 1);
                }}
                className="btn btn-gr w-50"
              >
                Make Payment $1
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Details;
