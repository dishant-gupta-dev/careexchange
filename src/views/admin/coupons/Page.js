import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import bgcoupon from "../../../assets/admin/images/couponbg.svg";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Page = () => {
  const [addCoupon, setAddCoupon] = useState({ status: false });

  return (
    <>
      <div className="content-wrapper">
        <div className="care-title-header">
          <h3 className="heading-title">Manage Coupon </h3>
          <div className="cc-search-filter ">
            <div className="row g-2">
              <div className="col-md-3">
                <div className="form-group">
                  <DatePicker
                    toggleCalendarOnIconClick
                    showIcon
                    className="DatePicker-control"
                    isClearable
                    autoComplete="off"
                    name="date"
                    placeholderText="Select Date"
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <select className="form-control" name="type">
                    <option value="">Select All Coupon</option>
                    <option value="1">Offer & Discounts</option>
                    <option value="2">Subscription Plans</option>
                    <option value="3">Giveaways</option>
                    <option value="4">Contests</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <select className="form-control" name="type">
                    <option value="1">Active Coupons</option>
                    <option value="2">Inactive Coupons</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <button
                    type="button"
                    className="btn-gr"
                    onClick={() => setAddCoupon({ status: true })}
                  >
                    Add New Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div chassName="care-content-coupon-list">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="coupon-card">
                <div
                  className="coupon-card-coupon-name"
                  style={{
                    backgroundImage: `url(${bgcoupon})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h2>CARELEAD5</h2>
                </div>
                <div className="coupon-card-content">
                  <h4>5 FREE Care Leads!</h4>
                  <h3>
                    Apply This Coupon Code To Get First 5 free Care Leads
                    Unlocked!
                  </h3>
                  <div className="coupon-cat-status-box">
                    <div className="coupon-cat-text">Care Lead</div>
                    <div className="coupon-status status-active">
                      Status: <span>Active</span>
                    </div>
                  </div>
                  <div className="coupon-date">
                    Offer Start From: <span>01 Oct 2024</span>
                  </div>
                  <div className="coupon-date">
                    Offer valid till: <span>31 Dec 2024</span>
                  </div>
                </div>
                <div className="coupon-card-action">
                  <Link className="coupon-offer-btn">Offers & Discount</Link>
                  <Link className="coupon-Delete-btn">Delete</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="coupon-card">
                <div
                  className="coupon-card-coupon-name"
                  style={{
                    backgroundImage: `url(${bgcoupon})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "var(--green)",
                  }}
                >
                  <h2>CARE15</h2>
                </div>
                <div className="coupon-card-content">
                  <h4>15 Days Free Trial</h4>
                  <h3>
                    If You Sign Up Today For 03 Months Commitment, You Get First
                    15 Days Free Trial!
                  </h3>
                  <div className="coupon-cat-status-box">
                    <div className="coupon-cat-text">Subscription</div>
                    <div className="coupon-status status-inactive">
                      Status: <span>Inactive</span>
                    </div>
                  </div>
                  <div className="coupon-date">
                    Offer Start From: <span>01 Oct 2024</span>
                  </div>
                  <div className="coupon-date">
                    Offer valid till: <span>31 Dec 2024</span>
                  </div>
                </div>
                <div className="coupon-card-action">
                  <Link className="coupon-offer-btn">Subscription Plans</Link>
                  <Link className="coupon-Delete-btn">Delete</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="coupon-card">
                <div
                  className="coupon-card-coupon-name"
                  style={{
                    backgroundImage: `url(${bgcoupon})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h2>JOBFREE</h2>
                </div>
                <div className="coupon-card-content">
                  <h4>Post Job Opportunity</h4>
                  <h3>You Will Get 2 FREE Job Post Opportunities!</h3>
                  <div className="coupon-cat-status-box">
                    <div className="coupon-cat-text">Care-Staff Registry</div>
                    <div className="coupon-status status-active">
                      Status: <span>Active</span>
                    </div>
                  </div>
                  <div className="coupon-date">
                    Offer Start From: <span>01 Oct 2024</span>
                  </div>
                  <div className="coupon-date">
                    Offer valid till: <span>31 Dec 2024</span>
                  </div>
                </div>
                <div className="coupon-card-action">
                  <Link className="coupon-offer-btn">Giveaways</Link>
                  <Link className="coupon-Delete-btn">Delete</Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="coupon-card">
                <div
                  className="coupon-card-coupon-name"
                  style={{
                    backgroundImage: `url(${bgcoupon})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h2>CAREEXPERT</h2>
                </div>
                <div className="coupon-card-content">
                  <h4>Get 4.5 Ratings</h4>
                  <h3>
                    You Will Get 2 Care Lead Free If You Get 4.5 Ratings
                    Continue For 2 Months
                  </h3>
                  <div className="coupon-cat-status-box">
                    <div className="coupon-cat-text">Care Lead</div>
                    <div className="coupon-status status-active">
                      Status: <span>Active</span>
                    </div>
                  </div>
                  <div className="coupon-date">
                    Offer Start From: <span>01 Oct 2024</span>
                  </div>
                  <div className="coupon-date">
                    Offer valid till: <span>31 Dec 2024</span>
                  </div>
                </div>
                <div className="coupon-card-action">
                  <Link className="coupon-offer-btn">Contest</Link>
                  <Link className="coupon-Delete-btn">Delete</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={addCoupon.status}
        onHide={() => {
          setAddCoupon({
            status: false,
          });
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalHeader>
            <h5 className="mb-0">Add New Coupon</h5>
          </ModalHeader>
          <ModalBody className="">
            <div className="add-items d-flex row">
              <Formik>
                <Form>
                  <div className="row g-2">
                    <div className="col-md-12">
                      <div className="form-group">
                        <Field
                          type="text"
                          className="form-control todo-list-input"
                          name="name"
                          placeholder="Coupon Title"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <Field
                          as="textarea"
                          className="form-control todo-list-input"
                          name="description"
                          placeholder="Enter Description"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <Field
                          as="select"
                          type="text"
                          className="form-control todo-list-input"
                          name="status"
                        >
                          <option value="">Coupon Type</option>
                          <option value="1">Offer & Discounts</option>
                          <option value="2">Subscription Plans</option>
                          <option value="3">Giveaways</option>
                          <option value="4">Contests</option>
                        </Field>
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <Field
                          as="select"
                          type="text"
                          className="form-control todo-list-input"
                          name="status"
                        >
                          <option value="">Select Offers Type</option>
                          <option value="1">Care Lead</option>
                          <option value="2">Care Network</option>
                          <option value="3">Featured Profile</option>
                          <option value="4">Featured Advertisement</option>
                          <option value="4">Care-Staff Registry</option>
                          <option value="4">Subscription</option>
                        </Field>
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <Field
                          type="text"
                          className="form-control todo-list-input"
                          name="name"
                          placeholder="Coupon Code"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <Field
                          type="text"
                          className="form-control todo-list-input"
                          name="name"
                          placeholder="Enter Value"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <DatePicker
                          toggleCalendarOnIconClick
                          showIcon
                          className="DatePicker-control"
                          isClearable
                          autoComplete="off"
                          name="date"
                          placeholderText="Coupon Valid From"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <DatePicker
                          toggleCalendarOnIconClick
                          showIcon
                          className="DatePicker-control"
                          isClearable
                          autoComplete="off"
                          name="date"
                          placeholderText="Coupon Valid Up-to"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group text-end mb-0">
                    <button
                      type="button"
                      onClick={() => {
                        setAddCoupon({
                          status: false,
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
                      Save & Create New Coupon
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
