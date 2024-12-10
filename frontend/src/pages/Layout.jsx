import React from "react";
import { Outlet } from "react-router-dom";
import NewTopNavBar from "../components/NewTopNavBar";
import NewFooter from "../components/NewFooter";

const Layout = () => {
  return (
    <>
      <NewTopNavBar />
      <Outlet />
      <NewFooter />
    </>
  );
};

export default Layout;
