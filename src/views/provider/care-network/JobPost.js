import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MapImg from "../../../assets/user/images/Google_Maps_icon.svg";
import { api } from "../../../utlis/provider/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { routes } from "../../../utlis/provider/routes.utlis";
import { GeolocationApiKey } from "../../../utlis/common.utlis";
import InputMask from "react-input-mask";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const JobPost = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("09:00");
  const [startTimeErr, setStartTimeErr] = useState(false);
  const [endTime, setEndTime] = useState("21:00");
  const [endTimeErr, setEndTimeErr] = useState(false);
  const [jobType, setJobType] = useState("");
  const [jobTypeErr, setJobTypeErr] = useState(false);
  const [locError, setLocError] = useState(false);
  const { address, lat, lng, state } = useParams();
  const [location, setLocation] = useState({
    lat: lat ?? null,
    lng: lng ?? null,
    address: address ?? null,
    state: state ?? null,
  });
  let userData = JSON.parse(localStorage.getItem("careexchange"));
  const [categories, setCategory] = useState([]);
  const [subCategories, setSubCategory] = useState([]);

  const getCategoryList = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("category list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setCategory(response.data.data.categories);
    } else setCategory([]);
  };

  const getSubCategoryList = async (id) => {
    const response = await ApiService.getAPIWithAccessToken(
      api.categoryList + `?categoryid=${id}`
    );
    // console.log("sub category list => ", response.data);
    if (response?.data?.status && response?.data?.statusCode === 200) {
      setSubCategory(response?.data?.data?.categories);
    } else setSubCategory([]);
  };

  const initialValues = {
    title: "",
    description: "",
    qualification: "",
    benefit: "",
    address: "",
    start_time: "",
    end_time: "",
    pay_range: "",
    pay_range_type: "",
    name: userData.fullname ?? "",
    email: userData.email ?? "",
    phone: userData.mobile ?? "",
    experience: "",
    shift: "",
    category: "",
    sub_category: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Job title is required!"),
    description: Yup.string().required("Job description is required!"),
    qualification: Yup.string().required("Job qualification is required!"),
    benefit: Yup.string().required("Benefits is required!"),
    pay_range: Yup.string().required("Payment amount is required!"),
    pay_range_type: Yup.string().required("Payment type is required!"),
    address: Yup.string().required("Address is required!"),
    name: Yup.string().required("Name is required!"),
    email: Yup.string().required("Email is required!"),
    phone: Yup.string()
      .min(14, "Phone is invalid")
      .required("Phone is required!"),
    experience: Yup.string().required("Working Experience is required!"),
    shift: Yup.string().required("Shift is required!"),
    category: Yup.string().required("Category is required!"),
    sub_category: Yup.string().required("Sub Category is required!"),
    start_time: Yup.string().required("Start Time is required!"),
    end_time: Yup.string().required("End Time is required!"),
  });

  const addPost = async (formValue) => {
    setLoading(true);
    let form = JSON.stringify({
      care_provider_id: null,
      title: formValue.title,
      description: formValue.description,
      address: location.address,
      state: location.state,
      latitude: location.lat,
      longitude: location.lng,
      service_type: formValue.sub_category,
      qulification_required: formValue.qualification,
      pay_range: formValue.pay_range,
      pay_range_type: formValue.pay_range_type,
      employee_benifits: formValue.benefit,
      contact_person_name: formValue.name,
      contact_person_email: formValue.email,
      contact_person_phone: formValue.phone,
      shift: formValue.shift,
      working_expirence: formValue.experience,
      working_time: `${formValue.start_time} - ${formValue.end_time}`,
    });
    const response = await ApiService.postAPIWithAccessToken(api.addPost, form);
    setLocation({
      lat: null,
      lng: null,
      address: null,
      state: null,
    });
    setStartTime("09:00");
    setEndTime("21:00");
    setJobType("");
    if (response.data.status) {
      toast.success(response.data.message);
      getCategoryList(api.categoryList);
      document.getElementById("add-post-form").reset();
      navigate(routes.postedJob);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GeolocationApiKey,
    libraries: ["places"],
  });

  function findStateCity(type, arr) {
    for (let i in arr) {
      if (arr[i].types.includes(type)) {
        return arr[i].long_name;
      }
    }
    return null;
  }

  const handlePlaceChange = (setFieldValue) => {
    let [address] = inputRef.current.getPlaces();
    setLocation({
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
      address: address.formatted_address,
      state: findStateCity(
        "administrative_area_level_1",
        address.address_components
      ),
    });
    setFieldValue("address", address.formatted_address);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCategoryList(api.categoryList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div className="messages-tab">
          <ul className="nav nav-tabs">
            <li>
              <Link to={routes.careNetwork} className="btn-bl">
                Job Requests
              </Link>
            </li>
            <li>
              <Link className="btn-wh active" to={routes.addPost}>
                Post A Job
              </Link>
            </li>
            <li>
              <Link to={routes.postedJob} class="btn-wh">
                Posted Job
              </Link>
            </li>
          </ul>
        </div>
        <div class="carenetwork-section mt-4 pt-3">
          <div class="care-title-header">
            <h2 class="heading-title">
              Post New Job
            </h2>
          </div>
          <div class="post-newjob-content">
            <div class="post-job-form">
              <Formik
                initialValues={initialValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={addPost}
                enableReinitialize
              >
                {({ values, setFieldValue }) => (
                  <Form id="add-post-form">
                    <div class="post-job-card">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <h4>Job Title</h4>
                            <Field
                              type="text"
                              className="form-control"
                              name="title"
                              placeholder="Enter Job Title"
                            />
                            <ErrorMessage
                              name="title"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group search-form-group mb-1">
                            <h4>Job Location</h4>
                            {isLoaded && (
                              <StandaloneSearchBox
                                onLoad={(ref) => (inputRef.current = ref)}
                                onPlacesChanged={() =>
                                  handlePlaceChange(setFieldValue)
                                }
                              >
                                <input
                                  className="form-control"
                                  placeholder="Where are you going?"
                                  defaultValue={location.address}
                                />
                              </StandaloneSearchBox>
                            )}
                            <span class="form-group-icon">
                              <img src={MapImg} />
                            </span>
                          </div>
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <h4>Job Description</h4>
                            <Field
                              type="text"
                              as="textarea"
                              className="form-control"
                              name="description"
                              placeholder="Enter Job Description"
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="post-job-card">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <h4>Category</h4>
                            <Field name="category">
                              {({ field }) => (
                                <select
                                  {...field}
                                  className="form-control"
                                  onChange={(e) => {
                                    setFieldValue(field.name, e.target.value);
                                    getSubCategoryList(e.target.value);
                                  }}
                                >
                                  <option value="">Select Category</option>
                                  {categories.length !== 0
                                    ? categories.map((ele, indx) => {
                                        return (
                                          <option key={indx} value={ele.id}>
                                            {ele.name ?? "NA"}
                                          </option>
                                        );
                                      })
                                    : null}
                                </select>
                              )}
                            </Field>
                            <ErrorMessage
                              name="category"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <h4>Sub Category</h4>
                            <Field
                              as="select"
                              type="text"
                              className="form-control todo-list-input"
                              name="sub_category"
                            >
                              <option value="">Select Sub Category</option>
                              {subCategories.length !== 0
                                ? subCategories.map((ele, indx) => {
                                    return (
                                      <option key={indx} value={ele.id}>
                                        {ele.name ?? "NA"}
                                      </option>
                                    );
                                  })
                                : null}
                            </Field>
                            <ErrorMessage
                              name="sub_category"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <h4>Qualifications Required</h4>
                            <Field
                              type="text"
                              className="form-control"
                              name="qualification"
                              placeholder="Enter Job Qualification Required"
                            />
                            <ErrorMessage
                              name="qualification"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <h4>
                              Experience{" "}
                              <span className="text-danger">(In Years)</span>
                            </h4>
                            <Field
                              type="number"
                              className="form-control"
                              name="experience"
                              placeholder="Eg. 1"
                            />
                            <ErrorMessage
                              name="experience"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <h4>Job Type</h4>
                            <Field
                              as="select"
                              type="text"
                              className="form-control todo-list-input"
                              name="shift"
                            >
                              <option value="">Select Job Type</option>
                              <option value="Full Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              <option value="Per Diem">Per Diem</option>
                            </Field>
                            <ErrorMessage
                              name="shift"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>

                        <div class="col-md-3">
                          <div class="form-group">
                            <h4>Start Working Timing</h4>
                            <Field name="start_time" className="form-control">
                              {({ field }) => (
                                <DatePicker
                                  {...field}
                                  disableDayPicker
                                  format="hh:mm A"
                                  placeholder="Select Start Time"
                                  value={values.start_time || ""}
                                  onChange={(value) =>
                                    setFieldValue("start_time", value)
                                  }
                                  plugins={[
                                    <TimePicker
                                      hideSeconds
                                      position="bottom"
                                    />,
                                  ]}
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name="start_time"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <h4>End Working Timing</h4>
                            <Field name="end_time" className="form-control">
                              {({ field }) => (
                                <DatePicker
                                  {...field}
                                  disableDayPicker
                                  format="hh:mm A"
                                  placeholder="Select End Time"
                                  value={values.end_time || ""}
                                  onChange={(value) =>
                                    setFieldValue("end_time", value)
                                  }
                                  plugins={[
                                    <TimePicker
                                      hideSeconds
                                      minTime={values.start_time || "15:00"}
                                      position="bottom"
                                    />,
                                  ]}
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name="end_time"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <h4>Employment Benefits Offered</h4>
                            <Field
                              type="text"
                              as="textarea"
                              className="form-control"
                              name="benefit"
                              placeholder="Employment Benefits Offered"
                            />
                            <ErrorMessage
                              name="benefit"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="post-job-card">
                      <h3>Payment</h3>
                      <div class="row findcare-form">
                        <div className="col-md-6">
                          <div className="form-group">
                            <h4>Type</h4>
                            <div className="choosemiles-list">
                              <ul>
                                <li>
                                  <div className="ceradio">
                                    <Field
                                      type="radio"
                                      name="pay_range_type"
                                      id="Hour"
                                      value="hour"
                                    />
                                    <label for="Hour">
                                      <span className="checkbox-text">
                                        {" "}
                                        Hourly
                                      </span>
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="ceradio">
                                    <Field
                                      type="radio"
                                      name="pay_range_type"
                                      id="Daily"
                                      value="day"
                                    />
                                    <label for="Daily">
                                      <span className="checkbox-text">
                                        {" "}
                                        Daily
                                      </span>
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="ceradio">
                                    <Field
                                      type="radio"
                                      name="pay_range_type"
                                      id="Week"
                                      value="week"
                                    />
                                    <label for="Week">
                                      <span className="checkbox-text">
                                        {" "}
                                        Weekly
                                      </span>
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="ceradio">
                                    <Field
                                      type="radio"
                                      name="pay_range_type"
                                      id="Monthly"
                                      value="month"
                                    />
                                    <label for="Monthly">
                                      <span className="checkbox-text">
                                        {" "}
                                        Monthly
                                      </span>
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="ceradio">
                                    <Field
                                      type="radio"
                                      name="pay_range_type"
                                      id="Year"
                                      value="year"
                                    />
                                    <label for="Year">
                                      <span className="checkbox-text">
                                        {" "}
                                        Yearly
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              </ul>
                              <ErrorMessage
                                name="pay_range_type"
                                component="div"
                                className="alert alert-danger"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group search-form-group-r PerHour-form-group">
                            <h4>Amount</h4>
                            <Field
                              type="number"
                              className="form-control"
                              name="pay_range"
                              placeholder="Enter Amount"
                            />
                            <span class="dollar-text">$</span>
                          </div>
                          <ErrorMessage
                            name="pay_range"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="post-job-card">
                      <h3>Contact Person For This Job Posting</h3>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <h4>Full Name</h4>
                            <Field
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Enter Full Name"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <h4>Email Id</h4>
                            <Field
                              type="text"
                              className="form-control"
                              name="email"
                              placeholder="Enter Email Id"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <h4>Phone</h4>
                            <Field name="phone">
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
                              name="phone"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="post-job-card">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group d-flex justify-content-end">
                            <button
                              type="button"
                              class="btn-bl mx-2"
                              onClick={() => {
                                setLocation({
                                  lat: null,
                                  lng: null,
                                  address: null,
                                  state: null,
                                });
                                setStartTime("09:00");
                                setEndTime("21:00");
                                setJobType("");
                                document
                                  .getElementById("add-post-form")
                                  .reset();
                              }}
                            >
                              Clear All
                            </button>
                            <button class="btn-gr" type="submit">
                              Post New Job
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPost;
