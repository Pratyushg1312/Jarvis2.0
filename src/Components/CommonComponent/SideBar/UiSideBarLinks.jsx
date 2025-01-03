import React from "react";
import { baseUrl } from "../../../Config";
import { NavLink } from "react-router-dom";
import { Code, Minus } from "@phosphor-icons/react";

const UiSideBarLinks = () => {
  return baseUrl && !baseUrl.includes("jarvis.work") ? (
    <li className="nav-item">
      <NavLink
        className="nav-link"
        to="/ui"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i>
          <Code weight="duotone" />
        </i>
        <h5>UI</h5>
      </NavLink>
      <ul className="dropdown-menu">
        <li>
          <NavLink className="dropdown-item" to="/ui/jarvis-cards">
            <span>
              <Minus />
            </span>
            Cards
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to="/ui/jarvis-buttons">
            <span>
              <Minus />
            </span>
            Buttons
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to="/ui/jarvis-forms">
            <span>
              <Minus />
            </span>
            Forms
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to={"/ui/jarvis-headers"}>
            <span>
              <Minus />
            </span>
            Headers
          </NavLink>
        </li>
      </ul>
    </li>
  ) : (
    <></>
  );
};

export default UiSideBarLinks;
