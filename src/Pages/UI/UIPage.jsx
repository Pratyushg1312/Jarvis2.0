import React, { useState } from "react";
import { Button, FormGroup, Menu, MenuItem } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { GearSix } from "@phosphor-icons/react";

const UIPage = () => {
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-2 col-md-4 col-sm-6 col-12">
          <div class="card">
            <div class="flexCenterCol rowGap12 p20">
              <div class="icon large primary"></div>
              <div>
                <h5>Buttons</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Sales Dashboard</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>Sales</Link>
            <Typography>Dashboard</Typography>
          </Breadcrumbs>
        </div>
        <div className="pageAction">
          <div className="pageMenu">
            <ul>
              <li>
                <Link href="">View POC</Link>
              </li>
              <li>
                <Link href="">Sales Report</Link>
              </li>
              <li>
                <Link href="">View Target Competition</Link>
              </li>
              <li>
                <Link href="">Add Account</Link>
              </li>
              <li>
                <Link href="">Create Sale Booking</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb20">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </div>

      <div className="mb20">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <>
                Item One <span className="badge">65</span>
              </>
            }
          />
          <Tab
            label={
              <>
                Item Two <span className="badge">18</span>
              </>
            }
          />
          <Tab
            label={
              <>
                Item Three <span className="badge">35</span>
              </>
            }
          />
        </Tabs>
      </div>

      <div className="mb20">
        <Button
          variant="contained"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Dropdown Button
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>

      <div className="mb20">
        <Button
          className="iconBtn"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <GearSix />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default UIPage;
