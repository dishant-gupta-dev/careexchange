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
import OtpInput from "react-otp-input";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [multiScreen, setMultiScreen] = useState(0);
  const [data, setData] = useState({ email: null });
  const { isLoggedIn, redirect } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message, shallowEqual);
  const [formError, setFormError] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsDisabled(false);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const initialValues = {
    email: "",
    user_type: 1,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email!")
      .required("Email address is required!"),
  });

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      return navigate(redirect);
    }
  }, []);

  useEffect(() => {
    if (code.length === 4) {
      verifyUser(); // Auto submit OTP once it's complete
    }
  }, [code]);

  if (isLoggedIn) {
    return navigate(redirect);
  }

  const sendOtp = async (formValue) => {
    setLoading(true);
    let form = JSON.stringify({
      email: formValue.email,
      user_type: 1,
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
      setTimer(30);
      setIsDisabled(true);
      setMultiScreen(1);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const verifyUser = () => {
    if (code.length !== 4) {
      setFormError(true);
      return;
    } else setFormError(false);
    setLoading(true);
    let otp = code;
    let email = data.email;
    let user_type = 1;
    dispatch(verifyOtp({ email, otp, user_type }))
      .unwrap()
      .then((msg) => {})
      .catch((msg, i) => {
        setLoading(false);
      });
  };

  const resendOtp = async () => {
    setLoading(true);
    let form = JSON.stringify({
      email: data.email,
      user_type: 1,
    });
    const response = await ApiService.postAPI(api.sendOtp, form);
    if (response.data.status) {
      setTimer(30);
      setIsDisabled(true);
      toast(response.data.data?.otp, {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
      toast.success(response.data.message);
    } else toast.error(response.data.message);
    setLoading(false);
  };

  const handleChange = (code) => setCode(code);

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
                            <Link to={routes.signup}>
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
                      <form className="pt-4">
                        <div className="form-group">
                          <div className="otp-item-input">
                            <OtpInput
                              value={code}
                              onChange={handleChange}
                              numInputs={4}
                              separator={<span style={{ width: "8px" }}></span>}
                              isInputNum={true}
                              shouldAutoFocus={true}
                              renderInput={(props) => <input {...props} />}
                              inputStyle={{
                                border: "1px solid transparent",
                                borderRadius: "8px",
                                width: "54px",
                                height: "54px",
                                fontSize: "1rem",
                                color: "#000",
                                fontWeight: "400",
                                caretColor: "blue",
                                margin: "0 5px",
                              }}
                              focusStyle={{
                                border: "1px solid #CFD3DB",
                                outline: "none",
                              }}
                            />
                          </div>
                          {message && (
                            <div
                              className="form-group text-center mt-4 mb-0"
                              style={{ fontSize: "0.9rem" }}
                            >
                              <div className="alert alert-danger" role="alert">
                                {message}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="my-2 forgotpsw-text d-flex justify-content-between">
                          <p>
                            {timer != 0 && (
                              <>
                                Didn't receive a code? Resend (<b>{timer}</b>)
                              </>
                            )}
                          </p>
                          {!isDisabled && (
                            <Link to="" onClick={() => resendOtp()}>
                              {" "}
                              Resend Verification{" "}
                            </Link>
                          )}
                        </div>
                        <div className="form-group">
                          <button
                            type="button"
                            className="auth-form-btn"
                            onClick={() => verifyUser()}
                          >
                            Validate OTP
                          </button>
                        </div>
                        <div className="form-group">
                          <Link
                            onClick={() => {
                              setData({ email: null });
                              setMultiScreen(0);
                              setCode("");
                            }}
                          >
                            Back
                          </Link>
                        </div>
                      </form>
                      {formError && (
                        <div className="alert alert-danger">
                          OTP is required
                        </div>
                      )}
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
