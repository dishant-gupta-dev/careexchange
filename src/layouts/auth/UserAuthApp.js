import React from "react";
import { Outlet } from "react-router-dom";
import "../../assets/user/css/auth.css";

export const UserAuthApp = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
