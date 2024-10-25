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
import { verifyOtp } from "../../../store/slices/Auth";
import { clearMessage } from "../../../store/slices/Message";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [multiScreen, setMultiScreen] = useState(0);
  const [data, setData] = useState({ email: null });
  const { isLoggedIn, redirect } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message, shallowEqual);

  const initialValues = {
    email: "",
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
  });

  const validationOtpSchema = Yup.object().shape({
    otp1: Yup.string().min(0).max(9).required("Required"),
    otp2: Yup.string().min(0).max(9).required("Required"),
    otp3: Yup.string().min(0).max(9).required("Required"),
    otp4: Yup.string().min(0).max(9).required("Required"),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const sendOtp = async (formValue) => {
    setLoading(true);
    let form = JSON.stringify({
      email: formValue.email,
    });
    const response = await ApiService.postAPI(api.sendOtp, form);
    if (response.data.status) {
      toast(response.data.data?.otp, {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
      toast.success(response.data.message);
      setData({ email: formValue.email });
      setMultiScreen(1);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const verifyUser = (formValue) => {
    let otp = `${formValue.otp1}${formValue.otp2}${formValue.otp3}${formValue.otp4}`;
    let email = data.email;
    let user_type = 1;
    dispatch(verifyOtp({ email, otp, user_type }))
      .unwrap()
      .then((msg) => {})
      .catch((msg, i) => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return navigate(redirect);
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
                      <h2>Sign In</h2>
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
                              type="email"
                              className="form-control"
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
                            <button type="submit" className="auth-form-btn">
                              Get Verification Code
                            </button>
                          </div>

                          <div className="mt-1 forgotpsw-text">
                            <Link to={routes.register}>
                              Don’t Have An Account? <b>Signup</b>
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
                        We have sent you a verification code to ({data.email})
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
                                <Field
                                  type="number"
                                  className="form-control"
                                  name="otp1"
                                  minLength="1"
                                />
                              </div>
                              <div className="otp-item">
                                <Field
                                  type="number"
                                  className="form-control"
                                  name="otp2"
                                />
                              </div>
                              <div className="otp-item">
                                <Field
                                  type="number"
                                  className="form-control"
                                  name="otp3"
                                />
                              </div>
                              <div className="otp-item">
                                <Field
                                  type="number"
                                  className="form-control"
                                  name="otp4"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-1 forgotpsw-text">
                            <a href="javascript:void(0);">
                              Resend Verification{" "}
                            </a>
                          </div>
                          <div className="form-group">
                            <button type="submit" className="auth-form-btn">
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

export default Login;
