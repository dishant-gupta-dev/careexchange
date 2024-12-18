import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import jpgImg from "../../../assets/user/images/1.jpg";
import Logo from "../../../assets/user/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../utlis/user/routes.utlis";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ApiService from "../../../core/services/ApiService";
import { verifyOtp } from "../../../store/slices/Auth";
import { api } from "../../../utlis/user/api.utlis";
import toast from "react-hot-toast";
import Loader from "../../../layouts/loader/Loader";
import OtpInput from "react-otp-input";

const UserRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [multiScreen, setMultiScreen] = useState(0);
  const [data, setData] = useState({ email: null, name: null });
  const [formError, setFormError] = useState(false);
  const { redirect } = useSelector((state) => state.auth);

  const initialValues = {
    email: "",
    username: "",
    user_type: 1,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email!")
      .required("Email address is required!"),
    username: Yup.string().required("Name is required!"),
  });

  const sendOtp = async (formValue) => {
    setLoading(true);
    let form = JSON.stringify({
      email: formValue.email,
      user_type: 1,
    });
    const response = await ApiService.postAPI(api.registerSendOtp, form);
    if (response.data.status) {
      toast(response.data.data?.otp, {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
      toast.success(response.data.message);
      setData({ email: formValue.email, name: formValue.username });
      setMultiScreen(1);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  // const verifyUser = async () => {
  //   if (code.length !== 4) {
  //     setFormError(true);
  //     return;
  //   } else setFormError(false);
  //   setLoading(true);
  //   let form = JSON.stringify({
  //     email: data.email,
  //     otp: code,
  //   });
  //   const response = await ApiService.postAPI(api.otpVerify, form);
  //   if (response.data.status) {
  //     let formData = new FormData();
  //     formData.append("username", data.name);
  //     formData.append("email", data.email);
  //     formData.append("user_type", 1);
  //     const responseData = await ApiService.postAPI(api.register, formData);
  //     console.log(responseData);

  //     if (responseData.data.status) {
  //       // toast.success(response.data.message);
  //       toast.success(responseData.data.message);
  //       navigate(routes.login);
  //     } else {
  //       toast.error(responseData.data.message);
  //     }
  //   } else {
  //     toast.error(response.data.message);
  //   }
  //   setLoading(false);
  // };

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
      .then(async () => {
        let formData = new FormData();
        formData.append("username", data.name);
        formData.append("email", data.email);
        formData.append("user_type", 1);
        const responseData = await ApiService.postAPI(api.register, formData);

        if (responseData.data.status) {
          // toast.success(response.data.message);
          toast.success(responseData.data.message);
          navigate(routes.dashboard);
        } else {
          toast.error(responseData.data.message);
        }
      })
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
                              className="form-control"
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
                        </div>
                        <div className="mb-1 forgotpsw-text">
                          <Link to="" onClick={() => resendOtp()}>
                            {" "}
                            Resend Verification{" "}
                          </Link>
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

export default UserRegister;
