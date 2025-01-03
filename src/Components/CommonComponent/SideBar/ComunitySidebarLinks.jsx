import { UsersThree } from "@phosphor-icons/react";
import React from "react";

const ComunitySidebarLinks = () => {
  return (
    <li className="nav-item">
      <a className="nav-link" href="#">
        <i>
          <UsersThree weight="duotone" />
        </i>
        <h5>Community</h5>
      </a>
    </li>
  );
};

export default ComunitySidebarLinks;
