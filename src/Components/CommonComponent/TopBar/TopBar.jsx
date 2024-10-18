import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import {
  GearSix,
  MagnifyingGlass,
  MoonStars,
  SignOut,
  Sun,
  User,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllUsersQuery,
  useGetUserAuthQuery,
  useGetUserDetailsByIdMutation,
} from "../../../Redux/Slices/UserSlices/UserApi";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { UserRole } from "../../../Utils/UserRole";

const TopBar = () => {
  const navigate = useNavigate();
  const loginUser = GetDecodedToken().id;
  const userRole = GetDecodedToken().role_id;
  const {
    data: allUserData,
    error: allUserError,
    isLoading: allUserIsLoading,
    isSuccess: allUserIsSuccess,
  } = useGetAllUsersQuery();
  const [
    getData,
    {
      data: userData,
      error: userError,
      isLoading: userIsLoading,
      isSuccess: userIsSuccess,
    },
  ] = useGetUserDetailsByIdMutation();
  const {
    data: userAuthData,
    error: userAuthError,
    isLoading: userAuthIsLoading,
    isSuccess: userAuthIsSuccess,
  } = useGetUserAuthQuery(loginUser, { skip: !loginUser });

  async function getUserData() {
    try {
      await getData(loginUser).unwrap();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  function convertTimestamps(user) {
    const { exp, iat, ...rest } = user;
    return {
      ...rest,
      exp: new Date(exp * 1000).toLocaleString(),
      iat: new Date(iat * 1000).toLocaleString(),
    };
  }

  // Toggle Dark/Light Theme
  useEffect(() => {
    document.getElementById("theme-toggle").addEventListener("click", (e) => {
      const checked = e.target.checked;
      document.body.setAttribute("theme", checked ? "dark" : "light");
    });
  }, []);

  return (
    <div className="topBar">
      <div className="topBarLeft">
        <div className="brandLogo">
          <img src="/assets/images/logo/logo.png" width={40} height={40} />
          <h3>
            Creative<span>fuel</span>
          </h3>
        </div>
      </div>
      <nav className="navbar navbar-expand-sm">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbarRight">
            <div className="navSearch">
              <span>
                <MagnifyingGlass />
              </span>
              <input
                type="search"
                name="search"
                className="form-control"
                placeholder="Search here . . ."
              ></input>
            </div>
            <div className="theme-switch">
              <input type="checkbox" id="theme-toggle" />

              <label htmlFor="theme-toggle">
                <div className="theme-sw iconBtn">
                  <i>
                    <Sun />
                  </i>
                  <i>
                    <MoonStars />
                  </i>
                </div>
              </label>
            </div>
            <div className="dropdown userDropdown">
              <a
                className="dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Avatar alt="Avatar" src={userData?.image} />
                <h4>
                  {userData?.user_name}
                  <span>{UserRole(userRole)}</span>
                </h4>
              </a>

              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    <span>
                      <User />
                    </span>
                    My profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span>
                      <GearSix />
                    </span>
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href=""
                    onClick={() => {
                      sessionStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    <span>
                      <SignOut />
                    </span>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
