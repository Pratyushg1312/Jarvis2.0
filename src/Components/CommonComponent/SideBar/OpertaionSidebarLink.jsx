import { Laptop } from "@phosphor-icons/react";
import React from "react";

const OpertaionSidebarLink = () => {
  return (
    <li className="nav-item">
      <a className="nav-link" href="#">
        <i>
          <Laptop weight="duotone" />
        </i>
        <h5>Operation</h5>
      </a>
    </li>
  );
};

export default OpertaionSidebarLink;
