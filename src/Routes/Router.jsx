import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/Login"; // Assuming the login page doesn't need lazy loading
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../Components/CommonComponent/Loader/Loader";

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

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DummyRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="ui/*"
            element={
              <ProtectedRoute>
                <UIRoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="sales/*"
            element={
              <ProtectedRoute>
                <SalesRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="finance/*"
            element={
              <ProtectedRoute>
                <FinanceRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="user/*"
            element={
              <ProtectedRoute>
                <UserRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="sarcasm/*"
            element={
              <ProtectedRoute>
                <SarcasmRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="operation/*"
            element={
              <ProtectedRoute>
                <OperationRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="inventory/*"
            element={
              <ProtectedRoute>
                <InventoryRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="execution/*"
            element={
              <ProtectedRoute>
                <ExecutionRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="community/*"
            element={
              <ProtectedRoute>
                <CommunityRoute />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
