import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { login } from "../../../store/slices/Auth";
import { clearMessage } from "../../../store/slices/Message";
import AuthLoader from "../../../layouts/loader/AuthLoader";

const LoginForm = () => {
  const router = useNavigate();
  const { isLoggedIn, redirect } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message, shallowEqual);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
    user_type: 4,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email!")
      .required("Email address is required!"),
    password: Yup.string().required("Password is required!").min(8, 'Password must be 8 characters long.').matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
  });

  const authenticate = (formValue) => {
    setLoading(true);
    const { email, password, user_type } = formValue;
    dispatch(login({ email, password, user_type }))
      .unwrap()
      .then((msg) => {})
      .catch((msg, i) => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return router(redirect);
  }

  return (
    <>
      {loading ? <AuthLoader /> : null}
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validationSchema={validationSchema}
        onSubmit={authenticate}
      >
        <Form className="pt-3">
          <div className="form-group">
            <Field
              type="email"
              className="form-control form-control-lg mt-2"
              name="email"
              placeholder="Enter Email ID"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="form-group">
            <Field
              type="password"
              className="form-control form-control-lg mt-2"
              name="password"
              placeholder="Enter Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="mt-3 d-grid gap-2">
            <button
              type="submit"
              className="auth-form-btn"
            >
              LOGIN
            </button>
          </div>
          {/* <div className="my-2 d-flex justify-content-between align-items-center">
            <a href="#" className="auth-link text-primary">
              Forgot password?
            </a>
          </div> */}

          {/* <div className="text-center mt-4 font-weight-light">
            {" "}
            Don't have an account?{" "}
            <a href="register.html" className="text-primary">
              Create
            </a>
          </div> */}
        </Form>
      </Formik>
      {message && (
        <div className="form-group text-center mt-4 mb-0" style={{fontSize: "0.9rem"}}>
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
