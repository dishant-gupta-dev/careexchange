import React from "react";
import { useLocation, Link } from "react-router-dom";
import { routes } from "../../utlis/staff/routes.utlis";

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
                  to={routes.advertisement}
                  className={
                    [routes.advertisement].includes(location.pathname)
                      ? "wshomelink active"
                      : "wshomelink"
                  }
                >
                  <span class="wsmenuicon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_422_11709)">
                        <path
                          d="M10.75 7.4989V18.8117C10.7499 18.9351 10.7194 19.0565 10.6612 19.1652C10.603 19.274 10.5189 19.3667 10.4163 19.4352L9.385 20.1223C9.28497 20.189 9.17037 20.2307 9.05087 20.2438C8.93137 20.257 8.81046 20.2412 8.69833 20.1978C8.58621 20.1544 8.48616 20.0847 8.40661 19.9946C8.32706 19.9044 8.27035 19.7965 8.24125 19.6798L7 14.9989"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M22 18.7489C22 18.8917 21.9591 19.0316 21.8823 19.152C21.8055 19.2724 21.696 19.3684 21.5665 19.4287C21.437 19.4889 21.293 19.511 21.1514 19.4922C21.0098 19.4734 20.8765 19.4146 20.7672 19.3226C15.8547 15.2014 10.75 14.9989 10.75 14.9989H7C6.00544 14.9989 5.05161 14.6038 4.34835 13.9005C3.64509 13.1973 3.25 12.2434 3.25 11.2489C3.25 10.2543 3.64509 9.3005 4.34835 8.59724C5.05161 7.89398 6.00544 7.49889 7 7.49889H10.75C10.75 7.49889 15.8547 7.29639 20.7672 3.17607C20.8764 3.08418 21.0096 3.02537 21.1511 3.00655C21.2926 2.98773 21.4366 3.00968 21.566 3.06984C21.6955 3.12999 21.8051 3.22584 21.882 3.34612C21.9588 3.46641 21.9998 3.60614 22 3.74889V18.7489Z"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_422_11709">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span class="wsmenutext">Advertisement</span>
                </Link>
              </li>

              <li aria-haspopup="true">
                <Link
                  to={routes.networkDirectory}
                  className={
                    [routes.networkDirectory].includes(location.pathname)
                      ? "wshomelink active"
                      : "wshomelink"
                  }
                >
                  <span class="wsmenuicon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 16V19"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 23C13.1046 23 14 22.1046 14 21C14 19.8954 13.1046 19 12 19C10.8954 19 10 19.8954 10 21C10 22.1046 10.8954 23 12 23Z"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 21H14"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 21H6"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19 8.30005V12.5C19 15.3 18.3 16 15.5 16H8.5C5.7 16 5 15.3 5 12.5V5.5C5 2.7 5.7 2 8.5 2H9.54999C10.6 2 10.83 2.30997 11.23 2.83997L12.28 4.23999C12.55 4.58999 12.7 4.80005 13.4 4.80005H15.5C18.3 4.80005 19 5.50005 19 8.30005Z"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                      />
                    </svg>
                  </span>
                  <span class="wsmenutext">Network Directory</span>
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
                  <i className="fa fa-angle-down"></i>
                </a>
                <ul className="sub-menu">
                  <li aria-haspopup="true">
                    <Link
                      to={routes.calendar}
                      className={
                        [routes.calendar].includes(location.pathname)
                          ? "wshomelink active"
                          : "wshomelink"
                      }
                    >
                      Calendar
                    </Link>
                  </li>
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
