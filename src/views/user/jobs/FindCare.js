import React, { useEffect, useState, useRef } from "react";
import GmapImg from "../../../assets/user/images/Google_Maps_icon.svg";
import LocImg from "../../../assets/user/images/location.svg";
import HouseImg from "../../../assets/user/images/house1.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../utlis/user/api.utlis";
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
import { routes } from "../../../utlis/user/routes.utlis";

const FindCare = () => {
  const navigate = useNavigate();
  const { address, lat, lng, cat } = useParams();
  const [tab, setTab] = useState(1);
  const [total, setTotal] = useState(0);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategory] = useState([]);
  const [subCategories, setSubCategory] = useState([]);
  const [providers, setProvider] = useState([]);
  const [selectRadius, setSelectRadius] = useState(cat ? "200" : "");
  const [selectCategories, setSelectCategory] = useState(cat ?? "");
  const [selectSubCategories, setSelectSubCategory] = useState("");
  const [serviceId, setServiceId] = useState();
  const [startDate, setStartDate] = useState("");
  const [startError, setStartError] = useState(false);
  const [location, setLocation] = useState({
    lat: lat ?? null,
    lng: lng ?? null,
    address: address ?? null,
  });

  const initialFirstValues = {
    radius: selectRadius ?? "",
    sub_category: selectSubCategories ?? "",
  };

  const initialSecondValues = {
    fname: "",
    lname: "",
    prefer: "",
    gender: "",
    email: "",
    phone: "",
    fax: "",
    age: "",
    frequency: "",
    relationship: "",
    payment_type: "",
    best_time_to_call: "",
    start_time: "",
    description: "",
  };

  const validationFirstSchema = Yup.object().shape({
    radius: Yup.string().required("Radius is required!"),
    sub_category: Yup.string().required("Sub Category is required!"),
  });

  const validationSecondSchema = Yup.object().shape({
    fname: Yup.string().required("First Name is required!"),
    lname: Yup.string().required("Last Name is required!"),
    prefer: Yup.string().required("Prefered Contact is required!"),
    gender: Yup.string().required("Gender is required!"),
    email: Yup.string().required("Email is required!"),
    phone: Yup.string().min(10).required("Phone is required!"),
    age: Yup.string().required("Age is required!"),
    frequency: Yup.string().required("Frequency is required!"),
    relationship: Yup.string().required("Relationship is required!"),
    payment_type: Yup.string().required("Payment Type is required!"),
    best_time_to_call: Yup.string().required("Best time to call is required!"),
    start_time: Yup.string().required("Prefered Time is required!"),
    description: Yup.string().required("Description is required!"),
  });

  const getCategoryList = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("category list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setCategory(response.data.data.categories);
    } else setCategory([]);
  };

  const getSubCategoryList = async (id) => {
    if (id == "" || id == null || id == undefined) return;
    const response = await ApiService.getAPIWithAccessToken(
      api.categoryList + `?categoryid=${id}`
    );
    // console.log("sub category list => ", response.data);
    if (response?.data?.status && response?.data?.statusCode === 200) {
      setSubCategory(response?.data?.data?.categories);
    } else setSubCategory([]);
  };

  const firstStep = async (formValue) => {
    setLoading(true);
    setSelectRadius(formValue.radius);
    setSelectSubCategory(formValue.sub_category);
    setTab(2);
    setLoading(false);
  };

  const secondStep = async (formValue) => {
    if (startDate === "" || startDate === null || !startDate) {
      setStartError(true);
      return;
    } else setStartError(false);
    setLoading(true);
    let form = new FormData();
    form.append("service_type", selectSubCategories);
    form.append("first_name", formValue.fname);
    form.append("last_name", formValue.lname);
    form.append("email_id", formValue.email);
    form.append("phone", formValue.phone);
    form.append("description", formValue.description);
    form.append("fax", formValue.fax);
    form.append("best_time_to_call", formValue.best_time_to_call);
    form.append("gender", formValue.gender);
    form.append("age", formValue.age);
    form.append("relationship", formValue.relationship);
    form.append("frequency", formValue.frequency);
    form.append("prefer_contacted", formValue.prefer);
    form.append("payment_type", formValue.payment_type);
    form.append("in_home_assist", 1);
    form.append("address", location.address);
    form.append("latitude", location.lat);
    form.append("longitude", location.lng);
    form.append("start_date", moment(startDate).format("MM/DD/yyyy"));
    form.append("start_time", formValue.start_time);
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.addServiceRequest,
      form
    );
    // console.log("Add service request => ", response.data);
    if (response.data.status) {
      toast.success(response.data.message);
      setServiceId(response?.data?.data?.requestDetails?.id);
      navigate(routes.myJobs);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const thirdStep = async (formValue) => {
    setLoading(true);
    const user_id = [];
    providers.forEach((ele) => {
      if (ele.checked) {
        user_id.push(ele.userid);
      }
    });
    if (user_id.length == 0) {
      toast.error("Please select any provider");
      return;
    }
    const form = JSON.stringify({
      request_id: serviceId,
      user_id: user_id,
    });
    const response = await ApiService.postAPIWithAccessToken(
      api.sendRequest,
      form
    );
    if (response.data.status) {
      toast.success(response.data.message);
      navigate(routes.myJobs);
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

  const handlePlaceChange = () => {
    let [address] = inputRef.current.getPlaces();
    setLocation({
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
      address: address.formatted_address,
    });
  };

  function findCategory(id) {
    for (let i in categories) {
      if (categories[i].id == id) {
        return categories[i].name;
      }
    }
    return null;
  }

  const handleCheck = (id) => {
    const updatedItems = providers.map((item) =>
      item.userid === id ? { ...item, checked: !item.checked } : item
    );
    setProvider(updatedItems);
  };

  const handleUncheck = () => {
    const updatedItems = providers.map((item) => ({
      ...item,
      checked: false,
    }));
    setProvider(updatedItems);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCategoryList(api.categoryList);
    getSubCategoryList(cat ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="carenetwork-section">
          <div className="care-title-header">
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
          </div>

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
                <Link className={tab == 1 || tab == 2 ? "active" : ""}>
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
                    <h2>What kind of care do you need?</h2>
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
                                <h4>Job Location</h4>
                                {isLoaded && (
                                  <StandaloneSearchBox
                                    onLoad={(ref) => (inputRef.current = ref)}
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

                            <div className="col-md-6">
                              <div className="form-group">
                                <h4>Category</h4>
                                <div className="row">
                                  <div className="col-md-12">
                                    <select
                                      className="form-control"
                                      name="category"
                                      value={selectCategories}
                                      onChange={(e) => {
                                        getSubCategoryList(e.target.value);
                                        setSelectCategory(e.target.value);
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
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
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
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="form-group">
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

              <div
                className={tab == 2 ? "tab-pane show" : "tab-pane d-none"}
                id="tab2"
              >
                <div className="findcare-form">
                  <h2>Share A Few Details More…</h2>
                  <div className="findcare-card">
                    <Formik
                      initialValues={initialSecondValues}
                      validateOnChange={true}
                      validationSchema={validationSecondSchema}
                      onSubmit={secondStep}
                      enableReinitialize
                    >
                      {({ values, setFieldValue }) => (
                        <Form id="second-step-form">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <h4>Care Category</h4>
                                <div className="category-card">
                                  <div className="category-card-content">
                                    <h2>{findCategory(selectCategories)}</h2>
                                    {/* <h5>Care For Marry Lane</h5> */}
                                    <div className="location-adress-text">
                                      <img src={GmapImg} />{" "}
                                      {location.address ?? "NA"}
                                    </div>
                                  </div>
                                  <Link
                                    className="btn-gr"
                                    to=""
                                    onClick={() => setTab(1)}
                                  >
                                    Change
                                  </Link>
                                </div>
                              </div>
                            </div>

                            {/* <div className="col-md-6">
                              <div className="form-group">
                                <h4>Care Location</h4>
                                <div className="category-card">
                                  <div className="category-card-content">
                                    <div className="location-adress-text">
                                      <img src={GmapImg} /> Atlanta GA, 63993
                                    </div>
                                  </div>
                                  <a className="btn-gr" href="">
                                    Edit
                                  </a>
                                </div>
                              </div>
                            </div> */}

                            <div className="col-md-6">
                              <div className="form-group">
                                <h4>First Name</h4>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="fname"
                                  placeholder="First Name"
                                />
                                <ErrorMessage
                                  name="fname"
                                  component="div"
                                  className="alert alert-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <h4>Last Name</h4>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="lname"
                                  placeholder="Last Name"
                                />
                                <ErrorMessage
                                  name="lname"
                                  component="div"
                                  className="alert alert-danger"
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <h4>How do you prefer to be contacted?</h4>
                                <div className="choosemiles-list">
                                  <ul>
                                    <li>
                                      <div className="ceradio">
                                        <Field
                                          type="radio"
                                          name="prefer"
                                          id="Email"
                                          value="email"
                                        />
                                        <label for="Email">
                                          <span className="checkbox-text">
                                            Email
                                          </span>
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="ceradio">
                                        <Field
                                          type="radio"
                                          name="prefer"
                                          id="Phone"
                                          value="phone"
                                        />
                                        <label for="Phone">
                                          <span className="checkbox-text">
                                            {" "}
                                            Phone
                                          </span>
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="ceradio">
                                        <Field
                                          type="radio"
                                          name="prefer"
                                          id="Fax"
                                          value="fax"
                                        />
                                        <label for="Fax">
                                          <span className="checkbox-text">
                                            Fax
                                          </span>
                                        </label>
                                      </div>
                                    </li>
                                  </ul>
                                  <ErrorMessage
                                    name="prefer"
                                    component="div"
                                    className="alert alert-danger"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <h4>Who Needs Care?</h4>
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
                            <div className="col-md-4">
                              <div className="form-group">
                                <h4>Phone</h4>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="phone"
                                  placeholder="Enter Phone"
                                  maxlength={10}
                                  value={values.phone.replace(
                                    /(\d{3})(\d{3})(\d{4})/,
                                    "($1) $2-$3"
                                  )}
                                />
                                <ErrorMessage
                                  name="phone"
                                  component="div"
                                  className="alert alert-danger"
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="form-group">
                                <h4>Fax Number</h4>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="fax"
                                  placeholder="Enter Fax Number"
                                  maxlength={10}
                                  value={values.fax.replace(
                                    /(\d{3})(\d{3})(\d{4})/,
                                    "$1-$2-$3"
                                  )}
                                />
                                <ErrorMessage
                                  name="fax"
                                  component="div"
                                  className="alert alert-danger"
                                />
                              </div>
                            </div>

                            {/* <div className="col-md-4">
                              <div className="form-group">
                                <h4>Type of Care?</h4>
                                <select className="form-control">
                                  <option>Senior Care</option>
                                </select>
                              </div>
                            </div> */}

                            {/* <div className="col-md-4">
                              <div className="form-group">
                              <h4>Type of Care?</h4>
                                <Field
                                  as="select"
                                  type="text"
                                  className="form-control"
                                  name="type_care"
                                >
                                  <option value="">Select Type of Care</option>
                                  <option value="1">In-Home Care</option>
                                  <option value="2">Assisted Living Home</option>
                                  <option value="3">Residential Care</option>
                                  <option value="4">Hospice Care</option>
                                  <option value="5">Other</option>
                                </Field>
                                <ErrorMessage
                                  name="type_care"
                                  component="div"
                                  className="alert alert-danger"
                                />
                              </div>
                            </div> */}

                            <div className="col-md-6">
                              <div className="form-group">
                                <h4>Relationship?</h4>
                                <Field
                                  as="select"
                                  type="text"
                                  className="form-control"
                                  name="relationship"
                                >
                                  <option value="">Select Relationship</option>
                                  <option value="Parent, Grandparent">
                                    Parent, Grandparent
                                  </option>
                                  <option value="In-Laws">In-Laws</option>
                                  <option value="Self-Care">Self-Care</option>
                                  <option value="Spouse">Spouse</option>
                                  <option value="Hospital Care">
                                    Hospital Care
                                  </option>
                                  <option value="Others">Others</option>
                                </Field>
                                <ErrorMessage
                                  name="relationship"
                                  component="div"
                                  className="alert alert-danger"
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <h4>Age</h4>
                                <Field
                                  type="number"
                                  className="form-control"
                                  name="age"
                                  placeholder="Age"
                                />
                                <ErrorMessage
                                  name="age"
                                  component="div"
                                  className="alert alert-danger"
                                />
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
                                          name="payment_type"
                                          id="FirstPay"
                                          value="Private Pay, Insurance"
                                        />
                                        <label for="FirstPay">
                                          <span className="checkbox-text">
                                            {" "}
                                            Private Pay, Insurance
                                          </span>
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="ceradio1">
                                        <Field
                                          type="radio"
                                          name="payment_type"
                                          id="SecondPay"
                                          value="Medicare (age 65+)"
                                        />
                                        <label for="SecondPay">
                                          <span className="checkbox-text">
                                            Medicare (age 65+)
                                          </span>
                                        </label>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="ceradio1">
                                        <Field
                                          type="radio"
                                          name="payment_type"
                                          id="ThirdPay"
                                          value="Medicaid"
                                        />
                                        <label for="ThirdPay">
                                          <span className="checkbox-text">
                                            Medicaid
                                          </span>
                                        </label>
                                      </div>
                                    </li>
                                  </ul>
                                  <ErrorMessage
                                    name="payment_type"
                                    component="div"
                                    className="alert alert-danger"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="form-group">
                                <h4>Best Time To Call?</h4>
                                <div className="choosemiles-list">
                                  <ul>
                                    <li>
                                      <div className="ceradio1">
                                        <Field
                                          type="radio"
                                          name="best_time_to_call"
                                          id="Anytime"
                                          value="anytime"
                                        />
                                        <label for="Anytime">
                                          <span className="ceradio-text">
                                            Anytime
                                          </span>
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="ceradio1">
                                        <Field
                                          type="radio"
                                          name="best_time_to_call"
                                          id="Morning_At_Home"
                                          value="morning at home"
                                        />
                                        <label for="Morning_At_Home">
                                          <span className="ceradio-text">
                                            Morning At Home
                                          </span>
                                        </label>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="ceradio1">
                                        <Field
                                          type="radio"
                                          name="best_time_to_call"
                                          id="Morning_At_Word"
                                          value="morning at work"
                                        />
                                        <label for="Morning_At_Word">
                                          <span className="ceradio-text">
                                            Morning At Work
                                          </span>
                                        </label>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="ceradio1">
                                        <Field
                                          type="radio"
                                          name="best_time_to_call"
                                          id="Afternoon_At_Word"
                                          value="afternoon at work"
                                        />
                                        <label for="Afternoon_At_Word">
                                          <span className="ceradio-text">
                                            Afternoon At Work
                                          </span>
                                        </label>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="ceradio1">
                                        <Field
                                          type="radio"
                                          name="best_time_to_call"
                                          id="Evening_At_Word"
                                          value="evening at home"
                                        />
                                        <label for="Evening_At_Word">
                                          <span className="ceradio-text">
                                            Evening At Home
                                          </span>
                                        </label>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="ceradio1">
                                        <Field
                                          type="radio"
                                          name="best_time_to_call"
                                          id="Evening_At_Work"
                                          value="evening at work"
                                        />
                                        <label for="Evening_At_Work">
                                          <span className="ceradio-text">
                                            Evening At Work
                                          </span>
                                        </label>
                                      </div>
                                    </li>
                                  </ul>
                                  <ErrorMessage
                                    name="best_time_to_call"
                                    component="div"
                                    className="alert alert-danger"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="form-group">
                                <h4>When And Where Do You Need Care?</h4>
                                <div className="choosemiles-list">
                                  <ul>
                                    <li>
                                      <div className="ceradio1">
                                        <Field
                                          type="radio"
                                          name="frequency"
                                          id="One_time"
                                          value="O"
                                        />
                                        <label for="One_time">
                                          <span className="ceradio-text">
                                            <i className="fa fa-clock"></i> One
                                            time
                                          </span>
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="ceradio1">
                                        <Field
                                          type="radio"
                                          name="frequency"
                                          id="Repeat_Weekly"
                                          value="W"
                                        />
                                        <label for="Repeat_Weekly">
                                          <span className="ceradio-text">
                                            <i className="fa fa-clock-rotate-left"></i>{" "}
                                            Repeat Weekly
                                          </span>
                                        </label>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="ceradio1">
                                        <Field
                                          type="radio"
                                          name="frequency"
                                          id="Repeat_Monthly"
                                          value="M"
                                        />
                                        <label for="Repeat_Monthly">
                                          <span className="ceradio-text">
                                            <i className="fa fa-calendar"></i>{" "}
                                            Repeat Monthly
                                          </span>
                                        </label>
                                      </div>
                                    </li>
                                  </ul>
                                  <ErrorMessage
                                    name="frequency"
                                    component="div"
                                    className="alert alert-danger"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <h4>Preferred Date</h4>
                                <DatePicker
                                  toggleCalendarOnIconClick
                                  showIcon
                                  dateFormat={"MM-dd-yyyy"}
                                  selected={startDate}
                                  className="form-control todo-list-input"
                                  onChange={(date) => {
                                    setStartDate(date);
                                  }}
                                  isClearable
                                  name="start_date"
                                  autoComplete="off"
                                  placeholderText="Select Start Date"
                                />
                                {startError && (
                                  <div className="alert alert-danger">
                                    Start date is required!
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <h4>Preferred Time</h4>
                                <Field
                                  type="time"
                                  className="form-control"
                                  name="start_time"
                                />
                                <ErrorMessage
                                  name="start_time"
                                  component="div"
                                  className="alert alert-danger"
                                />
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
                              <div className="form-group">
                                <button
                                  className="btn-bl mx-2"
                                  type="button"
                                  onClick={() => {
                                    document
                                      .getElementById("second-step-form")
                                      .reset();
                                    setStartDate("");
                                  }}
                                >
                                  Clear All
                                </button>
                                <button className="btn-gr" type="submit">
                                  Submit
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindCare;
