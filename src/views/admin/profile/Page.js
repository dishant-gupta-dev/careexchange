import React, { useState, useEffect } from "react";
import { api } from "../../../utlis/admin/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import moment from "moment";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [file, setFile] = useState();
  const [edit, setEdit] = useState({ status: false });

  const initialValues = {
    username: user?.fullname ?? "",
    image: "",
    mobile: user?.mobile ?? "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required!"),
    mobile: Yup.string().required("Mobile is required!"),
  });

  const getUserDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setUser(response.data.data);
    } else setUser();
    setLoading(false);
  };

  const updateProfile = async (formvalue) => {
    setLoading(true);
    let form = new FormData();
    form.append("username", formvalue.username);
    form.append("mobile", formvalue.mobile);
    form.append("image", file);
    const response = await ApiService.postAPIWithAccessTokenMultiPart(
      api.updateProfile,
      form
    );
    setEdit({
      status: false,
    });
    setFile("");
    if (response.data.status) {
      toast.success(response.data.message);
      getUserDetails(api.profile);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const handleImgChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    getUserDetails(api.profile);
  }, []);
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Profile</h3>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card statistics-card-1 card-img-holder text-dark position-relative">
                <div className="card-body align-items-center d-flex">
                  <div className="d-flex justify-content-between w-100">
                    <div className="care-for-profile-img me-3 d-flex align-items-center">
                      {user?.image === null ||
                      user?.image === "" ||
                      user?.image === undefined ? (
                        <img src={NoImage} alt="" className="me-3" />
                      ) : (
                        <img src={user?.image} alt="" className="me-3" />
                      )}
                      <div className="">
                        <h5 className="">{user?.fullname}</h5>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <button
                          type="button"
                          className="btn btn-view-profile px-4"
                          onClick={() => setEdit({ status: true })}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-4">
            <div className="iq-card">
              <div className="iq-card-body" style={{ border: "none" }}>
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="form-group col-md-4 mb-0">
                        <label>Email ID</label>
                        <p className="mb-0">{user?.email}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label>Phone No.</label>
                        <p className="mb-0">{user?.mobile}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="lname">Created On</label>
                        <p className="mb-0">
                          {moment(user?.created_date).format("MM-DD-yyyy")}
                        </p>
                      </div>
                    </div>
                  </form>
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
                    <input type="text" className="form-control todo-list-input" name="email" value={user?.email} disabled />
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
                          status: false,
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
