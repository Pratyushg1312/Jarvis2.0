import { Minus, Money } from "@phosphor-icons/react";
import React from "react";
import { NavLink } from "react-router-dom";
import GetDecodedToken from "../../../Utils/GetDecodedToken";

const SalesSidebarLinks = () => {
  const userRole = GetDecodedToken().role_id;

  return (
    <li className="nav-item">
      <NavLink
        className="nav-link dropdown-toggle"
        to="/sales"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i>
          <Money weight="duotone" />
        </i>
        <h5>Sales</h5>
      </NavLink>
      <ul className="dropdown-menu">
        <li>
          <NavLink className="dropdown-item" to="/sales/dashboard">
            <span>
              <Minus />
            </span>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to="/sales/account-overview">
            <span>
              <Minus />
            </span>
            Account
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to="/sales/closed-deal">
            <span>
              <Minus />
            </span>
            Closed Deal
          </NavLink>
        </li>
        <li>
          <NavLink
            className="dropdown-item"
            to={
              userRole === 1
                ? "/sales/incentive-dashboard"
                : "/sales/user-incentive"
            }
          >
            <span>
              <Minus />
            </span>
            Incentive
          </NavLink>
        </li>
      </ul>
    </li>
  );
};

export default SalesSidebarLinks;
