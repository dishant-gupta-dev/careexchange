import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import locationImage from "../../../assets/admin/images/Google_Map.svg";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { api } from "../../../utlis/provider/api.utlis";
import { decode, encode } from "base-64";
import { routes } from "../../../utlis/provider/routes.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { status } from "../../../utlis/common.utlis";
import moment from "moment";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
              <div className="cc-care-card-body">
                <div className="cc-care-content">
                  <div className="cc-title-text">
                    {details?.first_name ?? "NA"}
                  </div>

                  <div className="cc-tags-list">
                    <button type="button" className="cc-tags-item">
                      {details?.gender == "M" ? "Male" : "Female"}
                    </button>
                    <button type="button" className="cc-tags-item mx-2">
                      Age: {details?.age ?? "NA"}
                    </button>
                  </div>

                  <div className="cc-date-text">
                    <i className="mdi mdi-calendar-clock-outline"></i> Date &
                    Time:{" "}
                    <span>
                      {moment(details?.start_date).format("MM-DD-yyyy")}{" "}
                      {details?.start_time}
                    </span>
                  </div>
                </div>
                <div className="cc-care-day-Weekly-info">
                  <div className="cc-care-point-box">
                    <div className="cc-care-point-icon">
                      <i className="mdi mdi-calendar-sync"></i>
                    </div>
                    <div className="cc-care-point-text">
                      <h4>Frequency:</h4>
                      <p>
                        {details?.frequency === "O"
                          ? "One Time"
                          : details?.frequency === "W"
                          ? "Repeat Weekly"
                          : "Repeat Monthly"}
                      </p>
                    </div>
                  </div>
                  {/* <div className="care-day-list">
                    <div className="care-day-item">S</div>
                    <div className="care-day-item">T</div>
                    <div className="care-day-item">W</div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="jobs-details-info-card">
              <div className="jobs-details-phone">{details?.phone ?? "NA"}</div>

              <div className="jobs-details-point">
                <div className="jobs-details-point-item">
                  <h4>Best Time to Call: </h4>
                  <p>{details?.best_time_to_call ?? "NA"}</p>
                </div>
                <div className="jobs-details-point-item">
                  <h4>Relationship: </h4>
                  <p>{details?.relationship ?? "NA"}</p>
                </div>
              </div>

              <div className="jobsdetails-location-item">
                <div className="jobsdetails-location-item-icon">
                  <img src={locationImage} />
                </div>
                <div className="jobsdetails-location-item-text">
                  <h4>Location:</h4>
                  <p>{details?.address ?? "NA"}</p>
                </div>
              </div>
            </div>
          </div>

          {details?.providers?.length !== 0
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
            : null}

          <div className="col-md-12">
            <div className="jobs-details-desc-card">
              <h3>Description</h3>
              <p>{details?.description ?? "NA"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
