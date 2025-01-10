import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../../utlis/admin/api.utlis";
import { routes } from "../../../utlis/admin/routes.utlis";
import ApiService from "../../../core/services/ApiService";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import Loader from "../../../layouts/loader/Loader";
import { Modal, ModalBody } from "react-bootstrap";
import { totalPageCalculator, LIMIT } from "../../../utlis/common.utlis";
import { encode } from "base-64";
import toast from "react-hot-toast";

const Page = () => {
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [send, setSend] = useState(false);
  const [categories, setCategory] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleItemChange = (id) => {
    const updatedItems = assessment.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setAssessment(updatedItems);
    const allSelected = updatedItems.every((item) => item.checked);
    setSelectAll(allSelected);
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedItems = assessment.map((item) => ({
      ...item,
      checked: newSelectAll,
    }));
    setAssessment(updatedItems);
  };

  const sendRequest = async () => {
    setLoading(true);
    const request_id = [];
    const user_id = [];
    assessment.forEach((ele) => {
      if (ele.checked) {
        request_id.push(ele.id);
        user_id.push(ele.userid);
      }
    });
    const form = JSON.stringify({
      request_id: request_id,
      user_id: user_id,
    });
    const response = await ApiService.postAPIWithAccessToken(
      api.sendRequestProvider,
      form
    );
    setSend(false);
    if (response.data.status) {
      toast.success(response.data.message);
      getAssessmentList(api.assessmentList + `?page=${pageNum}&limit=${LIMIT}`);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const getAssessmentList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all assessment list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      const assessmentData = [];
      for (const key in response.data.data.homeCareAssessmentList) {
        response.data.data.homeCareAssessmentList[key].checked = false;
        const itemData = response.data.data.homeCareAssessmentList[key];
        assessmentData.push(itemData);
      }
      setAssessment(assessmentData);
      setTotal(response.data.data.total);
    } else setAssessment([]);
    setLoading(false);
  };

  const getCategoryList = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("category list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setCategory(response.data.data.categories);
    } else setCategory([]);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    let status = "";
    let categoryid = "";
    if (e.target.name === "name") name = e.target.value;
    if (e.target.name === "status") status = e.target.value;
    if (e.target.name === "categoryid") categoryid = e.target.value;
    if (date !== null && date != undefined && date !== "")
      date = moment(date).format("yyyy-MM-DD");
    else date = "";
    getAssessmentList(
      api.assessmentList +
        `?page=${pageNum}&limit=${LIMIT}&search=${name}&date=${date}&status=${status}&categoryid=${categoryid}`
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAssessmentList(api.assessmentList + `?page=${pageNum}&limit=${LIMIT}`);
    getCategoryList(api.categoryList);
    setSelectAll(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="care-title-header">
          <h2 className="heading-title">Care Assessment</h2>
          <div className="cc-search-filter wd50">
            <div className="row g-2">
              <div className="col-md-6"></div>
              <div className="col-md-6">
                <div className="form-group">
                  <button
                    type="button"
                    className="btn-gr"
                    onClick={() => setSend(true)}
                  >
                    Send Request to Care Providers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="care-title-header">
          <div className="cc-search-filter wd100">
            <div className="row g-2">
              <div className="col-md-3">
                <div className="form-group search-form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by User Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => handleFilter(e)}
                  />
                  <span className="search-icon">
                    <i className="cc-input-group-text  mdi mdi-magnify"></i>
                  </span>
                </div>
              </div>
              <div className="col-md-3">
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
                    className="form-control"
                    style={{ padding: "15px 40px" }}
                    isClearable
                    name="date"
                    autoComplete="off"
                    placeholderText="Select Date"
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group dropdown-select">
                  <select
                    className="form-control"
                    name="categoryid"
                    onChange={(e) => handleFilter(e)}
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

              <div className="col-md-3">
                <div className="form-group dropdown-select">
                  <select
                    className="form-control"
                    name="status"
                    onChange={(e) => handleFilter(e)}
                  >
                    <option value="">Select Status</option>
                    <option value="1">Active Assessment</option>
                    <option value="2">Inactive Assessment</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cc-table-card">
          <div className="table-responsive">
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
                  <th>Address</th>
                  <th>View Detail</th>
                </tr>
              </thead>
              <tbody>
                {assessment.length !== 0 ? (
                  assessment.map((ele, indx) => {
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
                        <td className="text-capitalize">
                          {" "}
                          {ele.first_name ?? "NA"}{" "}
                        </td>
                        <td className="text-lowercase">
                          {" "}
                          {ele.email_id ?? "NA"}{" "}
                        </td>
                        <td> {ele.phone ?? "NA"} </td>
                        <td> {ele.address ?? "NA"} </td>
                        <td>
                          <Link
                            to=""
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(routes.careAssessmentDetail, {
                                state: {
                                  id: encode(ele.id),
                                },
                              });
                            }}
                          >
                            <label
                              style={{ cursor: "pointer" }}
                              className="badge badge-gradient-success"
                            >
                              <i className="fa fa-eye"></i>
                            </label>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-center">
                    <td colSpan="6">
                      <div>
                        <p>No assessment found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="d-flex align-items-center justify-content-center mt-3">
              {assessment.length !== 0 ? (
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

        {/* <div className="">
          <div className="row mt-3">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="row d-flex align-items-center">
                    <div className="col-lg-3">
                      <div className="">
                        <div className="input-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Search"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => handleFilter(e)}
                          />
                          <div className="input-group-prepend">
                            <i className="input-group-text border-0 mdi mdi-magnify"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 dropdown-select">
                      <select
                        className="form-select"
                        name="categoryid"
                        onChange={(e) => handleFilter(e)}
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
                    <div className="col-lg-3 dropdown-select">
                      <select
                        className="form-select"
                        name="status"
                        onChange={(e) => handleFilter(e)}
                      >
                        <option value="">Select Status</option>
                        <option value="1">Active Assessment</option>
                        <option value="2">Inactive Assessment</option>
                      </select>
                    </div>
                    <div className="col-lg-3">
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
                        name="date"
                        autoComplete="off"
                        placeholderText="Select Date"
                      />
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
                          <th>Address</th>
                          <th>View Detail</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                    <div className="d-flex align-items-center justify-content-center mt-3">
                      {assessment.length !== 0 ? (
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
                                        className={
                                          pageNo === pageNum ? "active" : ""
                                        }
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
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-gradient-primary mt-4"
                      onClick={() => setSend(true)}
                    >
                      Send Request to Care Providers
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-end"></div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <Modal
        show={send}
        onHide={() => {
          setSend(false);
        }}
        className=""
      >
        <div className="modal-content">
          <ModalBody className="">
            <div className="add-items d-flex row">
              <h5 className="text-center">Are you sure</h5>
              <p className="text-center">
                You want to send request to care provider?
              </p>
              <div className="form-group text-center">
                <button
                  type="button"
                  onClick={() => setSend(false)}
                  className="btn-re me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gr me-2"
                  data-bs-dismiss="modal"
                  onClick={() => sendRequest()}
                >
                  Yes! Send
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
