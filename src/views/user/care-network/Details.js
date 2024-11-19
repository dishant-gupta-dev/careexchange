import React, { useEffect, useState } from "react";
import Clock from "../../../assets/user/images/clock.svg";
import Dollar from "../../../assets/user/images/dollar.svg";
import SuitCase from "../../../assets/user/images/jobs-suitcase.svg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { decode, encode } from "base-64";
import moment from "moment";
import { api } from "../../../utlis/user/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const Details = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState();
  const [file, setFile] = useState();
  const [imgError, setImgError] = useState(false);
  const [apply, setApply] = useState({ status: false, id: null });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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

  const getJobDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setJob(response.data.data);
    } else setJob();
    setLoading(false);
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
      getJobDetails(api.careNetworkDetail + `${decode(id)}`);
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
                      </div>

                      <div className="jobs-details-point-list">
                        <div className="jobs-details-item">
                          <img src={Clock} /> Work Timing:
                          <span>{job?.working_time_value ?? "NA"}</span>
                        </div>
                        <div className="jobs-details-item">
                          <img src={Dollar} /> Salary:
                          <span>{job?.pay_range ?? "NA"}/Annually</span>
                        </div>
                        <div className="jobs-details-item">
                          <img src={SuitCase} /> Work Exp:
                          <span>
                            {job?.working_expirence ?? "NA"} Experience{" "}
                          </span>
                        </div>
                      </div>

                      <div className="jobs-requirement-info">
                        <h3>Job Requirement</h3>
                        <p>{job?.description ?? "NA"}</p>
                      </div>
                      <div className="Applicant-text">
                        {job?.applicantListCount ?? 0} Applicant Applied for
                        this job
                      </div>
                      <Link
                        onClick={() =>
                          setApply({ status: true, id: decode(id) })
                        }
                        className="btn-bl"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
              </Formik>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default Details;
