import React from "react";
import { Outlet } from "react-router-dom";
import "../../assets/admin/css/style.css";

export const AuthApp = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
