import React, { useEffect, useRef, useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import AuthSideBar from "./AuthSideBar";

const SideBar = () => {
  const semiTheme = useSelector((state) => state.semiTheme);
  const placeholder = useRef();
  const [listNode, setListNode] = useState();
  const [position, setPosition] = useState([]);

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
      <div
        className={`sideBar ${
          semiTheme.enable ? "semiDark" : "semiDark-disable"
        }`}
      >
        <div className="sidebarToggle">
          <label htmlFor="toggle-sidebar" className="toggle-sidebar-label">
            <CaretRight />
          </label>
        </div>
        <div className="sideBarIn">
          <div className="sideBarContent">
            <div className="sidebarMenu">
              <ul className="navbar-nav" ref={placeholder}>
                <AuthSideBar />
              </ul>
            </div>
          </div>
        </div>
      </div>
      {listNode?.map((node, index) => {
        return (
          <p
            key={index}
            className="side-bar-tooltip"
            style={{
              position: "fixed",
              left: `${position[index]?.x}px`,
              top: `${position[index]?.y - 16}px`,
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
