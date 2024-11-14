import React, { useState } from "react";
import jpgImg from "../../../assets/user/images/1.jpg";
import Logo from "../../../assets/user/images/logo.svg";
import CareBusiness from "../../../assets/user/images/carebusiness.svg";
import CareIndividual from "../../../assets/user/images/careIndividual.svg";
import CareUsers from "../../../assets/user/images/careuser.svg";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../utlis/user/routes.utlis";
import { routes as providerRoutes } from "../../../utlis/provider/routes.utlis";

const SignUp = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);

  const registerPage = () => {
    if (tab == 1) {
      navigate(routes.userRegister);
    } else if (tab == 2) {
      return;
    } else if (tab == 3) {
      navigate(providerRoutes.providerRegister);
    }
  };
  return (
    <>
      <div className="auth-section auth-height">
        <div className="auth-bg-video">
          <img id="background-video" src={jpgImg} />
        </div>
        <div className="auth-content-card">
          <div className="container">
            <div className="authsign-card">
              <div className="row">
                <div className="col-md-6">
                  <div className="user-auth-content1"></div>
                </div>
                <div className="col-md-6 authsign-form-info">
                  <div className="authsign-form">
                    <div className="brand-logo mb-3">
                      <img src={Logo} alt="logo" />
                    </div>
                    <h2>Sign In</h2>
                    <p>Choose From Care Provider Account Type</p>
                    <div className="form-group">
                      <div className="row g-2">
                        <div className="col-md-4">
                          <div className="PBCheckbox">
                            <input
                              type="radio"
                              name="accounttype"
                              id="Users"
                              value="Users"
                              defaultChecked={tab == 1 ? true : false}
                              onChange={() => setTab(1)}
                            />
                            <label for="Users">
                              <span className="checkbox-circle-mark"></span>
                              <div className="account-option-media">
                                <img src={CareUsers} />
                              </div>
                              <div className="account-option-text">
                                <h4>Care</h4>
                                <h3>Users</h3>
                              </div>
                            </label>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="PBCheckbox">
                            <input
                              type="radio"
                              name="accounttype"
                              id="Individual"
                              value="Individual"
                              defaultChecked={tab == 2 ? true : false}
                              onChange={() => setTab(2)}
                            />
                            <label for="Individual">
                              <span className="checkbox-circle-mark"></span>
                              <div className="account-option-media">
                                <img src={CareIndividual} />
                              </div>
                              <div className="account-option-text">
                                <h4>Care-Staff</h4>
                                <h3>Individual</h3>
                              </div>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="PBCheckbox">
                            <input
                              type="radio"
                              name="accounttype"
                              id="Business"
                              value="Business"
                              defaultChecked={tab == 3 ? true : false}
                              onChange={() => setTab(3)}
                            />
                            <label for="Business">
                              <span className="checkbox-circle-mark"></span>
                              <div className="account-option-media">
                                <img src={CareBusiness} />
                              </div>
                              <div className="account-option-text">
                                <h4>Care Provider</h4>
                                <h3>Business</h3>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="auth-form-btn"
                        onClick={() => registerPage()}
                      >
                        Next
                      </button>
                    </div>
                    <div className="forgotpsw-text text-center">
                      <Link to={routes.login}>
                        Already Have An Account? <b>Login</b>
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

export default SignUp;
