import { useState, useRef, useEffect } from "react";
import "./App.css";
import SideBar from "./Components/CommonComponent/SideBar/SideBar.jsx";
import TopBar from "./Components/CommonComponent/TopBar/TopBar.jsx";

function App() {
  const checkbox = useRef(null);
  console.log(checkbox);

  useEffect(() => {
    const handleCheckboxChange = () => {
      if (checkbox.current.checked) {
        console.log("checked");
        document.body.classList.add("sidebarActive");
      } else {
        console.log("not checked");
        document.body.classList.remove("sidebarActive");
      }
    };

    const checkboxElement = checkbox.current;
    checkboxElement.addEventListener("change", handleCheckboxChange);

    // Cleanup event listener on component unmount
    return () => {
      checkboxElement.removeEventListener("change", handleCheckboxChange);
    };
  }, []);

  return (
    <div className="app">
      <input
        ref={checkbox}
        type="checkbox"
        id="toggle-sidebar"
        className="toggle-sidebar-checkbox"
      />
      <SideBar />
      <div className="app__content">
        <TopBar />
        <div className="app__content__body">
          <h1>Body</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
