import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import View from "../../../Components/CommonComponent/View/View";
import Tab from "../../../Components/CommonComponent/Tab/Tab";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import DateISOtoNormal from "../../../Utils/DateISOtoNormal";
import {
  useGetAccountWiseStatusQuery,
  useGetUserWiseStatusQuery,
} from "../../../Redux/Slices/SalesSlices/SalesStatusApi";
import { useGetAllAccountQuery } from "../../../Redux/Slices/SalesSlices/SalesAccountApi";
import GetDecodedToken from "../../../Utils/GetDecodedToken";

const OutstandingOverview = () => {
  const [activeData, setActiveData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const token = GetDecodedToken();
  let loginUserId;
  const loginUserRole = token.role_id;
  if (loginUserRole !== 1) {
    loginUserId = token.id;
  }
  const tabName = ["Account Outstanding", "Sales Executive Outstanding"];
  const {
    data: allAccountData,
    isError: accountError,
    isLoading: accountLoading,
  } = useGetAllAccountQuery();

  const {
    data: accountWiseStatus,
    isSuccess: accountWiseStatusSuccess,
    isLoading: accountWiseStatusLoading,
    isError: accountWiseStatusError,
  } = useGetAccountWiseStatusQuery(loginUserId);

  const {
    data: userWiseStatus,
    isSuccess: userWiseStatusSuccess,
    isLoading: userWiseStatusLoading,
    isError: userWiseStatusError,
  } = useGetUserWiseStatusQuery(loginUserId, { skip: loginUserRole !== 1 });


  useEffect(() => {
    if (accountWiseStatus) {
      setActiveData(accountWiseStatus?.filter(data => (data?.total_purchase_amount - data?.approved_amount !== 0)));
    }
  }, [accountWiseStatusLoading]);



  const onTabClick = (index) => {
    setActiveTab(index);
  };



  useEffect(() => {
    if (activeTab === 0) {
      setActiveData(accountWiseStatus?.filter(data => (data?.total_purchase_amount - data?.approved_amount !== 0)));
    } else {
      setActiveData(userWiseStatus?.filter(data => (data?.total_purchase_amount - data?.approved_amount !== 0)));
    }
  }, [activeTab]);


  const accountColumns = [
    {
      key: "sr_no",
      name: "S.No",
      renderRowCell: (row, index) => index + 1,
      width: 40,
    },
    {
      key: "account_name",
      name: "Account Name",
      renderRowCell: (row) => (
        <Link
          to={`/sales-account-info/${allAccountData?.find((data) => data?.account_id === row?.account_id)
            ?._id
            }`}
        >
          {row.account_name}
        </Link>
      ),
      width: 100,
    },
    {
      key: "registered_by_name",
      name: "Registered By",
      renderRowCell: (row) => row.registered_by_name,
      with: 100,
    },
    // {
    //   key: "requested_amount",
    //   name: "Requested Amount",
    //   renderRowCell: (row) => row.requested_amount,
    //   width: 100,
    //   getTotal :true,
    // },
    {
      key: "gst_status",
      name: "GST Status",
      compare: true,
      renderRowCell: (row) => (row.gst_status ? "GST" : "No GST"),
    },
    {
      key: "approved_amount",
      name: "Approved Amount",
      renderRowCell: (row) => row.approved_amount,
      width: 100,
      compare: true,
      getTotal: true,
    },
    {
      key: "balance_amount",
      name: "Total Balance Amount",
      renderRowCell: (row) => row.total_purchase_amount - row.approved_amount,
      width: 100,
      compare: true,
      getTotal: true,
    },
    // {
    //   key: "balance_payment_ondate",
    //   name: "Balance Payment On Date",
    //   renderRowCell: (row) => DateISOtoNormal(row.balance_payment_ondate),
    //   width: 100,
    //   compare: true,
    // },
    {
      key: "booking_status",
      name: "Booking Status",
      renderRowCell: (row) => row.booking_status,
      width: 100,
    },
    {
      key: "sale_booking_date",
      name: "Sale Booking Date",
      renderRowCell: (row) => DateISOtoNormal(row.sale_booking_date),
      width: 100,
      compare: true,
    },
    // {
    //   key: "campaign_amount",
    //   name: "Campaign Amount",
    //   renderRowCell: (row) =>  row.campaign_amount,
    //   width: 100,
    //   getTotal: true,
    // },
    // {
    //   key: "credit_approval_status",
    //   name: "Credit Approval Status",
    //   renderRowCell: (row) => row.credit_approval_status,
    //   width: 100,
    // },
    {
      key: "total_purchase_amount",
      name: "Total Campaign Amount",
      renderRowCell: (row) => row.total_purchase_amount,
      width: 100,
      getTotal: true,
    },
    {
      key: "total_sale_booking",
      name: "Total Sale Booking",
      renderRowCell: (row) => row.total_sale_booking,
      width: 100,
      getTotal: true,
    },
  ];
  return (
    <div>
      <FormContainer mainTitle={"Outstanding"} link={"true"} />
      {loginUserRole === 1 && <Tab
        tabName={tabName}
        activeTabindex={activeTab}
        onTabClick={onTabClick}
      />}
      <View
        title={"Outstanding View"}
        columns={accountColumns}
        data={activeData}
        isLoading={accountWiseStatusLoading || userWiseStatusLoading}
        pagination
        tableName={"SalesOutstandingView"}
        showTotal={true}
      />
    </div>
  );
};
export default OutstandingOverview;
