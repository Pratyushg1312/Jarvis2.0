import React, { useEffect, useState } from "react";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import View from "../../../Components/CommonComponent/View/View";
import CustomSelect from "../../../Components/CommonComponent/FormElement/CustomSelect";
import FieldContainer from "../../../Components/CommonComponent/FormElement/FieldContainer";
import { useLazyGetSalesReportQuery } from "../../../Redux/Slices/SalesSlices/SalesReportApi";

const SalesReport = () => {
  const [filter, setFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [
    triggerGetSalesReport,
    { data: salesReportData, isLoading: salesLoad, isError: salesError },
  ] = useLazyGetSalesReportQuery();

  useEffect(() => {
    triggerGetSalesReport({ filter, fromDate, toDate });
  }, []);

  const handelSearch = () => {
    triggerGetSalesReport({ filter, fromDate, toDate });
  };

  const options = [
    {
      value: "",
      label: "None",
    },
    {
      value: "today",
      label: "Today",
    },
    {
      value: "week",
      label: "Week",
    },
    {
      value: "month",
      label: "Month",
    },
    {
      value: "quarter",
      label: "Quarter",
    },
    {
      value: "custom",
      label: "Custom",
    },
  ];

  const columns = [
    {
      key: "S.no",
      name: "S.No.",
      renderRowCell: (row, index) => index + 1,
      width: 30,
    },
    {
      key: "userName",
      name: "Sales User Name",
      width: 100,
    },
    {
      key: "userId",
      name: "User ID",
      width: 100,
    },
    {
      key: "totalSaleBookingCounts",
      name: "Total Sales Booking",
      width: 100,
      getTotal: true,
    },
    {
      key: "totalRequestedAmount",
      name: "Total Requested Amount",
      width: 100,
      getTotal: true,
    },
    {
      key: "totalRecordServiceCounts",
      name: "Total Record Sevice",
      width: 100,
      getTotal: true,
    },
    {
      key: "totalRecordServiceAmount",
      name: "Total Record Sevice Amount",
      renderRowCell: (row) => row.totalRecordServiceAmount + "₹",
      width: 100,
      getTotal: true,
    },
    {
      key: "totalGstAmount",
      name: "Total GST Amount",
      renderRowCell: (row) => row.totalGstAmount + "₹",
      width: 100,
      getTotal: true,
    },
    {
      key: "totalCampaignAmount",
      name: "Total Campaign Amount",
      renderRowCell: (row) => row.totalCampaignAmount + "₹",
      width: 100,
      getTotal: true,
    },
    {
      key: "totalBaseAmount",
      name: "Total Base Amount",
      renderRowCell: (row) => row.totalBaseAmount + "₹",
      width: 100,
      getTotal: true,
    },
    {
      key: "totalApprovedAmount",
      name: "Total Appoved Amount",
      renderRowCell: (row) => row.totalApprovedAmount + "₹",
      width: 100,
      getTotal: true,
    },
  ];

  const LinkButtons = [
    {
      type: "element",
      access: [1, 4],
      element: (
        <>
          <CustomSelect
            label={"Filter By"}
            dataArray={options}
            optionId={"value"}
            optionLabel={"label"}
            selectedId={filter}
            setSelectedId={setFilter}
          />
          {filter === "custom" && (
            <>
              <FieldContainer
                type="date"
                label="From Date"
                value={fromDate}
                onChange={(e) => setFromDate(e)}
                format={"YYYY-MM-DD"}
              />
              <FieldContainer
                type="date"
                label="To Date"
                value={toDate}
                onChange={(e) => setToDate(e)}
                format={"YYYY-MM-DD"}
              />
            </>
          )}
        </>
      ),
    },
    {
      type: "button",
      access: [1, 4],
      name: "Search",
      onClick: handelSearch,
      variant: "contained",
      color: "primary",
    },
  ];
  return (
    <>
      <FormContainer
        link={true}
        mainTitle={"Sales Report"}
        LinkButtons={LinkButtons}
      />

      <View
        columns={columns}
        data={salesReportData}
        isLoading={salesLoad}
        pagination
        title={"Report Overview"}
        tableName={"Sales Report OverView"}
        showTotal={true}
      />
    </>
  );
};

export default SalesReport;
