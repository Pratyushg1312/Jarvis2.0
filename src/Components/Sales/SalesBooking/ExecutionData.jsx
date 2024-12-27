import React from "react";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import FormContainer from "../../CommonComponent/FormElement/FormContainer";
import View from "../../CommonComponent/View/View";
import { useGetAllRecordServicesQuery } from "../../../Redux/Slices/SalesSlices/RecordServicesApi";
import { useGetUserAuthQuery } from "../../../Redux/Slices/UserSlices/UserApi";

const ExecutionData = ({ selectedRowData }) => {
  const token = GetDecodedToken();
  let loginUserId;
  const loginUserRole = token.role_id;
  const { data: userAuthData } = useGetUserAuthQuery(token.id);
  if (userAuthData?.find((data) => data?._id == 64)?.view_value !== 1) {
    loginUserId = token.id;
  }
  const {
    data: RecordServiceData,
    isLoading: RecordsLoading,
    isError: RecordsError,
  } = useGetAllRecordServicesQuery(loginUserId);
  const column = [
    {
      key: "serial",
      name: "S.No",
      renderRowCell: (row, index) => <div>{index + 1}</div>,
      width: 50,
    },
    {
      key: "records",
      name: "Records",
      renderRowCell: (row, index) => (
        <div>{`RecordService ` + (index + 1)}</div>
      ),
      width: 100,
    },
    {
      key: "amount",
      name: "Amount",
      renderRowCell: (row) => {
        return RecordServiceData?.find(
          (data) => data?._id == row?.record_service_id
        )?.amount;
      },
      width: 100,
    },
    {
      key: "execution_token",
      name: "Token",
      width: 100,
    },
    {
      key: "Action",
      name: "Actions",
      renderRowCell: (row) => (
        <button
          className="icon-1"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(row?.execution_token);
              toastAlert("Token Copied");
            } catch (err) {
              toastError("Failed to copy text");
            }
          }}
        >
          <i className="bi bi-clipboard"></i>
        </button>
      ),
      width: 100,
    },
  ];

  return (
    <div>
      <FormContainer mainTitle={"Records"} link={true} />
      <View
        data={selectedRowData?.executionData}
        columns={column}
        isLoading={RecordsLoading}
        tableName={"ExecutionDataTable"}
        title={"Overview"}
      />
    </div>
  );
};

export default ExecutionData;
