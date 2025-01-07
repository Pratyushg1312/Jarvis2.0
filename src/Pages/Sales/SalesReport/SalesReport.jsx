import React, { useEffect, useState } from "react";
import PageHeader from "../../../Components/CommonComponent/FormElement/PageHeader";
import View from "../../../Components/CommonComponent/View/View";
import CustomSelect from "../../../Components/CommonComponent/FormElement/CustomSelect";
import FieldContainer from "../../../Components/CommonComponent/FormElement/FieldContainer";
import { useLazyGetSalesReportQuery } from "../../../Redux/Slices/SalesSlices/SalesReportApi";
import { Button } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  Cell,
  PieChart,
} from "recharts";
import { useGetSalesCategoryListQuery } from "../../../Redux/Slices/SalesSlices/salesCategoryApi";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { useGetUserAuthQuery } from "../../../Redux/Slices/UserSlices/UserApi";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const SalesReport = () => {
  let loginUserId;
  const loginUserRole = GetDecodedToken().role_id;
  const [filter, setFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [Cat_id, setCat_id] = useState(null);

  const { data: userAuthData } = useGetUserAuthQuery();
  if (userAuthData?.find((data) => data?._id == 64)?.view_value !== 1) {
    loginUserId = GetDecodedToken().id;
  }

  const {
    data: categoryDetails,
    error: categoryDetailsError,
    isLoading: categoryDetailsLoading,
  } = useGetSalesCategoryListQuery({
    skip: userAuthData?.find((data) => data?._id == 64)?.view_value,
  });

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
          {categoryDetails && (
            <CustomSelect
              label={"Category"}
              fieldGrid={4}
              dataArray={[
                ...categoryDetails,
                { sales_category_id: null, sales_category_name: "None" },
              ]?.reverse()}
              optionId="sales_category_id"
              optionLabel="sales_category_name"
              selectedId={Cat_id}
              setSelectedId={setCat_id}
            />
          )}
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
      <PageHeader
        link={true}
        mainTitle={"Sales Report"}
        LinkButtons={LinkButtons}
      />

      <div className="card">
        <div className="card-body">
          <div style={{ width: "100%", height: 400, overflowX: "scroll" }}>
            <ResponsiveContainer
              width={salesReportData?.length * 100}
              height={400}
              overflowX="scroll"
            >
              <BarChart data={salesReportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="userName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalBaseAmount" fill="#8884d8" />
                <Bar dataKey="totalCampaignAmount" fill="#82ca9d" />
                <Bar dataKey="totalGstAmount" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salesReportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="userName" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="totalSaleBookingCounts"
                  fill="#8884d8"
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationBegin={0}
                >
                  {salesReportData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

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
