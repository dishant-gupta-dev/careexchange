import React, { useEffect, useState } from "react";
import Circle from "../../../assets/images/circle.svg";
import Icuser from "../../../assets/images/icuser.png";
import ActiveJob from "../../../assets/images/activejobs.png";
import PendingRequest from "../../../assets/images/pendingrequest.png";
import TotalEarning from "../../../assets/images/totalearning.png";
import SubsPlan from "../../../assets/images/subscriptionplan.png";
import NoImage from "../../../assets/images/no-image.jpg";
import BarChart from "./BarChart";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../utlis/routes.utlis";
import { api } from "../../../utlis/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";
import moment from "moment";
import { encode } from "base-64";

const Page = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    totalUserCount: 0,
    totalCareProviderCount: 0,
    totalCareStaffCount: 0,
    totalCareJobRequests: [],
    totalActiveJobsCount: 0,
    totalPendingJobsCount: 0,
    careNetwork: [],
    AdvertisementList: [],
  });
  const [loading, setLoading] = useState(false);

  const getDashboardData = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all dashboard => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setDashboard(response.data.data);
    } else
      setDashboard({
        totalUserCount: 0,
        totalCareProviderCount: 0,
        totalCareStaffCount: 0,
        totalCareJobRequests: [],
        totalActiveJobsCount: 0,
        totalPendingJobsCount: 0,
        careNetwork: [],
        AdvertisementList: [],
      });
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData(api.dashboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Dashboard</h3>
        </div>
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-danger card-img-holder text-white">
              <div className="card-body">
                <img
                  src={Circle}
                  className="card-img-absolute"
                  alt="circle-image"
                />
                <h4 className="font-weight-normal mb-3">
                  Total Registered Users
                  <img className="card-user" src={Icuser} alt="" height={40} />
                </h4>
                <h2 className="mb-5"><Link to={routes.userManagement}>{dashboard.totalUserCount ?? 0}</Link></h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-light-blue card-img-holder text-white">
              <div className="card-body">
                <img
                  src={Circle}
                  className="card-img-absolute"
                  alt="circle-image"
                />
                <h4 className="font-weight-normal mb-3">
                  Total Registered Care Provider
                  <img className="card-user" src={Icuser} alt="" height={40} />
                </h4>
                <h2 className="mb-5">
                  <Link to={routes.provider}>{dashboard.totalCareProviderCount ?? 0}</Link>
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-dark-blue card-img-holder text-white">
              <div className="card-body">
                <img
                  src={Circle}
                  className="card-img-absolute"
                  alt="circle-image"
                />
                <h4 className="font-weight-normal mb-3">
                  Total Registered Care Staff
                  <img className="card-user" src={Icuser} alt="" height={40} />
                </h4>
                <h2 className="mb-5"><Link to={routes.jobOpportunities}>{dashboard.totalCareStaffCount ?? 0}</Link></h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container p-4" style={{ background: "#fff" }}>
          <div className="row">
            <div className="col-md-6 align-self-center d-flex">
              <h4 className="card-title float-start">Care Job Requests</h4>
            </div>
            <div className="col-md-6 align-items-center d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-gradient-primary"
                onClick={() => navigate(routes.careJob)}
              >
                View All
              </button>
            </div>
            <div className="col-md-9 col-lg-9 mt-4">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th> Job ID </th>
                      <th> Status </th>
                      <th> Start Date </th>
                      <th> Time </th>
                      <th> Repeat Weekly </th>
                      <th> View Job Details </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.totalCareJobRequests.length !== 0 ? (
                      dashboard.totalCareJobRequests.map((ele, indx) => {
                        return (
                          <tr>
                            <td className="text-capitalize">
                              {ele.first_name ?? "NA"}{" "}
                            </td>
                            <td>{ele.job_id ?? "NA"} </td>
                            <td>{ele.request_status ?? "NA"}</td>
                            <td>
                              {" "}
                              {moment(ele.start_date).format("MM-DD-yyyy")}{" "}
                            </td>
                            <td>
                              {ele.start_time} -{ele.end_time}
                            </td>
                            <td>
                              Every Week &nbsp;
                              {ele?.days?.length !== 0
                                ? ele?.days?.map((element, index) => {
                                    return (
                                      <label
                                        key={index}
                                        className="badge badge-gradient-success mx-1"
                                      >
                                        {element}
                                      </label>
                                    );
                                  })
                                : null}
                            </td>
                            <td>
                              <Link
                                to={`${routes.careJobDetails}/${encode(
                                  ele.id
                                )}`}
                              >
                                <label style={{cursor: "pointer"}} className="badge badge-gradient-success">
                                  <i className="fa fa-eye"></i>
                                </label>
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="text-center">
                        <td colSpan="7">
                          <div>
                            <p>No record found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3 col-lg-3">
              <div className="row">
                <div className="col-md-12 mt-4">
                  <div className="card">
                    <div className="card bg-card-payment-1 card-img-holder text-dark position-relative">
                      <div className="card-body">
                        <h6 className="font-weight-normal mb-4">Active Jobs</h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <h2 className="mb-0">
                            <Link to={routes.careJob}>{dashboard.totalActiveJobsCount ?? 0}</Link>
                          </h2>
                          <div className="active-jobs-img">
                            <img src={ActiveJob} alt="" height={60} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-2">
                  <div className="card">
                    <div className="card bg-card-payment-1 card-img-holder text-dark">
                      <div className="card-body">
                        <h6 className="font-weight-normal mb-4">
                          Pending Requests
                        </h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <h2 className="mb-0">
                           <Link to={routes.careJob}>{dashboard.totalPendingJobsCount ?? 0}</Link>
                          </h2>
                          <div className="active-jobs-img">
                            <img src={PendingRequest} alt="" height={60} />{" "}
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
        <div className="container p-4 mt-3" style={{ background: "#fff" }}>
          <div className="row">
            <div className="col-md-12 mb-4">
              <h4 className="card-title float-start">Payments</h4>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12">
                  <div className="card bg-card-payment card-img-holder text-dark">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className="font-weight-normal mb-5">
                          Total Earning
                        </h6>
                        <img src={TotalEarning} alt="" height={40} />
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <h2 className="mb-0">$ 1795.00 </h2>
                        <h6 className="card-text">Mar, 2024</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <div className="card bg-card-payment card-img-holder text-dark">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className="font-weight-normal mb-5">
                          Total Subscription Plan Purchased
                        </h6>
                        <img src={SubsPlan} alt="" height={40} />
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <h2 className="mb-0">16434</h2>
                        <h6 className="card-text">Mar, 2024</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="card">
                <div className="">
                  <div className="clearfix">
                    <div
                      id="visit-sale-chart-legend"
                      className="rounded-legend legend-horizontal legend-top-right float-end"
                    ></div>
                  </div>
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 grid-margin">
            <div className="card p-4">
              <div className="">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Care Network</h4>
                  <div className="col-md-5 align-items-center d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-gradient-primary"
                      onClick={() => navigate(routes.jobOpportunities)}
                    >
                      View All
                    </button>
                  </div>
                </div>
                <div className="table-responsive mt-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Name </th>
                        <th> Job ID </th>
                        <th> Salary </th>
                        <th> Work Experience </th>
                        <th> View Details </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.careNetwork.length !== 0 ? (
                        dashboard.careNetwork.map((ele, indx) => {
                          return (
                            <tr key={indx}>
                              <td>{ele.title ?? "NA"}</td>
                              <td> {ele.job_id ?? "NA"} </td>
                              <td>{ele.pay_range ?? "NA"}/Annually</td>
                              <td>{ele.working_expirence ?? "NA"}</td>
                              <td>
                                <Link
                                  to={`${routes.jobOpportunityDetail}/${encode(
                                    ele.id
                                  )}`}
                                >
                                  <label style={{cursor: "pointer"}} className="badge badge-gradient-success">
                                    <i className="fa fa-eye"></i>
                                  </label>
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="text-center">
                          <td colSpan="5">
                            <div>
                              <p>No record found</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card p-4">
              <div className="">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Advertisement</h4>
                  <div className="col-md-5 align-items-center d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-gradient-primary"
                      onClick={() => navigate(routes.advertisement)}
                    >
                      View All
                    </button>
                  </div>
                </div>
                <div className="row mt-3">
                  {dashboard.AdvertisementList.length !== 0
                    ? dashboard.AdvertisementList.map((ele, indx) => {
                        return (
                          <div key={indx} className="col-4 pe-1 mb-3">
                            <div className="card card-light-bg">
                              {ele.image === null ||
                              ele.image === "" ||
                              ele.image === undefined ? (
                                <img
                                  src={NoImage}
                                  className="mb-2 mw-100 w-100 rounded"
                                  alt="image"
                                  height={190}
                                  width={250}
                                  style={{
                                    objectFit: "cover",
                                    objectPosition: "center",
                                  }}
                                />
                              ) : (
                                <img
                                  src={ele.image}
                                  height={190}
                                  width={250}
                                  className="mb-2 mw-100 w-100 rounded"
                                  alt="image"
                                  style={{
                                    objectFit: "cover",
                                    objectPosition: "center",
                                  }}
                                />
                              )}
                              <Link
                                to={routes.advertisementDetails+`/${encode(ele.id)}`}
                                className="d-flex justify-content-between align-items-center"
                              >
                                <p className="m-0">{ele.title ?? "NA"}</p>
                                <p className="mb-0">
                                  <i className="mdi mdi-arrow-right-thin"></i>
                                </p>
                              </Link>
                            </div>
                          </div>
                        );
                      })
                    : "No advertisement found"}
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
