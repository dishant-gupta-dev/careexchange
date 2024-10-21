import React from "react";
import { Outlet } from "react-router-dom";
import "../../assets/css/style.css";

export const AuthApp = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
