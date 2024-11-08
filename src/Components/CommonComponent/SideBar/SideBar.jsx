import React, { useEffect, useRef, useState } from "react";
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
import { NavLink } from "react-router-dom";
import GetDecodedToken from "../../../Utils/GetDecodedToken";

const SideBar = () => {
  const userRole = GetDecodedToken().role_id;
  const placeholder = useRef();
  const [listNode, setListNode] = useState();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currNodeIndex, setCurrNodeIndex] = useState(null)


  useEffect(() => {
    setListNode(placeholder?.current?.childNodes)
  }, [placeholder])





  const handleScroll = () => {

    const rect = placeholder?.current?.childNodes?.[currNodeIndex]?.getBoundingClientRect();
    console.log(rect);

    setPosition({ x: rect.right + 30, y: rect.top + 20 });

  }

  const handleMouseout = (event, index) => {
    setPosition({ x: 0 });
  }


  useEffect(() => {
    if (listNode) {
      listNode.forEach((node, index) => {

        node.addEventListener('scroll', handleScroll);
        if (node.classList.contains('nav-item') && node.querySelector('h5')) {
          node.addEventListener('mouseover', (event) => handleMouseOver(event, index, "add"));
          node.addEventListener('mouseout', (event) => handleMouseout());
        }
      });
    }

    return () => {
      if (listNode) {
        listNode.forEach((node, index) => {

          if (node.classList.contains('nav-item') && node.querySelector('h5')) {
            node.removeEventListener('mouseover', (event) => handleMouseOver(event, index, "del"));
            node.removeEventListener('mouseout', (event) => handleMouseout());
          }
        });
      }
    };
  }, [listNode]);



  const handleMouseOver = (event, index, flag) => {
    const rect = listNode?.[index]?.getBoundingClientRect();

    if (flag === "add")
      setCurrNodeIndex(index);
    else
      setCurrNodeIndex(null);
    setPosition({ x: rect.right + 30, y: rect.top + 20 });
  };

  return (
    <>
      <div className="sideBar semiDark-disable">
        <div className="sidebarToggle">
          <label htmlFor="toggle-sidebar" className="toggle-sidebar-label">
            <CaretRight />
          </label>
        </div>
        <div className="sideBarIn">
          <div className="sideBarContent">
            <div className="sidebarMenu">
              <ul className="navbar-nav" ref={placeholder}>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <i>
                      <Speedometer weight="duotone" />
                    </i>
                    <h5>Dashboard</h5>
                  </NavLink>
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
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i>
                      <TreasureChest weight="duotone" />
                    </i>
                    <h5>Inventory</h5>
                  </a>
                </li>
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
                      <NavLink
                        className="dropdown-item"
                        to="/sales/account-overview"
                      >
                        <span>
                          <Minus />
                        </span>
                        Account
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/sales/salesbooking-overview"
                      >
                        <span>
                          <Minus />
                        </span>
                        Sales Booking
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
      <p className="side-bar-tooltip" style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px`, }}>{listNode?.[currNodeIndex]?.querySelector('h5').innerText}</p>
    </>

  );
};

export default SideBar;
