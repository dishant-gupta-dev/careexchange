import React, { useEffect, useState, useRef } from "react";
import GmapImg from "../../../assets/user/images/Google_Maps_icon.svg";
import LocImg from "../../../assets/user/images/location.svg";
import HouseImg from "../../../assets/user/images/house1.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "../../../utlis/user/api.utlis";
import ApiService from "../../../core/services/ApiService";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import Loader from "../../../layouts/loader/Loader";
import StarImg from "../../../assets/user/images/star.svg";
import DollarImg from "../../../assets/user/images/dollar-circle.svg";
import BriefcaseImg from "../../../assets/user/images/briefcase.svg";
import HandshakeImg from "../../../assets/user/images/Handshake.svg";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import {
  GeolocationApiKey,
  providerLIMIT,
  status,
} from "../../../utlis/common.utlis";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import moment from "moment";
import { routes } from "../../../utlis/user/routes.utlis";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputMask from "react-input-mask";

const FindCareHomeAss = () => {
  const navigate = useNavigate();
  const localData = useLocation();
  const address = localData.state?.address;
  const lat = localData.state?.lat;
  const lng = localData.state?.lng;
  const cat = localData.state?.catId ?? null;
  const [detailModal, setDetailModal] = useState({ status: false, data: null });
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [tab, setTab] = useState(1);
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

  let userData = JSON.parse(localStorage.getItem("careexchange"));

  const initialFirstValues = {
    radius: selectRadius ?? "",
    category: selectCategories ?? "",
    sub_category: selectSubCategories ?? "",
  };

  const initialSecondValues = {
    fname:
      userData.fullname != "" ||
      userData.fullname != null ||
      userData.fullname != undefined
        ? userData.fullname.split(" ")[0]
        : "",
    lname:
      userData.fullname != "" ||
      userData.fullname != null ||
      userData.fullname != undefined
        ? userData.fullname.split(" ")[1]
        : "",
    prefer: "",
    gender: "",
    email: userData.email ?? "",
    phone: userData.mobile ?? "",
    fax: "",
    age: "",
    frequency: "",
    relationship: "",
    payment_type: "",
    best_time_to_call: "",
    start_date: "",
    start_time: "",
    description: "",
  };

  const initialThirdValues = {};

  const validationFirstSchema = Yup.object().shape({
    radius: Yup.string().required("Radius is required!"),
    category: Yup.string().required("Category is required!"),
    sub_category: Yup.string().required("Sub Category is required!"),
  });

  const validationSecondSchema = Yup.object().shape({
    fname: Yup.string().required("First Name is required!"),
    lname: Yup.string().required("Last Name is required!"),
    prefer: Yup.string().required("Prefered Contact is required!"),
    gender: Yup.string().required("Gender is required!"),
    email: Yup.string().required("Email is required!"),
    phone: Yup.string()
      .min(14, "Phone is invalid")
      .required("Phone is required!"),
    age: Yup.string().required("Age is required!"),
    frequency: Yup.string().required("Frequency is required!"),
    relationship: Yup.string().required("Relationship is required!"),
    payment_type: Yup.string().required("Payment Type is required!"),
    best_time_to_call: Yup.string().required("Best time to call is required!"),
    start_date: Yup.string().required("Prefered Date is required!"),
    start_time: Yup.string().required("Prefered Time is required!"),
    description: Yup.string().required("Description is required!"),
  });

  const getProviders = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    console.log("all providers list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      const providerData = [];
      for (const key in response.data.data.ProviderList) {
        response.data.data.ProviderList[key].checked = false;
        const itemData = response.data.data.ProviderList[key];
        providerData.push(itemData);
      }
      setProvider((prevData) => [...prevData, ...providerData]);
      if (providerData.length < providerLIMIT) {
        setHasMore(false);
      }
      setTotal(response.data.data.total);
    } else setProvider([]);
    setLoading(false);
  };

  const getDetails = async (id) => {
    const response = await ApiService.getAPIWithAccessToken(
      api.userDetail + id
    );
    if (response.data.status && response.data.statusCode === 200) {
      setDetailModal({ status: true, data: response.data.data });
    } else setDetailModal({ status: false, data: null });
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPageNum((prevPage) => prevPage + 1);
    }
  };

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
    form.append("in_home_assist", 0);
    form.append("address", location.address);
    form.append("latitude", location.lat);
    form.append("longitude", location.lng);
    form.append("start_date", formValue.start_date);
    form.append("start_time", formValue.start_time);
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.addServiceRequest,
      form
    );
    // console.log("Add service request => ", response.data);
    if (response.data.status) {
      toast.success(response.data.message);
      setServiceId(response?.data?.data?.requestDetails?.id);
      setTab(3);
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

  function findSubCategory(id) {
    for (let i in subCategories) {
      if (subCategories[i].id == id) {
        return subCategories[i].name;
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
    getProviders(
      api.providerList + `?user_type=2&latitude=${location.lat}&longitude=${location.lng}&radious=${selectRadius}&page=${pageNum}&limit=${providerLIMIT}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, pageNum]);

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
                  tab == 1 || tab == 2 || tab == 3
                    ? "active nav-item"
                    : "nav-item"
                }
              >
                <Link
                  className={tab == 1 || tab == 2 || tab == 3 ? "active" : ""}
                >
                  <span className="number">1</span>
                </Link>
              </li>
              <li
                className={
                  tab == 2 || tab == 3 ? "active nav-item" : "nav-item"
                }
              >
                <Link className={tab == 1 || tab == 2 ? "active" : ""}>
                  <span className="number">2</span>
                </Link>
              </li>
              <li className={tab == 3 ? "active nav-item" : "nav-item"}>
                <Link className={tab == 1 ? "active" : ""}>
                  <span className="number">3</span>
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
                        {({ values, setFieldValue }) => (
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
                                      <Field name="category">
                                        {({ field }) => (
                                          <select
                                            {...field}
                                            className="form-control"
                                            value={selectCategories}
                                            onChange={(e) => {
                                              setFieldValue(
                                                field.name,
                                                e.target.value
                                              );
                                              getSubCategoryList(
                                                e.target.value
                                              );
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
                        )}
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
                                {/* <h4>Care Category</h4> */}
                                <div className="category-card">
                                  <div className="category-card-content">
                                    <div>
                                      <div className="tags-item">
                                        {findCategory(selectCategories)}
                                      </div>
                                      <div className="tags-item-sub mx-1">
                                        {findSubCategory(selectSubCategories)}
                                      </div>
                                      <div className="exp-text">
                                        {selectRadius + " Miles"}
                                      </div>
                                    </div>
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

                            <div className="col-md-4">
                              <div className="form-group">
                                <h4>Fax Number</h4>
                                <Field name="fax">
                                  {({ field }) => (
                                    <InputMask
                                      {...field}
                                      mask="999-999-9999"
                                      className="form-control"
                                      maskChar=""
                                      onChange={(e) => {
                                        setFieldValue(
                                          field.name,
                                          e.target.value
                                        );
                                      }}
                                      placeholder="Enter fax number"
                                    />
                                  )}
                                </Field>
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
                                <Field
                                  name="start_date"
                                  className="form-control"
                                >
                                  {({ field }) => (
                                    <DatePicker
                                      {...field}
                                      format="MM/DD/YYYY"
                                      placeholder="Select Preferred Date"
                                      value={values.start_date || ""}
                                      onChange={(value) =>
                                        setFieldValue("start_date", value)
                                      }
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="start_date"
                                  component="div"
                                  className="alert alert-danger"
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <h4>Preferred Time</h4>
                                <Field
                                  name="start_time"
                                  className="form-control"
                                >
                                  {({ field }) => (
                                    <DatePicker
                                      {...field}
                                      disableDayPicker
                                      format="hh:mm A"
                                      placeholder="Select Preferred Time"
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
                                  Submit & Find Care Provider
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

              <div
                className={tab == 3 ? "tab-pane show" : "tab-pane d-none"}
                id="tab3"
              >
                <div className="findcare-form">
                  <div className="d-flex justify-content-between">
                    <h2>Choose from {total ?? 0} Care Provider</h2>
                    {providers.length === 0 ? (
                      <button
                        type="button"
                        className="btn-gr"
                        onClick={() => setTab(2)}
                      >
                        Change
                      </button>
                    ) : null}
                  </div>
                  <div className="findcare-card">
                    <Formik
                      initialValues={initialThirdValues}
                      enableReinitialize
                      onSubmit={thirdStep}
                    >
                      <Form>
                        <div className="row">
                          {providers.length !== 0 ? (
                            providers.map((ele, indx) => {
                              return (
                                <div key={indx} className="col-md-4">
                                  <div className="findcarecheckbox position-relative">
                                    <input
                                      type="checkbox"
                                      name="user_id"
                                      checked={ele.checked}
                                      onChange={() => handleCheck(ele.userid)}
                                      id={`${ele.userid}proImg`}
                                      value={ele.userid}
                                    />
                                    <label htmlFor={`${ele.userid}proImg`}>
                                      <span className="checkbox-circle-mark"></span>
                                      <div className="findcare-card">
                                        <div className="findcare-card-head">
                                          <div className="findcare-user-info">
                                            <div className="findcare-user-image">
                                              {ele.logo !== null &&
                                              ele.logo !== "" &&
                                              ele.logo !== undefined ? (
                                                <img
                                                  src={ele.logo}
                                                  alt=""
                                                  className="me-3"
                                                />
                                              ) : ele.profile_image === null ||
                                                ele.profile_image === "" ||
                                                ele.profile_image ===
                                                  undefined ? (
                                                <img
                                                  src={NoImage}
                                                  alt=""
                                                  className="me-3"
                                                />
                                              ) : (
                                                <img
                                                  src={ele.profile_image}
                                                  alt=""
                                                  className="me-3"
                                                />
                                              )}
                                            </div>
                                            <div className="findcare-user-text">
                                              <div className="findcare-user-name">
                                                {ele?.business_name
                                                  ? ele?.business_name
                                                  : ele?.fullname}
                                              </div>
                                              <div className="d-flex">
                                                <div className="findcare-user-rating">
                                                  <i className="fa fa-star"></i>{" "}
                                                  {ele.average_rating ?? "0.0"}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="findcare-card-body">
                                          <div className="findcare-pricetag-content">
                                            <div className="strip-text">
                                              {ele.user_type == 2
                                                ? "Provider"
                                                : "Staff"}
                                            </div>
                                          </div>
                                          <div className="d-flex flex-column align-items-start">
                                            <div className="care-price-text">
                                              <div className="exp-text mb-1">
                                                {ele.experience ?? 0} Years
                                                Experience
                                              </div>
                                            </div>
                                            <div>
                                              <div className="tags-item">
                                                {ele.category ?? "NA"}
                                              </div>
                                              <div className="tags-item-sub">
                                                {ele.subcategory ?? "NA"}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="findcare-location-box mt-2">
                                            <div className="care-point-icon">
                                              <img src={GmapImg} />
                                            </div>
                                            <div className="care-point-text mb-5">
                                              <h4>Location</h4>
                                              <p>
                                                {ele.business_address ?? "NA"}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </label>
                                    <div className="text-center mt-2 w-100 provider-list-detail-btn" style={{ position: "absolute", top: "74%" }}>
                                      <Link
                                        className="viewmorebtn mx-1"
                                        to=""
                                        onClick={(e) => {
                                          e.preventDefault();
                                          getDetails(ele.id);
                                        }}
                                      >
                                        <i className="fa fa-eye"></i> View
                                        Profile
                                      </Link>
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

                          {hasMore ? (
                            <div className="form-group w-100 text-center">
                              <button
                                className="btn-gra"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleLoadMore();
                                }}
                              >
                                Show More
                              </button>
                            </div>
                          ) : null}

                          <div className="col-md-12">
                            <div className="form-group">
                              <button
                                type="button"
                                className="btn-bl mx-2"
                                onClick={() => handleUncheck()}
                              >
                                Clear All
                              </button>
                              <button className="btn-gr" type="submit">
                                Submit Service Request
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={detailModal.status}
        onHide={() => {
          setDetailModal({ status: false, data: null });
        }}
        className="modal-lg"
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Provider Details</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <div class="row">
                <div class="col-md-12">
                  <div class="providerProfile-section">
                    <div class="user-table-item">
                      <div class="row g-1 align-items-center">
                        <div class="col-md-7">
                          <div class="user-profile-item">
                            <div class="user-profile-media">
                              {detailModal?.data?.logo !== null &&
                              detailModal?.data?.logo !== "" &&
                              detailModal?.data?.logo !== undefined ? (
                                <img
                                  src={detailModal?.data?.logo}
                                  alt=""
                                  className="me-3"
                                />
                              ) : detailModal?.data?.profile_image === null ||
                                detailModal?.data?.profile_image === "" ||
                                detailModal?.data?.profile_image ===
                                  undefined ? (
                                <img src={NoImage} alt="" className="me-3" />
                              ) : (
                                <img
                                  src={detailModal?.data?.profile_image}
                                  alt=""
                                  className="me-3"
                                />
                              )}
                            </div>
                            <div class="user-profile-text">
                              <h2>
                                {detailModal?.data?.business_name
                                  ? detailModal?.data?.business_name
                                  : detailModal?.data?.fullname}
                              </h2>
                              <div class="location-text">
                                {detailModal?.data?.business_address ?? "NA"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-5">
                          <div class="row g-1 align-items-center">
                            <div class="col-md-6">
                              <div class="user-contact-info">
                                <div class="user-contact-info-icon">
                                  <img src={StarImg} />
                                </div>
                                <div class="user-contact-info-content">
                                  <h2>Rating</h2>
                                  <p>
                                    {detailModal?.data?.avarageRating
                                      ?.average_rating ?? "0.0"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="user-contact-info">
                                <div class="user-contact-info-icon">
                                  <img src={BriefcaseImg} />
                                </div>
                                <div class="user-contact-info-content">
                                  <h2>Experience</h2>
                                  <p>
                                    {detailModal?.data?.experience ?? 0} Years
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="providerProfile-point">
                        <div class="providerprofile-point-item">
                          <img src={HouseImg} /> Cared{" "}
                          {detailModal?.data?.caredFamilys ?? 0} Families
                        </div>
                        <div class="providerprofile-point-item">
                          <img src={HandshakeImg} /> Hired By{" "}
                          {detailModal?.data?.caredFamilyNearBy ?? 0} Families
                          In Your Neighbourhood
                        </div>
                      </div>
                    </div>

                    <div class="providerprofile-overview">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="overview-card">
                            <div class="overview-content">
                              <h2>Repeat Clients</h2>
                              <h4>{detailModal?.data?.repeatClient ?? 0}</h4>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="overview-card">
                            <div class="overview-content">
                              <h2>Response Rate</h2>
                              <h4>{detailModal?.data?.responseRate ?? "0%"}</h4>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="overview-card">
                            <div class="overview-content">
                              <h2>Response Time</h2>
                              <h4>{detailModal?.data?.responseTime ?? "NA"}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="providerprofile-about">
                      <h2>About</h2>
                      <p>{detailModal?.data?.description ?? "NA"}</p>
                    </div>

                    <div class="providerprofile-about">
                      <h2>Offering Services</h2>
                      <div>
                        <div className="tags-item">
                          {detailModal?.data?.category ?? "NA"}
                        </div>
                        <div className="tags-item-sub">
                          {detailModal?.data?.subcategory ?? "NA"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group text-end mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setDetailModal({ status: false, data: null });
                  }}
                  className="btn btn-re me-2"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default FindCareHomeAss;
