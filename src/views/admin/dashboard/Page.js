import React, { useEffect, useState } from "react";
import Circle from "../../../assets/admin/images/circle.svg";
import Icuser from "../../../assets/admin/images/icuser.png";
import ActiveJob from "../../../assets/admin/images/activejobs.png";
import PendingRequest from "../../../assets/admin/images/pendingrequest.png";
import TotalEarning from "../../../assets/admin/images/totalearning.png";
import SubsPlan from "../../../assets/admin/images/subscriptionplan.png";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import BarChart from "./BarChart";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../utlis/admin/routes.utlis";
import { api } from "../../../utlis/admin/api.utlis";
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
        <div className="overview-section">
          <div className="row">
            <div className="col-md-4">
              <div className="card-overview">
                <div className="card-overview-image">
                  <img src={Icuser} alt="" height={80} />
                </div>
                <div className="card-overview-content">
                  <h4>Total Registered Users</h4>
                  <h2>
                    <Link to={routes.userManagement}>
                      {dashboard.totalUserCount ?? 0}
                    </Link>
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-overview">
                <div className="card-overview-image">
                  <img src={Icuser} alt="" height={80} />
                </div>
                <div className="card-overview-content">
                  <h4>Total Registered Care Provider</h4>
                  <h2>
                    <Link to={routes.provider}>
                      {dashboard.totalCareProviderCount ?? 0}
                    </Link>
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-overview">
                <div className="card-overview-image">
                  <img src={Icuser} alt="" height={80} />
                </div>
                <div className="card-overview-content">
                  <h4>Total Registered Care Staff</h4>
                  <h2>
                    <Link to={routes.jobOpportunities}>
                      {dashboard.totalCareStaffCount ?? 0}
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="requests-section">
          <div className="care-title-header">
            <h2 className="heading-title">Care Job Requests</h2>
            <div className="search-filter wd30">
              <button
                type="button"
                className="btn-gr"
                onClick={() => navigate(routes.careJob)}
              >
                View All
              </button>
            </div>
          </div>
          <div className="requests-content">
            <div className="row">
              <div className="col-md-9 col-lg-9 mt-3">
                <div className="requests-table-card">
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
                                  {moment(ele.start_date).format(
                                    "MM-DD-yyyy"
                                  )}{" "}
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
                                    <label
                                      style={{ cursor: "pointer" }}
                                      className="badge badge-gradient-success"
                                    >
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
              </div>
              <div className="col-md-3 col-lg-3  mt-3">
                <div className="activejbs-card">
                  <div className="activejbs-card-content">
                    <h6>Active Jobs</h6>
                    <h2>
                      <Link to={routes.careJob}>
                        {dashboard.totalActiveJobsCount ?? 0}
                      </Link>
                    </h2>
                  </div>
                  <div className="activejbs-card-image">
                    <img src={ActiveJob} alt="" height={60} />
                  </div>
                </div>

                <div className="activejbs-card">
                  <div className="activejbs-card-content">
                    <h6>Pending Requests</h6>
                    <h2>
                      <Link to={routes.careJob}>
                        {dashboard.totalPendingJobsCount ?? 0}
                      </Link>
                    </h2>
                  </div>
                  <div className="activejbs-card-image">
                    <img src={PendingRequest} alt="" height={60} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="advertisement-section">
          <div className="care-title-header">
            <h2 className="heading-title">Payments</h2>
            <div className="search-filter wd30"></div>
          </div>
          <div className="payments-content">
            <div className="row">
              <div className="col-md-5">
                <div className="payments-overview">
                  <div className="payments-overview-image">
                    <img src={TotalEarning} alt="" height={40} />
                  </div>
                  <div className="payments-overview-content">
                    <h4>Total Earning</h4>
                    <h2>$ 1795.00 </h2>
                    <h6 className="card-text">Mar, 2024</h6>
                  </div>
                </div>

                <div className="payments-overview">
                  <div className="payments-overview-image">
                    <img src={TotalEarning} alt="" height={40} />
                  </div>
                  <div className="payments-overview-content">
                    <h4>Total Earning</h4>
                    <h2>$ 1795.00 </h2>
                    <h6 className="card-text">Mar, 2024</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="barchartcard">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="advertisement-section">
          <div className="care-title-header">
            <h2 className="heading-title">Care Network</h2>
            <div className="search-filter wd30">
              <button
                type="button"
                className="btn-gr"
                onClick={() => navigate(routes.jobOpportunities)}
              >
                View All
              </button>
            </div>
          </div>
          <div className="requests-table-card">
            <div className="table-responsive">
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
                              <label
                                style={{ cursor: "pointer" }}
                                className="badge badge-gradient-success"
                              >
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

        <div className="advertisement-section">
          <div className="care-title-header">
            <h2 className="heading-title">Advertisement</h2>
            <div className="search-filter wd30">
              <button
                type="button"
                className="btn-gr"
                onClick={() => navigate(routes.advertisement)}
              >
                View All
              </button>
            </div>
          </div>

          <div className="row g-2">
            {dashboard.AdvertisementList.length !== 0
              ? dashboard.AdvertisementList.map((ele, indx) => {
                  return (
                    <div key={indx} className="col-md-4">
                      <div className="advertisement-card">
                        <div className="advertisement-user-image">
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
                        </div>
                        <div className="advertisement-content">
                          <h4>{ele.title ?? "NA"}</h4>
                          <Link
                            to={
                              routes.advertisementDetails + `/${encode(ele.id)}`
                            }
                            className="viewmorebtn"
                          >
                            View More
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              : "No advertisement found"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
