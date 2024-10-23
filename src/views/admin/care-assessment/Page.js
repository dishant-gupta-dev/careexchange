import React from "react";

const Page = () => {
  return (
    <>
      <div className="content-wrapper">
        <div className="care-title-header">
          <h2 className="heading-title">In-Home Care Assessment Requests</h2>
          <div className="cc-search-filter wd50">
            <div className="row g-2">
              <div className="col-md-6">
                <div className="form-group">
                  <button type="button" className="btn-gr">
                    Send Request to Care Providers
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group search-form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by User Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <span className="search-icon">
                    <i className="cc-input-group-text  mdi mdi-magnify"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="care-title-header">
          <div className="cc-search-filter wd100">
            <div className="row g-2">
              <div className="col-md-3">
                <div className="form-group">
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
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    id="exampleInputdate"
                    defaultValue="2019-12-18"
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group dropdown-select">
                  <select className="form-control">
                    <option>Georgia</option>
                    <option></option>
                  </select>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group dropdown-select">
                  <select className="form-control">
                    <option>Senior Care</option>
                    <option></option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cc-table-card">
          <div className="table-responsive">
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
                    <input className="form-check-input" type="checkbox" />
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
                    <input className="form-check-input" type="checkbox" />
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
                    <input className="form-check-input" type="checkbox" />
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
        </div>

        <div className="">
          <div className="row mt-3">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="d-flex justify-content-end"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
