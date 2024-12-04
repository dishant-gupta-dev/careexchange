import React, { useState } from "react";
import MailImg from "../../../assets/user/images/mail-sent-pana.svg";
import { api } from "../../../utlis/staff/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    phone: "",
    email_address: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    phone: Yup.string().min(10).required("Mobile is required!"),
    email_address: Yup.string().email().required("Email address is required!"),
  });

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
      toast.success(response.data.message);
      document.getElementById("newsletter-form").reset();
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div class="newsletter-section">
          <div class="row">
            <div class="col-md-12">
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
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    placeholder="Enter Phone"
                                    maxlength={10}
                                    value={values.phone.replace(
                                      /(\d{3})(\d{3})(\d{4})/,
                                      "($1) $2-$3"
                                    )}
                                  />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;