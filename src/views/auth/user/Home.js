import React from "react";
import jpgImg from "../../../assets/user/images/1.jpg";
import Logo from "../../../assets/user/images/logo.svg";
import { Link } from "react-router-dom";
import { routes } from "../../../utlis/user/routes.utlis";

const Home = () => {
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
                  <div className="auth-content">
                    <div className="auth-content-info">
                      <h2>112</h2>
                      <p>families seeking care near you</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 auth-form-info">
                  <div className="auth-form">
                    <div className="brand-logo">
                      <img src={Logo} alt="logo" />
                    </div>
                    <h4>
                      Helping you find your ideal care Provider in your area
                    </h4>

                    <div className="auth-form-action">
                      <Link className="auth-gr-btn" to={routes.login}>
                        Login
                      </Link>
                      <Link className="auth-bl-btn" to={routes.signup}>
                        Sign Up
                      </Link>
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

export default Home;
