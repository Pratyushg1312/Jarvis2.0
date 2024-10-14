import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Components/CommonComponent/Layout/Layout';
import { SalesDashboard, SalesAccountOverview, SalesIncentiveOverview, SalesBookingOverview } from '../Pages/Sales/Index';

const SalesRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/dashboard" element={<SalesDashboard />} />
                <Route path="account-overview" element={<SalesAccountOverview />} />
                <Route path="salesbooking-overview" element={<SalesBookingOverview />} />
                <Route path="incentive-overview" element={<SalesIncentiveOverview />} />
            </Route>
        </Routes>
    );
};

export default SalesRoute;
