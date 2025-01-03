import { Speedometer } from "@phosphor-icons/react";
import React from "react";
import { NavLink } from "react-router-dom";

const DashboardSidebarLinks = () => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to="/">
        <i>
          <Speedometer weight="duotone" />
        </i>
        <h5>Dashboard</h5>
      </NavLink>
    </li>
  );
};

export default DashboardSidebarLinks;
