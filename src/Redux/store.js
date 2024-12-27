import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import SalesAccountApi from "./Slices/SalesSlices/SalesAccountApi";
import SalesAccountTypeApi from "./Slices/SalesSlices/SalesAccountTypeApi";
import CompanyTypeApi from "./Slices/SalesSlices/CompanyTypeApi";
import BrandCategoryTypeApi from "./Slices/SalesSlices/BrandCategoryTypeApi";
import SaleBookingApi from "./Slices/SalesSlices/SaleBookingApi";
import BrandApi from "./Slices/SalesSlices/BrandApi";
import DocumentTypeApi from "./Slices/SalesSlices/DocumentTypeApi";
import PointOfContactApi from "./Slices/SalesSlices/PointOfContactApi";
import AccountDocumentApi from "./Slices/SalesSlices/AccountDocumentApi";
import SaleServiceApi from "./Slices/SalesSlices/SalesServiceApi";
import DocumentOverviewApi from "./Slices/SalesSlices/DocumentOverview";
import GetGstDetailApi from "./Slices/GstSlices/GetGstDetailApi";
import ExecutionApi from "./Slices/SalesSlices/ExecutionApi";
import RecordServicesApi from "./Slices/SalesSlices/RecordServicesApi";
import CreditApprovalApi from "./Slices/SalesSlices/CreditApprovalApi";
import PaymentUpdateApi from "./Slices/SalesSlices/PaymentUpdateApi";
import PaymentModeApi from "./Slices/SalesSlices/PaymentModeApi";
import PaymentDetailsApi from "./Slices/SalesSlices/PaymentDetailsApi";
import SaleStatusApi from "./Slices/SalesSlices/SalesStatusApi";
import AgencyApi from "./Slices/SalesSlices/AgencyApi";
import ExecutionCampaignApi from "./Slices/SalesSlices/ExecutionCampaignApi";
import IncentivePlanApi from "./Slices/SalesSlices/IncentivePlanApi";
import InvoiceParticularApi from "./Slices/SalesSlices/InvoiceParticularApi";
import DepartmentApi from "./Slices/SalesSlices/DepartmentApi";
import TargetCompetitionApi from "./Slices/SalesSlices/TargetCompetitionApi";
import SalePocApi from "./Slices/SalesSlices/SalesPocApi";
import SalesReportApi from "./Slices/SalesSlices/SalesReportApi";
import IncentiveSharingApi from "./Slices/SalesSlices/IncentiveSharingApi";
import LoginApi from "./Slices/LoginSlices/LoginApi";
import UserApi from "./Slices/UserSlices/UserApi";
import notificationReducer from "./Slices/NotificationSlices/NotificationSlice";
import SalesDashboardApi from "./Slices/SalesSlices/SalesDashboardApi";
import PreviousRouteReducer from "./Slices/BreadCrumbSlices/PreviousRoute";
import InvoiceRequestApi from "./Slices/SalesSlices/InvoiceRequestApi";
import UserIncentiveDashboardApi from "./Slices/SalesSlices/UserIncentiveDashboardApi";
import CountryCodeApi from "./Slices/CountryCodeSlices/CountryCodeApi";
import SalesCategoryApi from "./Slices/SalesSlices/salesCategoryApi";
import OutstandingApi from "./Slices/FinanceSlices/OutstandingApi";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    previousRoute: PreviousRouteReducer,
    [SalesAccountApi.reducerPath]: SalesAccountApi.reducer,
    [SalesAccountTypeApi.reducerPath]: SalesAccountTypeApi.reducer,
    [CompanyTypeApi.reducerPath]: CompanyTypeApi.reducer,
    [BrandCategoryTypeApi.reducerPath]: BrandCategoryTypeApi.reducer,
    [SaleBookingApi.reducerPath]: SaleBookingApi.reducer,
    [BrandApi.reducerPath]: BrandApi.reducer,
    [DocumentTypeApi.reducerPath]: DocumentTypeApi.reducer,
    [PointOfContactApi.reducerPath]: PointOfContactApi.reducer,
    [AccountDocumentApi.reducerPath]: AccountDocumentApi.reducer,
    [SaleServiceApi.reducerPath]: SaleServiceApi.reducer,
    [DocumentOverviewApi.reducerPath]: DocumentOverviewApi.reducer,
    [GetGstDetailApi.reducerPath]: GetGstDetailApi.reducer,
    [ExecutionApi.reducerPath]: ExecutionApi.reducer,
    [RecordServicesApi.reducerPath]: RecordServicesApi.reducer,
    [CreditApprovalApi.reducerPath]: CreditApprovalApi.reducer,
    [PaymentUpdateApi.reducerPath]: PaymentUpdateApi.reducer,
    [PaymentModeApi.reducerPath]: PaymentModeApi.reducer,
    [PaymentDetailsApi.reducerPath]: PaymentDetailsApi.reducer,
    [SaleStatusApi.reducerPath]: SaleStatusApi.reducer,
    [AgencyApi.reducerPath]: AgencyApi.reducer,
    [ExecutionCampaignApi.reducerPath]: ExecutionCampaignApi.reducer,
    [IncentivePlanApi.reducerPath]: IncentivePlanApi.reducer,
    [InvoiceParticularApi.reducerPath]: InvoiceParticularApi.reducer,
    [DepartmentApi.reducerPath]: DepartmentApi.reducer,
    [TargetCompetitionApi.reducerPath]: TargetCompetitionApi.reducer,
    [SalePocApi.reducerPath]: SalePocApi.reducer,
    [SalesReportApi.reducerPath]: SalesReportApi.reducer,
    [IncentiveSharingApi.reducerPath]: IncentiveSharingApi.reducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [SalesDashboardApi.reducerPath]: SalesDashboardApi.reducer,
    [InvoiceRequestApi.reducerPath]: InvoiceRequestApi.reducer,
    [UserIncentiveDashboardApi.reducerPath]: UserIncentiveDashboardApi.reducer,
    [CountryCodeApi.reducerPath]: CountryCodeApi.reducer,
    [SalesCategoryApi.reducerPath]: SalesCategoryApi.reducer,
    [OutstandingApi.reducerPath]: OutstandingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(SalesAccountApi.middleware)
      .concat(SalesAccountTypeApi.middleware)
      .concat(CompanyTypeApi.middleware)
      .concat(BrandCategoryTypeApi.middleware)
      .concat(SaleBookingApi.middleware)
      .concat(BrandApi.middleware)
      .concat(DocumentTypeApi.middleware)
      .concat(PointOfContactApi.middleware)
      .concat(AccountDocumentApi.middleware)
      .concat(SaleServiceApi.middleware)
      .concat(DocumentOverviewApi.middleware)
      .concat(GetGstDetailApi.middleware)
      .concat(ExecutionApi.middleware)
      .concat(RecordServicesApi.middleware)
      .concat(CreditApprovalApi.middleware)
      .concat(PaymentUpdateApi.middleware)
      .concat(PaymentModeApi.middleware)
      .concat(PaymentDetailsApi.middleware)
      .concat(SaleStatusApi.middleware)
      .concat(AgencyApi.middleware)
      .concat(ExecutionCampaignApi.middleware)
      .concat(IncentivePlanApi.middleware)
      .concat(InvoiceParticularApi.middleware)
      .concat(DepartmentApi.middleware)
      .concat(TargetCompetitionApi.middleware)
      .concat(SalePocApi.middleware)
      .concat(SalesReportApi.middleware)
      .concat(IncentiveSharingApi.middleware)
      .concat(LoginApi.middleware)
      .concat(UserApi.middleware)
      .concat(SalesDashboardApi.middleware)
      .concat(InvoiceRequestApi.middleware)
      .concat(UserIncentiveDashboardApi.middleware)
      .concat(CountryCodeApi.middleware)
      .concat(SalesCategoryApi.middleware)
      .concat(OutstandingApi.middleware),
});
setupListeners(store.dispatch);

export default store;
