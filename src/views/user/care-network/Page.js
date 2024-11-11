import React, { useEffect, useState } from "react";
import Search from "../../../assets/user/images/search1.svg";
import { api } from "../../../utlis/user/api.utlis";
import { routes } from "../../../utlis/user/routes.utlis";
import Clock from "../../../assets/user/images/clock.svg";
import Dollar from "../../../assets/user/images/dollar.svg";
import SuitCase from "../../../assets/user/images/jobs-suitcase.svg";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import GmapImg from "../../../assets/user/images/Google_Maps_icon.svg";
import LocImg from "../../../assets/user/images/location.svg";
import moment from "moment";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { encode } from "base-64";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [careNetwork, setCareNetwork] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [file, setFile] = useState();
  const [filter, setFilter] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [apply, setApply] = useState({ status: false, id: null });

  const initialValues = {
    full_name: "",
    mobile: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Name is required!"),
    mobile: Yup.string().required("Mobile is required!"),
    email: Yup.string().email().required("Email is required!"),
  });

  const getCareNetwork = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all care network => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setCareNetwork(response.data.data.postedJob);
    } else setCareNetwork([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    if (date != null && date != undefined && date != "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getCareNetwork(api.careNetworkList + `?search=${name}&date=${date}`);
  };

  const applyJob = async (formValue) => {
    if (file === "" || file === null || !file) {
      setImgError(true);
      return;
    } else setImgError(false);
    setLoading(true);
    let form = new FormData();
    form.append("full_name", formValue.full_name);
    form.append("email", formValue.email);
    form.append("mobile", formValue.mobile);
    form.append("job_id", apply.id);
    form.append("resume", file);
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.applyJob,
      form
    );
    setApply({
      status: false,
      id: null,
    });
    if (response.data.status) {
      toast.success(response.data.message);
      getCareNetwork(api.careNetworkList);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const handleResumeChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCareNetwork(api.careNetworkList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div className="messages-tab">
          <ul className="nav nav-tabs">
            <li>
              <Link class="btn-wh active" to={routes.careNetwork}>
                Find A Job
              </Link>
            </li>
            <li>
              <Link to={routes.jobRequest} class="btn-wh">
                Job Requests
              </Link>
            </li>
            <li>
              <Link to={routes.appliedJob} class="btn-wh">
                {" "}
                Applied Jobs
              </Link>
            </li>
            <li>
              <Link to={routes.postedJob} class="btn-wh">
                Posted Job
              </Link>
            </li>
          </ul>
        </div>
        <div class="carenetwork-section">
          <div class="care-title-header">
            <h2 class="heading-title">Care Network</h2>
            <Link class="bottom-buttons" to={routes.addPost} title="Add Post">
              <i className="fa fa-plus"></i>
            </Link>
            <div class="search-filter wd60">
              <div class="row g-2">
                <div class="col-md-2">
                  <div class="form-group">
                    <Link
                      class="btn-bl wd100"
                      to=""
                      onClick={() => setFilter(true)}
                    >
                      Sort By Filter
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
                        <img src={Search} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carenetwork-content">
            <div class="row">
              {careNetwork.length !== 0 ? (
                careNetwork.map((ele, indx) => {
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
                              class="btn-gr"
                              onClick={() =>
                                setApply({ status: true, id: ele.id })
                              }
                            >
                              Apply
                            </Link>
                            <Link
                              class="btn-bl"
                              to={`${routes.careNetworkDetails}/${encode(
                                ele.id
                              )}`}
                            >
                              View Details
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
        show={filter}
        onHide={() => {
          setFilter(false);
        }}
        className="modal-xl"
      >
        <div className="modal-content">
          <ModalHeader className="text-center">
            <h5 className="mb-0">Filter</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={applyJob}
              >
                <Form>
                  <div class="findcare-content">
                    <div class="step-content tab-content">
                      <div class="tab-pane fade active show" id="tab1">
                        <div class="findcare-form">
                          <div class="findcare-card">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group search-form-group">
                                  <h4>Job Location</h4>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name=""
                                    value="Atlanta GA, 55394"
                                    placeholder="Job Title"
                                  />
                                  <span class="form-group-icon">
                                    <img src={GmapImg} />
                                  </span>
                                </div>
                              </div>
                              <div class="col-md-12">
                                <div class="form-group">
                                  <h4>Search By Miles Away</h4>
                                  <div class="choosemiles-list">
                                    <ul>
                                      <li>
                                        <div class="ceradio1">
                                          <input
                                            type="radio"
                                            id="10_Miles"
                                            name="radius"
                                          />
                                          <label for="10_Miles">
                                            <span class="checkbox-text">
                                              <img src={LocImg} /> 10 Miles{" "}
                                            </span>
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div class="ceradio1">
                                          <input
                                            type="radio"
                                            id="20_Miles"
                                            name="radius"
                                          />
                                          <label for="20_Miles">
                                            <span class="checkbox-text">
                                              <img src={LocImg} /> 20 Miles{" "}
                                            </span>
                                          </label>
                                        </div>
                                      </li>

                                      <li>
                                        <div class="ceradio1">
                                          <input
                                            type="radio"
                                            id="30_Miles"
                                            name="radius"
                                          />
                                          <label for="30_Miles">
                                            <span class="checkbox-text">
                                              <img src={LocImg} /> 30 Miles{" "}
                                            </span>
                                          </label>
                                        </div>
                                      </li>

                                      <li>
                                        <div class="ceradio1">
                                          <input
                                            type="radio"
                                            id="40_Miles"
                                            name="radius"
                                          />
                                          <label for="40_Miles">
                                            <span class="checkbox-text">
                                              <img src={LocImg} /> 40 Miles{" "}
                                            </span>
                                          </label>
                                        </div>
                                      </li>

                                      <li>
                                        <div class="ceradio1">
                                          <input
                                            type="radio"
                                            id="50_Miles"
                                            name="radius"
                                          />
                                          <label for="50_Miles">
                                            <span class="checkbox-text">
                                              <img src={LocImg} /> 50 Miles{" "}
                                            </span>
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div class="col-md-12">
                                <div class="form-group">
                                  <h4>Care Services You Are Looking For?</h4>
                                  <div class="row">
                                    <div class="col-md-6">
                                      <select class="form-control">
                                        <option>Senior Care</option>
                                      </select>
                                    </div>
                                    <div class="col-md-6">
                                      <select class="form-control">
                                        <option>Home Care</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="col-md-12">
                                <div class="form-group text-end">
                                  <button class="btn-gr">Apply Filter</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </Form>
              </Formik>
            </div>
          </ModalBody>
        </div>
      </Modal>

      <Modal
        show={apply.status}
        onHide={() => {
          setApply({ status: false, id: null });
        }}
        className=""
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Apply Jobs</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={applyJob}
              >
                <Form>
                  <div className="form-group">
                    <Field
                      type="text"
                      className="form-control"
                      name="full_name"
                      placeholder="Enter Name"
                    />
                    <ErrorMessage
                      name="full_name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div class="form-group">
                    <Field
                      type="number"
                      className="form-control todo-list-input"
                      name="mobile"
                      placeholder="Enter Mobile"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control"
                      name="file"
                      accept="application/*"
                      onChange={handleResumeChange}
                    />
                    {imgError && (
                      <div className="alert alert-danger">
                        Image is required!
                      </div>
                    )}
                  </div>
                  <div className="form-group text-end">
                    <button
                      type="button"
                      onClick={() => {
                        setApply({ status: false, id: null });
                      }}
                      className="btn btn-gradient-danger me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-gradient-primary me-2"
                      data-bs-dismiss="modal"
                    >
                      Apply
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default Page;
