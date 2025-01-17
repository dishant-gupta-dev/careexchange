import React, { useEffect, useState } from "react";
import MailImg from "../../../assets/user/images/mail-sent-pana.svg";
import NewsletterImg from "../../../assets/user/images/newsletter1.svg";
import { api } from "../../../utlis/user/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Modal, ModalBody } from "react-bootstrap";
import * as Yup from "yup";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(false);
  let userData = JSON.parse(localStorage.getItem("careexchange"));

  const initialValues = {
    name: userData.fullname ?? "",
    phone: userData.mobile ?? "",
    email_address: userData.email ?? "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    phone: Yup.string()
      .min(14, "Phone is invalid")
      .required("Mobile is required!"),
    email_address: Yup.string().email().required("Email address is required!"),
  });

  const getNewsletterSubscribe = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all posted job => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setNewsletter(response.data.data.isSubscribe);
    } else setNewsletter(false);
    setLoading(false);
  };

  const unsubscribeNewsletter = async () => {
    setLoading(true);
    const form = JSON.stringify({
      email_address: userData.email ?? "",
    });
    const response = await ApiService.postAPIWithAccessToken(
      api.newsletterUnsubscribe,
      form
    );
    setUnsubscribe(false);
    if (response.data.status) {
      getNewsletterSubscribe(api.newsletterSubscribe);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const addNewsLetter = async (formvalue) => {
    setLoading(true);
    const form = JSON.stringify({
      name: formvalue.name,
      phone: formvalue.phone,
      email_address: formvalue.email_address,
    });
    const response = await ApiService.postAPIWithAccessToken(
      api.addNewsletter,
      form
    );
    if (response.data.status) {
      getNewsletterSubscribe(api.newsletterSubscribe);
      toast.success(response.data.message);
      document.getElementById("newsletter-form").reset();
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNewsletterSubscribe(api.newsletterSubscribe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div class="newsletter-section">
          <div class="row">
            <div class="col-md-12">
              {newsletter ? (
                <div class="container">
                  <div className="newsletter-card">
                    <div className="newsletter-image">
                      <img src={NewsletterImg} alt="logo" />
                    </div>
                    <div className="newsletter-content">
                      <h2 className="mt-3">You're Subscribed!</h2>
                      <p className="my-2">
                        Thank you for subscribing to our newsletter. You're all
                        set to receive the latest updates, news, and exclusive
                        offers straight to your inbox.
                      </p>
                      <p>
                        If you no longer wish to receive our newsletters, you
                        can unsubscribe at any time.
                      </p>
                      <p className="my-2">Click below to unsubscribe from the newsletter.</p>
                      <div className="newsletter-action">
                        <Link
                          onClick={() => setUnsubscribe(true)}
                          className="btn-bl"
                        >
                          Unsubscribe
                        </Link>
                      </div>
                      <p className="mt-2">
                        If you have any questions or need support, feel free to
                        Contact Us.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="auth-content-card">
                  <div class="container">
                    <div class="auth-card">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="auth-content1">
                            <img src={MailImg} alt="logo" />
                          </div>
                        </div>
                        <div class="col-md-6 auth-form-info">
                          <div class="auth-form">
                            <h2>Subscribe</h2>
                            <p>Subscribe To Our Newsletter & Stay Updated</p>
                            <Formik
                              initialValues={initialValues}
                              validateOnChange={true}
                              validationSchema={validationSchema}
                              onSubmit={addNewsLetter}
                              enableReinitialize
                            >
                              {({ values, setFieldValue }) => (
                                <Form class="pt-4" id="newsletter-form">
                                  <div class="form-group">
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
                                  <div class="form-group">
                                    <Field
                                      type="email_address"
                                      className="form-control"
                                      name="email_address"
                                      placeholder="Enter Email"
                                    />
                                    <ErrorMessage
                                      name="email_address"
                                      component="div"
                                      className="alert alert-danger"
                                    />
                                  </div>
                                  <div class="form-group">
                                    <Field name="phone">
                                      {({ field }) => (
                                        <InputMask
                                          {...field}
                                          mask="(999) 999-9999"
                                          className="form-control"
                                          maskChar=""
                                          onChange={(e) => {
                                            setFieldValue(
                                              field.name,
                                              e.target.value
                                            );
                                          }}
                                          placeholder="Enter phone"
                                        />
                                      )}
                                    </Field>
                                    <ErrorMessage
                                      name="phone"
                                      component="div"
                                      className="alert alert-danger"
                                    />
                                  </div>
                                  <div class="form-group">
                                    <button type="submit" class="auth-form-btn">
                                      Submit
                                    </button>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={unsubscribe}
        onHide={() => {
          setUnsubscribe(false);
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalBody className="">
            <div className="add-items d-flex row">
              <div className="deleteaccount-Img p-5">
                <img width={190} src={NewsletterImg} />
              </div>
              <div className="deleteaccount-text mb-4">
                <h5 className="text-center pb-0">Newsletter Unsubscribe</h5>
                <p className="text-center">
                  If you unsubscribe, you'll miss great deals and handy tips we
                  share!
                </p>
              </div>
              <div className="form-group text-center mb-2">
                <button
                  type="button"
                  onClick={() => setUnsubscribe(false)}
                  className="btn-re me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gr"
                  data-bs-dismiss="modal"
                  onClick={() => unsubscribeNewsletter()}
                >
                  Yes! Unsubscribe
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
