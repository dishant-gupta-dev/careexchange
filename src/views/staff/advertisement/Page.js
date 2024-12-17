import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { encode } from "base-64";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import {
  status,
  totalPageCalculator,
  adsLIMIT,
} from "../../../utlis/common.utlis";
import moment from "moment";
import { routes } from "../../../utlis/staff/routes.utlis";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { api } from "../../../utlis/staff/api.utlis";
import ApiService from "../../../core/services/ApiService";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import Loader from "../../../layouts/loader/Loader";
import Searchicon from "../../../assets/provider/images/search1.svg";

const Page = () => {
  const [advertisement, setAdvertisement] = useState([]);
  const [categories, setCategory] = useState([]);
  const [subCategories, setSubCategory] = useState([]);
  const [tags, setTag] = useState([]);
  const [editTags, setEditTag] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedEditTag, setSelectedEditTag] = useState([]);
  const [selectedDelTag, setSelectedDelTag] = useState([]);
  const [imgError, setImgError] = useState(false);
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);
  const [tagError, setTagError] = useState(false);
  const [startEditError, setStartEditError] = useState(false);
  const [endEditError, setEndEditError] = useState(false);
  const [tagEditError, setTagEditError] = useState(false);
  const [file, setFile] = useState();
  const [editFile, setEditFile] = useState();
  const [addAd, setAddAd] = useState({ status: false });
  const [deleteAd, setDeleteAd] = useState({ status: false, id: null });
  const [editAd, setEditAd] = useState({
    status: false,
    id: null,
    title: null,
    description: null,
    service_type_id: null,
    category_id: null,
    offer_perc: null,
    start_date: null,
    end_date: null,
    image: null,
    tags: [],
  });
  const options = [];
  const editOptions = [];

  const initialValues = {
    title: "",
    description: "",
    service_type_id: "",
    offer_perc: "",
    start_date: "",
    end_date: "",
    image: "",
    tags: "",
  };

  const initialEditValues = {
    title: editAd.title,
    description: editAd.description,
    service_type_id: editAd.service_type_id,
    offer_perc: editAd.offer_perc,
    start_date: "",
    end_date: "",
    image: "",
    tags: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    description: Yup.string()
      .required("Description is required!")
      .min(8, "Description must be 8 characters long."),
    service_type_id: Yup.number().required("Select category is required!"),
    offer_perc: Yup.number().required("Offer percentage is required!").max(100),
  });

  const getAdvertisementList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all advertisement list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setAdvertisement(response.data.data.advertisementList);
      setTotal(response.data.data.total);
    } else setAdvertisement([]);
    setLoading(false);
  };

  const getCategoryList = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setCategory(response.data.data.categories);
    } else setCategory([]);
  };

  const getSubCategoryList = async (id) => {
    const response = await ApiService.getAPIWithAccessToken(
      api.categoryList + `?categoryid=${id}`
    );
    if (response?.data?.status && response?.data?.statusCode === 200) {
      setSubCategory(response?.data?.data?.categories);
    } else setSubCategory([]);
  };

  const getTagsList = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      response.data.data.tags.forEach((element) => {
        options.push({ value: element.id, label: element.name });
      });
      setTag(options);
    } else options = [];
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    if (date !== null && date != undefined && date !== "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getAdvertisementList(
      api.postedAdvertisement + `?search=${name}&date=${date}`
    );
  };

  const updateAds = async (formValue) => {
    if (
      editAd.start_date === "" ||
      editAd.start_date === null ||
      !editAd.start_date
    ) {
      setStartEditError(true);
      return;
    } else setStartEditError(false);
    if (
      editAd.end_date === "" ||
      editAd.end_date === null ||
      !editAd.end_date
    ) {
      setEndEditError(true);
      return;
    } else setEndEditError(false);
    setLoading(true);
    let form = new FormData();
    form.append("title", formValue.title);
    form.append("description", formValue.description);
    form.append("service_type_id", formValue.service_type_id);
    form.append("offer_perc", formValue.offer_perc);
    form.append("image", editFile);
    form.append("start_date", moment(editAd.start_date).format("yyyy-MM-DD"));
    form.append("end_date", moment(editAd.end_date).format("yyyy-MM-DD"));
    selectedEditTag.forEach((ele) => {
      form.append("tags[]", ele.value);
    });
    selectedDelTag.forEach((ele) => {
      form.append("deletetageid[]", ele.value);
    });
    const response = await ApiService.putAPIWithAccessTokenMultiPart(
      api.updateAdvertisement + editAd.id,
      form
    );
    setEditAd({
      status: false,
      id: null,
      title: null,
      description: null,
      service_type_id: null,
      category_id: null,
      offer_perc: null,
      start_date: null,
      end_date: null,
      image: null,
      tags: [],
    });
    setEditFile("");
    setSelectedEditTag([]);
    setSelectedDelTag([]);
    setSubCategory([]);
    if (response.data.status) {
      toast.success(response.data.message);
      getAdvertisementList(api.postedAdvertisement);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const addAds = async (formValue) => {
    if (selectedTag.length === 0) {
      setTagError(true);
      return;
    } else setTagError(false);
    if (startDate === "" || startDate === null || !startDate) {
      setStartError(true);
      return;
    } else setStartError(false);
    if (endDate === "" || endDate === null || !endDate) {
      setEndError(true);
      return;
    } else setEndError(false);
    if (file === "" || file === null || !file) {
      setImgError(true);
      return;
    } else setImgError(false);
    setLoading(true);
    let form = new FormData();
    form.append("title", formValue.title);
    form.append("description", formValue.description);
    form.append("service_type_id", formValue.service_type_id);
    form.append("offer_perc", formValue.offer_perc);
    form.append("image", file);
    form.append("start_date", moment(startDate).format("yyyy-MM-DD"));
    form.append("end_date", moment(endDate).format("yyyy-MM-DD"));
    selectedTag.forEach((ele) => {
      form.append("tags[]", ele.value);
    });
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.addAdvertisement,
      form
    );
    setAddAd({ status: false });
    setFile("");
    setStartDate("");
    setEndDate("");
    setSelectedTag([]);
    setSubCategory([]);
    if (response.data.status) {
      toast.success(response.data.message);
      getAdvertisementList(api.postedAdvertisement);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const deleteAdFunc = async (id) => {
    setLoading(true);
    const response = await ApiService.deleteAPIWithAccessToken(
      api.deleteAdvertisement + `${id}`
    );
    setDeleteAd({
      status: false,
      id: null,
    });
    if (response.data.status) {
      toast.success(response.data.message);
      getAdvertisementList(api.postedAdvertisement);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const adsDetails = async (id) => {
    const response = await ApiService.getAPIWithAccessToken(
      api.advertisementDetail + `${id}`
    );
    if (response.data.status) {
      let details = response.data.data;
      getSubCategoryList(details.category_id);
      setEditAd({
        status: true,
        id: details.id,
        title: details.title,
        description: details.description,
        service_type_id: details.service_type_id,
        category_id: details.category_id,
        offer_perc: details.offer_perc,
        start_date: details.start_date,
        end_date: details.end_date,
        image: details.image,
        tags: details.tags,
      });
      details.tags.forEach((element) => {
        editOptions.push({
          value: element.id,
          label: element.name,
        });
      });
      setEditTag(editOptions);
    }
  };

  const handleTag = (arr) => {
    const deleteTags = editTags.filter(
      ({ value: id1 }) => !arr.some(({ value: id2 }) => id2 === id1)
    );
    setSelectedDelTag(deleteTags);
    const tags = arr.filter(
      ({ value: id1 }) => !editTags.some(({ value: id2 }) => id2 === id1)
    );
    setSelectedEditTag(tags);
  };

  const handleImgChange = (e) => {
    if (!e.target.files[0]) {
      setImgError(true);
    } else setImgError(false);
    setFile(e.target.files[0]);
  };

  const handleEditImgChange = (e) => {
    setEditFile(e.target.files[0]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAdvertisementList(api.postedAdvertisement);
    getCategoryList(api.categoryList);
    getTagsList(api.tagsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="advertisement-section">
          <div className="care-title-header">
            <h2 className="heading-title">Advertisement</h2>
            <div className="search-filter wd70">
              <div className="row g-2">
                <div className="col-md-6">
                  <div className="form-group search-form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onChange={(e) => handleFilter(e)}
                      name="name"
                    />
                    <span className="search-icon">
                      {" "}
                      <img src={Searchicon} alt="" />
                    </span>
                  </div>
                </div>
                <div className="col-md-4">
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
                      isClearable
                      autoComplete="off"
                      name="date"
                      placeholderText="Select Date"
                    />
                  </div>
                </div>
                {/* <div className="col-md-2">
                  <div className="form-group mb-0">
                    <Link to={routes.postedAdvertisement} className="btn-gr wd100">Posted Ads</Link>
                  </div>
                </div> */}
                <div className="col-md-2">
                  <div className="form-group mb-0">
                    <Link
                      className="btn-bl wd100"
                      onClick={() => setAddAd({ status: true })}
                    >
                      {" "}
                      Post New Ads
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="advertisement-content-list">
            <div className="row">
              {advertisement.length !== 0 ? (
                advertisement.map((ele, indx) => {
                  return (
                    <div key={indx} className="col-md-12">
                      <div className="advertisement-item-card">
                        <div className="advertisement-item-card-image">
                          {ele.image === null ||
                          ele.image === "" ||
                          ele.image === undefined ? (
                            <img src={NoImage} alt="" />
                          ) : (
                            <img src={ele.image} alt="" />
                          )}
                        </div>
                        <div className="advertisement-item-card-content">
                          <div className="d-flex justify-content-between">
                            <div>
                              <div class="strip-text">{status(ele.status)}</div>
                              <div class="title-text">{ele.title ?? "NA"}</div>
                              <div class="date-text">
                                Posted On{" "}
                                {moment(ele.created_date).format(
                                  "MM-DD-yyyy hh:mm A"
                                )}
                              </div>
                              <div class="advertisement-tags-list">
                                <div class="advertisement-tags-item">
                                  {ele.category ?? "NA"}
                                </div>
                                <div class="advertisement-tags-item-sub">
                                  {ele.subcategory ?? "NA"}
                                </div>
                              </div>
                            </div>
                            <div>
                              <Link
                                className="btn-gr edit-btn"
                                to=""
                                onClick={() => adsDetails(ele.id)}
                              >
                                Edit
                              </Link>
                              <Link
                                className="btn-re delete-btn mx-2"
                                to=""
                                onClick={() =>
                                  setDeleteAd({ status: true, id: ele.id })
                                }
                              >
                                Delete
                              </Link>
                              <Link
                                className="btn-bl"
                                to={
                                  routes.advertisementDetails +
                                  `/${encode(ele.id)}`
                                }
                              >
                                View Detail
                              </Link>
                            </div>
                          </div>

                          <div class="advertisement-desc">
                            <p>{ele.description ?? "NA"}</p>
                          </div>
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

        <Modal
          show={editAd.status}
          onHide={() => {
            setEditAd({
              status: false,
              id: null,
              title: null,
              description: null,
              service_type_id: null,
              category_id: null,
              offer_perc: null,
              start_date: null,
              end_date: null,
              image: null,
              tags: [],
            });
            setStartError(false);
            setEndError(false);
            setTagError(false);
            setSubCategory([]);
          }}
          className="cc-modal-form"
        >
          <div className="modal-content">
            <ModalHeader>
              <h5 className="mb-0">Edit Advertisement</h5>
            </ModalHeader>
            <ModalBody className="">
              <div className="add-items d-flex row">
                <Formik
                  initialValues={initialEditValues}
                  validateOnChange={true}
                  validationSchema={validationSchema}
                  onSubmit={updateAds}
                >
                  <Form>
                    <div className="form-group">
                      <Field
                        type="text"
                        className="form-control todo-list-input"
                        name="title"
                        placeholder="Enter Title"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        type="number"
                        className="form-control todo-list-input"
                        name="offer_perc"
                        placeholder="Enter Offer Percentage"
                      />
                      <ErrorMessage
                        name="offer_perc"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="form-control todo-list-input"
                        name="category"
                        onChange={(e) => getSubCategoryList(e.target.value)}
                        defaultValue={editAd.category_id}
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
                    <div className="form-group">
                      <Field
                        as="select"
                        type="text"
                        className="form-control todo-list-input"
                        name="service_type_id"
                      >
                        <option value="">Select Sub Category</option>
                        {subCategories.length !== 0
                          ? subCategories.map((ele, indx) => {
                              return (
                                <option key={indx} value={ele.id}>
                                  {ele.name}
                                </option>
                              );
                            })
                          : null}
                      </Field>
                      <ErrorMessage
                        name="service_type_id"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <Select
                        name="tags"
                        className="form-control todo-list-input"
                        isMulti={true}
                        defaultValue={editTags}
                        options={tags}
                        onChange={(ans) => {
                          handleTag(ans);
                        }}
                      />
                      {tagEditError && (
                        <div className="alert alert-danger">
                          Tags is required!
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <DatePicker
                        toggleCalendarOnIconClick
                        showIcon
                        dateFormat={"MM-dd-yyyy"}
                        selected={editAd.start_date}
                        className="form-control todo-list-input"
                        onChange={(date) => {
                          setEditAd((prevState) => ({
                            ...prevState,
                            start_date: date,
                          }));
                        }}
                        isClearable
                        name="start_date"
                        autoComplete="off"
                        placeholderText="Select Start Date"
                      />
                      {startEditError && (
                        <div className="alert alert-danger">
                          Start date is required!
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <DatePicker
                        toggleCalendarOnIconClick
                        showIcon
                        dateFormat={"MM-dd-yyyy"}
                        selected={editAd.end_date}
                        className="form-control todo-list-input"
                        onChange={(date) => {
                          setEditAd((prevState) => ({
                            ...prevState,
                            end_date: date,
                          }));
                        }}
                        isClearable
                        name="end_date"
                        autoComplete="off"
                        placeholderText="Select End Date"
                      />
                      {endEditError && (
                        <div className="alert alert-danger">
                          End date is required!
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleEditImgChange}
                        className="form-control todo-list-input"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        as="textarea"
                        className="form-control todo-list-input"
                        name="description"
                        placeholder="Enter Description"
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
                          {
                            setEditAd({
                              status: false,
                              id: null,
                              title: null,
                              description: null,
                              service_type_id: null,
                              category_id: null,
                              offer_perc: null,
                              start_date: null,
                              end_date: null,
                              image: null,
                              tags: [],
                            });
                            setStartError(false);
                            setEndError(false);
                            setTagError(false);
                            setSubCategory([]);
                          }
                        }}
                        className="btn-re me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-gr me-2"
                        data-bs-dismiss="modal"
                      >
                        Update
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </ModalBody>
          </div>
        </Modal>

        <Modal
          show={addAd.status}
          onHide={() => {
            setAddAd({
              status: false,
            });
            setImgError(false);
            setStartError(false);
            setEndError(false);
            setTagError(false);
            setSubCategory([]);
          }}
          className="cc-modal-form"
        >
          <div className="modal-content">
            <ModalHeader>
              <h5 className="mb-0">Add New Advertisement</h5>
            </ModalHeader>
            <ModalBody className="">
              <div className="add-items d-flex row">
                <Formik
                  initialValues={initialValues}
                  validateOnChange={true}
                  validationSchema={validationSchema}
                  onSubmit={addAds}
                >
                  <Form>
                    <div className="form-group">
                      <Field
                        type="text"
                        className="form-control todo-list-input"
                        name="title"
                        placeholder="Enter Title"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        type="number"
                        className="form-control todo-list-input"
                        name="offer_perc"
                        placeholder="Enter Offer Percentage"
                      />
                      <ErrorMessage
                        name="offer_perc"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="form-control todo-list-input"
                        name="category"
                        onChange={(e) => getSubCategoryList(e.target.value)}
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
                    <div className="form-group">
                      <Field
                        as="select"
                        type="text"
                        className="form-control todo-list-input"
                        name="service_type_id"
                      >
                        <option value="">Select Sub Category</option>
                        {subCategories.length !== 0
                          ? subCategories.map((ele, indx) => {
                              return (
                                <option key={indx} value={ele.id}>
                                  {ele.name}
                                </option>
                              );
                            })
                          : null}
                      </Field>
                      <ErrorMessage
                        name="service_type_id"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <Select
                        name="tags"
                        className="form-control todo-list-input"
                        isMulti={true}
                        options={tags}
                        onChange={(ans) => {
                          setSelectedTag(ans);
                        }}
                      />
                      {tagError && (
                        <div className="alert alert-danger">
                          Tags is required!
                        </div>
                      )}
                    </div>
                    <div className="form-group">
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
                    <div className="form-group">
                      <DatePicker
                        toggleCalendarOnIconClick
                        showIcon
                        dateFormat={"MM-dd-yyyy"}
                        selected={endDate}
                        className="form-control todo-list-input"
                        onChange={(date) => {
                          setEndDate(date);
                        }}
                        isClearable
                        name="end_date"
                        autoComplete="off"
                        placeholderText="Select End Date"
                      />
                      {endError && (
                        <div className="alert alert-danger">
                          End date is required!
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="file"
                        name="image"
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
                    <div className="form-group">
                      <Field
                        as="textarea"
                        className="form-control todo-list-input"
                        name="description"
                        placeholder="Enter Description"
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
                          {
                            setAddAd({
                              status: false,
                            });
                            setImgError(false);
                            setStartError(false);
                            setEndError(false);
                            setTagError(false);
                            setSubCategory([]);
                          }
                        }}
                        className="btn-re me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-gr"
                        data-bs-dismiss="modal"
                      >
                        Add
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </ModalBody>
          </div>
        </Modal>

        <Modal
          show={deleteAd.status}
          onHide={() => {
            setDeleteAd({
              status: false,
              id: null,
            });
          }}
          className="cc-modal-form"
        >
          <div className="modal-content">
            <ModalBody className="">
              <div className="add-items d-flex row">
                <h5 className="text-center">Are you sure</h5>
                <p className="text-center">
                  You want to delete this advertisement?
                </p>
                <div className="form-group text-center">
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteAd({
                        status: false,
                        id: null,
                      })
                    }
                    className="btn-re me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-gr me-2"
                    data-bs-dismiss="modal"
                    onClick={() => deleteAdFunc(deleteAd.id)}
                  >
                    Yes! Delete
                  </button>
                </div>
              </div>
            </ModalBody>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Page;
