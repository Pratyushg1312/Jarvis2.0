import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Components/CommonComponent/Layout/Layout';
import { SalesDashboard, SalesAccountOverview, SalesIncentiveOverview, SalesBookingOverview, PocOverview, SalesReport, TargetCompetetionOverview, CreateTargetCompetition, OutstandingOverview, DocumentTypeOverview, PaymentDetailsOverview, PaymentModeOverview, ServicesOverview, RecordServiceOverview, PaymentUpdateOverview } from '../Pages/Sales/Index';

const SalesRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<SalesDashboard />} />
                <Route path="account-overview" element={<SalesAccountOverview />} />
                <Route path="salesbooking-overview" element={<SalesBookingOverview />} />
                <Route path="incentive-overview" element={<SalesIncentiveOverview />} />
                <Route path="point-of-contact" element={<PocOverview />} />
                <Route path="report-overview" element={<SalesReport />} />
                <Route path="target-competetion-overview" element={<TargetCompetetionOverview />} />
                <Route path="create-target-competition" element={<CreateTargetCompetition />} />
                <Route path="outstanding-overview" element={<OutstandingOverview />} />
                <Route path="document-type-overview" element={<DocumentTypeOverview />} />
                <Route path="payment-details-overview" element={<PaymentDetailsOverview />} />
                <Route path="payment-mode-overview" element={<PaymentModeOverview />} />
                <Route path="services-overview" element={<ServicesOverview />} />
                <Route path="record-servcies-overview" element={<RecordServiceOverview />} />
                <Route path="payment-update-overview" element={<PaymentUpdateOverview />} />


            </Route>

        </Routes>
    );
};

export default SalesRoute;
