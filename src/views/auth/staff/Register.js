import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import GmapImg from "../../../assets/user/images/Google_Maps_icon.svg";
import LocImge from "../../../assets/user/images/location.svg";
import Logo from "../../../assets/user/images/logo.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../utlis/staff/api.utlis";
import ApiService from "../../../core/services/ApiService";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import Loader from "../../../layouts/loader/Loader";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { clearMessage } from "../../../store/slices/Message";
import {
  GeolocationApiKey,
  MultipleFile,
  SingleFile,
} from "../../../utlis/common.utlis";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import moment from "moment";
import { routes } from "../../../utlis/staff/routes.utlis";
import jpgImg from "../../../assets/provider/images/1.jpg";
import InputMask from "react-input-mask";
import OtpInput from "react-otp-input";
import Select from "react-select";

const Register = () => {
  const options = [];
  const cityOptions = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);
  const [total, setTotal] = useState(0);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [stateError, setStateError] = useState(false);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [cityError, setCityError] = useState(false);
  const [categories, setCategory] = useState([]);
  const [subCategories, setSubCategory] = useState([]);
  const [selectRadius, setSelectRadius] = useState("");
  const [selectCategories, setSelectCategory] = useState("");
  const [selectSubCategories, setSelectSubCategory] = useState("");
  const [serviceId, setServiceId] = useState();
  const [startDate, setStartDate] = useState("");
  const [startError, setStartError] = useState(false);
  const [multiFile, setMultiFile] = useState([]);
  const [imgMultiError, setImgMultiError] = useState({
    status: false,
    msg: null,
  });
  const { address, lat, lng } = useParams();
  const [code, setCode] = useState("");
  const [multiScreen, setMultiScreen] = useState(0);
  const [formError, setFormError] = useState(false);
  const [data, setData] = useState({ email: null, name: null });
  const { message } = useSelector((state) => state.message, shallowEqual);
  const [location, setLocation] = useState({
    lat: lat ?? null,
    lng: lng ?? null,
    address: address ?? null,
  });
  const [timer, setTimer] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsDisabled(false);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    if (code.length === 4) {
      verifyUser(); // Auto submit OTP once it's complete
    }
  }, [code]);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialFirstValues = {
    radius: selectRadius ?? "",
    category: selectCategories ?? "",
    sub_category: selectSubCategories ?? "",
    address: "",
    name: "",
    email: "",
    phone: "",
    free_in_home_assessment: "",
    fee_per_week: "",
    fee_per_month: "",
    fee_per_hour: "",
    business_name: "",
    care_job_title: "",
    gender: "",
    license_number: "",
    payment_accepted_type: "",
    description: "",
    experience: "",
    resume: "",
    files: "",
  };

  const validationFirstSchema = Yup.object().shape({
    radius: Yup.string().required("Radius is required!"),
    category: Yup.string().required("Category is required!"),
    sub_category: Yup.string().required("Sub Category is required!"),
    address: Yup.string().required("Address is required!"),
    name: Yup.string().required("Name is required!"),
    email: Yup.string().required("Email is required!"),
    phone: Yup.string()
      .min(14, "Phone is invalid")
      .required("Phone is required!"),
    free_in_home_assessment: Yup.string().required(
      "In-Home assessment is required!"
    ),
    gender: Yup.string().required("Gender is required!"),
    business_name: Yup.string().required("Business name is required!"),
    care_job_title: Yup.string().required("Care job title is required!"),
    license_number: Yup.string().required("License number is required!"),
    payment_accepted_type: Yup.string().required("Payment type is required!"),
    description: Yup.string().required("Description is required!"),
    experience: Yup.string().required("Experience is required!"),
    resume: Yup.mixed()
      .required("Please upload your resume")
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= SingleFile * 1024 * 1024;
      })
      .test("fileType", "Unsupported file type", (value) => {
        return value && ["application/pdf"].includes(value.type);
      }),
    files: Yup.array()
      .of(
        Yup.mixed()
          .required("License image is required")
          .test("fileSize", "File size is too large", (file) => {
            return file && file.size <= MultipleFile * 1024 * 1024;
          })
          .test("fileType", "Unsupported file type", (file) => {
            return (
              file &&
              ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
            );
          })
      )
      .required("At least one image is required")
      .min(1, "At least one image is required")
      .max(3, "You can upload a maximum of 3 images"),
  });

  const getCategoryList = async (api) => {
    const response = await ApiService.getAPI(api);
    // console.log("category list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setCategory(response.data.data.categories);
    } else setCategory([]);
  };

  const getSubCategoryList = async (id) => {
    const response = await ApiService.getAPI(
      api.categoryList + `?categoryid=${id}`
    );
    // console.log("sub category list => ", response.data);
    if (response?.data?.status && response?.data?.statusCode === 200) {
      setSubCategory(response?.data?.data?.categories);
    } else setSubCategory([]);
  };

  const getStateList = async (api) => {
    const response = await ApiService.getAPI(api);
    // console.log("state list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      response.data.data.states.forEach((element) => {
        options.push({ value: element.id, label: element.name });
      });
      setState(options);
    } else setState([]);
  };

  const getCitiesList = async () => {
    let form = new FormData();
    selectedState.forEach((ele) => {
      form.append("state_ids[]", ele.value);
    });
    const response = await ApiService.postAPI(api.cityList, form);
    // console.log("cities list => ", response.data);
    if (response?.data?.status && response?.data?.statusCode === 200) {
      response.data.data.cities.forEach((element) => {
        cityOptions.push({ value: element.id, label: element.name });
      });
      setCity(cityOptions);
    } else setCity([]);
  };

  const firstStep = async (formValue) => {
    setLoading(true);
    let form = new FormData();
    form.append("service_id", formValue.sub_category);
    form.append("username", formValue.name);
    form.append("email", formValue.email);
    form.append("phone", formValue.phone);
    form.append("description", formValue.description);
    form.append("fee_per_hour", formValue.fee_per_hour);
    form.append("fee_per_month", formValue.fee_per_month);
    form.append("fee_per_week", formValue.fee_per_week);
    form.append("experience", formValue.experience);
    form.append("business_name", formValue.business_name);
    form.append("care_job_title", formValue.care_job_title);
    form.append("gender", formValue.gender);
    form.append("license_number", formValue.license_number);
    form.append("free_in_home_assessment", formValue.free_in_home_assessment);
    form.append("user_type", 3);
    form.append("service_offered_area", formValue.radius);
    form.append("payment_accepted_type", formValue.payment_accepted_type);
    form.append("business_address", location.address);
    form.append("latitude", location.lat);
    form.append("longitude", location.lng);
    form.append("resume", formValue.resume);
    formValue.files.forEach((image) => {
      form.append("license_image", image);
    });
    const response = await ApiService.postAPIMultiPart(api.register, form);
    // console.log("Add service request => ", response.data);
    if (response.data.status) {
      // toast.success(response.data.message);
      let form1 = JSON.stringify({
        email: formValue.email,
        user_type: 2,
      });
      const response1 = await ApiService.postAPI(api.registerSendOtp, form1);
      if (response1.data.status) {
        toast(response1.data.data?.otp, {
          style: {
            borderRadius: "10px",
            background: "#000",
            color: "#fff",
          },
        });
        // toast.success(response1.data.message);
        toast.success(response.data.message);
        setData({ email: formValue.email, name: formValue.name });
        setTimer(30);
        setIsDisabled(true);
        setTab(2);
      } else {
        toast.error(response1.data.message);
      }
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
    // console.log(findStateCity('administrative_area_level_1', address.address_components));
    // console.log(findStateCity('locality', address.address_components));
    setLocation({
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
      address: address.formatted_address,
    });
    setFieldValue("address", address.formatted_address);
  };

  const verifyUser = async () => {
    if (code.length !== 4) {
      setFormError(true);
      return;
    } else setFormError(false);
    setLoading(true);
    let form = JSON.stringify({
      email: data.email,
      otp: code,
    });
    const response = await ApiService.postAPI(api.otpVerify, form);
    if (response.data.status) {
      toast.success(response.data.message);
      navigate(routes.login);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const resendOtp = async () => {
    setLoading(true);
    let form = JSON.stringify({
      email: data.email,
      user_type: 1,
    });
    const response = await ApiService.postAPI(api.sendOtp, form);
    if (response.data.status) {
      setTimer(30);
      setIsDisabled(true);
      toast(response.data.data?.otp, {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
      toast.success(response.data.message);
    } else toast.error(response.data.message);
    setLoading(false);
  };

  const handleChange = (code) => setCode(code);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCategoryList(api.categoryList);
    getStateList(api.stateList + `?country_id=231`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCitiesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="auth-section auth-height">
        <div className="auth-bg-video">
          <img id="background-video" src={jpgImg} />
        </div>
        <div className="auth-content-card">
          <div className="container" style={{ height: "90vh" }}>
            <div className="carenetwork-section">
              {/* <div className="care-title-header">
                <h2 className="heading-title">Find Care</h2>
                <div className="search-filter ">
                  <div className="row g-2">
                    <div className="col-md-12">
                      <div className="form-group">
                        <Link
                          className="btn-bl wd100"
                          to=""
                          onClick={() => navigate(-1)}
                        >
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="ce-step-list">
                <ul id="progressbar" className="nav steps nav-tabs">
                  <li
                    className={
                      tab == 1 || tab == 2 ? "active nav-item" : "nav-item"
                    }
                  >
                    <Link className={tab == 1 || tab == 2 ? "active" : ""}>
                      <span className="number">1</span>
                    </Link>
                  </li>
                  <li className={tab == 2 ? "active nav-item" : "nav-item"}>
                    <Link className={tab == 1 ? "active" : ""}>
                      <span className="number">2</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="findcare-content">
                <div className="step-content tab-content">
                  {tab == 1 ? (
                    <div className="tab-pane fade active show" id="tab1">
                      <div className="findcare-form">
                        <h2 className="text-center pb-3">Care-Staff Sign Up</h2>
                        <div className="findcare-card">
                          <Formik
                            initialValues={initialFirstValues}
                            validateOnChange={true}
                            validationSchema={validationFirstSchema}
                            onSubmit={firstStep}
                            enableReinitialize
                          >
                            {({ values, setFieldValue }) => (
                              <Form id="first-step-form">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <h4>Name</h4>
                                      <Field
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Enter Name"
                                      />
                                      <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="alert alert-danger"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <h4>Email Address</h4>
                                      <Field
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter Email Address"
                                      />
                                      <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="alert alert-danger"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <h4>Phone</h4>
                                      <Field name="phone">
                                        {({ field }) => (
                                          <InputMask
                                            {...field}
                                            mask="(999) 999-9999"
                                            className="form-control"
                                            maskChar=""
                                            onChange={(e) => {
                                              setFieldValue(
                                                field.name,
                                                e.target.value
                                              );
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

                                  <div className="col-md-6">
                                    <div className="form-group search-form-group mb-1">
                                      <h4>Service Area</h4>
                                      {isLoaded && (
                                        <StandaloneSearchBox
                                          onLoad={(ref) =>
                                            (inputRef.current = ref)
                                          }
                                          onPlacesChanged={() =>
                                            handlePlaceChange(setFieldValue)
                                          }
                                        >
                                          <input
                                            className="form-control"
                                            placeholder="Enter Service Area"
                                            defaultValue={location.address}
                                          />
                                        </StandaloneSearchBox>
                                      )}
                                      <span className="form-group-icon">
                                        <img src={GmapImg} />
                                      </span>
                                    </div>
                                    <ErrorMessage
                                      name="address"
                                      component="div"
                                      className="alert alert-danger"
                                    />
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <h4>Search By Miles Away</h4>
                                      <div className="choosemiles-list">
                                        <ul>
                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="radius"
                                                id="10miles"
                                                value="10"
                                              />
                                              <label for="10miles">
                                                <span className="checkbox-text">
                                                  <img src={LocImge} /> 10 Miles{" "}
                                                </span>
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="radius"
                                                id="20miles"
                                                value="20"
                                              />
                                              <label for="20miles">
                                                <span className="checkbox-text">
                                                  <img src={LocImge} /> 20 Miles{" "}
                                                </span>
                                              </label>
                                            </div>
                                          </li>

                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="radius"
                                                id="30miles"
                                                value="30"
                                              />
                                              <label for="30miles">
                                                <span className="checkbox-text">
                                                  <img src={LocImge} /> 30 Miles{" "}
                                                </span>
                                              </label>
                                            </div>
                                          </li>

                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="radius"
                                                id="50miles"
                                                value="50"
                                              />
                                              <label for="50miles">
                                                <span className="checkbox-text">
                                                  <img src={LocImge} /> 50 Miles{" "}
                                                </span>
                                              </label>
                                            </div>
                                          </li>

                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="radius"
                                                id="100miles"
                                                value="100"
                                              />
                                              <label for="100miles">
                                                <span className="checkbox-text">
                                                  <img src={LocImge} /> 100
                                                  Miles{" "}
                                                </span>
                                              </label>
                                            </div>
                                          </li>

                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="radius"
                                                id="200miles"
                                                value="200"
                                              />
                                              <label for="200miles">
                                                <span className="checkbox-text">
                                                  <img src={LocImge} /> 200
                                                  Miles{" "}
                                                </span>
                                              </label>
                                            </div>
                                          </li>

                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="radius"
                                                id="300miles"
                                                value="300"
                                              />
                                              <label for="300miles">
                                                <span className="checkbox-text">
                                                  <img src={LocImge} /> 300
                                                  Miles{" "}
                                                </span>
                                              </label>
                                            </div>
                                          </li>

                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="radius"
                                                id="1000miles"
                                                value="1000"
                                              />
                                              <label for="1000miles">
                                                <span className="checkbox-text">
                                                  <img src={LocImge} /> 1000
                                                  Miles{" "}
                                                </span>
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                        <ErrorMessage
                                          name="radius"
                                          component="div"
                                          className="alert alert-danger"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <h4>Gender</h4>
                                      <div className="choosemiles-list">
                                        <ul>
                                          <li>
                                            <div className="ceradio">
                                              <Field
                                                type="radio"
                                                name="gender"
                                                id="Male"
                                                value="M"
                                              />
                                              <label for="Male">
                                                <span className="checkbox-text">
                                                  {" "}
                                                  Male
                                                </span>
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="ceradio">
                                              <Field
                                                type="radio"
                                                name="gender"
                                                id="Female"
                                                value="F"
                                              />
                                              <label for="Female">
                                                <span className="checkbox-text">
                                                  Female
                                                </span>
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                        <ErrorMessage
                                          name="gender"
                                          component="div"
                                          className="alert alert-danger"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <h4>Category</h4>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <Field name="category">
                                            {({ field }) => (
                                              <select
                                                {...field}
                                                className="form-control"
                                                onChange={(e) => {
                                                  setFieldValue(
                                                    field.name,
                                                    e.target.value
                                                  );
                                                  getSubCategoryList(
                                                    e.target.value
                                                  );
                                                }}
                                              >
                                                <option value="">
                                                  Select Category
                                                </option>
                                                {categories.length !== 0
                                                  ? categories.map(
                                                      (ele, indx) => {
                                                        return (
                                                          <option
                                                            key={indx}
                                                            value={ele.id}
                                                          >
                                                            {ele.name ?? "NA"}
                                                          </option>
                                                        );
                                                      }
                                                    )
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
                                    </div>
                                  </div>

                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <h4>Sub Category</h4>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <Field
                                            as="select"
                                            type="text"
                                            className="form-control"
                                            name="sub_category"
                                          >
                                            <option value="">
                                              Select Sub Category
                                            </option>
                                            {subCategories.length !== 0
                                              ? subCategories.map(
                                                  (ele, indx) => {
                                                    return (
                                                      <option
                                                        key={indx}
                                                        value={ele.id}
                                                      >
                                                        {ele.name ?? "NA"}
                                                      </option>
                                                    );
                                                  }
                                                )
                                              : null}
                                          </Field>
                                          <ErrorMessage
                                            name="sub_category"
                                            component="div"
                                            className="alert alert-danger"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <h4>Care Job Title</h4>
                                      <Field
                                        as="select"
                                        type="text"
                                        className="form-control"
                                        name="care_job_title"
                                      >
                                        <option value="">
                                          Select Care Job Title
                                        </option>
                                        <option value="Caregiver">
                                          Caregiver
                                        </option>
                                        <option value="Nursing Assistant (NA)">
                                          Nursing Assistant (NA)
                                        </option>
                                        <option value="Home Health Aide (CNA/HHA)">
                                          Home Health Aide (CNA/HHA)
                                        </option>
                                        <option value="Medical Assistant (MA)">
                                          Medical Assistant (MA)
                                        </option>
                                        <option value="Licensed Practical/Vocational Nurse (LPN/LVN)">
                                          Licensed Practical/Vocational Nurse
                                          (LPN/LVN)
                                        </option>
                                        <option value="Registered Nurse (RN)">
                                          Registered Nurse (RN)
                                        </option>
                                        <option value="Nurse Practitioner (NP)">
                                          Nurse Practitioner (NP)
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="care_job_title"
                                        component="div"
                                        className="alert alert-danger"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <h4>Business Name</h4>
                                      <Field
                                        type="text"
                                        className="form-control"
                                        name="business_name"
                                        placeholder="Enter Business Name"
                                      />
                                      <ErrorMessage
                                        name="business_name"
                                        component="div"
                                        className="alert alert-danger"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <h4>
                                        Experience{" "}
                                        <span className="text-danger">
                                          (In Years)
                                        </span>
                                      </h4>
                                      <Field
                                        type="text"
                                        className="form-control"
                                        name="experience"
                                        placeholder="Enter Experience (In Years)"
                                      />
                                      <ErrorMessage
                                        name="experience"
                                        component="div"
                                        className="alert alert-danger"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <h4>Free In-Home Assessment Offered?</h4>
                                      <div className="choosemiles-list">
                                        <ul>
                                          <li>
                                            <div className="ceradio">
                                              <Field
                                                type="radio"
                                                name="free_in_home_assessment"
                                                id="Yes"
                                                value="1"
                                              />
                                              <label for="Yes">
                                                <span className="checkbox-text">
                                                  {" "}
                                                  Yes
                                                </span>
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="ceradio">
                                              <Field
                                                type="radio"
                                                name="free_in_home_assessment"
                                                id="No"
                                                value="0"
                                              />
                                              <label for="No">
                                                <span className="checkbox-text">
                                                  No
                                                </span>
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                        <ErrorMessage
                                          name="free_in_home_assessment"
                                          component="div"
                                          className="alert alert-danger"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div class="col-md-4">
                                    <div class="form-group search-form-group-r PerHour-form-group">
                                      <h4>Fees Per Hour</h4>

                                      <Field
                                        type="number"
                                        className="form-control"
                                        name="fee_per_hour"
                                        placeholder="Enter Fees"
                                      />
                                      <ErrorMessage
                                        name="fee_per_hour"
                                        component="div"
                                        className="alert alert-danger"
                                      />
                                      <span class="dollar-text">$</span>
                                      <span class="Rangedays-text">/Hour</span>
                                    </div>
                                  </div>

                                  <div class="col-md-4">
                                    <div class="form-group search-form-group-r PerHour-form-group">
                                      <h4>Fees Per Week</h4>
                                      <Field
                                        type="number"
                                        className="form-control"
                                        name="fee_per_week"
                                        placeholder="Enter Fees"
                                      />
                                      <ErrorMessage
                                        name="fee_per_week"
                                        component="div"
                                        className="alert alert-danger"
                                      />
                                      <span class="dollar-text">$</span>
                                      <span class="Rangedays-text">/Week</span>
                                    </div>
                                  </div>

                                  <div class="col-md-4">
                                    <div class="form-group search-form-group-r PerHour-form-group">
                                      <h4>Fees Per Month</h4>
                                      <Field
                                        type="number"
                                        className="form-control"
                                        name="fee_per_month"
                                        placeholder="Enter Fees"
                                      />
                                      <ErrorMessage
                                        name="fee_per_month"
                                        component="div"
                                        className="alert alert-danger"
                                      />
                                      <span class="dollar-text">$</span>
                                      <span class="Rangedays-text">/Month</span>
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <h4>Upload Resume</h4>
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
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <h4>License Number</h4>
                                      <Field
                                        type="number"
                                        className="form-control"
                                        name="license_number"
                                        placeholder="Enter License Number"
                                      />
                                      <ErrorMessage
                                        name="license_number"
                                        component="div"
                                        className="alert alert-danger"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <h4>Upload License</h4>
                                      <Field name="files">
                                        {({ field, form }) => (
                                          <div>
                                            <input
                                              type="file"
                                              multiple
                                              accept="image/*"
                                              className="form-control"
                                              onChange={(event) => {
                                                const files = Array.from(
                                                  event.currentTarget.files
                                                );
                                                setFieldValue("files", files);
                                              }}
                                            />
                                          </div>
                                        )}
                                      </Field>
                                      <ErrorMessage
                                        name="files"
                                        component="div"
                                        className="alert alert-danger"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <h4>Payment Types Accepted</h4>
                                      <div className="choosemiles-list">
                                        <ul>
                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="payment_accepted_type"
                                                id="FirstPay"
                                                value="Private Pay"
                                              />
                                              <label for="FirstPay">
                                                <span className="checkbox-text">
                                                  {" "}
                                                  Private Pay
                                                </span>
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="payment_accepted_type"
                                                id="SecondPay"
                                                value="Debit Card"
                                              />
                                              <label for="SecondPay">
                                                <span className="checkbox-text">
                                                  Debit Card
                                                </span>
                                              </label>
                                            </div>
                                          </li>

                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="payment_accepted_type"
                                                id="ThirdPay"
                                                value="Insurance"
                                              />
                                              <label for="ThirdPay">
                                                <span className="checkbox-text">
                                                  Insurance
                                                </span>
                                              </label>
                                            </div>
                                          </li>

                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="payment_accepted_type"
                                                id="FourthPay"
                                                value="Stripe"
                                              />
                                              <label for="FourthPay">
                                                <span className="checkbox-text">
                                                  Stripe
                                                </span>
                                              </label>
                                            </div>
                                          </li>

                                          <li>
                                            <div className="ceradio1">
                                              <Field
                                                type="radio"
                                                name="payment_accepted_type"
                                                id="FifthPay"
                                                value="Medicaid"
                                              />
                                              <label for="FifthPay">
                                                <span className="checkbox-text">
                                                  Medicaid
                                                </span>
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                        <ErrorMessage
                                          name="payment_accepted_type"
                                          component="div"
                                          className="alert alert-danger"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <h4>Description</h4>
                                      <Field
                                        type="text"
                                        as="textarea"
                                        className="form-control"
                                        name="description"
                                        placeholder="Other Info/About your Business"
                                      />
                                      <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="alert alert-danger"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group float-end">
                                      <button
                                        className="btn-bl mx-2"
                                        type="button"
                                        onClick={() => {
                                          document
                                            .getElementById("first-step-form")
                                            .reset();
                                          setLocation({
                                            lat: null,
                                            lng: null,
                                            address: null,
                                          });
                                          setSelectCategory("");
                                          setSelectSubCategory("");
                                          setSubCategory([]);
                                          setSelectRadius("");
                                          setStartDate("");
                                        }}
                                      >
                                        Clear All
                                      </button>
                                      <button className="btn-gr" type="submit">
                                        Submit & Verify Email
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {tab == 2 ? (
                    <div className="tab-pane fade" id="tab2">
                      <div className="auth-form" style={{ maxWidth: "100%" }}>
                        <div className="brand-logo">
                          <img src={Logo} alt="logo" />
                        </div>
                        <h2>Verification Code</h2>
                        <p>
                          We have sent you a verification code to ({data.email})
                        </p>
                        <form className="pt-4">
                          <div className="form-group">
                            <div className="otp-item-input">
                              <OtpInput
                                value={code}
                                onChange={handleChange}
                                numInputs={4}
                                separator={
                                  <span style={{ width: "8px" }}></span>
                                }
                                isInputNum={true}
                                shouldAutoFocus={true}
                                renderInput={(props) => <input {...props} />}
                                inputStyle={{
                                  border: "1px solid transparent",
                                  borderRadius: "8px",
                                  width: "54px",
                                  height: "54px",
                                  fontSize: "1rem",
                                  color: "#000",
                                  fontWeight: "400",
                                  caretColor: "blue",
                                  margin: "0 5px",
                                }}
                                focusStyle={{
                                  border: "1px solid #CFD3DB",
                                  outline: "none",
                                }}
                              />
                            </div>
                            {message && (
                              <div
                                className="form-group text-center mt-4 mb-0"
                                style={{ fontSize: "0.9rem" }}
                              >
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {message}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="my-2 forgotpsw-text d-flex justify-content-between">
                            <p>
                              {timer != 0 && (
                                <>
                                  Didn't receive a code? Resend (<b>{timer}</b>)
                                </>
                              )}
                            </p>
                            {!isDisabled && (
                              <Link to="" onClick={() => resendOtp()}>
                                {" "}
                                Resend Verification{" "}
                              </Link>
                            )}
                          </div>
                          <div className="form-group col-6 mx-auto">
                            <button
                              type="button"
                              className="auth-form-btn"
                              onClick={() => verifyUser()}
                            >
                              Validate OTP
                            </button>
                          </div>
                          <div className="form-group">
                            <Link
                              onClick={() => {
                                setData({ email: null });
                                setTab(1);
                              }}
                            >
                              Back
                            </Link>
                          </div>
                        </form>
                        {formError && (
                          <div className="alert alert-danger">
                            OTP is required
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
