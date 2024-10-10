import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SalesRoute from './SalesRoute'; // Import your sales routes
import FinanceRoute from './FinanceRoute'; // Import your finance routes
import Layout from '../Components/CommonComponent/Layout/Layout';
import DummyPage from '../Pages/Dummy/DummyPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<DummyPage />} />
                </Route>
                <Route path="sales/*" element={<SalesRoute />} />
                <Route path="finance/*" element={<FinanceRoute />} />
            </Routes>
        </BrowserRouter>

    );
};

export default Router;
