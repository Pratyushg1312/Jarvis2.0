import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Components/CommonComponent/Layout/Layout";
import {
  CreateSaleBooking,
  CreatePaymentUpdate,
  CreatePaymentMode,
  CreateDocumentType,
  InvoiceRequestOverview,
  CreateIncentivePlan,
  IncentivePlanOverview,
  SalesDashboard,
  SalesAccountOverview,
  SalesIncentiveOverview,
  SalesBookingOverview,
  PocOverview,
  SalesReport,
  TargetCompetitionOverview,
  CreateTargetCompetition,
  OutstandingOverview,
  DocumentTypeOverview,
  PaymentDetailsOverview,
  PaymentModeOverview,
  ServicesOverview,
  RecordServiceOverview,
  PaymentUpdateOverview,
  IncentiveDashboard,
  UserIncentive,
  CreateSalesAccount,
  IncentiveSettlement,
  DeletedSaleBooking,
  EarnedAndUnearned,
  AccountInfo,
  CreateSalesServices,
} from "../Pages/Sales/Index";
import PageNotFound from "../Components/CommonComponent/PageNotFound/PageNotFound";

const SalesRoute = () => {
  return (
    <Routes>
      {/* Routes with Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace={true} />} /> // It redirects index to desired routing like dashboard or  landing page of modules . Use only if index is not in use.
        <Route path="dashboard" element={<SalesDashboard />} />
        <Route path="account-overview" element={<SalesAccountOverview />} />
        <Route path="closed-deal" element={<SalesBookingOverview />} />
        <Route path="incentive-overview" element={<SalesIncentiveOverview />} />
        <Route path="point-of-contact" element={<PocOverview />} />
        <Route path="report-overview" element={<SalesReport />} />
        <Route
          path="target-competition-overview"
          element={<TargetCompetitionOverview />}
        />
        <Route
          path="create-target-competition"
          element={<CreateTargetCompetition />}
        />
        <Route
          path="create-target-competition/:id"
          element={<CreateTargetCompetition />}
        />
        <Route path="outstanding-overview" element={<OutstandingOverview />} />
        <Route
          path="document-type-overview"
          element={<DocumentTypeOverview />}
        />
        <Route path="create-document-type" element={<CreateDocumentType />} />
        <Route
          path="payment-details-overview"
          element={<PaymentDetailsOverview />}
        />
        <Route path="payment-mode-overview" element={<PaymentModeOverview />} />
        <Route path="create-payment-mode" element={<CreatePaymentMode />} />
        <Route path="create-payment-mode/:id" element={<CreatePaymentMode />} />
        <Route
          path="create-payment-update/:id"
          element={<CreatePaymentUpdate />}
        />

        <Route path="services-overview" element={<ServicesOverview />} />
        <Route
          path="record-services-overview"
          element={<RecordServiceOverview />}
        />
        <Route
          path="payment-update-overview"
          element={<PaymentUpdateOverview />}
        />
        <Route path="incentive-dashboard" element={<IncentiveDashboard />} />
        <Route path="user-incentive" element={<UserIncentive />} />
        <Route
          path="invoice-request-overview"
          element={<InvoiceRequestOverview />}
        />
        <Route
          path="incentive-plan-overview"
          element={<IncentivePlanOverview />}
        />
        <Route path="incentive-plan/:id" element={<CreateIncentivePlan />} />
        <Route path="create-sales-booking" element={<CreateSaleBooking />} />
        <Route
          path="create-sales-booking/:editId/:un_id"
          element={<CreateSaleBooking />}
        />
        <Route
          path="create-sales-account/:id"
          element={<CreateSalesAccount />}
        />
        <Route
          path="incentive-settlement-overview"
          element={<IncentiveSettlement />}
        />
        <Route path="deleted-sales-booking" element={<DeletedSaleBooking />} />
        <Route path="incentive-status/:id" element={<EarnedAndUnearned />} />
        <Route
          path="create-sales-services"
          element={<CreateSalesServices />}
        />
        <Route
          path="create-sales-services/:id/:method"
          element={<CreateSalesServices />}
        />

        {/* Catch-All Route for Nested Paths */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
      {/* Global Catch-All Route */}
      <Route path="*" element={<PageNotFound />} />

      {/* Route outside Layout */}
      <Route path="account-info/:id" element={<AccountInfo />} />

    </Routes>
  );
};

export default SalesRoute;
