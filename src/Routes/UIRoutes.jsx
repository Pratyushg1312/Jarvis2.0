import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Components/CommonComponent/Layout/Layout";
import DummyPage from "../Pages/Dummy/DummyPage";
import UIPage from "../Pages/UI/UIPage";
import JarvisCards from "../Pages/UI/JarvisCards";
import JarvisButtons from "../Pages/UI/JarvisButtons";
import JarvisForms from "../Pages/UI/JarvisForms";
import JarvisHeaders from "../Pages/UI/JarvisHeaders";

const UIRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<UIPage />} />
        <Route path="jarvis-cards" element={<JarvisCards />} />
        <Route path="jarvis-buttons" element={<JarvisButtons />} />
        <Route path="jarvis-forms" element={<JarvisForms />} />
        <Route path="jarvis-headers" element={<JarvisHeaders />} />
      </Route>
      <Route path="dummy" element={<DummyPage name={"fake Page"} />} />
    </Routes>
  );
};

export default UIRoutes;
