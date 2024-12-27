import React from "react";
import { Tabs } from "@mui/material";
import { Tab as MTab } from "@mui/material";

const Tab = ({ tabName, activeTabindex, onTabClick }) => {
  const handleChange = (event, newValue) => {
    onTabClick(newValue);
  };
  return (
    // <div className="tab">
    //     {tabName.map((tab, index) => (
    //         <button
    //             key={index}
    //             className={`named-tab ${activeTabindex === index ? "active-tab" : ""}`}
    //             onClick={() => onTabClick(index)}
    //         >
    //             {tab}
    //         </button>
    //     ))}
    // </div>
    <Tabs value={activeTabindex} onChange={handleChange} aria-label="Tab">
      {tabName.map((tab, index) => (
        <MTab label={tab} />
      ))}
    </Tabs>
  );
};

export default Tab;
