import React from "react";
import Face1 from "../../../assets/admin/images/face1.jpg";

const Request = () => {
  return (
    <>
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <a className="btn-back" href="care-assessment.html">
              <i className="mdi mdi-arrow-left-thin"></i>
            </a>
            Care Provider Requests
          </h3>
        </div>
        <div className="">
          <div className="row mt-3">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-4 dropdown-select">
                      <select className="form-select">
                        <option>Georgia</option>
                        <option></option>
                      </select>
                    </div>
                    <div className="col-lg-4 dropdown-select">
                      <select className="form-select">
                        <option>Senior Care</option>
                        <option></option>
                      </select>
                    </div>
                    <div className="col-lg-4">
                      <div className="d-flex">
                        <div className="w-100">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by User Name"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                            <div className="input-group-prepend">
                              <i className="input-group-text border-0 mdi mdi-magnify"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive mt-4">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Name</th>
                          <th>Email ID</th>
                          <th>Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="row">
                            <input className="form-check-input" type="checkbox" />
                          </td>
                          <td className="care-for-profile-img ">
                            <img
                              className="me-2"
                              src={Face1}
                              alt="image"
                            />
                            Family Care Services Pvt Ltd{" "}
                          </td>
                          <td>Johnsmith@gmail.com</td>
                          <td>
                            <i className="mdi mdi-star-outline"></i> 4.2
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">
                            <input className="form-check-input" type="checkbox" />
                          </td>
                          <td className="care-for-profile-img ">
                            <img
                              className="me-2"
                              src={Face1}
                              alt="image"
                            />
                            Good Care Services{" "}
                          </td>
                          <td>Johnsmith@gmail.com</td>
                          <td>
                            <i className="mdi mdi-star-outline"></i> 4.2
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">
                            <input className="form-check-input" type="checkbox" />
                          </td>
                          <td className="care-for-profile-img ">
                            <img
                              className="me-2"
                              src={Face1}
                              alt="image"
                            />
                            Family Care Services Pvt Ltd{" "}
                          </td>
                          <td>Johnsmith@gmail.com</td>
                          <td>
                            <i className="mdi mdi-star-outline"></i> 4.2
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-end"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;
