import React, { useEffect, useState } from "react";
import { api } from "../../../utlis/user/api.utlis";
import WhCalen from "../../../assets/user/images/whcalendar.svg";
import RepeatImg from "../../../assets/user/images/Repeat.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../../../layouts/loader/Loader";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import locationImage from "../../../assets/admin/images/Google_Map.svg";
import ApiService from "../../../core/services/ApiService";
import moment from "moment";
import { decode, encode } from "base-64";
import { routes } from "../../../utlis/user/routes.utlis";
import toast from "react-hot-toast";

const Details = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const localData = useLocation();
  const id = localData.state?.id;

  const getDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log(response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setDetails(response.data.data.requestDetail);
    } else {
      setDetails();
    }
    setLoading(false);
  };

  const completeJob = async (id) => {
    setLoading(true);
    let form = JSON.stringify({
      status: 4,
    });
    const response = await ApiService.putAPIWithAccessToken(
      api.serviceRequest + `${id}`,
      form
    );
    if (response.data.status && response.data.statusCode === 200) {
      getDetails(api.jobDetail + `?service_request_id=${decode(id)}`);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getDetails(api.jobDetail + `?service_request_id=${decode(id)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div class="myjobs-details-section">
          <div class="row">
            <div class="col-md-12">
              <div class="care-title-header">
                <h2 class="heading-title">Care Job Detail</h2>
                <div class="search-filter">
                  <div class="row g-2">
                    <div class="col-md-12">
                      <div class="form-group">
                        <Link
                          class="btn-bl wd100"
                          to=""
                          onClick={() => navigate(-1)}
                        >
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="myjobs-details-section">
                <div class="row g-3">
                  <div class="col-md-12">
                    <div class="care-card mb-0">
                      <div class="care-card-head">
                        <div class="care-id">
                          Job ID: <span>{details?.job_id ?? "NA"}</span>
                        </div>

                        <div class="care-status">
                          {details?.status == "1" ? (
                            <Link
                              className="btn-gr"
                              onClick={(e) => {
                                e.preventDefault();
                                completeJob(details?.id);
                              }}
                            >
                              Mark As Complete
                            </Link>
                          ) : (
                            <div>
                              Status:{" "}
                              <span>{details?.request_status ?? "NA"}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="care-card-body">
                        <div class="care-content">
                          <div class="title-text">
                            {details?.first_name ?? "NA"}
                          </div>
                          <div className="date-text">
                            <img src={WhCalen} />{" "}
                            {moment(details?.start_date).format("MM-DD-yyyy")}{" "}
                            {details?.start_time ?? "NA"}
                          </div>
                          <div class="tags-list float-end">
                            <div class="tags-item-sub">
                              {details?.gender == "M" ? "Male" : "Female"}
                            </div>
                            <div class="tags-item-sub mx-2">
                              Age: {details?.age ?? "NA"}
                            </div>
                          </div>
                          <div className="care-point-list1">
                            <div className="row">
                              <div className="col-md-3">
                                <div class="jobs-details-point-item">
                                  <h4>Email Address: </h4>
                                  <p className="text-lowercase">
                                    {details?.email_id ?? "NA"}
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div class="jobs-details-point-item">
                                  <h4>Fax Number: </h4>
                                  <p className="text-capitalize">
                                    {details?.fax ?? "NA"}
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-2">
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
                              </div>
                              <div className="col-md-2">
                                <div class="care-point-box">
                                  <div class="care-point-text">
                                    <h4>Prefered Contact: </h4>
                                    <p className="text-capitalize">
                                      {details?.prefer_contacted ?? "NA"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3">
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
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="row g-3">
                      {details?.requestedProviderList?.length !== 0
                        ? details?.requestedProviderList?.map((ele, indx) => {
                            return (
                              <div key={indx} class="col-md-4">
                                <div class="care-card mb-0">
                                  <div class="care-card-head">
                                    <div class="care-user-info">
                                      <div class="care-user-image">
                                        {ele?.care_providers_details?.logo !==
                                          null &&
                                        ele?.care_providers_details?.logo !==
                                          "" &&
                                        ele?.care_providers_details?.logo !==
                                          undefined ? (
                                          <img
                                            src={
                                              ele?.care_providers_details?.logo
                                            }
                                            alt=""
                                            className="me-3"
                                          />
                                        ) : ele.image === null ||
                                          ele.image === "" ||
                                          ele.image === undefined ? (
                                          <img
                                            src={NoImage}
                                            alt=""
                                            className="me-3"
                                          />
                                        ) : (
                                          <img
                                            src={ele.image}
                                            alt=""
                                            className="me-3"
                                          />
                                        )}
                                      </div>
                                      <div class="care-user-text">
                                        <div class="care-user-name">
                                          {ele?.care_providers_details
                                            ?.business_name
                                            ? ele?.care_providers_details
                                                ?.business_name
                                            : ele?.fullname}
                                        </div>
                                        <div class="care-user-rating">
                                          <i class="fa fa-star"></i>{" "}
                                          {ele.avarageRating ?? "0"}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="strip-text">
                                      {ele.user_type == 2
                                        ? "Provider"
                                        : "Staff"}
                                    </div>
                                  </div>
                                  <div class="care-card-body">
                                    <div className="care-pointtags-list">
                                      <div className="care-price-text">
                                        <div className="exp-text mb-1">
                                          {ele?.care_providers_details
                                            ?.experience ?? 0}{" "}
                                          Years Experience
                                        </div>
                                      </div>
                                      <div className="pointtags-list">
                                        <div className="tags-item1">
                                          {ele.category ?? "NA"}
                                        </div>
                                        <div className="tags-item-sub1">
                                          {ele.subcategory ?? "NA"}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="care-location-box mt-2">
                                      <div className="care-point-icon">
                                        <img src={locationImage} />
                                      </div>
                                      <div class="care-point-text">
                                        <h4>Location</h4>
                                        <p>
                                          {ele?.care_providers_details
                                            ?.business_address ?? "NA"}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="">
                                      {ele?.chatStatus == "true" ? (
                                        <Link
                                          className="viewmorebtn mx-1"
                                          to=""
                                          onClick={(e) => {
                                            e.preventDefault();
                                            navigate(routes.userMessage, {
                                              state: {
                                                id: encode(ele?.provider_id),
                                              },
                                            });
                                          }}
                                        >
                                          <i className="fa fa-wechat"></i> Chat
                                        </Link>
                                      ) : null}

                                      <Link
                                        className="viewmorebtn mx-1"
                                        to=""
                                        onClick={(e) => {
                                          e.preventDefault();
                                          navigate(routes.userDetail, {
                                            state: {
                                              id: encode(ele?.provider_id),
                                            },
                                          });
                                        }}
                                      >
                                        <i className="fa fa-eye"></i> View
                                        Profile
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="jobs-details-info-card mb-0">
                      <div class="jobs-details-phone">
                        {details?.phone ?? "NA"}
                      </div>

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
                  </div>

                  <div class="col-md-12">
                    <div class="jobs-details-desc-card mb-0">
                      <h3>Description</h3>
                      <p>{details?.description ?? "NA"}</p>
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

export default Details;
