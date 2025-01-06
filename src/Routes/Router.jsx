import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login/Login"; // Assuming the login page doesn't need lazy loading
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../Components/CommonComponent/Loader/Loader";
import PageNotFound from "../Components/CommonComponent/PageNotFound/PageNotFound";
import AuthLayer from "./AuthLayer";

// Lazy-loaded route components
const DummyRoute = lazy(() => import("./DummyRoute"));
const UIRoutes = lazy(() => import("./UIRoutes"));
const SalesRoute = lazy(() => import("./SalesRoute"));
const FinanceRoute = lazy(() => import("./FinanceRoute"));
const UserRoute = lazy(() => import("./UserRoute"));
const SarcasmRoute = lazy(() => import("./SarcasmRoute"));
const OperationRoute = lazy(() => import("./OperationRoute"));
const InventoryRoute = lazy(() => import("./InventoryRoute"));
const ExecutionRoute = lazy(() => import("./ExecutionRoute"));
const CommunityRoute = lazy(() => import("./CommunityRoute"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route index element={<AuthLayer module={"index"} />} />
          <Route
            path="/"
            element={
              <AuthLayer>
                <DummyRoute />
              </AuthLayer>
            }
          />
          {/* UI Routes */}
          <Route
            path="ui/*"
            element={
              <AuthLayer module="ui">
                <UIRoutes />
              </AuthLayer>
            }
          />
          {/* Sales Routes */}
          <Route
            path="sales/*"
            element={
              <AuthLayer module="sales">
                <SalesRoute />
              </AuthLayer>
            }
          />
          {/* Finance Routes */}
          <Route
            path="finance/*"
            element={
              <AuthLayer module="finance">
                <FinanceRoute />
              </AuthLayer>
            }
          />
          {/* User Routes */}
          <Route
            path="user/*"
            element={
              <AuthLayer module="user">
                <UserRoute />
              </AuthLayer>
            }
          />
          {/* Sarcasm Routes */}
          <Route
            path="sarcasm/*"
            element={
              <AuthLayer module="sarcasm">
                <SarcasmRoute />
              </AuthLayer>
            }
          />
          {/* Operation Routes */}
          <Route
            path="operation/*"
            element={
              <AuthLayer module="operation">
                <OperationRoute />
              </AuthLayer>
            }
          />
          {/* Inventory Routes */}
          <Route
            path="inventory/*"
            element={
              <AuthLayer module="inventory">
                <InventoryRoute />
              </AuthLayer>
            }
          />
          {/* Execution Routes */}
          <Route
            path="execution/*"
            element={
              <AuthLayer module="execution">
                <ExecutionRoute />
              </AuthLayer>
            }
          />
          {/* Community Routes */}
          <Route
            path="community/*"
            element={
              <AuthLayer module="community">
                <CommunityRoute />
              </AuthLayer>
            }
          />
          {/* Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
