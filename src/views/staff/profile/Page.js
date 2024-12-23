import React, { useEffect, useState, useCallback, useRef } from "react";
import GmapImg from "../../../assets/provider/images/Google_Map.svg";
import careuserprofile from "../../../assets/provider/images/user.png";
import caresuccessful from "../../../assets/provider/images/successful.svg";
import LocImg from "../../../assets/user/images/location.svg";
import { api } from "../../../utlis/staff/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../store/slices/Auth";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import {
  GeolocationApiKey,
  MultipleFile,
  SingleFile,
} from "../../../utlis/common.utlis";

const Page = () => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const [deleteAcc, setDeleteAcc] = useState(false);
  const [file, setFile] = useState();
  const [edit, setEdit] = useState({ status: false, id: null });
  const [editImg, setEditImg] = useState(false);
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
  const [multiFile, setMultiFile] = useState([]);
  const [imgError, setImgError] = useState(false);
  const [imgMultiError, setImgMultiError] = useState(false);
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    address: null,
  });

  const getMyProfile = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setSelectCategory(response?.data?.data?.categoryid);
      getSubCategoryList(response?.data?.data?.categoryid);
      setLocation({
        lat: response?.data?.data?.latitude,
        lng: response?.data?.data?.longitude,
        address: response?.data?.data?.business_address,
      });
      setDetails(response.data.data);
    } else setDetails();
    setLoading(false);
  };

  const deleteAccount = async () => {
    setLoading(true);
    const response = await ApiService.deleteAPIWithAccessToken(
      api.deleteAccount
    );
    setDeleteAcc(false);
    if (response.data.status) {
      toast.success(response.data.message);
      signOut();
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const dispatch = useDispatch();
  const signOut = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GeolocationApiKey,
    libraries: ["places"],
  });

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

  const initialValues = {
    radius: details?.service_offered_area ?? "",
    sub_category: details?.service_id ?? "",
    name: details?.fullname ?? "",
    phone: details?.mobile ?? "",
    free_in_home_assessment: details?.free_in_home_assessment.toString() ?? "",
    fee_per_week: details?.fee_per_week ?? "",
    fee_per_month: details?.fee_per_month ?? "",
    fee_per_hour: details?.fee_per_hour ?? "",
    business_name: details?.business_name ?? "",
    care_job_title: details?.care_job_title ?? "",
    gender: details?.gender ?? "",
    license_number: details?.license_number ?? "",
    payment_accepted_type: details?.payment_accepted_type ?? "",
    description: details?.description ?? "",
    experience: details?.experience ?? "",
  };

  const validationSchema = Yup.object().shape({
    radius: Yup.string().required("Radius is required!"),
    sub_category: Yup.string().required("Sub Category is required!"),
    name: Yup.string().required("Name is required!"),
    phone: Yup.string().min(10).required("Phone is required!"),
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
  });

  const updateProfile = async (formValue) => {
    setLoading(true);
    let form = new FormData();
    form.append("service_id", formValue.sub_category);
    form.append("fullname", formValue.name);
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
    if (file === "" || file === null || !file) {
      form.append("resume", file);
    }
    if (multiFile.length === 0) {
      multiFile.forEach((image) => {
        form.append("license_image", image);
      });
    }
    const response = await ApiService.putAPIWithAccessTokenMultiPart(
      api.updateProfile + edit.id,
      form
    );
    setEdit({
      status: false,
      id: null,
    });
    if (response.data.status) {
      toast.success(response.data.message);
      getMyProfile(api.profile);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      const maxFileSize = SingleFile;
      if (fileSizeInMB > maxFileSize) {
        setFile();
        setImgError({
          status: true,
          msg: `File size limit exceeds ${maxFileSize} MB. Your file size is ${fileSizeInMB.toFixed(
            2
          )} MB.`,
        });
      } else {
        setFile(e.target.files[0]);
        setImgError({ status: false, msg: null });
      }
    } else {
      setImgError({ status: true, msg: `File not found.` });
    }
  };

  const handleMultiImgChange = (e) => {
    const files = e.target.files;
    if (files) {
      const maxTotalSize = MultipleFile;
      let totalFileSize = 0;
      for (let i = 0; i < files.length; i++) {
        totalFileSize += files[i].size;
      }
      const totalFileSizeInMB = totalFileSize / (1024 * 1024);
      if (totalFileSizeInMB > maxTotalSize) {
        setMultiFile([]);
        setImgMultiError({
          status: true,
          msg: `Total file size exceeds ${maxTotalSize} MB. Your total size is ${totalFileSizeInMB.toFixed(
            2
          )} MB.`,
        });
      } else {
        let arr = Object.entries(files).map((e) => e[1]);
        setMultiFile([...multiFile, ...arr]);
        setImgMultiError({ status: false, msg: null });
      }
    } else {
      setImgMultiError({ status: true, msg: `File not found.` });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getMyProfile(api.profile);
    getCategoryList(api.categoryList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="messages-section">
          <div className="row">
            <div className="col-md-12">
              <div className="care-title-header">
                <div className="care-title-header-1">
                  <h6 className="heading-name-title p-0">
                    Hello,{" "}
                    {details?.business_name
                      ? details?.business_name
                      : details?.fullname}
                  </h6>
                  <h2 className="heading-title">Your Profile Looks Great !</h2>
                </div>
                <div>
                  <div className="">
                    <Link
                      class="btn-re"
                      onClick={() => setDeleteAcc(true)}
                      to=""
                    >
                      <i className="fa fa-trash ms-2"></i> Delete Account
                    </Link>
                  </div>
                </div>
              </div>
              <div className="providerProfile-section">
                <div className="user-table-item">
                  <div className="row g-1 align-items-center">
                    <div className="col-md-4">
                      <div className="user-profile-item">
                        <div className="user-profile-media">
                          {details?.logo !== null &&
                          details?.logo !== "" &&
                          details?.logo !== undefined ? (
                            <img src={details?.logo} alt="" />
                          ) : details?.profile_image === null ||
                            details?.profile_image === "" ||
                            details?.profile_image === undefined ? (
                            <img src={NoImage} alt="" />
                          ) : (
                            <img src={details?.profile_image} alt="" />
                          )}
                        </div>
                        <div className="user-profile-text">
                          <h2>
                            {details?.business_name
                              ? details?.business_name
                              : details?.fullname}
                          </h2>
                          <div className="d-flex">
                            <div className="email-text">
                              <i className="fa fa-envelope ms-2"></i>{" "}
                              {details?.email ?? "NA"}
                            </div>
                            <div className="email-text ms-3">
                              <i className="fa fa-phone ms-2"></i>{" "}
                              {details?.mobile}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="user-profile-action">
                        <Link
                          className="btn-gr"
                          onClick={() =>
                            setEdit({ status: true, id: details?.id })
                          }
                        >
                          <i class="fa fa-edit ms-2"></i> Edit Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="providerprofile-overview">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="overview-card">
                        <div className="overview-content">
                          <h2>Active Jobs</h2>
                          <h4>{details?.activeJob ?? 0}</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="overview-card">
                        <div className="overview-content">
                          <h2>Pending Request</h2>
                          <h4>{details?.pendingJob ?? 0}</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="overview-card">
                        <div className="overview-content">
                          <h2>Cancelled Jobs</h2>
                          <h4>{details?.cancellJob ?? 0}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="providerprofile-about d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img className="me-3" src={caresuccessful} alt="" />
                    <h2 className="m-0">
                      Want To Get Featured on The Home Page Listing ?
                    </h2>
                  </div>
                  <a className="btn-plan" href="#">
                    @ Just $59/Monthly
                  </a>
                </div>

                <div className="Address-card">
                  <div className="care-location-box d-flex justify-content-between mt-3">
                    <div className="care-location-text">
                      <h4>Payment Accepted</h4>
                      <p>{details?.payment_accepted_type ?? "NA"}</p>
                    </div>
                    <div className="care-location-text">
                      <h4>Experience </h4>
                      <p>{details?.experience ?? 0} Years</p>
                    </div>
                    <div className="care-location-text">
                      <h4>Fees </h4>
                      <p>{details?.fee ?? "NA"}</p>
                    </div>
                  </div>

                  <div className="divider col-md-12"></div>

                  <div className="care-location-text">
                    <h4>Best Info</h4>
                    <p>{details?.description ?? "NA"}</p>
                  </div>

                  <div className="divider col-md-12"></div>
                  <div className="care-location-text mb-3">
                    <h4>Address</h4>
                  </div>
                  <div className="full-address-detail">
                    <img src={GmapImg} alt="" />
                    <h6>{details?.business_address ?? "NA"}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={edit.status}
        onHide={() => {
          setEdit({
            status: false,
            id: null,
          });
        }}
        className="modal-lg"
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Edit Profile</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row findcare-form">
              <Formik
                initialValues={initialValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={updateProfile}
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
                          <input
                            type="text"
                            className="form-control todo-list-input"
                            name="email"
                            value={details?.email}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
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

                      <div className="col-md-6">
                        <div className="form-group search-form-group">
                          <h4>Service Area</h4>
                          {isLoaded && (
                            <StandaloneSearchBox
                              onLoad={(ref) => (inputRef.current = ref)}
                              onPlacesChanged={handlePlaceChange}
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
                                    <span className="checkbox-text"> Male</span>
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
                              <select
                                className="form-control"
                                name="category"
                                defaultValue={selectCategories}
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
                            <option value="">Select Care Job Title</option>
                            <option value="Caregiver">Caregiver</option>
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
                              Licensed Practical/Vocational Nurse (LPN/LVN)
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
                            <span className="text-danger">(In Years)</span>
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
                                    <span className="checkbox-text"> Yes</span>
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
                                    <span className="checkbox-text">No</span>
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
                          <input
                            type="file"
                            name="file"
                            accept="application/pdf"
                            onChange={handleImgChange}
                            className="form-control todo-list-input"
                          />
                          {imgError.status && (
                            <div className="alert alert-danger">
                              {imgError.msg ?? null}
                            </div>
                          )}
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
                          <input
                            type="file"
                            name="license_image"
                            accept="image/*"
                            data-multiple-caption="{count} files selected"
                            multiple="5"
                            onChange={(e) => handleMultiImgChange(e)}
                            className="form-control todo-list-input"
                          />
                          {imgMultiError.status && (
                            <div className="alert alert-danger">
                              {imgMultiError.msg ?? null}
                            </div>
                          )}
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

                      <div className="form-group text-end">
                        <button
                          type="button"
                          onClick={() => {
                            setEdit({
                              status: false,
                              id: null,
                            });
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
                          Update
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </ModalBody>
        </div>
      </Modal>

      <Modal
        show={deleteAcc}
        onHide={() => {
          setDeleteAcc(false);
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalBody className="">
            <div className="add-items d-flex row">
              <h5 className="text-center pb-0">Are you sure</h5>
              <p className="text-center">You want to delete your account?</p>
              <div className="form-group text-center mb-2">
                <button
                  type="button"
                  onClick={() => setDeleteAcc(false)}
                  className="btn-re me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gr"
                  data-bs-dismiss="modal"
                  onClick={() => deleteAccount()}
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

export default Page;
