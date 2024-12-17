import React, { useEffect, useState } from "react";
import Clock from "../../../assets/user/images/clock.svg";
import Dollar from "../../../assets/user/images/dollar.svg";
import SuitCase from "../../../assets/user/images/jobs-suitcase.svg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { decode, encode } from "base-64";
import moment from "moment";
import { api } from "../../../utlis/provider/api.utlis";
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

                      <div className="jobs-details-point-list">
                        <div className="jobs-details-item">
                          <img src={Clock} /> Work Timing:
                          <span>{job?.working_time_value ?? "NA"}</span>
                        </div>
                        <div className="jobs-details-item">
                          <img src={Dollar} /> Salary:
                          <span className="text-capitalize">{job?.currency ?? "$"}{job?.pay_range ?? "NA"}/{job?.pay_range_type ?? "NA"}</span>
                        </div>
                        <div className="jobs-details-item">
                          <img src={SuitCase} /> Work Exp:
                          <span>
                            {job?.working_expirence ?? "NA"} Years Experience{" "}
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
