import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../utlis/admin/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { decode } from "base-64";
import { status } from "../../../utlis/common.utlis";
import moment from "moment";
import { encode } from "base-64";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { routes } from "../../../utlis/admin/routes.utlis";

const Details = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getJobDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setDetails(response.data.data);
    } else setDetails();
    setLoading(false);
  };

  useEffect(() => {
    getJobDetails(api.careJobDetails + `${decode(id)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
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
            Care Job Details
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">
                    Job ID : {details?.job_id ?? "NA"}
                  </h4>
                </div>
                <div>
                  <button
                    style={{ cursor: "default" }}
                    type="button"
                    className={
                      details?.status == 1 || details?.status == 4
                        ? "btn btn-view-active px-4"
                        : details?.status == 0
                        ? "btn btn-view-pending px-4"
                        : "btn btn-view-inactive px-4"
                    }
                  >
                    {status(details?.status)}
                  </button>
                </div>
              </div>
              <div className="iq-card-body">
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="col-lg-12 d-flex justify-content-between mb-3">
                        <h5 className="text-capitalize">
                          {details?.first_name ?? "NA"}
                        </h5>
                        <div>
                          <button
                            style={{ cursor: "default" }}
                            type="button"
                            className="btn btn-view-profile mx-2"
                          >
                            {details?.gender == "M" ? "Male" : "Female"}
                          </button>
                          <button
                            style={{ cursor: "default" }}
                            type="button"
                            className="btn btn-view-profile"
                          >
                            Age : {details?.age ?? "NA"}
                          </button>
                        </div>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label>Start Date</label>
                        <p>
                          {moment(details?.start_date).format("MM-DD-yyyy")}
                        </p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="lname">Time</label>
                        <p>
                          {details?.start_time}
                        </p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Frequency</label>
                        <p>
                        {details?.frequency === "O" ? "One Time" : (details?.frequency === "W" ? "Repeat Weekly" : "Repeat Monthly")}
                          {/* {details?.days?.length !== 0
                            ? details?.days?.map((element, index) => {
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
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">{details?.phone ?? "NA"}</h4>
                </div>
                <div></div>
              </div>
              <div className="iq-card-body">
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="form-group col-md-4 mb-0">
                        <label>Best Time to Call</label>
                        <p className="text-capitalize">
                          {details?.best_time_to_call ?? "NA"}
                        </p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="lname">Relationship</label>
                        <p className="text-capitalize">
                          {details?.relationship ?? "NA"}
                        </p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Location</label>
                        <p className="text-capitalize">
                          {" "}
                          <label className="badge badge-gradient-success me-2">
                            {" "}
                            <i className="mdi mdi-map-marker-radius-outline menu-icon"></i>
                          </label>{" "}
                          {details?.address ?? "NA"}
                        </p>
                      </div>
                      {/* <div className="form-group col-md-4 mb-0">
                        <label for="add1">Image </label>
                        <p>
                          {details?.image === null ||
                          details?.image === "" ||
                          details?.image === undefined ? (
                            <img
                              src={NoImage}
                              alt=""
                              height={170}
                              width={250}
                              style={{
                                borderRadius: "8px",
                                objectFit: "cover",
                                objectPosition: "center",
                                border: "1px solid #e7e7fa",
                              }}
                              className="me-3"
                            />
                          ) : (
                            <img
                              src={details?.image}
                              alt=""
                              className="me-3"
                              height={170}
                              width={250}
                              style={{
                                borderRadius: "8px",
                                objectFit: "cover",
                                objectPosition: "center",
                                border: "1px solid #e7e7fa",
                              }}
                            />
                          )}
                        </p>
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {details?.providers?.length !== 0
            ? details?.providers?.map((ele, indx) => {
                return (
                  <div className="col-md-12" key={indx}>
                    <div className="card">
                      <div className="card statistics-card-1 card-img-holder text-dark position-relative">
                        <div className="card-body align-items-center d-flex">
                          <div className="d-flex justify-content-between w-100">
                            <div className="care-for-profile-img me-3 d-flex align-items-center">
                              {ele.image === null ||
                              ele.image === "" ||
                              ele.image === undefined ? (
                                <img src={NoImage} className="me-3" alt="" />
                              ) : (
                                <img src={ele.image} className="me-3" alt="" />
                              )}
                              <div className="">
                                <h5 className="">{ele.fullname ?? "NA"}</h5>
                                <p className="m-0">
                                  <i className="mdi mdi-checkbox-multiple-marked-circle-outline"></i>{" "}
                                  Confirmed Care-Provider
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
                                      `${routes.providerDetails}/${encode(
                                        ele.provider_id
                                      )}`
                                    )
                                  }
                                >
                                  View Care-Provider Profile
                                </button>
                                {/* <button
                                  type="button"
                                  className="btn btn-view-profile"
                                >
                                  View Job Detail
                                </button> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Details;
