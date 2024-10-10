import { useState, useRef, useEffect } from "react";
import "./App.css";
import SideBar from "./Components/CommonComponent/SideBar/SideBar.jsx";
import TopBar from "./Components/CommonComponent/TopBar/TopBar.jsx";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { AppleLogo } from "@phosphor-icons/react";

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
        <TopBar />
        <div className="pageWrapper" s>
          <SideBar />
          <div className="pageBody">
            <div className="card">
              <div className="card-header">
                <div className="cardHeading">
                  <h4>Input</h4>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-4">
                    <Autocomplete
                      disablePortal
                      options={["Hello", "Anmol"]}
                      renderInput={(params) => (
                        <TextField {...params} label="Movie" />
                      )}
                    />
                  </div>
                  <div className="col-md-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker label="Basic date picker" />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="col-md-4">
                    <Button color="info" variant="contained">
                      Contained
                    </Button>
                    &nbsp;
                    <Button color="info" variant="outlined">
                      Contained
                    </Button>
                  </div>
                  <div className="col-md-4">
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-4">
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
