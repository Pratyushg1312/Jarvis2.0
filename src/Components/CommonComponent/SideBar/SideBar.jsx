import React from "react";
import {
  Buildings,
  CaretRight,
  HandCoins,
  Laptop,
  List,
  Minus,
  Money,
  OfficeChair,
  Speedometer,
  TreasureChest,
  UsersThree,
} from "@phosphor-icons/react";

const SideBar = () => {
  return (
    <div className="sideBar">
      <div className="sidebarToggle">
        <label htmlFor="toggle-sidebar" className="toggle-sidebar-label">
          <CaretRight />
        </label>
      </div>
      <div className="sideBarIn">
        <div className="sideBarContent">
          <div className="sidebarMenu">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  <i>
                    <Speedometer weight="duotone" />
                  </i>
                  <h5>Dashboard</h5>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i>
                    <List weight="duotone" />
                  </i>
                  <h5>Dropdown</h5>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      <span>
                        <Minus />
                      </span>
                      Dropdown menu one
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <span>
                        <Minus />
                      </span>
                      Dropdown menu two
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <span>
                        <Minus />
                      </span>
                      Dropdown menu three
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i>
                    <OfficeChair weight="duotone" />
                  </i>
                  <h5>Human Resource</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i>
                    <Buildings weight="duotone" />
                  </i>
                  <h5>ORG</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i>
                    <Laptop weight="duotone" />
                  </i>
                  <h5>Operation</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i>
                    <HandCoins weight="duotone" />
                  </i>
                  <h5>Finance</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i>
                    <TreasureChest weight="duotone" />
                  </i>
                  <h5>Inventory</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i>
                    <Money weight="duotone" />
                  </i>
                  <h5>Sales</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i>
                    <UsersThree weight="duotone" />
                  </i>
                  <h5>Community</h5>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
