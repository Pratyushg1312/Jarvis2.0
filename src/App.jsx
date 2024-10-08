import { useState, useRef, useEffect } from "react";
import "./App.css";
import SideBar from "./Components/CommonComponent/SideBar/SideBar.jsx";
import TopBar from "./Components/CommonComponent/TopBar/TopBar.jsx";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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
    <>
      <div className="app bodyWrapper">
        <input
          ref={checkbox}
          type="checkbox"
          id="toggle-sidebar"
          className="toggle-sidebar-checkbox"
        />
        <SideBar />
        <div className="pageWrapper">
          <TopBar />
          <div className="pageBody">
            <div className="card">
              <div className="card-header">
                <div className="cardTitle">
                  <h4>Input</h4>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb20">
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-4 mb20">
                    <Autocomplete
                      disablePortal
                      options={["Hello", "Anmol"]}
                      renderInput={(params) => (
                        <TextField {...params} label="Movie" />
                      )}
                    />
                  </div>
                  <div className="col-md-4 mb20">
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-4 mb20">
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-4 mb20">
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-4 mb20">
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
