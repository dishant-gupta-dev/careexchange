import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchImg from "../../../assets/user/images/search1.svg";
import { api } from "../../../utlis/user/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import Clock from "../../../assets/user/images/clock.svg";
import Dollar from "../../../assets/user/images/dollar.svg";
import SuitCase from "../../../assets/user/images/jobs-suitcase.svg";
import moment from "moment";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { Modal, ModalBody } from "react-bootstrap";
import toast from "react-hot-toast";
import { routes } from "../../../utlis/user/routes.utlis";
import { encode } from "base-64";

const PostedJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [deletePost, setDeletePost] = useState({ status: false, id: null });

  const getPostedJob = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all posted job => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setJob(response.data.data.postedJob);
    } else setJob([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    if (date != null && date != undefined && date != "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getPostedJob(api.postedJob + `?search=${name}&date=${date}`);
  };

  const postDelete = async (id) => {
    setLoading(true);
    const response = await ApiService.deleteAPIWithAccessToken(
      api.deletePost + `${id}`
    );
    setDeletePost({
      status: false,
      id: null,
    });
    if (response.data.status) {
      toast.success(response.data.message);
      getPostedJob(api.postedJob);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPostedJob(api.postedJob);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div class="carenetwork-section">
          <div class="care-title-header">
            <h2 class="heading-title">Posted Jobs</h2>
            <div class="search-filter wd50">
              <div class="row g-2">
                <div class="col-md-2">
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
                <div class="col-md-4">
                  <div class="form-group">
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
                      autoComplete="off"
                      name="date"
                      placeholderText="Select Date"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <div class="search-form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => handleFilter(e)}
                        name="name"
                      />
                      <span class="search-icon">
                        <img src={SearchImg} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carenetwork-content">
            <div class="row">
              {job.length !== 0 ? (
                job.map((ele, indx) => {
                  return (
                    <div key={indx} class="col-md-6">
                      <div class="care-card">
                        <div class="care-card-head">
                          <div class="care-id">
                            Job ID: <span>{ele.job_id ?? "NA"}</span>
                          </div>

                          <div class="care-date">
                            Posted On:{" "}
                            <span>
                              {moment(ele.posted_date).format(
                                "MM-DD-yyyy hh:mm A"
                              )}
                            </span>
                          </div>
                        </div>
                        <div class="care-card-body">
                          <div class="care-content">
                            <div class="title-text">{ele.title ?? "NA"}</div>
                            <div class="tags-list">
                              <div class="tags-item">
                                {ele.category ?? "NA"}
                              </div>
                            </div>

                            <div class="jobs-point">
                              <div class="jobs-point-item">
                                <img src={Clock} /> Work Timing:
                                <span>{ele.working_time_value ?? "NA"}</span>
                              </div>
                              <div class="jobs-point-item">
                                <img src={Dollar} /> Salary:
                                <span>{ele.pay_range ?? "$0"}/Annually</span>
                              </div>
                              <div class="jobs-point-item">
                                <img src={SuitCase} /> Work Exp:
                                <span>
                                  {ele.working_expirence ?? "NA"} Experience{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="care-card-foot">
                          <div class="care-action">
                            <Link
                              class="btn-re"
                              to=""
                              onClick={() =>
                                setDeletePost({ status: true, id: ele.id })
                              }
                            >
                              Delete
                            </Link>
                            <Link
                              class="btn-gra"
                              to={`${routes.jobRequest}/${encode(
                                ele.id
                              )}`}
                            >
                              View All Applicants
                            </Link>
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
          </div>
        </div>
      </div>

      <Modal
        show={deletePost.status}
        onHide={() => {
          setDeletePost({
            status: false,
            id: null,
          });
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalBody className="">
            <div className="add-items d-flex row">
              <h5 className="text-center mb-0">Are you sure</h5>
              <p className="text-center">You want to delete this post?</p>
              <div className="form-group text-center mb-2">
                <button
                  type="button"
                  onClick={() =>
                    setDeletePost({
                      status: false,
                      id: null,
                    })
                  }
                  className="btn-re me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gr"
                  data-bs-dismiss="modal"
                  onClick={() => postDelete(deletePost.id)}
                >
                  Yes! Delete
                </button>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default PostedJob;