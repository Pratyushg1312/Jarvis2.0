import React, { useState } from "react";
import { Breadcrumbs, FormGroup, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  CalendarDots,
  Eye,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";

const JarvisForms = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="PageHeader">
        <div className="pageTitle">
          <h2>Forms</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Forms</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="card">
        <div class="card-header">
          <div class="cardHeading">
            <h5 class="cardTitle">Input fields</h5>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <TextField label="Basic input" variant="outlined" />
            </div>
            <div className="col-md-4">
              <FormGroup>
                <TextField
                  variant="outlined"
                  placeholder="Search"
                  label="Input group"
                />
                <Button>
                  <MagnifyingGlass />
                </Button>
              </FormGroup>
            </div>
            <div className="col-md-4">
              <Autocomplete
                disablePortal
                options={["Hello", "Anmol"]}
                renderInput={(params) => (
                  <TextField {...params} label="Autocomplete" />
                )}
              />
            </div>
            <div className="col-md-4">
              <FormGroup>
                <Autocomplete
                  disablePortal
                  options={["Hello", "Anmol"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Autocomplete" />
                  )}
                />
                <Button>
                  <Plus />
                </Button>
              </FormGroup>
            </div>

            <div className="col-md-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date picker"
                    slots={{
                      openPickerIcon: CalendarDots,
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/finance/dashboard")}
          >
            Contained
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => navigate("/sales/dashboard2")}
          >
            Contained
          </Button>
        </div>
      </div>
    </>
  );
};

export default JarvisForms;
