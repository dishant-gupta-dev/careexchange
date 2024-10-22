import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../utlis/admin/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { decode, encode } from "base-64";
import moment from "moment";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { routes } from "../../../utlis/admin/routes.utlis";
import { status } from "../../../utlis/common.utlis";
import { Modal, ModalBody } from "react-bootstrap";
import toast from "react-hot-toast";

const JobDetails = () => {
  const navigate = useNavigate();
  const [stat, setStat] = useState({ status: false, value: null, name: null });
  const [job, setJob] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getJobDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setJob(response.data.data);
    } else setJob();
    setLoading(false);
  };

  const changeStatus = async (status) => {
    setLoading(true);
    const form = JSON.stringify({
      status: parseInt(status),
    });
    const response = await ApiService.putAPIWithAccessToken(
      api.postedChangeStatus + `${decode(id)}`,
      form
    );
    setStat({ status: false, value: null });
    if (response.data.status && response.data.statusCode === 200) {
      getJobDetails(api.postedJobDetail + `${decode(id)}`);
      toast.success(response.data.message);
    } else toast.error(response.data.message);
    setLoading(false);
  };

  useEffect(() => {
    getJobDetails(api.postedJobDetail + `${decode(id)}`);
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
            Posted Job Detail
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-12 mt-3">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Job ID : {job?.job_id ?? "NA"}</h4>
                </div>
                <div>
                  {job?.status == 0 ? (
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
                          job?.status == 1 ? "green-select" : "red-select"
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
                          selected={job?.status == 1 ? true : false}
                          value="1"
                        >
                          Active
                        </option>
                        <option
                          selected={job?.status == 2 ? true : false}
                          value="2"
                        >
                          Inactive
                        </option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="iq-card-body">
                <div className="row ">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card statistics-card-1 card-img-holder text-dark position-relative">
                        <div className="card-body align-items-center d-flex">
                          <div className="d-flex justify-content-between w-100">
                            <div className="care-for-profile-img me-3 d-flex align-items-center">
                              {job?.provider?.image === null ||
                              job?.provider?.image === "" ||
                              job?.provider?.image === undefined ? (
                                <img
                                  src={NoImage}
                                  alt=""
                                  className="me-2"
                                  height={40}
                                  width={40}
                                  style={{
                                    objectFit: "cover",
                                    objectPosition: "center",
                                  }}
                                />
                              ) : (
                                <img
                                  src={job?.provider?.image}
                                  alt=""
                                  className="me-2"
                                  height={40}
                                  width={40}
                                  style={{
                                    objectFit: "cover",
                                    objectPosition: "center",
                                  }}
                                />
                              )}
                              <div className="">
                                <h5 className="">
                                  {job?.provider?.fullname ?? "NA"}
                                </h5>
                                <p className="m-0">
                                  Posted on :{" "}
                                  {moment(job?.posted_date).format(
                                    "MM-DD-yyyy hh:mm A"
                                  )}
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
                                      routes.providerDetails +
                                        `/${encode(job?.care_provider_id)}`
                                    )
                                  }
                                >
                                  View Profile
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 ">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">{job?.title ?? "NA"}</h4>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-view-profile"
                    style={{ cursor: "default" }}
                  >
                    23+ Applicant Applied for this Job
                  </button>
                </div>
              </div>

              <div className="iq-card-body">
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="form-group col-md-4 mb-0">
                        <label>Job ID</label>
                        <p>{job?.job_id ?? "NA"}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label>Posted Date</label>
                        <p>{moment(job?.posted_date).format("MM-DD-yyyy")}</p>
                      </div>

                      <div className="form-group col-md-4 mb-0">
                        <label>Posted Time</label>
                        <p>{moment(job?.posted_date).format("hh:mm A")}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Work Experience</label>
                        <p>{job?.working_expirence ?? "NA"}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Salary</label>
                        <p>{job?.pay_range ?? "NA"}/Annually</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Work Timing</label>
                        <p>{job?.working_time_value ?? "NA"}</p>
                      </div>

                      <div className="form-group col-md-12 mt-3 mb-3">
                        <label for="add1">Tags</label>
                        <div className="d-flex mt-2">
                          <p className="me-2">
                            <Link
                              to=""
                              className="px-4 tags-btn-line"
                              style={{ cursor: "default" }}
                            >
                              Full Time
                            </Link>
                          </p>
                          <p className="me-2">
                            <Link
                              to=""
                              className="px-4 tags-btn-line"
                              style={{ cursor: "default" }}
                            >
                              Day Shift
                            </Link>
                          </p>
                        </div>
                      </div>

                      <div className="form-group col-md-12 mt-2 mb-0">
                        <label>
                          <h6>Job Requirement</h6>
                        </label>
                        <p>{job?.description ?? "NA"}</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
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
              <p className="text-center">You want to <span className="text-lowercase">{stat.name}</span> this posted job?</p>
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

export default JobDetails;
