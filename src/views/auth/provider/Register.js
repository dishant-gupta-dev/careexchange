import React, { useEffect, useState, useRef } from "react";
import GmapImg from "../../../assets/user/images/Google_Maps_icon.svg";
import LocImg from "../../../assets/user/images/location.svg";
import Logo from "../../../assets/user/images/logo.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../utlis/provider/api.utlis";
import ApiService from "../../../core/services/ApiService";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import Loader from "../../../layouts/loader/Loader";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { GeolocationApiKey } from "../../../utlis/common.utlis";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import moment from "moment";
import { routes } from "../../../utlis/provider/routes.utlis";
import jpgImg from "../../../assets/provider/images/1.jpg";
import OtpInput from "react-otp-input";
import Select from "react-select";

const Register = () => {
  const options = [];
  const cityOptions = [];
  const navigate = useNavigate();
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
  const [providers, setProvider] = useState([]);
  const [selectRadius, setSelectRadius] = useState("");
  const [selectCategories, setSelectCategory] = useState("");
  const [selectSubCategories, setSelectSubCategory] = useState("");
  const [serviceId, setServiceId] = useState();
  const [startDate, setStartDate] = useState("");
  const [startError, setStartError] = useState(false);
  const [file, setFile] = useState();
  const [multiFile, setMultiFile] = useState([]);
  const [imgError, setImgError] = useState(false);
  const [imgMultiError, setImgMultiError] = useState(false);
  const { address, lat, lng } = useParams();
  const [code, setCode] = useState("");
  const [multiScreen, setMultiScreen] = useState(0);
  const [formError, setFormError] = useState(false);
  const [data, setData] = useState({ email: null, name: null });
  const [location, setLocation] = useState({
    lat: lat ?? null,
    lng: lng ?? null,
    address: address ?? null,
  });

  const initialFirstValues = {
    radius: selectRadius ?? "",
    sub_category: selectSubCategories ?? "",
    name: "",
    email: "",
    phone: "",
    free_in_home_assessment: "",
    fee_per_week: "",
    fee_per_month: "",
    fee_per_hour: "",
    business_name: "",
    slogan: "",
    license_number: "",
    payment_accepted_type: "",
    description: "",
    experience: "",
  };

  const validationFirstSchema = Yup.object().shape({
    radius: Yup.string().required("Radius is required!"),
    sub_category: Yup.string().required("Sub Category is required!"),
    name: Yup.string().required("Name is required!"),
    email: Yup.string().required("Email is required!"),
    phone: Yup.string().required("Phone is required!"),
    free_in_home_assessment: Yup.string().required(
      "In-Home assessment is required!"
    ),
    fee_per_hour: Yup.string().required("Fees per hour is required!"),
    fee_per_week: Yup.string().required("Fees per week is required!"),
    fee_per_month: Yup.string().required("Fees per month is required!"),
    business_name: Yup.string().required("Business name is required!"),
    slogan: Yup.string().required("Slogan is required!"),
    license_number: Yup.string().required("License number is required!"),
    payment_accepted_type: Yup.string().required("Payment type is required!"),
    description: Yup.string().required("Description is required!"),
    experience: Yup.string().required("Experience is required!"),
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
    if (selectedState.length === 0) {
      setStateError(true);
      return;
    } else setStateError(false);
    if (selectedCity.length === 0) {
      setCityError(true);
      return;
    } else setCityError(false);
    if (file === "" || file === null || !file) {
      setImgError(true);
      return;
    } else setImgError(false);
    if (multiFile.length === 0) {
      setImgMultiError(true);
      return;
    } else setImgMultiError(false);
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
    form.append("slogan", formValue.slogan);
    form.append("license_number", formValue.license_number);
    form.append("free_in_home_assessment", formValue.free_in_home_assessment);
    form.append("user_type", 2);
    form.append("service_offered_area", formValue.radius);
    form.append("payment_accepted_type", formValue.payment_accepted_type);
    form.append("business_address", location.address);
    form.append("latitude", location.lat);
    form.append("longitude", location.lng);
    form.append("file", file);
    multiFile.forEach((image) => {
      form.append("license_image", image);
    });
    selectedState.forEach((ele) => {
      form.append("state_ids[]", ele.value);
    });
    selectedCity.forEach((ele) => {
      form.append("city_ids[]", ele.value);
    });
    const response = await ApiService.postAPIMultiPart(api.register, form);
    // console.log("Add service request => ", response.data);
    if (response.data.status) {
      toast.success(response.data.message);
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
        toast.success(response1.data.message);
        setData({ email: formValue.email, name: formValue.name });
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

  const handlePlaceChange = () => {
    let [address] = inputRef.current.getPlaces();
    // console.log(findStateCity('administrative_area_level_1', address.address_components));
    // console.log(findStateCity('locality', address.address_components));
    setLocation({
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
      address: address.formatted_address,
    });
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

  const handleImgChange = (e) => {
    if (!e.target.files[0]) {
      setImgError(true);
    } else setImgError(false);
    setFile(e.target.files[0]);
  };

  const handleMultiImgChange = (e) => {
    let arr = Object.entries(e.target.files).map((e) => e[1]);
    setMultiFile([...multiFile, ...arr]);
  };

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
                        <h2>Sign Up</h2>
                        <div className="findcare-card">
                          <Formik
                            initialValues={initialFirstValues}
                            validateOnChange={true}
                            validationSchema={validationFirstSchema}
                            onSubmit={firstStep}
                          >
                            <Form id="first-step-form">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group search-form-group">
                                    <h4>Business Address</h4>
                                    {isLoaded && (
                                      <StandaloneSearchBox
                                        onLoad={(ref) =>
                                          (inputRef.current = ref)
                                        }
                                        onPlacesChanged={handlePlaceChange}
                                      >
                                        <input
                                          className="form-control"
                                          placeholder="Where are you going?"
                                          defaultValue={location.address}
                                        />
                                      </StandaloneSearchBox>
                                    )}
                                    <span className="form-group-icon">
                                      <img src={GmapImg} />
                                    </span>
                                  </div>
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
                                                <img src={LocImg} /> 10 Miles{" "}
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
                                                <img src={LocImg} /> 20 Miles{" "}
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
                                                <img src={LocImg} /> 30 Miles{" "}
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
                                                <img src={LocImg} /> 50 Miles{" "}
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
                                                <img src={LocImg} /> 100 Miles{" "}
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
                                                <img src={LocImg} /> 200 Miles{" "}
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
                                                <img src={LocImg} /> 300 Miles{" "}
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
                                                <img src={LocImg} /> 1000 Miles{" "}
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

                                <div className="col-md-12">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <h4>Select States</h4>
                                        <Select
                                          name="state_ids"
                                          className="form-control text-capitalize todo-list-input"
                                          placeholder="Select states"
                                          isMulti={true}
                                          options={state}
                                          onChange={(ans) => {
                                            setSelectedState(ans);
                                          }}
                                        />
                                        {stateError && (
                                          <div className="alert alert-danger">
                                            State is required!
                                          </div>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <h4>Select Cities</h4>
                                        <Select
                                          name="city_ids"
                                          className="form-control text-capitalize todo-list-input"
                                          placeholder="Select cities"
                                          isMulti={true}
                                          options={city}
                                          onChange={(ans) => {
                                            setSelectedCity(ans);
                                          }}
                                        />
                                        {cityError && (
                                          <div className="alert alert-danger">
                                            City is required!
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-12">
                                  <div className="form-group">
                                    <h4>Care Services You Are Looking For?</h4>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <select
                                          className="form-control"
                                          name="category"
                                          defaultValue={selectCategories}
                                          onChange={(e) => {
                                            getSubCategoryList(e.target.value);
                                            setSelectCategory(e.target.value);
                                          }}
                                        >
                                          <option value="">
                                            Select Category
                                          </option>
                                          {categories.length !== 0
                                            ? categories.map((ele, indx) => {
                                                return (
                                                  <option
                                                    key={indx}
                                                    value={ele.id}
                                                  >
                                                    {ele.name ?? "NA"}
                                                  </option>
                                                );
                                              })
                                            : null}
                                        </select>
                                      </div>
                                      <div className="col-md-6">
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
                                            ? subCategories.map((ele, indx) => {
                                                return (
                                                  <option
                                                    key={indx}
                                                    value={ele.id}
                                                  >
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
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group">
                                    <h4>Name</h4>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="name"
                                      placeholder="Name"
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
                                    <h4>Email Id</h4>
                                    <Field
                                      type="email"
                                      className="form-control"
                                      name="email"
                                      placeholder="Email Address"
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
                                    <Field
                                      type="number"
                                      className="form-control"
                                      name="phone"
                                      placeholder="Phone Number"
                                    />
                                    <ErrorMessage
                                      name="phone"
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
                                              value="yes"
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
                                              value="no"
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

                                <div className="col-md-6">
                                  <div className="form-group">
                                    <h4>Business Name</h4>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="business_name"
                                      placeholder="Business Name"
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
                                    <h4>Experience</h4>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="experience"
                                      placeholder="Experience"
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
                                    <h4>Slogan</h4>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="slogan"
                                      placeholder="Slogan"
                                    />
                                    <ErrorMessage
                                      name="slogan"
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
                                      placeholder="License Number"
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
                                    <h4>Upload File</h4>
                                    <input
                                      type="file"
                                      name="file"
                                      accept="image/*"
                                      onChange={handleImgChange}
                                      className="form-control todo-list-input"
                                    />
                                    {imgError && (
                                      <div className="alert alert-danger">
                                        Image is required!
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group">
                                    <h4>Upload License</h4>
                                    <input
                                      type="file"
                                      name="license_image"
                                      accept="image/*"
                                      data-multiple-caption="{count} files selected"
                                      multiple="5"
                                      onChange={(e) => handleMultiImgChange(e)}
                                      className="form-control todo-list-input"
                                    />
                                    {imgMultiError && (
                                      <div className="alert alert-danger">
                                        License Image is required!
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-md-12">
                                  <div className="form-group">
                                    <h4>What is your Payment Method?</h4>
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
                                
                                <div class="col-md-4">
                                  <div class="form-group search-form-group-r">
                                    <h4>Fees Per Hour</h4>
                                    <Field
                                      type="number"
                                      className="form-control"
                                      name="fee_per_hour"
                                      placeholder="Fees Per Hour"
                                    />
                                    <ErrorMessage
                                      name="fee_per_hour"
                                      component="div"
                                      className="alert alert-danger"
                                    />
                                    <span class="Rangedays-text">Hour</span>
                                  </div>
                                </div>

                                <div class="col-md-4">
                                  <div class="form-group search-form-group-r">
                                    <h4>Fees Per Week</h4>
                                    <Field
                                      type="number"
                                      className="form-control"
                                      name="fee_per_week"
                                      placeholder="Fees Per Week"
                                    />
                                    <ErrorMessage
                                      name="fee_per_week"
                                      component="div"
                                      className="alert alert-danger"
                                    />
                                    <span class="Rangedays-text">Week</span>
                                  </div>
                                </div>

                                <div class="col-md-4">
                                  <div class="form-group search-form-group-r">
                                    <h4>Fees Per Month</h4>
                                    <Field
                                      type="number"
                                      className="form-control"
                                      name="fee_per_month"
                                      placeholder="Fees Per Month"
                                    />
                                    <ErrorMessage
                                      name="fee_per_month"
                                      component="div"
                                      className="alert alert-danger"
                                    />
                                    <span class="Rangedays-text">Month</span>
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
                                        setFile();
                                        setStartDate("");
                                      }}
                                    >
                                      Clear All
                                    </button>
                                    <button className="btn-gr" type="submit">
                                      Next
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Form>
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
                          </div>
                          <div className="mb-1 forgotpsw-text">
                            <Link to="" onClick={() => resendOtp()}>
                              {" "}
                              Resend Verification{" "}
                            </Link>
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
