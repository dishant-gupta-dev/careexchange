import React, { useEffect, useState, useCallback, useRef } from "react";
import googlemapIcon from "../../../assets/provider/images/Google_Map.svg";
import careuserprofile from "../../../assets/provider/images/user.png";
import caresuccessful from "../../../assets/provider/images/successful.svg";
import { api } from "../../../utlis/provider/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { GeolocationApiKey } from "../../../utlis/common.utlis";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../store/slices/Auth";
import LocImg from "../../../assets/user/images/location.svg";
import Select from "react-select";

const Page = () => {
  const options = [];
  const cityOptions = [];
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
    slogan: details?.slogan ?? "",
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

  const updateProfile = async (formValue) => {
    console.log(edit);

    setLoading(true);
    let form = new FormData();
    form.append("service_id", formValue.sub_category);
    form.append("username", formValue.name);
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
    form.append("service_offered_area", formValue.radius);
    form.append("payment_accepted_type", formValue.payment_accepted_type);
    form.append("business_address", location.address);
    form.append("latitude", location.lat);
    form.append("longitude", location.lng);
    if (file === "" || file === null || !file) {
      form.append("file", file);
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
  console.log(details);

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

  function findCategory(id) {
    for (let i in categories) {
      if (categories[i].name == id) {
        return categories[i].id;
      }
    }
    return null;
  }

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

  const dispatch = useDispatch();
  const signOut = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  useEffect(() => {
    getMyProfile(api.profile);
    getStateList(api.stateList + `?country_id=231`);
    getCategoryList(api.categoryList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCitiesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

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
                    <img src={googlemapIcon} alt="" />
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
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={updateProfile}
                enableReinitialize
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <div className="row register-form">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Name</label>
                          <Field
                            type="text"
                            className="form-control todo-list-input"
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
                          <label>Email Address</label>
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
                          <label>Phone</label>
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
                        <div className="form-group">
                          <label>Service Area</label>
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
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Search By Miles Away</label>
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
                          <label>States</label>
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
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Cities</label>
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
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Category</label>
                          <select
                            className="form-control"
                            name="category"
                            defaultValue={findCategory(details?.category)}
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
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Sub Category</label>
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
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Free In-Home Assessment Offered?</label>
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
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Business Name</label>
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
                          <label>
                            Experience{" "}
                            <span className="text-danger">(In Years)</span>
                          </label>
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
                          <label>Slogan</label>
                          <Field
                            type="text"
                            className="form-control"
                            name="slogan"
                            placeholder="Enter Slogan"
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
                          <label>Fees Per Hour</label>
                          <Field
                            type="number"
                            className="form-control"
                            name="fee_per_hour"
                            placeholder="$0.00 per hour"
                          />
                          <ErrorMessage
                            name="fee_per_hour"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Fees Per Week</label>
                          <Field
                            type="number"
                            className="form-control"
                            name="fee_per_week"
                            placeholder="$0.00 per week"
                          />
                          <ErrorMessage
                            name="fee_per_week"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Fees Per Month</label>
                          <Field
                            type="number"
                            className="form-control"
                            name="fee_per_month"
                            placeholder="$0.00 per month"
                          />
                          <ErrorMessage
                            name="fee_per_month"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Upload File</label>
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
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>License Number</label>
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
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Upload License</label>
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
                          <label>Payment Types Accepted</label>
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
                    </div>
                    <div className="form-group">
                      <label>Description</label>
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
