import React from "react";
import Face1 from "../../../assets/admin/images/face1.jpg";

const Details = () => {
  return (
    <>
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <a className="btn-back" href="care-assessment.html">
              <i className="mdi mdi-arrow-left-thin"></i>
              Care Assessment Details
            </a>
          </h3>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card statistics-card-1 card-img-holder text-dark position-relative">
                <div className="card-body align-items-center d-flex">
                  <div className="d-flex justify-content-between w-100">
                    <div className="care-for-profile-img me-3 d-flex align-items-center">
                      <img className="me-3" src={Face1} alt="image" />
                      <div className="">
                        <h5 className="">Michal Jeff</h5>
                      </div>
                    </div>
                    <div className="d-flex align-items-center profile-name-card-details">
                      <div className="p-3">
                        <p className="m-0">
                          <label>Email ID :</label> Johnsmith@gmail.com
                        </p>
                        <p className="mb-2">
                          <label>Phone No :</label> (817) 237-7205
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-3">
            <div className="iq-card">
              <div className="iq-card-body">
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="form-group col-md-4 mb-0">
                        <label>Address</label>
                        <p>
                          {" "}
                          <label className="badge badge-gradient-success me-2">
                            {" "}
                            <i className="mdi mdi-map-marker-radius-outline menu-icon"></i>
                          </label>{" "}
                          4233 Benson Park Drive, Young Atlanta, 55394
                        </p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="lname">Prefer To Be Continued</label>
                        <p>Phone</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Preferred Date</label>
                        <p>25-08-2024</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Time</label>
                        <p>09:00 AM</p>
                      </div>

                      <div className="form-group col-md-4 mb-0">
                        <label>Type Of Care</label>
                        <p> In-Home Care</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="lname">Who Needs Care</label>
                        <p>Female</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Age</label>
                        <p>76</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Relationship</label>
                        <p>Parent, Grandparents</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
