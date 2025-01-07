import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { AppleLogo } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../Components/CommonComponent/FormElement/PageHeader";

const DummyPage = ({ name }) => {
  const navigate = useNavigate();
  return (
    <>
      {name && <PageHeader mainTitle={name} link={"/sales"} />}
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
              <Button
                color="info"
                variant="contained"
                onClick={() => navigate("/finance/dashboard")}
              >
                Contained
              </Button>
              &nbsp;
              <Button
                color="info"
                variant="outlined"
                onClick={() => navigate("/sales/dashboard2")}
              >
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
    </>
  );
};

export default DummyPage;
