import React from "react";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import ThemeBar from "../ThemeBar/ThemeBar";

const Layout = () => {
  return (
    <>
      <TopBar />
      <div className="pageWrapper">
        <SideBar />
        <div className="pageBody">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
