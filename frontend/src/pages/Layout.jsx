import React from "react";
import { Outlet } from "react-router-dom";
import NewTopNavBar from "../components/NewTopNavBar";
import NewFooter from "../components/NewFooter";
import ProtectedRoute from "../components/ProtectedRoute";

const Layout = () => {
  return (
    <>
      <ProtectedRoute>
        <NewTopNavBar />
      </ProtectedRoute>
      <Outlet />
      <NewFooter />
    </>
  );
};

export default Layout;
