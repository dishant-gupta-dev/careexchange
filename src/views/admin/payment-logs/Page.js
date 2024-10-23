import React from "react";
import SubsPlan from "../../../assets/admin/images/subscriptionplan.png";
import Status6 from "../../../assets/admin/images/imgstatus6.svg";
import Status4 from "../../../assets/admin/images/imgstatus4.svg";
import Icplan from "../../../assets/admin/images/icplan.png";

const Page = () => {
  return (
    <>
      <div className="content-wrapper">
        <div className="care-title-header">
          <h2 className="heading-title">Payment Logs</h2>
          <div className="cc-search-filter">
            <div className="row g-2">
              <div className="col-md-12">
                <div className="form-group search-form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
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

        <div className="payment-overview-section mb-3">
          <div className="row">
            <div className="col-md-3">
              <div className="card ">
                <div className="card statistics-card-1 card-img-holder bg-brand-color-1 position-relative">
                  <div className="card-body">
                    <img src={Status6} alt="img" className=" img-bg" />
                    <h6 className="font-weight-normal mb-4 text-light">
                      Total Subscription Payment
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="mb-0 text-light">$2450.00</h3>
                      <div className="active-jobs-img">
                        <img src={SubsPlan} alt="" height={44} />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card statistics-card-1  bg-brand-color-2 bg-card-payment-1 card-img-holder text-dark position-relative">
                  <div className="card-body">
                    <img
                      src={Status4}
                      alt="img"
                      className=" img-bg"
                      style={{ opacity: "0.3" }}
                    />
                    <h6 className="font-weight-normal mb-4">Plan A</h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="mb-0">$550.00</h3>
                      <div className="active-jobs-img">
                        <img src={Icplan} alt="" height={50} />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card statistics-card-1 bg-brand-color-3 bg-card-payment-1 card-img-holder text-dark position-relative">
                  <div className="card-body">
                    <img
                      src={Status4}
                      alt="img"
                      className="img-bg"
                      style={{ opacity: "0.3" }}
                    />
                    <h6 className="font-weight-normal mb-4">Plan B</h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="mb-0">$327.00</h3>
                      <div className="active-jobs-img">
                        <img src={Icplan} alt="" height={50} />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card statistics-card-1 bg-brand-color-4 bg-card-payment-1 card-img-holder text-dark position-relative">
                  <div className="card-body">
                    <img
                      src={Status4}
                      alt="img"
                      className=" img-bg"
                      style={{ opacity: "0.3" }}
                    />
                    <h6 className="font-weight-normal mb-4">Plan C</h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="mb-0">$327.00</h3>
                      <div className="active-jobs-img">
                        <img src={Icplan} alt="" height={50} />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cc-table-card">
          <div className="cc-search-filter">
            <div className="row g-2">
              <div className="col-md-3">
                <div className="form-group">
                  <select className="form-control">
                    <option>Current Month</option>
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last 1 Year</option>
                    <option>Last 2 Year</option>
                  </select>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <select className="form-control">
                    <option>Show all</option>
                    <option>Care Giver</option>
                    <option>Care Provider</option>
                  </select>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <select className="form-control">
                    <option>Show all</option>
                    <option>Subscription Payments</option>
                    <option>Featured Payments</option>
                    <option>Job Payments</option>
                    <option>Ads payments</option>
                  </select>
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
            </div>
          </div>
          <div className="table-responsive mt-2">
            <table className="table">
              <thead>
                <tr>
                  <th> Transaction ID </th>
                  <th> Plan Name</th>
                  <th> Care-Giver Name</th>
                  <th> Care-Provider Name </th>
                  <th> Amount Received </th>
                  <th> Purchased Order Date & Time</th>
                  <th> Auto Renewal Notice Date </th>
                  <th> Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SXK46272HD8</td>
                  <td> Plan A </td>
                  <td>Martin Jane</td>
                  <td>Family Care Services Pvt Ltd</td>
                  <td>$400.00</td>
                  <td>07-07-2024, 10:25:20</td>
                  <td>25-08-2024</td>
                  <td>
                    <label className="badge badge-gradient-success">
                      {" "}
                      Generate Purchase Order{" "}
                    </label>
                    <label className="badge badge-gradient-success">
                      {" "}
                      Send Auto Renewal Notice{" "}
                    </label>
                    <label className="badge badge-gradient-success">
                      {" "}
                      Subscription Agreement{" "}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>SXK46272HD8</td>
                  <td> Plan A </td>
                  <td>Martin Jane</td>
                  <td>Family Care Services Pvt Ltd</td>
                  <td>$400.00</td>
                  <td>07-07-2024, 10:25:20</td>
                  <td>25-08-2024</td>
                  <td>
                    <label className="badge badge-gradient-success">
                      {" "}
                      Generate Purchase Order{" "}
                    </label>
                    <label className="badge badge-gradient-success">
                      {" "}
                      Send Auto Renewal Notice{" "}
                    </label>
                    <label className="badge badge-gradient-success">
                      {" "}
                      Subscription Agreement{" "}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>SXK46272HD8</td>
                  <td> Plan A </td>
                  <td>Martin Jane</td>
                  <td>Family Care Services Pvt Ltd</td>
                  <td>$400.00</td>
                  <td>07-07-2024, 10:25:20</td>
                  <td>25-08-2024</td>
                  <td>
                    <label className="badge badge-gradient-success">
                      {" "}
                      Generate Purchase Order{" "}
                    </label>
                    <label className="badge badge-gradient-success">
                      {" "}
                      Send Auto Renewal Notice{" "}
                    </label>
                    <label className="badge badge-gradient-success">
                      {" "}
                      Subscription Agreement{" "}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
