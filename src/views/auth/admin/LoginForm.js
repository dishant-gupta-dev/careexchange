import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { login } from "../../../store/slices/Auth";
import { clearMessage } from "../../../store/slices/Message";
import Loader from "../../../layouts/loader/Loader";

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
      {loading ? <Loader /> : null}
      
    </>
  );
};

export default LoginForm;
