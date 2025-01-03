import { HandCoins, Minus } from "@phosphor-icons/react";
import React from "react";
import { NavLink } from "react-router-dom";

const FinanceSidebarLinks = () => {
  return (
    <li className="nav-item">
      <NavLink
        className="nav-link"
        to="/finance"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i>
          <HandCoins weight="duotone" />
        </i>
        <h5>Finance</h5>
      </NavLink>
      <ul className="dropdown-menu">
        <li>
          <NavLink className="dropdown-item" to="/finance/dashboard">
            <span>
              <Minus />
            </span>
            dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to="/finance/incentive">
            <span>
              <Minus />
            </span>
            incentive
          </NavLink>
        </li>
      </ul>
    </li>
  );
};

export default FinanceSidebarLinks;
