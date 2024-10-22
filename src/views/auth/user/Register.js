import React from "react";
import jpgImg from "../../../assets/user/images/1.jpg";
import Logo from "../../../assets/user/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../utlis/user/routes.utlis";

const Register = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="auth-section auth-height">
        <div className="auth-bg-video">
          <img id="background-video" src={jpgImg} />
        </div>
        <div className="auth-content-card">
          <div className="container">
            <div className="auth-card">
              <div className="row">
                <div className="col-md-6">
                  <div className="auth-content1"></div>
                </div>
                <div className="col-md-6 auth-form-info">
                  <div className="auth-form">
                    <div className="brand-logo">
                      <img src={Logo} alt="logo" />
                    </div>
                    <h2>Sign Up</h2>
                    <p>Find Senior Care & Housing Near You</p>
                    <form className="pt-4">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                        />
                      </div>

                      <div className="form-group">
                        <button className="auth-form-btn" onClick={() => navigate(routes.otp)}>
                          Get Verification Code
                        </button>
                      </div>

                      <div className="mt-1 forgotpsw-text">
                        <Link to={routes.login}>
                          Already Have An Account? <b>Login</b>
                        </Link>
                      </div>
                    </form>
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

export default Register;
