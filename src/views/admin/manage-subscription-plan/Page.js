import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../../utlis/admin/api.utlis";
import ApiService from "../../../core/services/ApiService";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import Loader from "../../../layouts/loader/Loader";
import { htmlToText } from "html-to-text";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Page = () => {
  const [plans, setPlan] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  const [type, setType] = useState("provider");
  const [fullContent, setFullContent] = useState("");
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addPlan, setAddPlan] = useState({ status: false });
  const [deletePlan, setDeletePlan] = useState({ status: false, id: null });
  const [editPlan, setEditPlan] = useState({
    status: false,
    id: null,
    name: null,
    description: "",
    cost: null,
    cost_period: null,
  });

  const initialValues = {
    name: "",
    description: "",
    cost: "",
    cost_period: "",
  };

  const initialEditValues = {
    name: editPlan.name ?? "",
    description: editPlan.description ?? "",
    cost: editPlan.cost ?? "",
    cost_period: editPlan.cost_period ?? "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    cost: Yup.number().required("Cost is required!"),
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
      cost: formValue.cost,
      cost_period: formValue.cost_period,
    });
    const response = await ApiService.postAPIWithAccessToken(api.addPlan, form);
    setAddPlan({ status: false });
    if (response.data.status) {
      toast.success(response.data.message);
      getPlanList(api.planList);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const updatePlan = async (formValue) => {
    if (fullContent.length === 0) {
      setFormError(true);
      return;
    } else setFormError(false);
    setLoading(true);
    const form = JSON.stringify({
      name: formValue.name,
      description: fullContent,
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
      description: "",
      cost: null,
      cost_period: null,
    });
    if (response.data.status) {
      toast.success(response.data.message);
      getPlanList(api.planList);
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
      getPlanList(api.planList);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    getPlanList(api.planList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="heading-title">Subscription Plan</h3>
          {/* <div className="d-flex">
            <button
              style={{ marginLeft: "20px" }}
              type="button"
              className="btn-gr"
              onClick={() => setAddPlan({ status: true })}
            >
              Add New Plan
            </button>
          </div>  */}
        </div>
        <div className="subscription-content">
          {/* <div className="row d-flex justify-content-between align-items-center">
            <div className="col-md-6 align-items-center d-flex">
              <div className="tabs-section">
                <ul className="nav">
                  <li className="nav-item">
                    <Link
                      className={
                        type == "provider" ? "nav-link active" : "nav-link"
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
                        type == "client" ? "nav-link active" : "nav-link"
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
          </div> */}
          <div className="row">
            {plans.length !== 0 ? (
              plans.map((ele, indx) => {
                return (
                  <div key={indx} className="col-lg-4 mt-5">
                    <div className="cc-subscription-card">
                      <div className="cc-subscription-info">
                        <div className="cc-planname-text">
                          {ele.name ?? "NA"}
                        </div>
                      </div>
                      <div className="cc-subscription-price-info">
                        <div className="cc-plan-price-text">
                          ${ele.cost ?? "NA"}
                        </div>
                        <div className="cc-plan-persave-content">
                          {/* <div className="cc-plan-per-text">Per Month</div> */}
                          {/* <div className="cc-plan-save-text">
                            {" "}
                            {ele.name ?? "NA"}
                          </div> */}
                        </div>
                      </div>
                      <div className="cc-subscription-point-info">
                        <div className="cc-plan-point-list">
                          {renderHTML(ele.description)}
                        </div>
                        <div className="cc-plan-action">
                          <button
                            type="button"
                            className="btn-bl"
                            onClick={() => {
                              setEditPlan({
                                status: true,
                                id: ele.id,
                                name: ele.name,
                                description: ele.description,
                                cost: ele.cost,
                                cost_period: ele.cost_period,
                              });
                              setFullContent(ele.description);
                            }}
                          >
                            Edit Plan
                          </button>
                          <button
                            type="button"
                            className="btn-re"
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
        show={addPlan.status}
        onHide={() => {
          setAddPlan({ status: false });
        }}
        className="cc-modal-form"
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
                  <div className="form-group text-end mb-0">
                    <button
                      type="button"
                      onClick={() => setAddPlan({ status: false })}
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
        show={editPlan.status}
        onHide={() => {
          setEditPlan({
            status: false,
            id: null,
            name: null,
            description: "",
            cost: null,
            cost_period: null,
          });
        }}
        className="cc-modal-form"
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
                    <CKEditor
                      editor={ClassicEditor}
                      data={editPlan.description}
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
                        Description is required
                      </div>
                    )}
                  </div>
                  <div className="form-group text-end mb-0">
                    <button
                      type="button"
                      onClick={() =>
                        setEditPlan({
                          status: false,
                          id: null,
                          name: null,
                          description: "",
                          type: null,
                          cost: null,
                          cost_period: null,
                        })
                      }
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
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalBody className="">
            <div className="add-items d-flex row">
              <h5 className="text-center">Are you sure</h5>
              <p className="text-center">You want to delete this plan?</p>
              <div className="form-group text-center mb-0">
                <button
                  type="button"
                  onClick={() =>
                    setDeletePlan({
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
                  className="btn-gr"
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
