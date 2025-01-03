import React, { useEffect, useRef, useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import DashboardSidebarLinks from "./DashboardSidebarLinks";
import HumanResourceSidebarLinks from "./HumanResourceSidebarLinks";
import OrganizationSidebrLinks from "./OrganizationSidebrLinks";
import OpertaionSidebarLink from "./OpertaionSidebarLink";
import FinanceSidebarLinks from "./FinanceSidebarLinks";
import InventorySidebarLinks from "./InventorySidebarLinks";
import ComunitySidebarLinks from "./ComunitySidebarLinks";
import UiSideBarLinks from "./UiSideBarLinks";
import SalesSidebarLinks from "./SalesSidebarLinks";
import GetDecodedToken from "../../../Utils/GetDecodedToken";

const SideBar = () => {
  const placeholder = useRef();
  const [listNode, setListNode] = useState();
  const [position, setPosition] = useState([]);
  const token = GetDecodedToken();
  const userID = token.id;
  const RoleId = token.role_id;
  const deptId = token.dept_id;
  const job_type = token.job_type;

  useEffect(() => {
    const nodes = placeholder?.current?.childNodes;
    if (nodes) {
      const nodeArray = Array.from(nodes);
      setListNode(nodeArray);
      const positions = nodeArray.map((node, index) => {
        const rect = node?.getBoundingClientRect();
        return { x: rect.right - 500, y: rect.top + 20 };
      });
      setPosition(positions);
    }
  }, [placeholder]);

  const handleMouseout = (event, index) => {
    const positions = position.map((pos, i) =>
      i === index ? { x: pos.x + 10, y: pos.y } : pos
    );
    setPosition(positions);
  };

  useEffect(() => {
    if (listNode) {
      listNode.forEach((node, index) => {
        if (node.classList.contains("nav-item") && node.querySelector("h5")) {
          node.addEventListener("mouseover", (event) => handleMouseOver(index));
          node.addEventListener("mouseout", (event) => handleMouseout(index));
        }
      });
    }

    return () => {
      if (listNode) {
        listNode.forEach((node, index) => {
          if (node.classList.contains("nav-item") && node.querySelector("h5")) {
            node.removeEventListener("mouseover", (event) =>
              handleMouseOver(index)
            );
            node.removeEventListener("mouseout", (event) => handleMouseout());
          }
        });
      }
    };
  }, [listNode]);

  const handleMouseOver = (index) => {
    const rect = listNode?.[index]?.getBoundingClientRect();
    setPosition((pre) =>
      pre.map((pos, i) =>
        i === index ? { x: rect.right + 30, y: rect.top + 20 } : pos
      )
    );
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
                <DashboardSidebarLinks />
                <HumanResourceSidebarLinks />
                <OrganizationSidebrLinks />
                <InventorySidebarLinks />
                <FinanceSidebarLinks />
                <OpertaionSidebarLink />
                <SalesSidebarLinks />
                <ComunitySidebarLinks />
                <UiSideBarLinks />
              </ul>
            </div>
          </div>
        </div>
      </div>
      {listNode?.map((node, index) => {
        return (
          <p
            className="side-bar-tooltip"
            style={{
              position: "fixed",
              left: `${position[index]?.x}px`,
              top: `${position[index]?.y}px`,
            }}
          >
            {node.querySelector("h5").innerText}
          </p>
        );
      })}
    </>
  );
};

export default SideBar;
