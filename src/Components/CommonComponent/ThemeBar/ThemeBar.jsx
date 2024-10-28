import { Button } from "@mui/material";
import { ArrowsClockwise, Plus, X } from "@phosphor-icons/react";
import React from "react";

const ThemeBar = ({ toggleClass, setToggleClass }) => {
  return (
    <>
      <div className={`themeBar ${toggleClass}`}>
        <div className="themeBarHeader">
          <div className="themeBarTitle">
            <h5>Theme Customizer</h5>
            <p>Customize and preview in real time</p>
          </div>
          <div className="themeBarAction">
            <Button className="iconBtn d-none">
              <ArrowsClockwise />
            </Button>
            <Button
              className="iconBtn"
              onClick={() =>
                setToggleClass((prev) => {
                  if (prev === "") return "themebarActive";
                  else return "";
                })
              }
            >
              <X />
            </Button>
          </div>
        </div>
        <div className="themeBarBody">
          
        </div>
      </div>
    </>
  );
};

export default ThemeBar;
