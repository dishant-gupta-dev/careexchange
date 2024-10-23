import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import jpgImg from "../../../assets/user/images/1.jpg";
import Logo from "../../../assets/user/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../utlis/user/routes.utlis";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ApiService from "../../../core/services/ApiService";
import { api } from "../../../utlis/user/api.utlis";
import toast from "react-hot-toast";
import Loader from "../../../layouts/loader/Loader";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [multiScreen, setMultiScreen] = useState(0);
  const [data, setData] = useState({email: null, name: null})

  const initialValues = {
    email: "",
    username: "",
    user_type: 1,
  };

  const initialOtpValues = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email!")
      .required("Email address is required!"),
    username: Yup.string().required("Name is required!"),
  });

  const validationOtpSchema = Yup.object().shape({
    otp1: Yup.string().min(0).max(9).required("Required"),
    otp2: Yup.string().min(0).max(9).required("Required"),
    otp3: Yup.string().min(0).max(9).required("Required"),
    otp4: Yup.string().min(0).max(9).required("Required"),
  });

  const sendOtp = async (formValue) => {
    setLoading(true);
    // let form = new FormData();
    // form.append("username", formValue.username);
    // form.append("email", formValue.email);
    // form.append("user_type", formValue.user_type);
    let form = JSON.stringify({
      email: formValue.email,
      user_type: formValue.user_type,
    });
    const response = await ApiService.postAPIWithAccessToken(api.sendOtp, form);
    if (response.data.status) {
      toast.success(response.data.message);
      setData({email: formValue.email, name: formValue.username});
      setMultiScreen(1);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const verifyUser = async (formValue) => {
    setLoading(true);
    let form = JSON.stringify({
      email: data.email,
      otp: formValue.otp1+formValue.otp2+formValue.otp3+formValue.otp4,
    });
    const response = await ApiService.postAPIWithAccessToken(api.otpVerify, form);
    if (response.data.status) {
      let formData = new FormData();
      formData.append("username", data.name);
      formData.append("email", data.email);
      formData.append("user_type", 1);
      const responseData = await ApiService.postAPIWithAccessToken(api.register, form);
      if (responseData.data.status) {
        // toast.success(response.data.message);
        toast.success(responseData.data.message);
        navigate(routes.login);
      } else {
        toast.error(responseData.data.message);
      }
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  }

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="auth-section auth-height">
        <div className="auth-bg-video">
          <img id="background-video" src={jpgImg} />
        </div>
        <div className="auth-content-card">
          <div className="container">
            <div className="auth-card">
              <div className="row">
                <div className="col-md-6">
                  <div className="user-auth-content1"></div>
                </div>

                {multiScreen === 0 ? (
                  <div className="col-md-6 auth-form-info">
                    <div className="auth-form">
                      <div className="brand-logo">
                        <img src={Logo} alt="logo" />
                      </div>
                      <h2>Sign Up</h2>
                      <p>Find Senior Care & Housing Near You</p>
                      <Formik
                        initialValues={initialValues}
                        validateOnChange={true}
                        validationSchema={validationSchema}
                        onSubmit={sendOtp}
                      >
                        <Form className="pt-4">
                          <div className="form-group">
                            <Field
                              type="text"
                              className="form-control form-control-lg mt-2"
                              name="username"
                              placeholder="Full Name"
                            />
                            <ErrorMessage
                              name="username"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>

                          <div className="form-group">
                            <Field
                              type="email"
                              className="form-control form-control-lg mt-2"
                              name="email"
                              placeholder="Email Address"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>

                          <div className="form-group">
                            <button className="auth-form-btn" type="submit">
                              Get Verification Code
                            </button>
                          </div>

                          <div className="mt-1 forgotpsw-text">
                            <Link to={routes.login}>
                              Already Have An Account? <b>Login</b>
                            </Link>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-6 auth-form-info">
                    <div className="auth-form">
                      <div className="brand-logo">
                        <img src={Logo} alt="logo" />
                      </div>
                      <h2>Verification Code</h2>
                      <p>
                        We have sent you a verification code to
                        (lanxxx_o@yahoo.com)
                      </p>
                      <Formik
                        initialValues={initialOtpValues}
                        validateOnChange={true}
                        validationSchema={validationOtpSchema}
                        onSubmit={verifyUser}
                      >
                        <Form className="pt-4">
                          <div className="form-group">
                            <div className="otp-item-input">
                              <div className="otp-item">
                                <input
                                  type="taxt"
                                  className="form-control"
                                  placeholder=""
                                />
                              </div>
                              <div className="otp-item">
                                <input
                                  type="taxt"
                                  className="form-control"
                                  placeholder=""
                                />
                              </div>
                              <div className="otp-item">
                                <input
                                  type="taxt"
                                  className="form-control"
                                  placeholder=""
                                />
                              </div>
                              <div className="otp-item">
                                <input
                                  type="taxt"
                                  className="form-control"
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-1 forgotpsw-text">
                            <a href="javascript:void(0);">Resend Verification </a>
                          </div>
                          <div className="form-group">
                            <button
                              className="auth-form-btn"
                            >
                              Validate OTP
                            </button>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
