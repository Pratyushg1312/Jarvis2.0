import React from "react";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { useGetAllRecordServicesQuery } from "../../../Redux/Slices/SalesSlices/RecordServicesApi";
import DateISOtoNormal from "../../../Utils/DateISOtoNormal";
import PageHeader from "../../../Components/CommonComponent/FormElement/PageHeader";
import View from "../../../Components/CommonComponent/View/View";
import formatString from "../../../Utils/formatString";
import { useGetUserAuthQuery } from "../../../Redux/Slices/UserSlices/UserApi";

const RecordServiceOverview = () => {
  const token = GetDecodedToken();
  let loginUserId;
  const loginUserRole = token.role_id;
  const { data: userAuthData } = useGetUserAuthQuery(token.id);
  if (userAuthData?.find((data) => data?._id == 64)?.view_value !== 1) {
    loginUserId = token.id;
  }
  const {
    data: recordServicedata,
    isLoading: recordServiceDataLoading,
    error: recordServiceDataError,
    isError: recordServiceDataIsError,
  } = useGetAllRecordServicesQuery(loginUserId);

  const columns = [
    {
      key: "serial",
      name: "S.No",
      width: 50,
      renderRowCell: (row, index) => <div>{index + 1}</div>,
    },
    {
      key: "sale_executive_name",
      name: "Sales Executive Name",
      width: 150,
    },
    {
      key: "account_name",
      name: "Account Name",
      width: 150,
    },

    {
      key: "sales_service_master_name",
      name: "Service Name",
      width: 150,
    },
    {
      key: "campaign_name",
      name: "Campaign Name",
      renderRowCell: (row) => formatString(row.campaign_name),
      width: 150,
    },
    {
      key: "campaign_amount",
      name: "Campaign Amount",
      width: 150,
    },
    {
      key: "amount",
      width: 150,
      name: "Record Service Amount",
    },
    {
      key: "brand_name",
      name: "Brand Name",
      width: 150,
    },
    {
      key: "day",
      name: "Day",
      width: 150,
    },
    {
      key: "deliverables_info",
      name: "Deliverables Info",
      width: 150,
    },
    {
      key: "end_date",
      name: "End Date",
      renderRowCell: (row) => DateISOtoNormal(row?.end_date),
      compare: true,
      width: 150,
    },
    {
      key: "goal",
      name: "Goal",
      width: 150,
    },
    {
      key: "hashtag",
      name: "Hashtag",
      width: 150,
    },
    {
      key: "individual_amount",
      name: "Individual Amount",
      width: 150,
    },
    {
      key: "no_of_creators",
      name: "No of creators",
      width: 150,
    },
    {
      key: "no_of_hours",
      name: "No of hours",
      width: 150,
    },
    {
      key: "per_month_amount",
      name: "Per month amount",
      width: 150,
    },
    {
      key: "quantity",
      name: "Quantity",
      width: 150,
    },
    {
      key: "remarks",
      name: "Remarks",
      width: 150,
    },
    {
      key: "start_date",
      name: "Start Date",
      renderRowCell: (row) => DateISOtoNormal(row?.start_date),
      compare: true,
      width: 150,
    },
  ];
  return (
    <>
      <PageHeader mainTitle="Record Services" link={true} />

      <View
        data={recordServicedata}
        columns={columns}
        pagination
        tableName={"Record Services Overview salebooking table navigation"}
        title={"Record Service Overview"}
      />
    </>
  );
};

export default RecordServiceOverview;
