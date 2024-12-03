import React, { useEffect, useState, useCallback } from "react";
import googlemapIcon from "../../../assets/provider/images/Google_Map.svg";
import careuserprofile from "../../../assets/provider/images/user.png";
import caresuccessful from "../../../assets/provider/images/successful.svg";
import { api } from "../../../utlis/staff/api.utlis";
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

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const [deleteAcc, setDeleteAcc] = useState(false);

  const getMyProfile = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setDetails(response.data.data);
    } else setDetails();
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

  const dispatch = useDispatch();
  const signOut = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
              <div className="care-title-header">
                <div className="care-title-header-1">
                  <h6 className="heading-name-title p-0">
                    Hello,{" "}
                    {details?.business_name
                      ? details?.business_name
                      : details?.fullname}
                  </h6>
                  <h2 className="heading-title">Your Profile Looks Great !</h2>
                </div>
                <div>
                  <div className="">
                    <Link class="btn-delete" onClick={() => setDeleteAcc(true)} to="">
                      <i className="fa fa-trash ms-2"></i> Delete Account
                    </Link>
                  </div>
                </div>
              </div>
              <div className="providerProfile-section">
                <div className="user-table-item">
                  <div className="row g-1 align-items-center">
                    <div className="col-md-4">
                      <div className="user-profile-item">
                        <div className="user-profile-media">
                          {details?.logo !== null &&
                          details?.logo !== "" &&
                          details?.logo !== undefined ? (
                            <img src={details?.logo} alt="" />
                          ) : (
                            <img src={details?.profile_image} alt="" />
                          )}
                        </div>
                        <div className="user-profile-text">
                          <h2>
                            {details?.business_name
                              ? details?.business_name
                              : details?.fullname}
                          </h2>
                          <div className="d-flex">
                            <div className="email-text">
                              <i className="fa fa-envelope ms-2"></i>{" "}
                              {details?.email ?? "NA"}
                            </div>
                            <div className="email-text ms-3">
                              <i className="fa fa-phone ms-2"></i>{" "}
                              {details?.mobile}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="user-profile-action">
                        <a
                          className="btn-gr"
                          data-bs-toggle="modal"
                          data-bs-target="#EditProfile"
                        >
                          <i class="fa fa-edit ms-2"></i> Edit Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="providerprofile-overview">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="overview-card">
                        <div className="overview-content">
                          <h2>Active Jobs</h2>
                          <h4>{details?.activeJob ?? 0}</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="overview-card">
                        <div className="overview-content">
                          <h2>Pending Request</h2>
                          <h4>{details?.pendingJob ?? 0}</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="overview-card">
                        <div className="overview-content">
                          <h2>Cancelled Jobs</h2>
                          <h4>{details?.cancellJob ?? 0}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="providerprofile-about d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img className="me-3" src={caresuccessful} alt="" />
                    <h2 className="m-0">
                      Want To Get Featured on The Home Page Listing ?
                    </h2>
                  </div>
                  <a className="btn-plan" href="#">
                    @ Just $59/Monthly
                  </a>
                </div>

                <div className="Address-card">
                  <div className="care-location-box d-flex justify-content-between mt-3">
                    <div className="care-location-text">
                      <h4>Payment Accepted</h4>
                      <p>{details?.payment_accepted_type ?? "NA"}</p>
                    </div>
                    <div className="care-location-text">
                      <h4>Experience </h4>
                      <p>{details?.experience ?? 0} Years</p>
                    </div>
                    <div className="care-location-text">
                      <h4>Fees </h4>
                      <p>{details?.fee ?? "NA"}</p>
                    </div>
                  </div>

                  <div className="divider col-md-12"></div>

                  <div className="care-location-text">
                    <h4>Best Info</h4>
                    <p>{details?.description ?? "NA"}</p>
                  </div>

                  <div className="divider col-md-12"></div>
                  <div className="care-location-text mb-3">
                    <h4>Address</h4>
                  </div>
                  <div className="full-address-detail">
                    <img src={googlemapIcon} alt="" />
                    <h6>{details?.business_address ?? "NA"}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
