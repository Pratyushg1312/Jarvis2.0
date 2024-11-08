import React, { useState } from "react";
import {
  Blueprint,
  CalendarBlank,
  DotsThreeOutlineVertical,
  Files,
  FileX,
  GearSix,
  Invoice,
  MagnifyingGlass,
  Plus,
  Scroll,
} from "@phosphor-icons/react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, FormGroup, Menu, MenuItem } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const JarvisCards = () => {
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
          <h2>Cards</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Cards</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Card Title</h5>
              </div>
            </div>
            <div className="card-body">
              <p className="mb20">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                accusamus molestiae inventore quasi magni impedit nemo iusto ab
                saepe amet quas eligendi adipisci, voluptate itaque at sit
                laudantium ipsa voluptatem!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Card with button</h5>
              </div>
              <div className="cardAction">
                <Button color="primary" variant="contained">
                  Add user
                </Button>
              </div>
            </div>
            <div className="card-body">
              <p className="mb20">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                accusamus molestiae inventore quasi magni impedit nemo iusto ab
                saepe amet quas eligendi adipisci, voluptate itaque at sit
                laudantium ipsa voluptatem!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Card with icon button</h5>
              </div>
              <div className="cardAction">
                <Button className="iconBtn">
                  <Plus />
                </Button>
                <Button className="iconBtn">
                  <GearSix />
                </Button>
              </div>
            </div>
            <div className="card-body">
              <p className="mb20">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                accusamus molestiae inventore quasi magni impedit nemo iusto ab
                saepe amet quas eligendi adipisci, voluptate itaque at sit
                laudantium ipsa voluptatem!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Card with dropdown action</h5>
              </div>
              <div className="cardAction">
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
            <div className="card-body">
              <p className="mb20">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                accusamus molestiae inventore quasi magni impedit nemo iusto ab
                saepe amet quas eligendi adipisci, voluptate itaque at sit
                laudantium ipsa voluptatem!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Card with input</h5>
              </div>
              <div className="cardAction">
                <TextField placeholder="Enter text" variant="outlined" />
              </div>
            </div>
            <div className="card-body">
              <p className="mb20">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                accusamus molestiae inventore quasi magni impedit nemo iusto ab
                saepe amet quas eligendi adipisci, voluptate itaque at sit
                laudantium ipsa voluptatem!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Card with Autocomplete</h5>
              </div>
              <div className="cardAction">
                <Autocomplete
                  disablePortal
                  options={["Hello", "Anmol"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Movie" />
                  )}
                />
              </div>
            </div>
            <div className="card-body">
              <p className="mb20">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                accusamus molestiae inventore quasi magni impedit nemo iusto ab
                saepe amet quas eligendi adipisci, voluptate itaque at sit
                laudantium ipsa voluptatem!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Card with input-group</h5>
              </div>
              <div className="cardAction">
                <FormGroup>
                  <TextField variant="outlined" placeholder="Search" />
                  <Button variant="contained">
                    <MagnifyingGlass />
                  </Button>
                </FormGroup>
              </div>
            </div>
            <div className="card-body">
              <p className="mb20">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                accusamus molestiae inventore quasi magni impedit nemo iusto ab
                saepe amet quas eligendi adipisci, voluptate itaque at sit
                laudantium ipsa voluptatem!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Card with tabs</h5>
              </div>
              <div className="cardAction">
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
            <div className="card-body">
              <div className="tabContent">
                <CustomTabPanel value={value} index={0}>
                  <p className="mb20">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <p className="mb20">
                    It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release
                    of Letraset sheets containing Lorem Ipsum passages.
                  </p>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <p className="mb20">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia.
                  </p>
                </CustomTabPanel>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Card with tabs (badges)</h5>
              </div>
              <div className="cardAction">
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
            </div>
            <div className="card-body">
              <div className="tabContent">
                <CustomTabPanel value={value} index={0}>
                  <p className="mb20">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <p className="mb20">
                    It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release
                    of Letraset sheets containing Lorem Ipsum passages.
                  </p>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <p className="mb20">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia.
                  </p>
                </CustomTabPanel>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 col-sm-12 col-12">
          <div className="card">
            <div className="flexCenter colGap12 p20 border-bottom">
              <div className="icon large primary">
                <CalendarBlank />
              </div>
              <div>
                <h4 className="fw_500 mb4">Weekly</h4>
                <h6 className="colorMedium">14-10-2024 to 20-10-2024</h6>
              </div>
            </div>
            <div className="d-flex flex-column rowGap16 p20">
              <div className="flexCenterBetween">
                <h6>Accounts</h6>
                <div className="flexCenter colGap12">
                  <h6>4</h6>
                  <div className="growthBadge growthDown">
                    <span></span>2
                  </div>
                </div>
              </div>
              <div className="flexCenterBetween">
                <h6>Sales</h6>
                <div className="flexCenter colGap12">
                  <h6>4</h6>
                  <div className="growthBadge growthUp">
                    <span></span>2
                  </div>
                </div>
              </div>
              <div className="flexCenterBetween">
                <h6>Booking Amount</h6>
                <div className="flexCenter colGap12">
                  <h6>2,36,000</h6>
                  <div className="growthBadge growthDown">
                    <span></span>21.1L
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 col-12">
          <div className="card">
            <div className="flexCenter colGap12 p20 border-bottom">
              <div className="icon large secondary">
                <CalendarBlank />
              </div>
              <div>
                <h4 className="fw_500 mb4">Weekly</h4>
                <h6 className="colorMedium">14-10-2024 to 20-10-2024</h6>
              </div>
            </div>
            <div className="d-flex flex-column rowGap16 p20">
              <div className="flexCenterBetween">
                <h6>Accounts</h6>
                <div className="flexCenter colGap12">
                  <h6>4</h6>
                  <div className="growthBadge growthDown">
                    <span></span>2
                  </div>
                </div>
              </div>
              <div className="flexCenterBetween">
                <h6>Sales</h6>
                <div className="flexCenter colGap12">
                  <h6>4</h6>
                  <div className="growthBadge growthUp">
                    <span></span>2
                  </div>
                </div>
              </div>
              <div className="flexCenterBetween">
                <h6>Booking Amount</h6>
                <div className="flexCenter colGap12">
                  <h6>2,36,000</h6>
                  <div className="growthBadge growthDown">
                    <span></span>21.1L
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 col-12">
          <div className="card">
            <div className="flexCenter colGap12 p20 border-bottom">
              <div className="icon large tertiary">
                <CalendarBlank />
              </div>
              <div>
                <h4 className="fw_500 mb4">Weekly</h4>
                <h6 className="colorMedium">14-10-2024 to 20-10-2024</h6>
              </div>
            </div>
            <div className="d-flex flex-column rowGap16 p20">
              <div className="flexCenterBetween">
                <h6>Accounts</h6>
                <div className="flexCenter colGap12">
                  <h6>4</h6>
                  <div className="growthBadge growthDown">
                    <span></span>2
                  </div>
                </div>
              </div>
              <div className="flexCenterBetween">
                <h6>Sales</h6>
                <div className="flexCenter colGap12">
                  <h6>4</h6>
                  <div className="growthBadge growthUp">
                    <span></span>2
                  </div>
                </div>
              </div>
              <div className="flexCenterBetween">
                <h6>Booking Amount</h6>
                <div className="flexCenter colGap12">
                  <h6>2,36,000</h6>
                  <div className="growthBadge growthDown">
                    <span></span>21.1L
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="flexCenter flex-column rowGap12 p20">
              <div className="icon primary">
                <Blueprint />
              </div>
              <div>
                <h6>Weekly</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="flexCenter flex-column rowGap12 p20">
              <div className="icon secondary">
                <Invoice />
              </div>
              <div>
                <h6>Weekly</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="flexCenter flex-column rowGap12 p20">
              <div className="icon tertiary">
                <Scroll />
              </div>
              <div>
                <h6>Weekly</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="flexCenter flex-column rowGap12 p20">
              <div className="icon success">
                <Files />
              </div>
              <div>
                <h6>Weekly</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="flexCenter flex-column rowGap12 p20">
              <div className="icon warning">
                <FileX />
              </div>
              <div>
                <h6>Weekly</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Monthly Campaign State</h5>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex flexDirCol rowGap20 mb20">
                <div className="flexCenterBetween">
                  <div className="flexCenter colGap12">
                    <div className="icon small primary">
                      <FileX />
                    </div>
                    <h6>Emails</h6>
                  </div>
                  <div className="flexCenter colGap12">
                    <h6>12,346</h6>
                    <div className="growthBadge growthDown">
                      <span></span>0.3%
                    </div>
                  </div>
                </div>
                <div className="flexCenterBetween">
                  <div className="flexCenter colGap12">
                    <div className="icon small secondary">
                      <FileX />
                    </div>
                    <h6>Opened</h6>
                  </div>
                  <div className="flexCenter colGap12">
                    <h6>8,734</h6>
                    <div className="growthBadge growthUp">
                      <span></span>2.1%
                    </div>
                  </div>
                </div>
                <div className="flexCenterBetween">
                  <div className="flexCenter colGap12">
                    <div className="icon small tertiary">
                      <FileX />
                    </div>
                    <h6>Clicked</h6>
                  </div>
                  <div className="flexCenter colGap12">
                    <h6>967</h6>
                    <div className="growthBadge growthDown">
                      <span></span>1.4%
                    </div>
                  </div>
                </div>
                <div className="flexCenterBetween">
                  <div className="flexCenter colGap12">
                    <div className="icon small success">
                      <FileX />
                    </div>
                    <h6>Subscribe</h6>
                  </div>
                  <div className="flexCenter colGap12">
                    <h6>345</h6>
                    <div className="growthBadge growthUp">
                      <span></span>8.5%
                    </div>
                  </div>
                </div>
                <div className="flexCenterBetween">
                  <div className="flexCenter colGap12">
                    <div className="icon small warning">
                      <FileX />
                    </div>
                    <h6>Complaints</h6>
                  </div>
                  <div className="flexCenter colGap12">
                    <h6>10</h6>
                    <div className="growthBadge growthDown">
                      <span></span>1.5%
                    </div>
                  </div>
                </div>
                <div className="flexCenterBetween">
                  <div className="flexCenter colGap12">
                    <div className="icon small danger">
                      <FileX />
                    </div>
                    <h6>Unsubscribe</h6>
                  </div>
                  <div className="flexCenter colGap12">
                    <h6>86</h6>
                    <div className="growthBadge growthUp">
                      <span></span>0.8%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JarvisCards;
