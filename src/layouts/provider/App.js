import React from "react";
import { Outlet } from "react-router-dom";
import FirstHeader from "./FirstHeader";
import SecondHeader from "./SecondHeader";
import "../../assets/provider/css/webslidemenu.css";
import "../../assets/provider/css/header-footer.css";
import "../../assets/provider/css/calendar.css";
import "../../assets/provider/css/care-jobs.css";
import "../../assets/provider/css/home.css";
import "../../assets/provider/css/carenetwork.css";
import "../../assets/provider/css/findcare.css";
import "../../assets/provider/css/messages.css";
import "../../assets/provider/css/myjobs.css";
import "../../assets/provider/css/newsletter.css";
import "../../assets/provider/css/profile.css";
import "../../assets/provider/css/subscription.css";

export const ProviderLayout = () => {
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
