import React, { useEffect, useState, useCallback } from "react";
import { api } from "../../../utlis/user/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../store/slices/Auth";
import { SingleFile } from "../../../utlis/common.utlis";
import InputMask from "react-input-mask";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const [edit, setEdit] = useState({ status: false, id: null });
  const [editImg, setEditImg] = useState(false);
  const [deleteAcc, setDeleteAcc] = useState(false);

  const initialValues = {
    username: details?.fullname ?? "",
    mobile: details?.mobile ?? "",
    email: details?.email ?? "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required!"),
    mobile: Yup.string()
      .min(14, "Phone is invalid")
      .required("Mobile is required!"),
  });

  const initialValuesImg = {
    image: "",
  };

  const validationSchemaImg = Yup.object().shape({
    image: Yup.mixed()
      .required("Please upload your profile image")
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= SingleFile * 1024 * 1024;
      })
      .test("fileType", "Unsupported file type", (value) => {
        return (
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        );
      }),
  });

  const dispatch = useDispatch();
  const signOut = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  const updateProfile = async (formvalue) => {
    setLoading(true);
    // let form = new FormData();
    // form.append("username", formvalue.username);
    // form.append("mobile", formvalue.mobile);
    // form.append("email", formvalue.email);
    const form = JSON.stringify({
      username: formvalue.username,
      mobile: formvalue.mobile,
      email: formvalue.email,
    });
    const response = await ApiService.putAPIWithAccessToken(
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

  const updateProfileImg = async (formvalue) => {
    setLoading(true);
    let form = new FormData();
    form.append("image", formvalue.image);
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.updateProfileImage,
      form
    );
    setEditImg(false);
    if (response.data.status) {
      toast.success(response.data.message);
      getMyProfile(api.profile);
    } else {
      toast.error(response.data.message);
    }
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

  const getMyProfile = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log(response.data.data);
    if (response.data.status && response.data.statusCode === 200) {
      setDetails(response.data.data);
    } else setDetails();
    setLoading(false);
  };

  useEffect(() => {
    getMyProfile(api.profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="messages-section">
          <div className="row">
            <div className="col-md-12">
              <div className="providerProfile-section">
                <div className="user-table-item">
                  <div className="row g-1 align-items-center">
                    <div className="col-md-4">
                      <div className="user-profile-item">
                        <div
                          className="user-profile-media"
                          style={{
                            position: "relative",
                            width: "100px",
                            height: "100px",
                            borderRadius: "0",
                            border: "none",
                          }}
                        >
                          {details?.image === null ||
                          details?.image === "" ||
                          details?.image === undefined ? (
                            <img
                              src={NoImage}
                              alt=""
                              className="me-3"
                              style={{ borderRadius: "50%" }}
                            />
                          ) : (
                            <img
                              src={details?.image}
                              alt=""
                              className="me-3"
                              style={{ borderRadius: "50%" }}
                            />
                          )}
                          <div class="p-image" onClick={() => setEditImg(true)}>
                            <i class="fa fa-pencil"></i>
                          </div>
                        </div>
                        <div className="user-profile-text">
                          <h2>{details?.fullname ?? "NA"}</h2>
                          <div className="email-text m-0">
                            {details?.email ?? "NA"}
                          </div>
                          <div className="email-text">
                            {details?.mobile ?? "NA"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="user-profile-action">
                        <Link
                          className="btn-gr mx-2"
                          onClick={() =>
                            setEdit({ status: true, id: details?.userid })
                          }
                        >
                          Edit Profile
                        </Link>
                        <Link
                          className="btn-re"
                          to=""
                          onClick={() => setDeleteAcc(true)}
                        >
                          Delete Account
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="providerprofile-overview">
                  <div className="row g-3">
                    <div className="col-md-5">
                      <div className="overview-card">
                        <div className="overview-content text-center mb-3">
                          <h4>Care Network</h4>
                        </div>
                        <div className="d-flex justify-content-around">
                          <div className="overview-content text-center">
                            <h2>Posted Jobs</h2>
                            <h4>{details?.postedJobCount ?? 0}</h4>
                          </div>
                          <div className="overview-content text-center">
                            <h2>Applied Jobs</h2>
                            <h4>{details?.appliedJobCount ?? 0}</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-7">
                      <div className="overview-card">
                        <div className="overview-content text-center mb-3">
                          <h4>Care Job</h4>
                        </div>
                        <div className="d-flex justify-content-around">
                          <div className="overview-content text-center">
                            <h2>Pending Jobs</h2>
                            <h4>{details?.carePendingCount ?? 0}</h4>
                          </div>
                          <div className="overview-content text-center">
                            <h2>Ongoing Jobs</h2>
                            <h4>{details?.careOngoingCount ?? 0}</h4>
                          </div>
                          <div className="overview-content text-center">
                            <h2>Completed Jobs</h2>
                            <h4>{details?.careCompleteCount ?? 0}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
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
        className=""
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
                    <div className="form-group">
                      <Field
                        type="text"
                        className="form-control todo-list-input"
                        name="username"
                        placeholder="Enter Name"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control todo-list-input"
                        name="email"
                        value={details?.email}
                        disabled
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
        show={editImg}
        onHide={() => {
          setEditImg(false);
        }}
        className=""
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Edit Profile Image</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik
                initialValues={initialValuesImg}
                validateOnChange={true}
                validationSchema={validationSchemaImg}
                onSubmit={updateProfileImg}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className="form-group">
                      <Field name="image">
                        {({ field, form }) => (
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(event) =>
                              setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              )
                            }
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group text-end">
                      <button
                        type="button"
                        onClick={() => {
                          setEditImg(false);
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
