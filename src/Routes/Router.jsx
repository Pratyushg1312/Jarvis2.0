import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login/Login"; // Assuming the login page doesn't need lazy loading
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../Components/CommonComponent/Loader/Loader";
import PageNotFound from "../Components/CommonComponent/PageNotFound/PageNotFound";

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
          <Route index element={<Navigate to="sales" replace={true} />} /> // It
          redirects index to desired routing like dashboard or landing page of
          modules . Use only if index is not in use.
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DummyRoute />
              </ProtectedRoute>
            }
          />
          {/* UI Routes */}
          <Route
            path="ui/*"
            element={
              <ProtectedRoute>
                <UIRoutes />
              </ProtectedRoute>
            }
          />
          {/* Sales Routes */}
          <Route
            path="sales/*"
            element={
              <ProtectedRoute>
                <SalesRoute />
              </ProtectedRoute>
            }
          />
          {/* Finance Routes */}
          <Route
            path="finance/*"
            element={
              <ProtectedRoute>
                <FinanceRoute />
              </ProtectedRoute>
            }
          />
          {/* User Routes */}
          <Route
            path="user/*"
            element={
              <ProtectedRoute>
                <UserRoute />
              </ProtectedRoute>
            }
          />
          {/* Sarcasm Routes */}
          <Route
            path="sarcasm/*"
            element={
              <ProtectedRoute>
                <SarcasmRoute />
              </ProtectedRoute>
            }
          />
          {/* Operation Routes */}
          <Route
            path="operation/*"
            element={
              <ProtectedRoute>
                <OperationRoute />
              </ProtectedRoute>
            }
          />
          {/* Inventory Routes */}
          <Route
            path="inventory/*"
            element={
              <ProtectedRoute>
                <InventoryRoute />
              </ProtectedRoute>
            }
          />
          {/* Execution Routes */}
          <Route
            path="execution/*"
            element={
              <ProtectedRoute>
                <ExecutionRoute />
              </ProtectedRoute>
            }
          />
          {/* Community Routes */}
          <Route
            path="community/*"
            element={
              <ProtectedRoute>
                <CommunityRoute />
              </ProtectedRoute>
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
