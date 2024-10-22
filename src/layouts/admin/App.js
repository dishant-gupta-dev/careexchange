import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import "../../assets/admin/css/style.css";
import "../../assets/admin/css/mycss.css";
import "../../assets/admin/vendors/mdi/css/materialdesignicons.min.css";
import "../../assets/admin/vendors/ti-icons/css/themify-icons.css";
import "../../assets/admin/vendors/css/vendor.bundle.base.css";
import "../../assets/admin/vendors/font-awesome/css/font-awesome.min.css";

export const AdminLayout = () => {
  const [sidebar, setSidebar] = useState(false);

  const getSidebarToggled = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className={sidebar ? "container-scroller sidebar-icon-only spr" : "container-scroller spr"} style={{color: "#000"}}>
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
