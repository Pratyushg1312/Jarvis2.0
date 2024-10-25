import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Components/CommonComponent/Layout/Layout';
import { CreatePaymentMode, CreateDocumentType, InvoiceRequestOverview, CreateIncentivePlan, IncentivePlanOveview, SalesDashboard, SalesAccountOverview, SalesIncentiveOverview, SalesBookingOverview, PocOverview, SalesReport, TargetCompetetionOverview, CreateTargetCompetition, OutstandingOverview, DocumentTypeOverview, PaymentDetailsOverview, PaymentModeOverview, ServicesOverview, RecordServiceOverview, PaymentUpdateOverview, IncentiveDashboard, UserIncentive } from '../Pages/Sales/Index';

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
                <Route path="create-target-competition/:id" element={<CreateTargetCompetition />} />
                <Route path="outstanding-overview" element={<OutstandingOverview />} />
                <Route path="document-type-overview" element={<DocumentTypeOverview />} />
                <Route path="create-document-type" element={<CreateDocumentType />} />
                <Route path="payment-details-overview" element={<PaymentDetailsOverview />} />
                <Route path="payment-mode-overview" element={<PaymentModeOverview />} />
                <Route path="create-payment-mode" element={<CreatePaymentMode />} />
                <Route path="create-payment-mode/:id" element={<CreatePaymentMode />} />

                <Route path="services-overview" element={<ServicesOverview />} />
                <Route path="record-servcies-overview" element={<RecordServiceOverview />} />
                <Route path="payment-update-overview" element={<PaymentUpdateOverview />} />
                <Route path="incentive-dashboard" element={<IncentiveDashboard />} />
                <Route path="user-incentive" element={<UserIncentive />} />
                <Route path="invoice-request-overview" element={<InvoiceRequestOverview />} />
                <Route path="incentive-plan-overview" element={<IncentivePlanOveview />} />
                <Route path="incentive-plan/:id" element={<CreateIncentivePlan />} />

            </Route>

        </Routes>
    );
};

export default SalesRoute;
