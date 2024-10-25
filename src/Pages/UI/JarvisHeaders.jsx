import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  FormGroup,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  DotsThreeOutlineVertical,
  GearSix,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";

const JarvisHeaders = () => {
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
      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Pagetitle</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Page Header</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <hr className="mb24" />

      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Pagetitle with button</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Page Header</Typography>
          </Breadcrumbs>
        </div>
        <div className="pageAction">
          <Button color="primary" variant="contained">
            Add user
          </Button>
        </div>
      </div>

      <hr className="mb24" />

      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Pagetitle with icon button</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Page Header</Typography>
          </Breadcrumbs>
        </div>
        <div className="pageAction">
          <Button className="iconBtn">
            <Plus />
          </Button>
          <Button className="iconBtn">
            <GearSix />
          </Button>
        </div>
      </div>

      <hr className="mb24" />

      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Pagetitle with dropdown action</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Page Header</Typography>
          </Breadcrumbs>
        </div>
        <div className="pageAction">
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

          <Button
            className="iconBtn"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <DotsThreeOutlineVertical />
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
      </div>

      <hr className="mb24" />

      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Pagetitle with input</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Page Header</Typography>
          </Breadcrumbs>
        </div>
        <div className="pageAction">
          <TextField placeholder="Enter text" variant="outlined" />
        </div>
      </div>

      <hr className="mb24" />

      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Pagetitle with autocomplete</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Page Header</Typography>
          </Breadcrumbs>
        </div>
        <div className="pageAction">
          <Autocomplete
            disablePortal
            options={["Hello", "Anmol"]}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </div>
      </div>

      <hr className="mb24" />

      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Pagetitle with input-group</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Page Header</Typography>
          </Breadcrumbs>
        </div>
        <div className="pageAction">
          <FormGroup>
            <TextField variant="outlined" placeholder="username" />
            <Button color="primary" variant="contained">
              <MagnifyingGlass />
            </Button>
          </FormGroup>
        </div>
      </div>

      <hr className="mb24" />

      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Pagetitle with tabs</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Page Header</Typography>
          </Breadcrumbs>
        </div>
        <div className="pageAction">
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
      </div>

      <hr className="mb24" />

      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Pagetitle with menu link</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Page Header</Typography>
          </Breadcrumbs>
        </div>
        <div className="pageAction">
          <div className="pageMenu">
            <ul>
              <li>
                <Link href="">Menu link</Link>
              </li>
              <li>
                <Link href="">Menu link</Link>
              </li>
              <li>
                <Link href="">Menu link</Link>
              </li>
              <li>
                <Link href="">Menu link</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default JarvisHeaders;
