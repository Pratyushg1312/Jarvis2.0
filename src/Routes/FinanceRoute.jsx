import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Components/CommonComponent/Layout/Layout";
import DummyPage from "../Pages/Dummy/DummyPage";
import PageNotFound from "../Components/CommonComponent/PageNotFound/PageNotFound";

const FinanceRoute = () => {
  return (
    <Routes>
      {/* Routes with Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace />} /> // It
        redirects index to desired routing like dashboard or landing page of
        modules . Use only if index is not in use.
        <Route
          path="dashboard"
          element={<DummyPage name={"Finance Dashboard"} />}
        />
        <Route path="incentive" element={<DummyPage name={"incentive"} />} />
        {/* Catch-All Route for Nested Paths */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
      {/* Global Catch-All Route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default FinanceRoute;
