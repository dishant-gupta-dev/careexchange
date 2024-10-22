import React from "react";
import LoginForm from "./LoginForm.js";
import Logo from "../../../assets/admin/images/logo.svg";

const Page = () => {
  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper-login d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5 border-black">
                  <div className="brand-logo text-center">
                    <img src={Logo} alt="project-img" width={150} />
                  </div>
                  {/* <h4>Hello! let's get started</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6> */}
                  <LoginForm />
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
