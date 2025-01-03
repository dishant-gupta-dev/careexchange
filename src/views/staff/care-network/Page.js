import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import LocImg from "../../../assets/user/images/location.svg";
import Searchicon from "../../../assets/provider/images/search1.svg";
import SuitcaseIcon from "../../../assets/provider/images/jobs-suitcase.svg";
import GmapImg from "../../../assets/user/images/Google_Maps_icon.svg";
import DollarIcon from "../../../assets/provider/images/dollar.svg";
import ClockIcon from "../../../assets/provider/images/clock.svg";
import { api } from "../../../utlis/staff/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { routes } from "../../../utlis/staff/routes.utlis";
import { encode } from "base-64";
import moment from "moment";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { CommonMiles, GeolocationApiKey } from "../../../utlis/common.utlis";
import InputMask from "react-input-mask";
import toast from "react-hot-toast";
import * as Yup from "yup";

const Page = () => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [list, setList] = useState([]);
  const [file, setFile] = useState();
  const [filter, setFilter] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [apply, setApply] = useState({ status: false, id: null });
  const [selectRadius, setSelectRadius] = useState(null);
  const [selectCategories, setSelectCategory] = useState("");
  const [selectSubCategories, setSelectSubCategory] = useState("");
  const [categories, setCategory] = useState([]);
  const [subCategories, setSubCategory] = useState([]);
  const { address, lat, lng } = useParams();
  const [location, setLocation] = useState({
    lat: lat ?? null,
    lng: lng ?? null,
    address: address ?? null,
    state: null,
  });

  let userData = JSON.parse(localStorage.getItem("careexchange"));

  const initialValues = {
    full_name: userData.fullname ?? "",
    mobile: userData.mobile ?? "",
    email: userData.email ?? "",
  };

  const initialValuesFilter = {
    radius: selectRadius ?? CommonMiles,
    sub_category: selectSubCategories ?? "",
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Name is required!"),
    mobile: Yup.string().min(14, 'Phone is invalid').required("Phone is required!"),
    email: Yup.string().email().required("Email is required!"),
  });

  const getCareNetworkList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all care network list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setList(response.data.data.postedJob);
    } else setList([]);
    setLoading(false);
  };

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

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    if (date != null && date != undefined && date != "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getCareNetworkList(api.careNetwork + `?search=${name}&date=${date}`);
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
      getCareNetworkList(api.careNetwork);
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

  function findAddress(type, arr) {
    for (let i in arr) {
      if (arr[i].types.includes(type)) {
        return arr[i].formatted_address;
      }
    }
    return "";
  }

  function findState(type, arr) {
    for (let i in arr) {
      if (arr[i].types.includes(type)) {
        return arr[i].long_name;
      }
    }
    return null;
  }

  function findState2(type, arr) {
    for (let i in arr) {
      if (arr[i].types.includes(type)) {
        for (let j in arr[i].address_components) {
          if (arr[i].address_components[j].types.includes(type)) {
            return arr[i].address_components[j].long_name;
          }
        }
      }
    }
    return null;
  }

  const handlePlaceChange = () => {
    let [address] = inputRef.current.getPlaces();
    setLocation({
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
      address: address.formatted_address,
      state: findState(
        "administrative_area_level_1",
        address.address_components
      ),
    });
  };

  const applyFilter = (formValue) => {
    setSelectRadius(formValue.radius);
    setSelectSubCategory(formValue.sub_category);
    setFilter(false);
    getCareNetworkList(
      api.careNetwork +
        `?latitude=${location.lat}&longitude=${location.lng}&categoryid=${selectCategories}&subcategoryid=${formValue.sub_category}&radius=${formValue.radius}`
    );
  };

  const handleResumeChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getCurrentAddress = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        // console.log("Your current position is:");
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${JSON.stringify(crd)} meters.`);
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&key=${GeolocationApiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data.results);
            setLocation({
              lat: crd.latitude,
              lng: crd.longitude,
              address: findAddress("street_address", data.results),
              state: findState2("administrative_area_level_1", data.results),
            });
          })
          .catch((error) => console.log(error));
        getCareNetworkList(
          api.careNetwork +
            `?latitude=${lat ?? crd.latitude}&longitude=${
              lng ?? crd.longitude
            }&radius=${CommonMiles}`
        );
      },
      function errorCallback(error) {
        // console.log("Error => ", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCategoryList(api.categoryList);
    getCurrentAddress();
    // getCareNetworkList(api.careNetwork);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="carenetwork-section">
          <div className="care-title-header">
            <h2 className="heading-title">Care Network</h2>
            <div className="search-filter wd70">
              <div className="row g-2">
                <div className="col-md-2">
                  <div className="form-group mb-0">
                    <Link to={routes.appliedJob} className="btn-gr wd100">
                      Applied Job
                    </Link>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group mb-0">
                    <Link
                      to=""
                      onClick={() => setFilter(true)}
                      className="btn-gr wd100"
                    >
                      Sort By Filter
                    </Link>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group mb-0">
                    <DatePicker
                      toggleCalendarOnIconClick
                      showIcon
                      dateFormat={"MM-dd-yyyy"}
                      selected={startDate}
                      onChange={(date, e) => {
                        setStartDate(date);
                        handleFilter(e, date);
                      }}
                      className="form-control"
                      style={{ padding: "15px 40px" }}
                      isClearable
                      autoComplete="off"
                      name="date"
                      placeholderText="Select Date"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-0">
                    <div className="search-form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => handleFilter(e)}
                        name="name"
                      />
                      <span className="search-icon">
                        {" "}
                        <img src={Searchicon} alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carenetwork-content">
            <div className="row">
              {list.length !== 0 ? (
                list.map((ele, indx) => {
                  return (
                    <div key={indx} className="col-md-6">
                      <div className="care-card">
                        <div className="care-card-head">
                          <div className="care-id">
                            Job ID: <span>{ele.job_id ?? "NA"}</span>
                          </div>

                          <div className="care-date">
                            Posted On: <span>{ele.posted_date ?? "NA"}</span>
                          </div>
                        </div>
                        <div className="care-card-body">
                          <div className="care-content">
                            <div className="title-text">
                              {ele.title ?? "NA"}
                            </div>
                            <div className="tags-list">
                              <div className="tags-item">
                                {ele.category ?? "NA"}
                              </div>
                              <div className="tags-item-sub">
                                {ele.subcategory ?? "NA"}
                              </div>
                            </div>

                            <div className="jobs-point">
                              <div className="jobs-point-item">
                                <img src={ClockIcon} alt="" /> Work Timing:
                                <span>{ele.working_time_value ?? "NA"}</span>
                              </div>
                              <div className="jobs-point-item">
                                <img src={DollarIcon} alt="" /> Salary:
                                <span className="text-capitalize">
                                  {ele.currency ?? "$"}
                                  {ele.pay_range ?? "$0"}/
                                  {ele.pay_range_type ?? "NA"}
                                </span>
                              </div>
                              <div className="jobs-point-item">
                                <img src={SuitcaseIcon} alt="" /> Work Exp:
                                <span>
                                  {ele.working_expirence ?? 0} Years Experience{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="care-card-foot">
                          {ele.applied_status ? (
                            <div class="care-action">
                              <a class="btn-gra" href="#">
                                Applied
                              </a>
                              <Link
                                className="btn-bl"
                                to={`${routes.careNetworkDetails}/${encode(
                                  ele.id
                                )}`}
                              >
                                View Job Detail
                              </Link>
                            </div>
                          ) : (
                            <div className="care-action">
                              <Link
                                className="btn-gr"
                                onClick={() =>
                                  setApply({ status: true, id: ele.id })
                                }
                              >
                                Apply
                              </Link>
                              <Link
                                className="btn-bl"
                                to={`${routes.careNetworkDetails}/${encode(
                                  ele.id
                                )}`}
                              >
                                View Job Detail
                              </Link>
                            </div>
                          )}
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
                    <div className="form-group">
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
                      <input
                        type="file"
                        className="form-control"
                        name="file"
                        accept="application/pdf"
                        onChange={handleResumeChange}
                      />
                      {imgError && (
                        <div className="alert alert-danger">
                          Resume is required!
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
                )}
              </Formik>
            </div>
          </ModalBody>
        </div>
      </Modal>

      <Modal
        show={filter}
        onHide={() => {
          setFilter(false);
        }}
        className="modal-xl"
      >
        <div className="modal-content">
          <ModalHeader className="text-center">
            <h5 className="mb-0">Filter</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialValuesFilter}
                onSubmit={applyFilter}
              >
                <Form id="filter-form">
                  <div className="findcare-content">
                    <div className="step-content tab-content">
                      <div className="tab-pane fade active show" id="tab1">
                        <div className="findcare-form">
                          <div className="findcare-card">
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
                                        className="form-control todo-list-input"
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
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="form-group text-end">
                                  <button
                                    type="button"
                                    className="btn-re mx-2"
                                    onClick={() => {
                                      {
                                        setLocation({
                                          lat: null,
                                          lng: null,
                                          address: null,
                                        });
                                        setFilter(false);
                                        document
                                          .getElementById("filter-form")
                                          .reset();
                                        setSelectCategory("");
                                        setSelectSubCategory("");
                                        setSubCategory([]);
                                        setSelectRadius("");
                                        getCurrentAddress();
                                      }
                                    }}
                                  >
                                    Clear All
                                  </button>
                                  <button type="submit" className="btn-gr">
                                    Apply Filter
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Page;
