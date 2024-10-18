import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Components/CommonComponent/Layout/Layout';
import DummyPage from '../Pages/Dummy/DummyPage';
const DummyRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="*" element={<DummyPage name={"Main Dashboard"} />} />
            </Route>
        </Routes>)
}

export default DummyRoute