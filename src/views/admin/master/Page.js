import React, { useEffect, useState } from "react";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { api } from "../../../utlis/admin/api.utlis";
import ApiService from "../../../core/services/ApiService";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Loader from "../../../layouts/loader/Loader";
import { SingleFile } from "../../../utlis/common.utlis";

const Page = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [file, setFile] = useState();
  const [imgError, setImgError] = useState({ status: false, msg: null });
  const [file1, setFile1] = useState();
  const [imgError1, setImgError1] = useState({ status: false, msg: null });
  const [file2, setFile2] = useState();
  const [imgError2, setImgError2] = useState({ status: false, msg: null });
  const [deleteSubCat, setDeleteSubCat] = useState({ status: false, id: null });
  const [addSubCat, setAddSubCat] = useState({
    status: false,
    parent_id: null,
  });
  const [addCat, setAddCat] = useState({ status: false });
  const [deleteCat, setDeleteCat] = useState({ status: false, id: null });
  const [editCat, setEditCat] = useState({
    status: false,
    cate: 0, // 0 => non, 1 => category, 2 => sub category
    id: null,
    name: null,
    description: null,
    image: null,
    statusVal: null,
  });

  const initialValues = {
    name: editCat.name ?? "",
    description: editCat.description ?? "",
    image: "",
    status: editCat.statusVal ?? "",
  };

  const initialAddValues = {
    name: "",
    description: "",
    image: "",
    status: "",
  };

  const initialAddSubValues = {
    name: "",
    description: "",
    image: "",
    status: "",
    parent_id: addSubCat.parent_id,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    description: Yup.string()
      .required("Description is required!")
      .min(8, "Description must be 8 characters long."),
    status: Yup.string().required("Status is required!"),
  });

  const updateCategory = async (formValue) => {
    if (imgError1.status) {
      setImgError1({ status: true, msg: imgError1.msg });
      return;
    } else setImgError1({ status: false, msg: null });
    setLoading(true);
    let form = new FormData();
    form.append("name", formValue.name);
    form.append("description", formValue.description);
    form.append("status", formValue.status);
    form.append("image", file1);
    const response = await ApiService.putAPIWithAccessTokenMultiPart(
      api.updateCategory + editCat.id,
      form
    );
    setEditCat({
      status: false,
      cate: 0,
      id: null,
      name: null,
      description: null,
      image: null,
      statusVal: null,
    });
    setFile1("");
    if (response.data.status) {
      toast.success(response.data.message);
      getCategoryList(api.categoryList);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const addCategory = async (formValue) => {
    if (file === "" || file === null || !file) {
      setImgError({ status: true, msg: `File not found.` });
      return;
    } else setImgError({ status: false, msg: null });
    setLoading(true);
    let form = new FormData();
    form.append("name", formValue.name);
    form.append("description", formValue.description);
    form.append("status", formValue.status);
    form.append("image", file);
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.addCategory,
      form
    );
    setAddCat({
      status: false,
    });
    setFile("");
    if (response.data.status) {
      toast.success(response.data.message);
      getCategoryList(api.categoryList);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const addSubCategory = async (formValue) => {
    if (file2 === "" || file2 === null || !file2) {
      setImgError2({ status: true, msg: `File not found.` });
      return;
    } else setImgError2({ status: false, msg: null });
    setLoading(true);
    let form = new FormData();
    form.append("name", formValue.name);
    form.append("description", formValue.description);
    form.append("status", formValue.status);
    form.append("image", file2);
    form.append("parent_id", formValue.parent_id);
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.addCategory,
      form
    );
    setAddSubCat({
      status: false,
      parent_id: null,
    });
    setFile2("");
    if (response.data.status) {
      toast.success(response.data.message);
      getCategoryList(api.categoryList);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const getCategoryList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all category list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      const categoryData = [];
      for (const key in response.data.data.categories) {
        if (Object.hasOwnProperty.call(response.data.data.categories, key)) {
          const res = await ApiService.getAPIWithAccessToken(
            api + `?categoryid=${response.data.data.categories[key].id}`
          );
          if (
            res !== undefined &&
            res.data.status &&
            res.data.statusCode === 200
          ) {
            response.data.data.categories[key].sub_category =
              res.data.data.categories ?? [];
          } else {
            response.data.data.categories[key].sub_category = [];
          }
          const itemData = response.data.data.categories[key];
          categoryData.push(itemData);
        }
      }
      setCategory(categoryData);
      setTotal(response.data.totalPages);
    } else setCategory([]);
    setLoading(false);
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    const response = await ApiService.deleteAPIWithAccessToken(
      api.deleteCategory + `${id}`
    );
    setDeleteCat({
      status: false,
      id: null,
    });
    setDeleteSubCat({
      status: false,
      id: null,
    });
    if (response.data.status) {
      toast.success(response.data.message);
      getCategoryList(api.categoryList);
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

  const handleImgChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      const maxFileSize = SingleFile;
      if (fileSizeInMB > maxFileSize) {
        setFile1();
        setImgError1({
          status: true,
          msg: `File size limit exceeds ${maxFileSize} MB. Your file size is ${fileSizeInMB.toFixed(
            2
          )} MB.`,
        });
      } else {
        setFile1(e.target.files[0]);
        setImgError1({ status: false, msg: null });
      }
    } else {
      setImgError1({ status: true, msg: `File not found.` });
    }
  };

  const handleImgChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      const maxFileSize = SingleFile;
      if (fileSizeInMB > maxFileSize) {
        setFile2();
        setImgError2({
          status: true,
          msg: `File size limit exceeds ${maxFileSize} MB. Your file size is ${fileSizeInMB.toFixed(
            2
          )} MB.`,
        });
      } else {
        setFile2(e.target.files[0]);
        setImgError2({ status: false, msg: null });
      }
    } else {
      setImgError2({ status: true, msg: `File not found.` });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCategoryList(api.categoryList);
  }, []);
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="page-header">
          <h3 class="heading-title">CMS</h3>
          <div className="d-flex">
            <button
              style={{ marginLeft: "20px" }}
              type="button"
              className="btn-gr"
              onClick={() => setAddCat({ status: true })}
            >
              Add New Category
            </button>
          </div>
        </div>
        <div className="Manage-iq-card">
          <h4 class="heading-title mb-2">Manage Category</h4>
          <div className="master-content">
            {category.length !== 0 ? (
              category.map((ele, indx) => {
                return (
                  <div key={indx} className="vehicle-type-card mb-2">
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="iq-card ">
                          <div className="iq-card-body p-4">
                            <div className=" text-center">
                              <div className="iq-card-icon  ">
                                {ele.image === null ||
                                ele.image === "" ||
                                ele.image === undefined ? (
                                  <img src={NoImage} alt="" height={50} />
                                ) : (
                                  <img src={ele.image} alt="" height={50} />
                                )}
                              </div>
                              <div className="mt-4">
                                <h5>{ele.name ?? "NA"}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-9">
                        <div className="row">
                          {ele.sub_category.length !== 0
                            ? ele.sub_category.map((elements, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="col-sm-6 col-md-6 col-lg-6"
                                  >
                                    <div className="iq-card">
                                      <div className="iq-card-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                              {elements.image === null ||
                                              elements.image === "" ||
                                              elements.image === undefined ? (
                                                <img
                                                  src={NoImage}
                                                  alt=""
                                                  height={40}
                                                  width={40}
                                                  style={{
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                    borderRadius: "50%",
                                                  }}
                                                />
                                              ) : (
                                                <img
                                                  src={elements.image}
                                                  alt=""
                                                  height={40}
                                                  width={40}
                                                  style={{
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                    borderRadius: "50%",
                                                  }}
                                                />
                                              )}
                                            </div>
                                            <div>
                                              <h5 className="mx-2">
                                                {elements.name ?? "NA"}
                                              </h5>
                                            </div>
                                          </div>
                                          <div className="cat-action">
                                            <div
                                              className="rounded-circle iq-card-icon dark-icon-light iq-bg-success mx-1"
                                              onClick={() => {
                                                setEditCat({
                                                  status: true,
                                                  cate: 2,
                                                  id: elements.id,
                                                  name: elements.name,
                                                  description:
                                                    elements.description,
                                                  image: elements.image,
                                                  statusVal: elements.status,
                                                });
                                              }}
                                            >
                                              <i className="mdi mdi-square-edit-outline menu-icon"></i>
                                            </div>
                                            <div
                                              className="rounded-circle iq-card-icon dark-icon-light iq-bg-danger mx-1"
                                              onClick={() => {
                                                setDeleteSubCat({
                                                  status: true,
                                                  id: elements.id,
                                                });
                                              }}
                                            >
                                              <i className="mdi mdi-delete menu-icon"></i>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            : null}

                          <div className="col-sm-6 col-md-12 col-lg-12 mt-3 justify-content-end d-flex">
                            <button
                              type="button"
                              className="btn-gr"
                              onClick={() => {
                                setAddSubCat({
                                  status: true,
                                  parent_id: ele.id,
                                });
                              }}
                            >
                              Add Sub Category
                            </button>
                            <button
                              style={{ marginLeft: "20px" }}
                              type="button"
                              className="btn-bl"
                              onClick={() => {
                                setEditCat({
                                  status: true,
                                  cate: 1,
                                  id: ele.id,
                                  name: ele.name,
                                  description: ele.description,
                                  image: ele.image,
                                  statusVal: ele.status,
                                });
                              }}
                            >
                              Edit Category
                            </button>
                            <button
                              style={{ marginLeft: "20px" }}
                              type="button"
                              className="btn-dbl"
                              onClick={() => {
                                setDeleteCat({
                                  status: true,
                                  id: ele.id,
                                });
                              }}
                            >
                              Delete Category
                            </button>
                          </div>
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
        show={editCat.status}
        onHide={() => {
          setEditCat({
            status: false,
            cate: 0,
            id: null,
            name: null,
            description: null,
            image: null,
            statusVal: null,
          });
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">
              Edit {editCat.cate === 2 ? "Sub" : ""} Category
            </h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={updateCategory}
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
                      as="select"
                      type="text"
                      className="form-control todo-list-input"
                      name="status"
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImgChange1}
                      className="form-control todo-list-input"
                    />
                    {imgError1.status && (
                      <div className="alert alert-danger">
                        {imgError1.msg ?? null}
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
                  <div className="form-group text-end mb-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditCat({
                          status: false,
                          cate: 0,
                          id: null,
                          name: null,
                          description: null,
                          image: null,
                          statusVal: null,
                        });
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
        show={addCat.status}
        onHide={() => {
          setAddCat({
            status: false,
          });
          setImgError(false);
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Add New Category</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialAddValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={addCategory}
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
                      as="select"
                      type="text"
                      className="form-control todo-list-input"
                      name="status"
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImgChange}
                      className="form-control todo-list-input"
                    />
                    {imgError.status && (
                      <div className="alert alert-danger">
                        {imgError.msg ?? null}
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
                  <div className="form-group text-end mb-0">
                    <button
                      type="button"
                      onClick={() => {
                        setAddCat({
                          status: false,
                        });
                        setImgError(false);
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
        show={deleteCat.status}
        onHide={() => {
          setDeleteCat({
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
              <p className="text-center">You want to delete this category?</p>
              <div className="form-group text-center mb-0">
                <button
                  type="button"
                  onClick={() =>
                    setDeleteCat({
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
                  onClick={() => deleteCategory(deleteCat.id)}
                >
                  Yes! Delete
                </button>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>

      <Modal
        show={addSubCat.status}
        onHide={() => {
          setAddSubCat({
            status: false,
            parent_id: null,
          });
          setImgError2(false);
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Add New Sub Category</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialAddSubValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={addSubCategory}
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
                      as="select"
                      type="text"
                      className="form-control todo-list-input"
                      name="status"
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImgChange2}
                      className="form-control todo-list-input"
                    />
                    {imgError2.status && (
                      <div className="alert alert-danger">
                        {imgError2.msg ?? null}
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
                  <div className="form-group text-end mb-0">
                    <button
                      type="button"
                      onClick={() => {
                        setAddSubCat({
                          status: false,
                          parent_id: null,
                        });
                        setImgError2(false);
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
        show={deleteSubCat.status}
        onHide={() => {
          setDeleteSubCat({
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
                You want to delete this sub category?
              </p>
              <div className="form-group text-center mb-0">
                <button
                  type="button"
                  onClick={() =>
                    setDeleteSubCat({
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
                  onClick={() => deleteCategory(deleteSubCat.id)}
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
