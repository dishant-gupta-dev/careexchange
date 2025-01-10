import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../../utlis/admin/api.utlis";
import ApiService from "../../../core/services/ApiService";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import Loader from "../../../layouts/loader/Loader";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { totalPageCalculator, LIMIT } from "../../../utlis/common.utlis";
import toast from "react-hot-toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Page = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [news, setNews] = useState([]);
  const [sendEmail, setSendEmail] = useState(false);
  const [sendText, setText] = useState(false);
  const [sendNewEmail, setSendNewEmail] = useState(false);
  const [sendNewText, setNewText] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [total, setTotal] = useState(0);
  const [fullContent, setFullContent] = useState("");
  const [formError, setFormError] = useState(false);
  const [fullContent1, setFullContent1] = useState("");
  const [formError1, setFormError1] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleItemChange = (id) => {
    const updatedItems = news.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setNews(updatedItems);
    const allSelected = updatedItems.every((item) => item.checked);
    setSelectAll(allSelected);
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedItems = news.map((item) => ({
      ...item,
      checked: newSelectAll,
    }));
    setNews(updatedItems);
  };

  const initialValues = {
    subject: "",
    bodyText: "",
  };

  const initialNewValues = {
    email: "",
    subject: "",
    bodyText: "",
  };

  const initialPhoneValues = {
    phone: "",
    subject: "",
    bodyText: "",
  };

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required("Subject is required!"),
    bodyText: Yup.string().min(5).required("Message is required!"),
  });

  const validationNewSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required!"),
    subject: Yup.string().required("Subject is required!"),
    bodyText: Yup.string().min(5).required("Message is required!"),
  });

  const validationPhoneSchema = Yup.object().shape({
    phone: Yup.string().required("Phone is required!"),
    subject: Yup.string().required("Subject is required!"),
    bodyText: Yup.string().min(5).required("Message is required!"),
  });

  const sendMailUser = async (formValue) => {
    if (fullContent.length === 0) {
      setFormError(true);
      return;
    } else setFormError(false);
    setLoading(true);
    const form = new FormData();
    news.forEach((ele) => {
      if (ele.checked) form.append("subscriberIds[]", ele.id);
    });
    form.append("subject", formValue.subject);
    form.append("bodyText", fullContent);
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.sendMail,
      form
    );
    setSendEmail(false);
    const items = news.map((item) => ({
      ...item,
      checked: false,
    }));
    setNews(items);
    setSelectAll(false);
    if (response.data.status) {
      toast.success(response.data.message);
      getNewsletterList(api.newsletterList + `?page=${pageNum}&limit=${LIMIT}`);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const sendNewMailUser = async (formValue) => {
    if (fullContent1.length === 0) {
      setFormError1(true);
      return;
    } else setFormError1(false);
    setLoading(true);
    const form = new FormData();
    form.append("email", formValue.email);
    form.append("subject", formValue.subject);
    form.append("bodyText", fullContent1);
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.sendNewEmail,
      form
    );
    setSendNewEmail(false);
    if (response.data.status) {
      toast.success(response.data.message);
      getNewsletterList(api.newsletterList + `?page=${pageNum}&limit=${LIMIT}`);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const sendTextMessage = async (formValue) => {
    setLoading(true);
    const form = new FormData();
    news.forEach((ele) => {
      if (ele.checked) form.append("subscriberIds[]", ele.id);
    });
    form.append("subject", formValue.subject);
    form.append("bodyText", formValue.bodyText);
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.sendText,
      form
    );
    setText(false);
    const items = news.map((item) => ({
      ...item,
      checked: false,
    }));
    setNews(items);
    setSelectAll(false);
    if (response.data.status) {
      toast.success(response.data.message);
      getNewsletterList(api.newsletterList + `?page=${pageNum}&limit=${LIMIT}`);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const sendNewTextMessage = async (formValue) => {
    setLoading(true);
    const form = new FormData();
    form.append("phone", formValue.phone);
    form.append("subject", formValue.subject);
    form.append("bodyText", formValue.bodyText);
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.sendNewText,
      form
    );
    setNewText(false);
    if (response.data.status) {
      toast.success(response.data.message);
      getNewsletterList(api.newsletterList + `?page=${pageNum}&limit=${LIMIT}`);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const getNewsletterList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all newsletter list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      const newsData = [];
      for (const key in response.data.data.subscribers) {
        response.data.data.subscribers[key].checked = false;
        const itemData = response.data.data.subscribers[key];
        newsData.push(itemData);
      }
      setNews(newsData);
      setTotal(response.data.data.total);
    } else setNews([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    let status = "";
    if (e.target.name === "name") name = e.target.value;
    if (e.target.name === "status") status = e.target.value;
    if (date !== null && date != undefined && date !== "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getNewsletterList(
      api.newsletterList +
        `?page=${pageNum}&limit=${LIMIT}&search=${name}&date=${date}&status=${status}`
    );
  };

  const handleChangeStatus = async (e, id, status_number) => {
    setLoading(true);
    let data = JSON.stringify({
      status: status_number === "2" ? 1 : 2,
    });
    const response = await ApiService.putAPIWithAccessToken(
      api.newsletterChangeStatus + `${id}`,
      data
    );
    if (response.data.status && response.data.statusCode === 200) {
      toast.success(response.data.message);
      getNewsletterList(api.newsletterList + `?page=${pageNum}&limit=${LIMIT}`);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    getNewsletterList(api.newsletterList + `?page=${pageNum}&limit=${LIMIT}`);
    setSelectAll(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="care-title-header">
          <h3 className="heading-title">Manage Newsletter</h3>
          <div className="cc-search-filter">
            <div className="row g-2">
              <div className="col-md-4">
                <div className="form-group search-form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => handleFilter(e)}
                  />
                  <span className="search-icon">
                    <i className="cc-input-group-text  mdi mdi-magnify"></i>
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <select
                    className="form-control"
                    name="status"
                    onChange={(e) => handleFilter(e)}
                  >
                    <option value="">Select Status</option>
                    <option value="0">Pending Newsletter</option>
                    <option value="1">Active Newsletter</option>
                    <option value="2">Inactive Newsletter</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <DatePicker
                    toggleCalendarOnIconClick
                    showIcon
                    dateFormat={"MM-dd-yyyy"}
                    selected={startDate}
                    onChange={(date, e) => {
                      setStartDate(date);
                      handleFilter(e, date);
                    }}
                    className="DatePicker-control"
                    style={{ padding: "15px 40px" }}
                    isClearable
                    name="date"
                    autoComplete="off"
                    placeholderText="Select Date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cc-table-card">
          <div className="care-title-header">
            <h3 className="heading-title">Subscribed By {total ?? 0} Users</h3>
            <div className="cc-search-filter wd80">
              <div className="row g-2">
                <div className="col-md-3">
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn-gr wd100"
                      onClick={() => {
                        setSendEmail(true);
                      }}
                    >
                      Send Email
                    </button>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn-bl wd100"
                      onClick={() => {
                        setText(true);
                      }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn-dbl wd100"
                      onClick={() => {
                        setSendNewEmail(true);
                      }}
                    >
                      Create New Email
                    </button>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn-gra wd100"
                      onClick={() => {
                        setNewText(true);
                      }}
                    >
                      Create Text Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <input
                      className="me-2"
                      type="checkbox"
                      name="imgsel"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    Select All
                  </th>
                  <th>Name</th>
                  <th>Email ID</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Posted On</th>
                </tr>
              </thead>
              <tbody>
                {news.length !== 0 ? (
                  news.map((ele, indx) => {
                    return (
                      <tr key={indx}>
                        <td scope="row">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={ele.checked}
                            onChange={() => handleItemChange(ele.id)}
                          />
                        </td>
                        <td> {ele.name ?? "NA"} </td>
                        <td> {ele.email_address ?? "NA"} </td>
                        <td> {ele.phone ?? "NA"} </td>
                        <td>
                          {" "}
                          {ele.status !== "3" ? (
                            <div className="switch-toggle">
                              <div className="">
                                <label
                                  className="toggle"
                                  onChange={(e) =>
                                    handleChangeStatus(e, ele.id, ele.status)
                                  }
                                  htmlFor={`myToggle_${indx}`}
                                >
                                  <input
                                    className="toggle__input"
                                    name={`active_${indx}`}
                                    type="checkbox"
                                    id={`myToggle_${indx}`}
                                    defaultChecked={
                                      ele.status === "1" ? "checked" : null
                                    }
                                    defaultValue={2}
                                  />
                                  <div className="toggle__fill"></div>
                                </label>
                              </div>
                            </div>
                          ) : null}{" "}
                        </td>
                        <td>
                          {" "}
                          {moment(ele.created_date).format("MM-DD-yyyy")}{" "}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-center">
                    <td colSpan="6">
                      <div>
                        <p>No newsletter found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="d-flex align-items-center justify-content-center mt-3">
              {news.length !== 0 ? (
                <div className="care-table-pagination">
                  <ul className="care-pagination">
                    {pageNum !== 1 && (
                      <li
                        className="disabled"
                        id="example_previous"
                        onClick={() => setPageNum(pageNum - 1)}
                      >
                        <Link
                          to=""
                          aria-controls="example"
                          data-dt-idx="0"
                          tabIndex="0"
                          className="page-link"
                        >
                          Previous
                        </Link>
                      </li>
                    )}

                    {totalPageCalculator(total, LIMIT).length === 1
                      ? null
                      : totalPageCalculator(total, LIMIT).map(
                          (pageNo, indx) => {
                            return (
                              <li
                                className={pageNo === pageNum ? "active" : ""}
                                key={indx}
                                onClick={() => setPageNum(pageNo)}
                              >
                                <Link to="" className="page-link">
                                  {pageNo}
                                </Link>
                              </li>
                            );
                          }
                        )}

                    {pageNum !== Math.ceil(total / LIMIT) && (
                      <li
                        className="next"
                        id="example_next"
                        onClick={() => setPageNum(pageNum + 1)}
                      >
                        <Link
                          to=""
                          aria-controls="example"
                          data-dt-idx="7"
                          tabIndex="0"
                          className="page-link"
                        >
                          Next
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={sendEmail}
        onHide={() => {
          setSendEmail(false);
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Compose Email</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={sendMailUser}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="" className="font-bold">
                      To: &nbsp;
                    </label>
                    <span>
                      {news.length !== 0
                        ? news.map((ele, indx) => {
                            return ele.checked ? (
                              <span key={indx}>{ele.email_address}, </span>
                            ) : null;
                          })
                        : "None"}
                    </span>
                  </div>
                  <div className="form-group">
                    <Field
                      type="text"
                      className="form-control todo-list-input"
                      name="subject"
                      placeholder="Subject"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <CKEditor
                      editor={ClassicEditor}
                      data=""
                      onReady={(editor) => {}}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFullContent(data);
                      }}
                      onBlur={(event, editor) => {
                        fullContent.length === 0
                          ? setFormError(true)
                          : setFormError(false);
                      }}
                      onFocus={(event, editor) => {}}
                    />
                    {formError && (
                      <div className="alert alert-danger">
                        Message is required
                      </div>
                    )}
                  </div>
                  <div className="form-group text-end mb-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSendEmail(false);
                      }}
                      className="btn-re  me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-gr"
                      data-bs-dismiss="modal"
                    >
                      Send
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </ModalBody>
        </div>
      </Modal>

      <Modal
        show={sendNewEmail}
        onHide={() => {
          setSendNewEmail(false);
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Compose Email</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialNewValues}
                validateOnChange={true}
                validationSchema={validationNewSchema}
                onSubmit={sendNewMailUser}
              >
                <Form>
                  <div className="form-group">
                    <Field
                      type="text"
                      className="form-control todo-list-input"
                      name="email"
                      placeholder="To"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="text"
                      className="form-control todo-list-input"
                      name="subject"
                      placeholder="Subject"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <CKEditor
                      editor={ClassicEditor}
                      data=""
                      onReady={(editor) => {}}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFullContent1(data);
                      }}
                      onBlur={(event, editor) => {
                        fullContent1.length === 0
                          ? setFormError1(true)
                          : setFormError1(false);
                      }}
                      onFocus={(event, editor) => {}}
                    />
                    {formError1 && (
                      <div className="alert alert-danger">
                        Message is required
                      </div>
                    )}
                  </div>
                  <div className="form-group text-end mb-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSendNewEmail(false);
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
                      Send
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </ModalBody>
        </div>
      </Modal>

      <Modal
        show={sendText}
        onHide={() => {
          setText(false);
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Send Text Message</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={sendTextMessage}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="" className="font-bold">
                      To: &nbsp;
                    </label>
                    <span>
                      {news.length !== 0
                        ? news.map((ele, indx) => {
                            return ele.checked ? (
                              <span key={indx}>{ele.phone}, </span>
                            ) : null;
                          })
                        : "None"}
                    </span>
                  </div>
                  <div className="form-group">
                    <Field
                      type="text"
                      className="form-control todo-list-input"
                      name="subject"
                      placeholder="Enter Title"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      as="textarea"
                      type="text"
                      className="form-control todo-list-input"
                      name="bodyText"
                      placeholder="Enter Message"
                    />
                    <ErrorMessage
                      name="bodyText"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group text-end mb-0">
                    <button
                      type="button"
                      onClick={() => {
                        setText(false);
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
                      Send Message
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </ModalBody>
        </div>
      </Modal>

      <Modal
        show={sendNewText}
        onHide={() => {
          setNewText(false);
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Send New Text Message</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialPhoneValues}
                validateOnChange={true}
                validationSchema={validationPhoneSchema}
                onSubmit={sendNewTextMessage}
              >
                <Form>
                  <div className="form-group">
                    <Field
                      type="text"
                      className="form-control todo-list-input"
                      name="phone"
                      placeholder="Enter Phone"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="text"
                      className="form-control todo-list-input"
                      name="subject"
                      placeholder="Enter Title"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      as="textarea"
                      type="text"
                      className="form-control todo-list-input"
                      name="bodyText"
                      placeholder="Enter Message"
                    />
                    <ErrorMessage
                      name="bodyText"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group text-end mb-0">
                    <button
                      type="button"
                      onClick={() => {
                        setNewText(false);
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
                      Send Message
                    </button>
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
