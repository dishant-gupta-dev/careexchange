import React, { useEffect, useState } from "react";
import { api } from "../../../utlis/user/api.utlis";
import WhCalen from "../../../assets/user/images/whcalendar.svg";
import RepeatImg from "../../../assets/user/images/Repeat.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../layouts/loader/Loader";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import locationImage from "../../../assets/admin/images/Google_Map.svg";
import ApiService from "../../../core/services/ApiService";
import moment from "moment";
import { decode, encode } from "base-64";
import { routes } from "../../../utlis/user/routes.utlis";

const Details = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const { id } = useParams();

  const getDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setDetails(response.data.data.requestDetail);
    } else {
      setDetails();
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
                <div class="row">
                  <div class="col-md-12">
                    <div class="care-card">
                      <div class="care-card-head">
                        <div class="care-id">
                          Job ID: <span>{decode(id)}</span>
                        </div>

                        <div class="care-status">
                          Status: <span>{details?.request_status ?? "NA"}</span>
                        </div>
                      </div>
                      <div class="care-card-body">
                        <div class="care-content">
                          <div class="title-text">
                            {details?.first_name ?? "NA"}
                          </div>
                          <div class="tags-list">
                            <div class="tags-item">
                              {details?.gender == "M" ? "Male" : "Female"}
                            </div>
                            <div class="tags-item mx-2">
                              Age: {details?.age ?? "NA"}
                            </div>
                          </div>
                          <div class="date-text">
                            <img src={WhCalen} />{" "}
                            {moment(details?.start_date).format("MM-DD-yyyy")}{" "}
                            {details?.start_time ?? "NA"}
                          </div>
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
                          {/* <div class="care-day-list">
                            <div class="care-day-item">S</div>
                            <div class="care-day-item">T</div>
                            <div class="care-day-item">W</div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="row">
                      {details?.requestedProviderList?.length !== 0
                        ? details?.requestedProviderList?.map((ele, indx) => {
                            return (
                              <div key={indx} class="col-md-4">
                                <div class="care-card">
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
                                          {ele?.care_providers_details?.business_name
                                            ? ele?.care_providers_details?.business_name
                                            : ele?.fullname}
                                        </div>
                                        <div class="care-user-rating">
                                          <i class="fa fa-star"></i>{" "}
                                          {ele.avarageRating ?? "0"}
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      {ele.user_type == 2 ? "Provider" : "Staff"}
                                    </div>
                                  </div>
                                  <div class="care-card-body">
                                    <div class="care-pricetag-content">
                                      <div class="care-price-text">
                                        <div class="pricehour-text">
                                          {ele?.care_providers_details?.fee ??
                                            "NA"}
                                        </div>
                                        <div class="exp-text">
                                          {ele?.care_providers_details
                                            ?.experience ?? "NA"}
                                        </div>
                                      </div>
                                      <div class="care-tag-text">
                                        {ele?.care_providers_details
                                          ?.service_type ?? "NA"}
                                      </div>
                                    </div>
                                    <div class="care-location-box">
                                      <div class="care-location-text">
                                        <h4>Location</h4>
                                        <p>
                                          {ele?.care_providers_details
                                            ?.business_address ?? "NA"}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-center mt-2 w-100">
                                      <Link className="viewmorebtn" to={routes.userMessage+`/${encode(ele?.provider_id)}`}>
                                        <i className="fa fa-wechat"></i> Chat
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

                  <div class="col-md-6">
                    <div class="jobs-details-info-card">
                      <div class="jobs-details-phone">{details?.phone ?? "NA"}</div>

                      <div class="jobs-details-point">
                        <div class="jobs-details-point-item">
                          <h4>Best Time To Call: </h4>
                          <p>{details?.best_time_to_call ?? "NA"}</p>
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
                      <p>
                        {details?.description ?? "NA"}
                      </p>
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
