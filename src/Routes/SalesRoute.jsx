import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Components/CommonComponent/Layout/Layout';
import DummyPage from '../Pages/Dummy/DummyPage';

const SalesRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<DummyPage name={"Sales Dashboard"} />} />
                <Route path="dashboard2" element={<DummyPage name={"sales 2nd Dashboard"} />} />

            </Route>
            <Route path="accounts" element={<DummyPage name={"Account Page"} />} />
        </Routes>
    );
};

export default SalesRoute;
