import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { decode, encode } from "base-64";
import { api } from "../../../utlis/provider/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import StarImg from "../../../assets/user/images/star.svg";
import DollarImg from "../../../assets/user/images/dollar-circle.svg";
import BriefcaseImg from "../../../assets/user/images/briefcase.svg";
import HouseImg from "../../../assets/user/images/house.svg";
import HandshakeImg from "../../../assets/user/images/Handshake.svg";
import StarWhImg from "../../../assets/user/images/starwh.svg";
import moment from "moment/moment";

const ProviderDetail = () => {
  const navigate = useNavigate();
  const localData = useLocation();
  const id = localData.state?.id;
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);

  const getDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log(response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setDetails(response.data.data);
    } else setDetails();
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getDetails(api.userDetail + `${decode(id)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div class="carenetwork-section">
          <div className="care-title-header">
            <h2 className="heading-title text-capitalize">
              {details?.user_type_text ?? ""} Detail
            </h2>
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
          <div class="row">
            <div class="col-md-12">
              <div class="providerProfile-section">
                <div class="user-table-item">
                  <div class="row g-1 align-items-center">
                    <div class="col-md-7">
                      <div class="user-profile-item">
                        <div class="user-profile-media">
                          {details?.logo !== null &&
                          details?.logo !== "" &&
                          details?.logo !== undefined ? (
                            <img src={details?.logo} alt="" className="me-3" />
                          ) : details?.profile_image === null ||
                            details?.profile_image === "" ||
                            details?.profile_image === undefined ? (
                            <img src={NoImage} alt="" className="me-3" />
                          ) : (
                            <img
                              src={details?.profile_image}
                              alt=""
                              className="me-3"
                            />
                          )}
                        </div>
                        <div class="user-profile-text">
                          <h2>
                            {details?.business_name
                              ? details?.business_name
                              : details?.fullname}
                          </h2>
                          <div class="location-text">
                            {details?.business_address ?? "NA"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="row g-1 align-items-center">
                        <div class="col-md-6">
                          <div class="user-contact-info">
                            <div class="user-contact-info-icon">
                              <img src={StarImg} />
                            </div>
                            <div class="user-contact-info-content">
                              <h2>Rating</h2>
                              <p>
                                {details?.avarageRating?.average_rating ??
                                  "0.0"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* <div class="col-md-4">
                          <div class="user-contact-info">
                            <div class="user-contact-info-icon">
                              <img src={DollarImg} />
                            </div>
                            <div class="user-contact-info-content">
                              <h2>Rate</h2>
                              <p>{details?.fee ?? "NA"}</p>
                            </div>
                          </div>
                        </div> */}

                        <div class="col-md-6">
                          <div class="user-contact-info">
                            <div class="user-contact-info-icon">
                              <img src={BriefcaseImg} />
                            </div>
                            <div class="user-contact-info-content">
                              <h2>Experience</h2>
                              <p>{details?.experience ?? 0} Years</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="providerProfile-point">
                    <div class="providerprofile-point-item">
                      <img src={HouseImg} /> Cared {details?.caredFamilys ?? 0}{" "}
                      Families
                    </div>
                    <div class="providerprofile-point-item">
                      <img src={HandshakeImg} /> Hired By{" "}
                      {details?.caredFamilyNearBy ?? 0} Families In Your
                      Neighbourhood
                    </div>
                  </div>
                </div>

                <div class="providerprofile-overview">
                  <div class="row g-2">
                    <div class="col-md-4">
                      <div class="overview-card">
                        <div class="overview-content">
                          <h2>Repeat Clients</h2>
                          <h4>{details?.repeatClient ?? 0}</h4>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="overview-card">
                        <div class="overview-content">
                          <h2>Response Rate</h2>
                          <h4>{details?.responseRate ?? "0%"}</h4>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="overview-card">
                        <div class="overview-content">
                          <h2>Response Time</h2>
                          <h4>{details?.responseTime ?? "NA"}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="providerprofile-about">
                  <h2>About</h2>
                  <p>{details?.description ?? "NA"}</p>
                </div>

                <div class="providerprofile-about">
                  <h2>Offering Services</h2>
                  <div>
                    <div className="tags-item">{details?.category ?? "NA"}</div>
                    <div className="tags-item-sub">
                      {details?.subcategory ?? "NA"}
                    </div>
                  </div>
                </div>

                {/* <div class="review-card">
                  <div class="review-card-content">
                    <div class="review-card-icon">
                      <img src={StarWhImg} />
                    </div>
                    <div class="review-card-text">
                      <h3>Rating & Review</h3>
                      <p>
                        {details?.avarageRating?.average_rating ?? "0.0"}(
                        {details?.avarageRating?.total_reviews ?? "0"})
                      </p>
                    </div>
                  </div>
                  <div class="review-card-action">
                    <a data-bs-toggle="modal" data-bs-target="#WriteReview">
                      Write your Review
                    </a>
                  </div>
                </div>

                <div class="care-comment-list">
                  {details?.reviewsList?.length !== 0 ? (
                    details?.reviewsList?.map((element, index) => {
                      return (
                        <div key={index} className="care-comment-item">
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
                                {moment(element.created_date).format(
                                  "MM-DD-yyyy HH:MM"
                                )}
                              </div>
                            </div>
                            <div className="care-comment-descr">
                              {element.review ?? "NA"}
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderDetail;
