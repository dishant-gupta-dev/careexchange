import React from "react";

const Page = () => {
  return (
    <>
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">In-Home Care Assessment Requests</h3>
          <div className="d-flex">
            <div className="">
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
        <div className="">
          <div className="row mt-3">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="row d-flex align-items-center">
                    <div className="col-lg-2">
                      <div className="d-flex align-items-center btn-select-all">
                        <input
                          className="me-2"
                          type="radio"
                          name="imgsel"
                          defaultValue=""
                        />
                        <p className="mb-0">Select All</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <input
                        type="date"
                        className="form-control"
                        id="exampleInputdate"
                        defaultValue="2019-12-18"
                      />
                    </div>
                    <div className="col-lg-3 dropdown-select">
                      <select className="form-select">
                        <option>Georgia</option>
                        <option></option>
                      </select>
                    </div>
                    <div className="col-lg-3 dropdown-select">
                      <select className="form-select">
                        <option>Senior Care</option>
                        <option></option>
                      </select>
                    </div>
                  </div>
                  <div className="table-responsive mt-4">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Name</th>
                          <th>Email ID</th>
                          <th>Phone Number</th>
                          <th>View Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="row">
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                          </td>
                          <td> Michal Jeff </td>
                          <td>Johnsmith@gmail.com</td>
                          <td>(817) 237-7205</td>
                          <td>
                            <label className="badge badge-gradient-success">
                              {" "}
                              <i className="fa fa-eye"></i>{" "}
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                          </td>
                          <td> Michal Jeff </td>
                          <td>Johnsmith@gmail.com</td>
                          <td>(817) 237-7205</td>
                          <td>
                            <label className="badge badge-gradient-success">
                              {" "}
                              <i className="fa fa-eye"></i>{" "}
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                          </td>
                          <td> Michal Jeff </td>
                          <td>Johnsmith@gmail.com</td>
                          <td>(817) 237-7205</td>
                          <td>
                            <label className="badge badge-gradient-success">
                              {" "}
                              <i className="fa fa-eye"></i>{" "}
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-gradient-primary mt-4"
                    >
                      Send Request to Care Providers
                    </button>
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
