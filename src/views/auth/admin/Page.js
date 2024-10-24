import React from "react";
import LoginForm from "./LoginForm.js";
import authbg from "../../../assets/images/authbg.jpg";
import Logo from "../../../assets/admin/images/logo.svg";

const Page = () => {
  return (
    <>
      <div className="cc-auth-section auth-height">
        <div className="cc-auth-bg-video">
          <img src={authbg} alt="project-img" />
        </div>
        <div className="cc-auth-content-card">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-12">
                <div className="cc-auth-card-content">
                  <div className="cc-auth-form">
                    <div className="brand-logo text-center">
                      <img src={Logo} alt="project-img" width={250} />
                    </div>
                    {/* <h4>Hello! let's get started</h4><h6 className="font-weight-light">Sign in to continue.</h6> */}
                    <LoginForm />
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

export default Page;
