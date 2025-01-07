import React, { useEffect, useState } from "react";
import Clock from "../../../assets/user/images/clock.svg";
import Dollar from "../../../assets/user/images/dollar.svg";
import SuitCase from "../../../assets/user/images/jobs-suitcase.svg";
import Map from "../../../assets/user/images/Google_Map.svg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { decode, encode } from "base-64";
import moment from "moment";
import { api } from "../../../utlis/user/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import CallImg from "../../../assets/user/images/call.svg";
import UserImg from "../../../assets/user/images/UserImg.svg";
import SmsImg from "../../../assets/user/images/sms.svg";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { SingleFile } from "../../../utlis/common.utlis";
import InputMask from "react-input-mask";

const Details = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState();
  const [apply, setApply] = useState({ status: false, id: null });
  const [loading, setLoading] = useState(false);
  const localData = useLocation();
  const id = localData.state?.id;

  let userData = JSON.parse(localStorage.getItem("careexchange"));

  const initialValues = {
    full_name: userData.fullname ?? "",
    mobile: userData.mobile ?? "",
    email: userData.email ?? "",
    resume: "",
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Name is required!"),
    mobile: Yup.string()
      .min(14, "Phone is invalid")
      .required("Phone is required!"),
    email: Yup.string().email().required("Email is required!"),
    resume: Yup.mixed()
      .required("Please upload your resume")
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= SingleFile * 1024 * 1024;
      })
      .test("fileType", "Unsupported file type", (value) => {
        return value && ["application/pdf"].includes(value.type);
      }),
  });

  const getJobDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log(response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setJob(response.data.data);
    } else setJob();
    setLoading(false);
  };

  const applyJob = async (formValue) => {
    setLoading(true);
    let form = new FormData();
    form.append("full_name", formValue.full_name);
    form.append("email", formValue.email);
    form.append("mobile", formValue.mobile);
    form.append("job_id", apply.id);
    form.append("resume", formValue.resume);
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
      getJobDetails(api.careNetworkDetail + `${decode(id)}`);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobDetails(api.careNetworkDetail + `${decode(id)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="carenetwork-section">
          <div className="care-title-header">
            <h2 className="heading-title">Care Network</h2>
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
          <div className="carenetwork-content">
            <div className="row">
              <div className="col-md-12">
                <div className="care-card">
                  <div className="care-card-head">
                    <div className="details-care-id">
                      Job ID: <span>{job?.job_id ?? "NA"}</span>
                    </div>

                    <div className="details-care-date">
                      Posted On:{" "}
                      <span>
                        {moment(job?.posted_date).format("MM-DD-yyyy")}
                      </span>
                    </div>
                  </div>
                  <div className="care-card-body">
                    <div className="details-care-content">
                      <div className="details-title-text">
                        {job?.title ?? "NA"}
                      </div>
                      <div className="details-tags-list">
                        <div className="details-tags-item">
                          {job?.category ?? "NA"}
                        </div>
                        <div className="tags-item-sub">
                          {job?.subcategory ?? "NA"}
                        </div>
                      </div>
                      <div className="jobs-details-point-list1">
                        <div className="row g-1">
                          <div className="col-md-4">
                            <div className="jobs-details-item1">
                              <div className="jobs-details-icon">
                                <img src={UserImg} />
                              </div>
                              <div className="jobs-details-text">
                                <h2>Contact Name:</h2>
                                <p>{job?.contact_person_name ?? "NA"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="jobs-details-item1">
                              <div className="jobs-details-icon">
                                <img src={SmsImg} />
                              </div>
                              <div className="jobs-details-text">
                                <h2>Contact Email:</h2>
                                <p>{job?.contact_person_email ?? "NA"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="jobs-details-item1">
                              <div className="jobs-details-icon">
                                <img src={CallImg} />
                              </div>
                              <div className="jobs-details-text">
                                <h2>Contact Phone:</h2>
                                <p>{job?.contact_person_phone ?? "NA"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="jobs-details-item1">
                              <div className="jobs-details-icon">
                                <img src={Clock} />
                              </div>
                              <div className="jobs-details-text">
                                <h2>Work Timing:</h2>
                                <p>{job?.working_time_value ?? "NA"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="jobs-details-item1">
                              <div className="jobs-details-icon">
                                <img src={Dollar} />
                              </div>
                              <div className="jobs-details-text">
                                <h2>Salary</h2>
                                <p>
                                  {job?.currency ?? "$"}
                                  {job?.pay_range ?? "NA"}/
                                  {job?.pay_range_type ?? ""}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="jobs-details-item1">
                              <div className="jobs-details-icon">
                                <img src={SuitCase} />
                              </div>
                              <div className="jobs-details-text">
                                <h2> Work Exp:</h2>
                                <p>
                                  {" "}
                                  {job?.working_expirence ?? "NA"} Years
                                  Experience{" "}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="jobs-details-item1">
                              <div className="jobs-details-icon">
                                <img src={Clock} />
                              </div>
                              <div className="jobs-details-text">
                                <h2> Shift:</h2>
                                <p>{job?.shift_value ?? "NA"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="jobs-details-item1">
                              <div className="jobs-details-icon">
                                <img className="mx-1" src={Map} />
                              </div>
                              <div className="jobs-details-text">
                                <h2> Location:</h2>
                                <p>{job?.address ?? "NA"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="jobs-requirement-info mt-2 col-md-6">
                          <h3>Employee Benefit</h3>
                          <p>{job?.employee_benifits ?? "NA"}</p>
                        </div>
                        <div className="jobs-requirement-info mt-2 col-md-6">
                          <h3>Qualification Required</h3>
                          <p>{job?.qulification_required ?? "NA"}</p>
                        </div>
                      </div>
                      <div className="jobs-requirement-info mt-2">
                        <h3>Description</h3>
                        <p>{job?.description ?? "NA"}</p>
                      </div>
                      <div className="Applicant-text">
                        {job?.applicantListCount ?? 0} Applicant
                        {job?.applicantListCount > 1 ? "s" : ""} applied for
                        this job
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {userData.userId == job?.userid ? (
                <div class="col-md-12">
                  <div class="row">
                    {job?.applicantList?.length !== 0
                      ? job?.applicantList?.map((ele, indx) => {
                          return (
                            <div key={indx} class="col-md-4">
                              <div class="care-card">
                                <div class="care-card-head">
                                  <div class="care-id">
                                    Applicant ID:{" "}
                                    <span>{ele.applicant_id ?? "NA"}</span>
                                  </div>

                                  <div class="care-date">
                                    Applied On:{" "}
                                    <span>
                                      {moment(
                                        ele.applicant_created_date
                                      ).format("MM-DD-yyyy")}
                                    </span>
                                  </div>
                                </div>
                                <div class="care-card-body">
                                  <div class="care-content">
                                    <div class="jobs-point">
                                      <div class="jobs-point-item">
                                        {ele.applicant_full_name ?? "NA"}
                                      </div>
                                      <div class="jobs-point-item">
                                        <img src={CallImg} />{" "}
                                        <span>{ele.mobile ?? "NA"}</span>
                                      </div>
                                      <div class="jobs-point-item">
                                        <img src={SmsImg} />{" "}
                                        <span>{ele.email ?? "NA"}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="care-card-foot">
                                  <div class="care-action">
                                    {ele.resume !== null &&
                                    ele.resume !== undefined &&
                                    ele.resume !== "" ? (
                                      <Link
                                        class="btn-bl"
                                        target="_blank"
                                        to={ele.resume}
                                      >
                                        Download CV
                                      </Link>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

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
                enableReinitialize
              >
                {({ values, setFieldValue }) => (
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
                      <Field name="mobile">
                        {({ field }) => (
                          <InputMask
                            {...field}
                            mask="(999) 999-9999"
                            className="form-control"
                            maskChar=""
                            onChange={(e) => {
                              setFieldValue(field.name, e.target.value);
                            }}
                            placeholder="Enter phone"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <Field name="resume">
                        {({ field, form }) => (
                          <input
                            type="file"
                            accept="application/pdf"
                            className="form-control"
                            onChange={(event) =>
                              setFieldValue(
                                "resume",
                                event.currentTarget.files[0]
                              )
                            }
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="resume"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group text-end">
                      <button
                        type="button"
                        onClick={() => {
                          setApply({ status: false, id: null });
                        }}
                        className="btn btn-re me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-gr me-2"
                        data-bs-dismiss="modal"
                      >
                        Apply
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default Details;
