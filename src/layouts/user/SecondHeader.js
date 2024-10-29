import React from "react";
import { useLocation, Link } from "react-router-dom";
import { routes } from "../../utlis/user/routes.utlis";

const SecondHeader = () => {
  const location = useLocation();
  return (
    <>
      <div className="bottom-header">
        <div className="container-fluid">
          <div className="wsmobileheader clearfix">
            <a id="wsnavtoggle" className="wsanimated-arrow">
              <span></span>
            </a>
            <span className="smllogo">
              <img src="images/menu-logo.png" width="80" alt="" />
            </span>
            <div className="wssearch clearfix">
              <i className="wssearchicon fas fa-search"></i>
              <i className="wscloseicon fas fa-times"></i>
              <div className="wssearchform clearfix">
                <form>
                  <input type="text" placeholder="Search Here" />
                </form>
              </div>
            </div>
          </div>

          <nav className="wsmenu clearfix">
            <ul className="wsmenu-list">
              <li aria-haspopup="true">
                <Link
                  to={routes.dashboard}
                  className={
                    [routes.dashboard].includes(location.pathname)
                      ? "wshomelink active"
                      : "wshomelink"
                  }
                >
                  <span className="wsmenuicon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M12 17.99V14.99"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </svg>
                  </span>
                  <span className="wsmenutext"> Home</span>
                </Link>
              </li>

              <li aria-haspopup="true">
                <Link
                  to={routes.message}
                  className={
                    [routes.message].includes(location.pathname)
                      ? "wshomelink active"
                      : "wshomelink"
                  }
                >
                  <span className="wsmenuicon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M15.9965 11H16.0054"
                        stroke="#292D32"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M11.9955 11H12.0045"
                        stroke="#292D32"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M7.99451 11H8.00349"
                        stroke="#292D32"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </svg>
                  </span>
                  <span className="wsmenutext"> Messages</span>
                </Link>
              </li>

              <li aria-haspopup="true">
                <Link
                  to={routes.myJobs}
                  className={
                    [routes.myJobs].includes(location.pathname)
                      ? "wshomelink active"
                      : "wshomelink"
                  }
                >
                  <span className="wsmenuicon">
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M8.05981 2V5"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M16.0598 2V5"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M16.0598 3.5C19.3898 3.68 21.0598 4.95 21.0598 9.65V15.83C21.0598 19.95 20.0598 22.01 15.0598 22.01H9.05981C4.05981 22.01 3.05981 19.95 3.05981 15.83V9.65C3.05981 4.95 4.72981 3.69 8.05981 3.5H16.0598Z"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M20.8098 8.59998H3.30981"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M7.80981 14.9999L10.6398 17.8299L16.3098 12.1699"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </svg>
                  </span>
                  <span className="wsmenutext"> My jobs</span>
                </Link>
              </li>

              <li aria-haspopup="true">
                <Link
                  to={routes.careNetwork}
                  className={
                    [routes.careNetwork].includes(location.pathname)
                      ? "wshomelink active"
                      : "wshomelink"
                  }
                >
                  <span className="wsmenuicon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M16.96 6.16998C18.96 7.55998 20.34 9.76998 20.62 12.32"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M3.48999 12.37C3.74999 9.82997 5.10999 7.61997 7.08999 6.21997"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M8.18994 20.94C9.34994 21.53 10.6699 21.86 12.0599 21.86C13.3999 21.86 14.6599 21.56 15.7899 21.01"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M12.06 7.70001C13.5954 7.70001 14.84 6.45537 14.84 4.92001C14.84 3.38466 13.5954 2.14001 12.06 2.14001C10.5247 2.14001 9.28003 3.38466 9.28003 4.92001C9.28003 6.45537 10.5247 7.70001 12.06 7.70001Z"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M4.83005 19.92C6.3654 19.92 7.61005 18.6753 7.61005 17.14C7.61005 15.6046 6.3654 14.36 4.83005 14.36C3.2947 14.36 2.05005 15.6046 2.05005 17.14C2.05005 18.6753 3.2947 19.92 4.83005 19.92Z"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M19.1699 19.92C20.7052 19.92 21.9499 18.6753 21.9499 17.14C21.9499 15.6046 20.7052 14.36 19.1699 14.36C17.6345 14.36 16.3899 15.6046 16.3899 17.14C16.3899 18.6753 17.6345 19.92 19.1699 19.92Z"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </svg>
                  </span>
                  <span className="wsmenutext"> Care Network</span>
                </Link>
              </li>

              <li aria-haspopup="true">
                <Link
                  to={routes.profile}
                  className={
                    [routes.profile].includes(location.pathname)
                      ? "wshomelink active"
                      : "wshomelink"
                  }
                >
                  <span className="wsmenuicon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M12.1202 12.78C12.0502 12.77 11.9602 12.77 11.8802 12.78C10.1202 12.72 8.72021 11.28 8.72021 9.50998C8.72021 7.69998 10.1802 6.22998 12.0002 6.22998C13.8102 6.22998 15.2802 7.69998 15.2802 9.50998C15.2702 11.28 13.8802 12.72 12.1202 12.78Z"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </svg>
                  </span>
                  <span className="wsmenutext"> Profile</span>
                </Link>
              </li>

              <li aria-haspopup="true">
                <Link
                  to={routes.calendar}
                  className={
                    [routes.calendar].includes(location.pathname)
                      ? "wshomelink active"
                      : "wshomelink"
                  }
                >
                  <span className="wsmenuicon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M8 2V5"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M16 2V5"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M3.5 9.08997H20.5"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M15.6947 13.7H15.7037"
                        stroke="#132A3A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M15.6947 16.7H15.7037"
                        stroke="#132A3A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M11.9955 13.7H12.0045"
                        stroke="#132A3A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M11.9955 16.7H12.0045"
                        stroke="#132A3A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M8.29431 13.7H8.30329"
                        stroke="#132A3A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M8.29431 16.7H8.30329"
                        stroke="#132A3A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </svg>
                  </span>
                  <span className="wsmenutext"> Calendar</span>
                </Link>
              </li>

              <li aria-haspopup="true">
                <Link
                  to={routes.subscriptionPlan}
                  className={
                    [routes.subscriptionPlan].includes(location.pathname)
                      ? "wshomelink active"
                      : "wshomelink"
                  }
                >
                  <span className="wsmenuicon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M11.74 17.75H17.66C17.57 17.83 17.48 17.9 17.39 17.98L13.12 21.18C11.71 22.23 9.41001 22.23 7.99001 21.18L3.71001 17.98C2.77001 17.28 2 15.73 2 14.56V7.14998C2 5.92998 2.93001 4.57998 4.07001 4.14998L9.05 2.27999C9.87 1.96999 11.23 1.96999 12.05 2.27999L17.02 4.14998C17.97 4.50998 18.78 5.50999 19.03 6.52999H11.73C11.51 6.52999 11.31 6.54 11.12 6.54C9.27 6.65 8.78999 7.31998 8.78999 9.42998V14.86C8.79999 17.16 9.39001 17.75 11.74 17.75Z"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M8.7998 11.22H21.9998"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M21.9998 9.42001V14.97C21.9798 17.19 21.3698 17.74 19.0598 17.74H11.7398C9.38981 17.74 8.7998 17.15 8.7998 14.84V9.41C8.7998 7.31 9.27981 6.63999 11.1298 6.51999C11.3198 6.51999 11.5198 6.51001 11.7398 6.51001H19.0598C21.4098 6.52001 21.9998 7.10001 21.9998 9.42001Z"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M11.3198 15.26H12.6498"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M14.75 15.26H18.02"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </svg>
                  </span>
                  <span className="wsmenutext"> Subscription Plan</span>
                </Link>
              </li>

              <li aria-haspopup="true">
                <Link
                  to={routes.newsletter}
                  className={
                    [routes.newsletter].includes(location.pathname)
                      ? "wshomelink active"
                      : "wshomelink"
                  }
                >
                  <span className="wsmenuicon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                        stroke="#132A3A"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </svg>
                  </span>
                  <span className="wsmenutext"> Newsletter</span>
                </Link>
              </li>
              <li aria-haspopup="true">
                <a href="#">
                  <span className="wsmenuicon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M15.9965 12H16.0054"
                        stroke="#292D32"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M11.9955 12H12.0045"
                        stroke="#292D32"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M7.99451 12H8.00349"
                        stroke="#292D32"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </svg>
                  </span>
                  <span className="wsmenutext"> More</span>
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul className="sub-menu">
                  <li aria-haspopup="true">
                    <a href="#">About US</a>
                  </li>
                  <li aria-haspopup="true">
                    <a href="#">Terms & Condition</a>
                  </li>
                  <li aria-haspopup="true">
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SecondHeader;
