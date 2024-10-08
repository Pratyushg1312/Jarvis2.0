import React from "react";
import {
  Buildings,
  HandCoins,
  Laptop,
  Money,
  OfficeChair,
  Speedometer,
  TreasureChest,
  UsersThree,
} from "@phosphor-icons/react";

const SideBar = () => {
  return (
    <div className="sideBar">
      <div className="sideBarIn">
        <div className="sideBarLogo">
          <img src="./assets/images/logo/logo.png" width={40} height={40} />
          <h3>Creativefuel</h3>
        </div>
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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
