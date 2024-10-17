import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Components/CommonComponent/Layout/Layout';
import DummyPage from '../Pages/Dummy/DummyPage';

const FinanceRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<DummyPage name={"Finance Dashboard"} />} />
                <Route path="incentive" element={<DummyPage name={"incentive"} />} />

            </Route>
        </Routes>
    );
};

export default FinanceRoute;
