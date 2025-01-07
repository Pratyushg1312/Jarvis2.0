import React from "react";
import { Tabs } from "@mui/material";
import { Tab as MTab } from "@mui/material";

const Tab = ({ tabName, activeTabindex, onTabClick }) => {
  const handleChange = (event, newValue) => {
    onTabClick(newValue);
  };
  return (
    <Tabs value={activeTabindex} onChange={handleChange} aria-label="Tab">
      {tabName.map((tab, index) => (
        <MTab label={tab} />
      ))}
    </Tabs>
  );
};

export default Tab;
