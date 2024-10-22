import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../../utlis/admin/api.utlis";
import ApiService from "../../../core/services/ApiService";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import Loader from "../../../layouts/loader/Loader";
import { convert } from "html-to-text";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { Link } from "react-router-dom";

const Page = () => {
  const [plans, setPlan] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [type, setType] = useState("provider");
  const [loading, setLoading] = useState(false);
  const [addPlan, setAddPlan] = useState({ status: false });
  const [deletePlan, setDeletePlan] = useState({ status: false, id: null });
  const [editPlan, setEditPlan] = useState({
    status: false,
    id: null,
    name: null,
    description: null,
    type: null,
    cost: null,
    cost_period: null,
  });

  const initialValues = {
    name: "",
    description: "",
    type: "",
    cost: "",
    cost_period: "",
  };

  const initialEditValues = {
    name: editPlan.name ?? "",
    description: editPlan.description ?? "",
    type: editPlan.type ?? "",
    cost: editPlan.cost ?? "",
    cost_period: editPlan.cost_period ?? "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    description: Yup.string()
      .required("Description is required!")
      .min(8, "Description must be 8 characters long."),
    cost: Yup.number().required("Cost is required!"),
    type: Yup.string().required("Type is required!"),
  });

  const getPlanList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all plans list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setPlan(response.data.data.plans);
      setTotal(response.data.totalPages);
    } else setPlan([]);
    setLoading(false);
  };

  const addNewPlan = async (formValue) => {
    setLoading(true);
    const form = JSON.stringify({
      name: formValue.name,
      description: formValue.description,
      type: formValue.type,
      cost: formValue.cost,
      cost_period: formValue.cost_period,
    });
    const response = await ApiService.postAPIWithAccessToken(api.addPlan, form);
    setAddPlan({ status: false });
    if (response.data.status) {
      toast.success(response.data.message);
      getPlanList(api.planList + `?type=${type}`);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const updatePlan = async (formValue) => {
    setLoading(true);
    const form = JSON.stringify({
      name: formValue.name,
      description: formValue.description,
      type: formValue.type,
      cost: formValue.cost,
      cost_period: formValue.cost_period,
    });
    const response = await ApiService.putAPIWithAccessToken(
      api.updatePlan + editPlan.id,
      form
    );
    setEditPlan({
      status: false,
      id: null,
      name: null,
      description: null,
      type: null,
      cost: null,
      cost_period: null,
    });
    if (response.data.status) {
      toast.success(response.data.message);
      getPlanList(api.planList + `?type=${type}`);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const deletePlaneFunc = async (id) => {
    setLoading(true);
    const response = await ApiService.deleteAPIWithAccessToken(
      api.deletePlan + `${id}`
    );
    setDeletePlan({
      status: false,
      id: null,
    });
    if (response.data.status) {
      toast.success(response.data.message);
      getPlanList(api.planList + `?type=${type}`);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPlanList(api.planList + `?type=${type}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Manage Subscription Plan</h3>
          <div className="d-flex">
            <button
              style={{ marginLeft: "20px" }}
              type="button"
              className="btn btn-gradient-primary"
              onClick={() => setAddPlan({ status: true })}
            >
              Add New Plan
            </button>
          </div>
        </div>
        <div className="">
          <div className="row mt-3">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-6 align-items-center d-flex">
                      <div className="tabs-section">
                        <ul className="nav">
                          <li className="nav-item">
                            <Link
                              className={
                                type == "provider"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              to=""
                              onClick={() => setType("provider")}
                            >
                              Care-Provider
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className={
                                type == "staff" ? "nav-link active" : "nav-link"
                              }
                              to=""
                              onClick={() => setType("staff")}
                            >
                              Care-Staff
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className={
                                type == "client"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              to=""
                              onClick={() => setType("client")}
                            >
                              Client
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {plans.length !== 0 ? (
                      plans.map((ele, indx) => {
                        return (
                          <div key={indx} className="col-lg-4 mt-5">
                            <div className="pt-5 pb-4 px-4 h-100 d-flex flex-column bg-body-tertiary shadow rounded-4 position-relative">
                              <span className="badge position-absolute translate-middle text-bg-success px-3 py-2">
                                {ele.name ?? "NA"}
                              </span>
                              <h3>{ele.name ?? "NA"}</h3>
                              <div
                                className="my-2"
                                style={{ color: "#4db1eb" }}
                              >
                                <span className="fs-2 fw-bold">$</span>
                                <span className="fs-2 text-dak fw-bolder essential">
                                  {ele.cost ?? "NA"}
                                </span>
                                <span className="fs-3 ">/mo</span>
                              </div>

                              <h4 className="my-4">Plan Benefit :</h4>
                              <div className="my-1 ">
                                <span>{convert(ele.description)}</span>
                              </div>

                              <div className="mt-auto">
                                <button
                                  type="button"
                                  style={{ padding: "14px 40px" }}
                                  className="mt-4 btn btn-gradient-success mx-1"
                                  onClick={() =>
                                    setEditPlan({
                                      status: true,
                                      id: ele.id,
                                      name: ele.name,
                                      description: ele.description,
                                      type: ele.type,
                                      cost: ele.cost,
                                      cost_period: ele.cost_period,
                                    })
                                  }
                                >
                                  Edit Plan
                                </button>
                                <button
                                  type="button"
                                  style={{ padding: "14px 37px" }}
                                  className="mt-4 btn btn-gradient-danger mx-1"
                                  onClick={() =>
                                    setDeletePlan({
                                      status: true,
                                      id: ele.id,
                                    })
                                  }
                                >
                                  Delete Plan
                                </button>
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
          </div>
        </div>
      </div>

      <Modal
        show={addPlan.status}
        onHide={() => {
          setAddPlan({ status: false });
        }}
        className=""
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Add New Plan</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={addNewPlan}
              >
                <Form>
                  <div className="form-group">
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
                  <div className="form-group">
                    <Field
                      type="number"
                      className="form-control todo-list-input"
                      name="cost"
                      placeholder="Enter Cost"
                    />
                    <ErrorMessage
                      name="cost"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="text"
                      className="form-control todo-list-input"
                      name="cost_period"
                      placeholder="Enter Cost Period"
                    />
                    <ErrorMessage
                      name="cost_period"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      as="select"
                      type="text"
                      className="form-control todo-list-input"
                      name="type"
                    >
                      <option value="">Select Type</option>
                      <option value="provider">Care Provider</option>
                      <option value="staff">Care Staff</option>
                      <option value="client">Client</option>
                    </Field>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="alert alert-danger"
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
                      onClick={() => setAddPlan({ status: false })}
                      className="btn btn-gradient-danger me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-gradient-primary me-2"
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
        show={editPlan.status}
        onHide={() => {
          setEditPlan({
            status: false,
            id: null,
            name: null,
            description: null,
            type: null,
            cost: null,
            cost_period: null,
          });
        }}
        className=""
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Edit Plan</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialEditValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={updatePlan}
              >
                <Form>
                  <div className="form-group">
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
                  <div className="form-group">
                    <Field
                      type="number"
                      className="form-control todo-list-input"
                      name="cost"
                      placeholder="Enter Cost"
                    />
                    <ErrorMessage
                      name="cost"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="text"
                      className="form-control todo-list-input"
                      name="cost_period"
                      placeholder="Enter Cost Period"
                    />
                    <ErrorMessage
                      name="cost_period"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      as="select"
                      type="text"
                      className="form-control todo-list-input"
                      name="type"
                    >
                      <option value="">Select Type</option>
                      <option value="provider">Care Provider</option>
                      <option value="staff">Care Staff</option>
                      <option value="client">Client</option>
                    </Field>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="alert alert-danger"
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
                      onClick={() =>
                        setEditPlan({
                          status: false,
                          id: null,
                          name: null,
                          description: null,
                          type: null,
                          cost: null,
                          cost_period: null,
                        })
                      }
                      className="btn btn-gradient-danger me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-gradient-primary me-2"
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
        show={deletePlan.status}
        onHide={() => {
          setDeletePlan({
            status: false,
            id: null,
          });
        }}
        className=""
      >
        <div className="modal-content">
          <ModalBody className="">
            <div className="add-items d-flex row">
              <h5 className="text-center">Are you sure</h5>
              <p className="text-center">You want to delete this plan?</p>
              <div className="form-group text-center">
                <button
                  type="button"
                  onClick={() =>
                    setDeletePlan({
                      status: false,
                      id: null,
                    })
                  }
                  className="btn btn-gradient-danger me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gradient-primary me-2"
                  data-bs-dismiss="modal"
                  onClick={() => deletePlaneFunc(deletePlan.id)}
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
