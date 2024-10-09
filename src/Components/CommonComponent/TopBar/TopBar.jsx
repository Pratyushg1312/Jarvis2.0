import React from "react";
import Avatar from "@mui/material/Avatar";
import { GearSix, MagnifyingGlass, SignOut, User } from "@phosphor-icons/react";

const TopBar = () => {
  return (
    <div className="topBar">
      <div className="sidebarToggle">
        <label htmlFor="toggle-sidebar" className="toggle-sidebar-label">
          <i></i>
          <i></i>
          <i></i>
        </label>
      </div>
      <nav className="navbar navbar-expand-sm">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbarRight">
            <div className="navSearch">
              <span>
                <MagnifyingGlass />
              </span>
              <input
                type="search"
                name="search"
                className="form-control"
                placeholder="Search here . . ."
              ></input>
            </div>
            <div className="dropdown userDropdown">
              <a
                className="dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Avatar alt="Avatar" src="./assets/images/avatar/anmol.jpeg" />
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
              </a>

              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    <span>
                      <User />
                    </span>
                    My profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span>
                      <GearSix />
                    </span>
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span>
                      <SignOut />
                    </span>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
