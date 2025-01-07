import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { baseUrl } from "../Config";
import { AuthEngine, useAuth } from "../Context/ApiCaller";
import PageNotFound from "../Components/CommonComponent/PageNotFound/PageNotFound";
import { setLoader } from "../Utils/ToastUtil";
import Loader from "../Components/CommonComponent/Loader/Loader";

const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.error("Token expired");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  }
};
const isLiveServer = () => {
  return baseUrl === baseUrl.includes("jarvis");
};

const DeptMap = {
  // department is mapped to the route to redirect logged in user to their respective module
  36: "sales",
  40: "finance",
  62: "community",
  12: "operation",
  34: "hrms",
};

const RouteDirectory = (children, module, auth) => {
  // protected route
  if (auth.userAuthIsLoading) return <Loader />;

  switch (module) {
    case "index":
      return <Navigate to={DeptMap[auth?.dept_id]} replace />;

    case "ui":
      if (!isLiveServer()) return children;
      else return <PageNotFound />;
    case "sales":
      if (auth.isSales || auth.isSalesAdmin) return children;
      else return <PageNotFound />;
    case "finance":
      if (auth.isPHPFinance) return children;
      else return <PageNotFound />;
    default:
      return <PageNotFound />;
  }
};

const ProtectedRoute = ({ children, module }) => {
  const auth = useAuth();

  return isAuthenticated() ? (
    RouteDirectory(children, module, auth)
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
