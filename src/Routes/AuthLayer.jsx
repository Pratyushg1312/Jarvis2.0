import React from "react";
import { AuthEngine } from "../Context/ApiCaller";
import ProtectedRoute from "./ProtectedRoute";

const AuthLayer = ({ children, module }) => {
  return (
    <AuthEngine>
      <ProtectedRoute module={module}>{children}</ProtectedRoute>
    </AuthEngine>
  );
};

export default AuthLayer;
