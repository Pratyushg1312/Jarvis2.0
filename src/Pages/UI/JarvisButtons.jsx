import React, { useState } from "react";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus } from "@phosphor-icons/react";

const JarvisButtons = () => {
  return (
    <>
      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Buttons</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>UI</Link>
            <Typography>Buttons</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Buttons</h5>
              </div>
            </div>
            <div className="card-body flexCenter colGap8 mb20">
              <Button color="primary" variant="contained">
                primary
              </Button>
              <Button color="secondary" variant="contained">
                secondary
              </Button>
              <Button color="success" variant="contained">
                success
              </Button>
              <Button color="error" variant="contained">
                error
              </Button>
              <Button color="warning" variant="contained">
                warning
              </Button>
              <Button color="info" variant="contained">
                info
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Outline Buttons</h5>
              </div>
            </div>
            <div className="card-body flexCenter colGap8 mb20">
              <Button color="primary" variant="outlined">
                primary
              </Button>
              <Button color="secondary" variant="outlined">
                secondary
              </Button>
              <Button color="success" variant="outlined">
                success
              </Button>
              <Button color="error" variant="outlined">
                error
              </Button>
              <Button color="warning" variant="outlined">
                warning
              </Button>
              <Button color="info" variant="outlined">
                info
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Icons Buttons</h5>
              </div>
            </div>
            <div className="card-body flexCenter colGap8 mb20">
              <Button className="iconBtn">
                <Plus />
              </Button>
              <Button className="iconBtn" color="primary" variant="contained">
                <Plus />
              </Button>
              <Button className="iconBtn" color="secondary" variant="contained">
                <Plus />
              </Button>
              <Button className="iconBtn" color="success" variant="contained">
                <Plus />
              </Button>
              <Button className="iconBtn" color="error" variant="contained">
                <Plus />
              </Button>
              <Button className="iconBtn" color="warning" variant="contained">
                <Plus />
              </Button>
              <Button className="iconBtn" color="info" variant="contained">
                <Plus />
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Icon Outline Buttons</h5>
              </div>
            </div>
            <div className="card-body flexCenter colGap8 mb20">
              <Button className="iconBtn">
                <Plus />
              </Button>
              <Button className="iconBtn" color="primary" variant="outlined">
                <Plus />
              </Button>
              <Button className="iconBtn" color="secondary" variant="outlined">
                <Plus />
              </Button>
              <Button className="iconBtn" color="success" variant="outlined">
                <Plus />
              </Button>
              <Button className="iconBtn" color="error" variant="outlined">
                <Plus />
              </Button>
              <Button className="iconBtn" color="warning" variant="outlined">
                <Plus />
              </Button>
              <Button className="iconBtn" color="info" variant="outlined">
                <Plus />
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Buttons with Icons</h5>
              </div>
            </div>
            <div className="card-body ">
              <div className="flexCenter colGap16 mb20">
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<ArrowLeft />}
                >
                  primary
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<ArrowLeft />}
                >
                  secondary
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  startIcon={<ArrowLeft />}
                >
                  success
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  startIcon={<ArrowLeft />}
                >
                  error
                </Button>
                <Button
                  color="warning"
                  variant="contained"
                  startIcon={<ArrowLeft />}
                >
                  warning
                </Button>
                <Button
                  color="info"
                  variant="contained"
                  startIcon={<ArrowLeft />}
                >
                  info
                </Button>
              </div>
              <div className="flexCenter colGap16 mb24">
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<ArrowRight />}
                >
                  primary
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  endIcon={<ArrowRight />}
                >
                  secondary
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  endIcon={<ArrowRight />}
                >
                  success
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  endIcon={<ArrowRight />}
                >
                  error
                </Button>
                <Button
                  color="warning"
                  variant="contained"
                  endIcon={<ArrowRight />}
                >
                  warning
                </Button>
                <Button
                  color="info"
                  variant="contained"
                  endIcon={<ArrowRight />}
                >
                  info
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Outline Buttons with Icons</h5>
              </div>
            </div>
            <div className="card-body ">
              <div className="flexCenter colGap16 mb20">
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<ArrowLeft />}
                >
                  primary
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  startIcon={<ArrowLeft />}
                >
                  secondary
                </Button>
                <Button
                  color="success"
                  variant="outlined"
                  startIcon={<ArrowLeft />}
                >
                  success
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<ArrowLeft />}
                >
                  error
                </Button>
                <Button
                  color="warning"
                  variant="outlined"
                  startIcon={<ArrowLeft />}
                >
                  warning
                </Button>
                <Button
                  color="info"
                  variant="outlined"
                  startIcon={<ArrowLeft />}
                >
                  info
                </Button>
              </div>
              <div className="flexCenter colGap16 mb24">
                <Button
                  color="primary"
                  variant="outlined"
                  endIcon={<ArrowRight />}
                >
                  primary
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  endIcon={<ArrowRight />}
                >
                  secondary
                </Button>
                <Button
                  color="success"
                  variant="outlined"
                  endIcon={<ArrowRight />}
                >
                  success
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  endIcon={<ArrowRight />}
                >
                  error
                </Button>
                <Button
                  color="warning"
                  variant="outlined"
                  endIcon={<ArrowRight />}
                >
                  warning
                </Button>
                <Button
                  color="info"
                  variant="outlined"
                  endIcon={<ArrowRight />}
                >
                  info
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-12">
          <div className="card">
            <div className="card-header">
              <div className="cardHeading">
                <h5 className="cardTitle">Buttons with Badges</h5>
              </div>
            </div>
            <div className="card-body ">
              <div className="flexCenter colGap16 mb20">
                <Button color="primary" variant="contained">
                  primary <span className="badge">92</span>
                </Button>
                <Button color="secondary" variant="contained">
                  secondary <span className="badge">46</span>
                </Button>
                <Button color="success" variant="contained">
                  success <span className="badge">39</span>
                </Button>
                <Button color="error" variant="contained">
                  error <span className="badge">54</span>
                </Button>
                <Button color="warning" variant="contained">
                  warning <span className="badge">61</span>
                </Button>
                <Button color="info" variant="contained">
                  info <span className="badge">64</span>
                </Button>
              </div>
              <div className="flexCenter colGap16 mb24">
                <Button color="primary" variant="outlined">
                  primary <span className="badge">92</span>
                </Button>
                <Button color="secondary" variant="outlined">
                  secondary <span className="badge">46</span>
                </Button>
                <Button color="success" variant="outlined">
                  success <span className="badge">39</span>
                </Button>
                <Button color="error" variant="outlined">
                  error <span className="badge">54</span>
                </Button>
                <Button color="warning" variant="outlined">
                  warning <span className="badge">61</span>
                </Button>
                <Button color="info" variant="outlined">
                  info <span className="badge">64</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JarvisButtons;
