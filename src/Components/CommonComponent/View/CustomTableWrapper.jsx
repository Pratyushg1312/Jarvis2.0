import React from "react";

const CustomTableWrapper = ({ children, title, addHtml }) => {
  return (
    <>
      <div className="card tableCard">
        <div className="card-header">
          <div className="cardHeading">
            <h5 className="cardTitle">{title}</h5>
          </div>
          <div className="cardAction">{addHtml}</div>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </>
  );
};

export default CustomTableWrapper;
