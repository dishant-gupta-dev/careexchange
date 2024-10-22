import React from "react";
import jpgImg from "../../../assets/user/images/1.jpg";
import Logo from "../../../assets/user/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../utlis/user/routes.utlis";

const Otp = () => {
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
                    <h2>Verification Code</h2>
                    <p>
                      We have sent you a verification code to
                      (lanxxx_o@yahoo.com)
                    </p>
                    <form className="pt-4">
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
                        <button className="auth-form-btn" onClick={() => navigate(routes.dashboard)}>Validate OTP</button>
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

export default Otp;
