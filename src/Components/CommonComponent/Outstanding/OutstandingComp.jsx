import React from "react";
import { useGetUserWieOutStandingQuery } from "../../../Redux/Slices/FinanceSlices/OutstandingApi";
import View from "../View/View";

const OutstandingComp = () => {
  const {
    data: userWieOutStanding,
    error: userWieOutStandingError,
    isLoading: userWieOutStandingLoading,
  } = useGetUserWieOutStandingQuery();

  const Column = [
    {
      key: "S.no",
      name: "S.No",
      renderRowCell: (row, index) => index + 1,
      width: 100,
    },
    {
      key: "sales_executive_name",
      name: "Sales Executive Name",
      width: 200,
    },
    {
      key: "totalOutstandingAmount",
      name: "Total Outstanding Amount",
      width: 200,
      getTotal: true,
    },
    {
      key: "totalSaleBookingCounts",
      name: "Sale Booking Counts",
      width: 200,
    },
    {
      key: "totalUnEarnedOutstandingAmount",
      name: "UnEarned Outstanding Amount",
      width: 200,
      getTotal: true,
    },
    {
      key: "totalUnEarnedWithInvoiceUploadedOutstandingAmount",
      name: "UnEarned With Invoice Outstanding Amount",
      width: 200,
      getTotal: true,
    },
  ];

  return (
    <View
      title={"User Wise Outstanding"}
      data={userWieOutStanding}
      isLoading={userWieOutStandingLoading}
      tableName={"sales_dashboard_userwise_Outstanding"}
      columns={Column}
      showTotal={true}
      pagination
    />
  );
};

export default OutstandingComp;
