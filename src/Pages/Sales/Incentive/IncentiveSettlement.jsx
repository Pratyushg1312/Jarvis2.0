import React from "react";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import View from "../../../Components/CommonComponent/View/View";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import { useGetIncentiveSettelmentQuery } from "../../../Redux/Slices/SalesSlices/SalesDashboardApi";
import { useGetUserAuthQuery } from "../../../Redux/Slices/UserSlices/UserApi";

const IncentiveSettlement = () => {
  const token = GetDecodedToken();
  let loginUserId = null;
  const loginUserRole = token.role_id;
  const { data: userAuthData } = useGetUserAuthQuery(token.id);
  if (userAuthData?.find((data) => data?._id == 64)?.view_value !== 1) {
    loginUserId = token.id;
  }
  console.log(loginUserId);
  const {
    data: settlementData,
    error: settlementError,
    isLoading: settlementLoading,
    isSuccess: settlementSuccess,
  } = useGetIncentiveSettelmentQuery(loginUserId);

  const columns = [
    {
      key: "S.No",
      name: "S.No",
      width: 50,
      renderRowCell: (row, index) => {
        return index + 1;
      },
    },
    {
      key: "user_name",
      name: "User Name",
      width: 150,
    },
    {
      key: "totalDocuments",
      name: "Total Documents",
      width: 150,
    },
    {
      key: "recordServiceAmount",
      name: "Record Service Amount",
      width: 150,
    },
    {
      key: "gstRecordServiceAmount",
      name: "GST Record Service Amount",
      width: 150,
    },
    {
      key: "nonGstRecordServiceAmount",
      name: "Non GST Record Service Amount",
      width: 150,
    },
    {
      key: "incentiveAmount",
      name: "Incentive Amount",
      width: 150,
    },
  ];

  return (
    <div>
      <FormContainer mainTitle={"Incentive Settlement"} />
      <View
        title={"Incentive Settlement Overview"}
        data={settlementData}
        loading={settlementLoading}
        columns={columns}
        pagination
        tableName={"IncentiveSettlementoverview"}
      />
    </div>
  );
};

export default IncentiveSettlement;
