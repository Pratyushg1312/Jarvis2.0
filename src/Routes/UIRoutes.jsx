import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Components/CommonComponent/Layout/Layout";
import DummyPage from "../Pages/Dummy/DummyPage";
import UIPage from "../Pages/UI/UIPage";
import JarvisCards from "../Pages/UI/JarvisCards";

const UIRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<UIPage />} />
        <Route path="jarvis-cards" element={<JarvisCards />} />
      </Route>
      <Route path="dummy" element={<DummyPage name={"fake Page"} />} />
    </Routes>
  );
};

export default UIRoutes;
