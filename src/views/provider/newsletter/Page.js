import React from "react";
import newsletterbg from "../../../assets/provider/images/Mailsent-pana.svg";

const Page = () => {
  return (
    <>
      <div className="container">
        <div className="newsletter-section">
          <div className="row">
            <div className="col-md-12">
              <div className="auth-content-card">
                <div className="container">
                  <div className="auth-card">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="auth-content1">
                          <img src={newsletterbg} alt="" />
                        </div>
                      </div>
                      <div className="col-md-6 auth-form-info">
                        <div className="auth-form">
                          <h2>Subscribe</h2>
                          <p>Subscribe To Our Newsletter & Stay Updated</p>
                          <form className="pt-4">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email Address"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Phone Number"
                              />
                            </div>
                            <div className="form-group">
                              <button className="auth-form-btn">Submit</button>
                            </div>
                          </form>
                        </div>
                      </div>
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

export default Page;
