import React, { useEffect, useState } from "react";
import { api } from "../../../utlis/user/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const [file, setFile] = useState();
  const [edit, setEdit] = useState({ status: false, id: null });

  const initialValues = {
    username: details?.fullname ?? "",
    image: "",
    mobile: details?.mobile ?? "",
    email: details?.email ?? "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required!"),
    mobile: Yup.string().required("Mobile is required!"),
  });

  const updateProfile = async (formvalue) => {
    setLoading(true);
    // let form = new FormData();
    // form.append("username", formvalue.username);
    // form.append("mobile", formvalue.mobile);
    // form.append("email", formvalue.email);
    // form.append("image", file);
    const form = JSON.stringify({
        username: formvalue.username,
        mobile: formvalue.mobile,
        email: formvalue.email,
      });
    const response = await ApiService.putAPIWithAccessTokenMultiPart(
      api.updateProfile + edit.id,
      form
    );
    setEdit({
      status: false,
      id: null
    });
    setFile("");
    if (response.data.status) {
      toast.success(response.data.message);
      getMyProfile(api.profile);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const getMyProfile = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setDetails(response.data.data);
    } else setDetails();
    setLoading(false);
  };

  const handleImgChange = (e) => {
    setFile(e.target.files[0]);
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
                        <div className="user-profile-media">
                          {details?.image === null ||
                          details?.image === "" ||
                          details?.image === undefined ? (
                            <img src={NoImage} alt="" className="me-3" />
                          ) : (
                            <img src={details?.image} alt="" className="me-3" />
                          )}
                        </div>
                        <div className="user-profile-text">
                          <h2>{details?.fullname ?? "NA"}</h2>
                          <div className="email-text">
                            {details?.email ?? "NA"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="user-profile-action">
                        <Link
                          className="btn-gr mx-2"
                          onClick={() => setEdit({ status: true, id: details?.userid })}
                        >
                          Edit Profile
                        </Link>
                        <Link className="btn-re" to="">
                          Delete Account
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
                          <h2>Requested Jobs</h2>
                          <h4>NA</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="overview-card">
                        <div className="overview-content">
                          <h2>Active Jobs</h2>
                          <h4>NA</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="overview-card">
                        <div className="overview-content">
                          <h2>Pending Request</h2>
                          <h4>NA</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="providerprofile-about">
                  <h2>About Joseph</h2>
                  <p>NA</p>
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
            status: false, id: null
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
              >
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
                    <Field
                      type="number"
                      className="form-control todo-list-input"
                      name="mobile"
                      placeholder="Enter Mobile"
                    />
                    <ErrorMessage
                      name="mobile"
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
                  </div>
                  <div className="form-group text-end">
                    <button
                      type="button"
                      onClick={() => {
                        setEdit({
                          status: false, id: null
                        });
                      }}
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
    </>
  );
};

export default Page;
