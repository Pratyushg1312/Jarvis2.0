import { OfficeChair } from "@phosphor-icons/react";
import React from "react";
import { NavLink } from "react-router-dom";

const HumanResourceSidebarLinks = () => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" href="#">
        <i>
          <OfficeChair weight="duotone" />
        </i>
        <h5>Human Resource</h5>
      </NavLink>
    </li>
  );
};

export default HumanResourceSidebarLinks;
