import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import "../../assets/css/style.css";
import "../../assets/css/mycss.css";
import "../../assets/vendors/mdi/css/materialdesignicons.min.css";
import "../../assets/vendors/ti-icons/css/themify-icons.css";
import "../../assets/vendors/css/vendor.bundle.base.css";
import "../../assets/vendors/font-awesome/css/font-awesome.min.css";

export const AdminLayout = () => {
  const [sidebar, setSidebar] = useState(false);

  const getSidebarToggled = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className={sidebar ? "container-scroller sidebar-icon-only" : "container-scroller"}>
        <Header sidebar={getSidebarToggled} />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
