import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loaderWrapper">
      <div class="reactor">
        <div class="triangle d-none"></div>
        <div class="circle-1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="circle-2">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="circle-3"></div>
        <div class="circle-4">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="circle-5">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="circle-6"></div>
        <div class="circle-7"></div>
        <div class="circle-8">
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
