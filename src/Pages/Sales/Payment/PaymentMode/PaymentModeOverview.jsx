import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import View from "../../../../Components/CommonComponent/View/View";
import FormContainer from "../../../../Components/CommonComponent/FormElement/FormContainer";
import {
  useDeletePaymentModeMutation,
  useGetAllPaymentModesQuery,
} from "../../../../Redux/Slices/SalesSlices/PaymentModeApi";
import GetDecodedToken from "../../../../Utils/GetDecodedToken";
import DeleteButton from "../../../../Components/CommonComponent/DeleteButton/DeleteButton";
import { useGetUserAuthQuery } from "../../../../Redux/Slices/UserSlices/UserApi";
import { Pencil } from "@phosphor-icons/react";

const LinkButtons = [
  {
    link: "/sales/create-payment-mode",
    name: "Add Payment Mode",
    type: "link",
    access: [1, 4],
  },
];

const PaymentModeOverview = () => {
  const token = GetDecodedToken();
  let loginUserId;
  const loginUserRole = token.role_id;
  const { data: userAuthData } = useGetUserAuthQuery(token.id);
  if (userAuthData?.find((data) => data?._id == 64)?.view_value !== 1) {
    loginUserId = token.id;
  }
  const {
    refetch: refetchPaymentMode,
    data: allPaymentModeData,
    isLoading: paymentModeLoading,
    isError: paymentModeError,
  } = useGetAllPaymentModesQuery();

  const [deletePaymentMode, { isLoading: deletePaymentModeLoading }] =
    useDeletePaymentModeMutation();

  const columns = [
    {
      key: "s.no",
      name: "S.No",
      renderRowCell: (row, index) => index + 1,
      width: 50,
    },
    {
      key: "payment_mode_name",
      name: "Mode Name",
      renderRowCell: (row) => row.payment_mode_name,
      width: 500,
    },
    {
      key: "action",
      name: "Actions",
      renderRowCell: (row) => (
        <div className="flexCenter colGap8">
          <Link to={`/sales/create-payment-mode/${row._id}`}>
            <button className="iconBtn sm" title="Edit">
              <Pencil />
            </button>
          </Link>
          <button className="iconBtn sm">
            <DeleteButton
              api={deletePaymentMode}
              id={row._id}
              getData={refetchPaymentMode}
            />
          </button>
        </div>
      ),
      width: 100,
    },
  ];

  return (
    <>
      <FormContainer
        mainTitle="Payment Mode"
        link="/sales/create-payment-mode"
        LinkButtons={LinkButtons}
      />

      <View
        title={"Payment Mode Overview"}
        columns={columns}
        data={allPaymentModeData}
        pagination
        isLoading={paymentModeLoading}
        tableName={"PaymentModeOverview"}
      />
    </>
  );
};

export default PaymentModeOverview;
