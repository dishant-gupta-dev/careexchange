import React from "react";
import { routes } from "../../utlis/admin/routes.utlis";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Face1 from "../../assets/admin/images/face1.jpg";

const Sidebar = () => {
  const location = useLocation();
  // console.log(location);

  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <Link to={routes.dashboard} className="nav-link">
              <div className="nav-profile-image">
                <img src={Face1} alt="profile"></img>
                <span className="login-status online"></span>
              </div>
              <div className="nav-profile-text d-flex flex-column">
                <span className="font-weight-bold">Admin Profile</span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </Link>
          </li>
          <li
            className={
              [routes.dashboard].includes(location.pathname)
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={routes.dashboard}>
              <span className="menu-title">Dashboard</span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              [routes.userManagement, routes.userManagementDetail].includes(
                location.pathname
              )
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={routes.userManagement}>
              <span className="menu-title">User Management</span>
              <i className="mdi mdi-account-cog menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              [routes.provider].includes(location.pathname)
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={routes.provider}>
              <span className="menu-title">Provider/Staff Directory</span>
              <i className="mdi mdi-directions-fork menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              [routes.jobOpportunities].includes(location.pathname)
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={routes.jobOpportunities}>
              <span className="menu-title">Posted Job Opportunities</span>
              <i className="mdi mdi-post-outline menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              [routes.advertisement].includes(location.pathname)
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={routes.advertisement}>
              <span className="menu-title">Manage Advertisement</span>
              <i className="mdi mdi-advertisements menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              [routes.careJob].includes(location.pathname)
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={routes.careJob}>
              <span className="menu-title">Care Jobs </span>
              <i className="mdi mdi-text-box-search-outline menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              [routes.careAssessment].includes(location.pathname)
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={routes.careAssessment}>
              <span className="menu-title">Care Assessment Requests </span>
              <i className="mdi mdi-medical-bag menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              [routes.manageSubscriptionPlan].includes(location.pathname)
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={routes.manageSubscriptionPlan}>
              <span className="menu-title">Manage Subscription Plan </span>
              <i className="mdi mdi-calendar-text-outline menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              [routes.paymentLogs].includes(location.pathname)
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={routes.paymentLogs}>
              <span className="menu-title">Payment Logs </span>
              <i className="mdi mdi-currency-usd menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              [routes.master].includes(location.pathname)
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={routes.master}>
              <span className="menu-title">CMS</span>
              <i className="mdi mdi-file-account-outline menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              [routes.manageNewsletter].includes(location.pathname)
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={routes.manageNewsletter}>
              <span className="menu-title">Manage Newsletter </span>
              <i className="mdi mdi-email-open-multiple-outline menu-icon"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
