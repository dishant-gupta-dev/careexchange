import React from "react";
import { Outlet } from "react-router-dom";
import FirstHeader from "./FirstHeader";
import SecondHeader from "./SecondHeader";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import "../../assets/user/css/webslidemenu.css";
import "../../assets/user/css/header-footer.css";
import "../../assets/user/css/advertisement.css";
import "../../assets/user/css/calendar.css";
import "../../assets/user/css/carenetwork.css";
import "../../assets/user/css/findcare.css";
import "../../assets/user/css/messages.css";
import "../../assets/user/css/myjobs.css";
import "../../assets/user/css/newsletter.css";
import "../../assets/user/css/profile.css";
import "../../assets/user/css/subscription.css";

export const UserLayout = () => {
  return (
    <>
      <div class="header">
        <FirstHeader />
        <SecondHeader />
      </div>
      <div class="main-wrapper">
        <Outlet />
      </div>
    </>
  );
};
