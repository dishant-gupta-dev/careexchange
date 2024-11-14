import React from "react";
import { Outlet } from "react-router-dom";
import "../../assets/provider/css/auth.css";

export const ProviderAuthApp = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
