import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loaderWrapper">
      <div className="reactor">
        <div className="triangle d-none"></div>
        <div className="circle-1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="circle-2">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="circle-3"></div>
        <div className="circle-4">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="circle-5">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="circle-6"></div>
        <div className="circle-7"></div>
        <div className="circle-8">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="loadingText">
        <h4>Loading...</h4>
      </div>
    </div>
  );
};

export default Loader;
