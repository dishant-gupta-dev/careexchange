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
import Face1 from "../../../assets/admin/images/face1.jpg";

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
    window.scrollTo(0, 0)
    getJobDetails(api.careJobDetails + `${decode(id)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <a className="btn-back" href="care-assessment.html">
              <i className="mdi mdi-arrow-left-thin"></i>
              Care Assessment Details
            </a>
          </h3>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card statistics-card-1 card-img-holder text-dark position-relative">
                <div className="card-body align-items-center d-flex">
                  <div className="d-flex justify-content-between w-100">
                    <div className="care-for-profile-img me-3 d-flex align-items-center">
                      {details?.image === null ||
                      details?.image === "" ||
                      details?.image === undefined ? (
                        <img src={NoImage} className="me-3" alt="" />
                      ) : (
                        <img src={details?.image} className="me-3" alt="" />
                      )}
                      <div className="text-capitalize">
                        <h5 className="">{details?.first_name ?? "NA"}</h5>
                      </div>
                    </div>
                    <div className="d-flex align-items-center profile-name-card-details">
                      <div className="p-3">
                        <p className="m-0">
                          <label>Email ID :</label> {details?.email_id ?? "NA"}
                        </p>
                        <p className="mb-2">
                          <label>Phone No :</label> {details?.phone ?? "NA"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-3">
            <div className="iq-card">
              <div className="iq-card-body">
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="form-group col-md-4 mb-0">
                        <label>Address</label>
                        <p>
                          {" "}
                          <label className="badge badge-gradient-success me-2">
                            {" "}
                            <i className="mdi mdi-map-marker-radius-outline menu-icon"></i>
                          </label>{" "}
                          {details?.address ?? "NA"}
                        </p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="lname">Prefer To Be Continued</label>
                        <p>{details?.prefer_contacted ?? "NA"}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Preferred Date</label>
                        <p>{moment(details?.start_date).format("MM-DD-yyyy")}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Preferred Time</label>
                        <p>{details?.start_time}</p>
                      </div>

                      <div className="form-group col-md-4 mb-0">
                        <label>Type of Care</label>
                        <p> {details?.in_home_assist ?? 'NA'}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="lname">Who Needs Care</label>
                        <p>{details?.gender == "F" ? "Female" : "Male"}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Age</label>
                        <p>{details?.age ?? "NA"}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Relationship</label>
                        <p>{details?.relationship ?? "NA"}</p>
                      </div>
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
