import React, { useState, useEffect } from "react";
import MailImg from "../../../assets/user/images/mail-sent-pana.svg";
import NewsletterImg from "../../../assets/user/images/newsletter1.svg";
import { api } from "../../../utlis/provider/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import { subscribtionAuth } from "../../../utlis/common.utlis";
import { Link, useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
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
    subscribtionAuth(api.subscriptionAuth, navigate);
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
                      <h2>Are you sure about unsubscribing?</h2>
                      <p>
                        If you unsubscribe now, you might miss nice deals and
                        useful hints form signnow!
                      </p>
                      <div className="newsletter-action">
                        <Link className="btn-bl">Unsubscribe</Link>
                      </div>
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
    </>
  );
};

export default Page;
