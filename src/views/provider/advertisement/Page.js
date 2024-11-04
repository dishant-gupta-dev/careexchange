import React from "react";
import { Link } from "react-router-dom";
import advertisementImage from "../../../assets/provider/images/1.jpg";

const Page = () => {
  return (
    <>
      <div className="container">
        <div className="advertisement-section">
          <div className="care-title-header">
            <h2 className="heading-title">Advertisement</h2>
            <div className="search-filter">
              <div className="row g-2">
                <div className="col-md-4">
                  <div className="form-group mb-0">
                    <input type="date" name="" className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-0">
                    <Link className="btn-gr wd100">Posted Ads</Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-0">
                    <Link className="btn-bl wd100"> Post New Ads</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="advertisement-content-list">
            <div className="row">
              <div className="col-md-12">
                <div className="advertisement-item-card">
                  <div className="advertisement-item-card-image">
                    <img src={advertisementImage} alt="" />
                  </div>
                  <div className="advertisement-item-card-content">
                    <div class="strip-text">Active</div>
                    <div class="title-text">
                      Looking For Home Care For Seniors
                    </div>
                    <div class="advertisement-date-text">
                      Posted On 25 Jul, 09:00 Am
                    </div>
                    <div class="advertisement-tags-list">
                      <div class="advertisement-tags-item">Senior Care</div>
                      <div class="advertisement-tags-item">Home Care</div>
                      <div class="advertisement-tags-item">Full Time</div>
                    </div>

                    <div class="advertisement-desc">
                      <p>
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                        Phasellus Gravida Ut Ipsum Quis Mattis. Donec Ut
                        Tincidunt Nunc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="advertisement-item-card">
                  <div className="advertisement-item-card-image">
                    <img src={advertisementImage} alt="" />
                  </div>
                  <div className="advertisement-item-card-content">
                    <div class="strip-text">Active</div>
                    <div class="title-text">
                      Looking For Home Care For Seniors
                    </div>
                    <div class="advertisement-date-text">
                      Posted On 25 Jul, 09:00 Am
                    </div>
                    <div class="advertisement-tags-list">
                      <div class="advertisement-tags-item">Senior Care</div>
                      <div class="advertisement-tags-item">Home Care</div>
                      <div class="advertisement-tags-item">Full Time</div>
                    </div>

                    <div class="advertisement-desc">
                      <p>
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                        Phasellus Gravida Ut Ipsum Quis Mattis. Donec Ut
                        Tincidunt Nunc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="advertisement-item-card">
                  <div className="advertisement-item-card-image">
                    <img src={advertisementImage} alt="" />
                  </div>
                  <div className="advertisement-item-card-content">
                    <div class="strip-text">Active</div>
                    <div class="title-text">
                      Looking For Home Care For Seniors
                    </div>
                    <div class="advertisement-date-text">
                      Posted On 25 Jul, 09:00 Am
                    </div>
                    <div class="advertisement-tags-list">
                      <div class="advertisement-tags-item">Senior Care</div>
                      <div class="advertisement-tags-item">Home Care</div>
                      <div class="advertisement-tags-item">Full Time</div>
                    </div>

                    <div class="advertisement-desc">
                      <p>
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                        Phasellus Gravida Ut Ipsum Quis Mattis. Donec Ut
                        Tincidunt Nunc.
                      </p>
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
