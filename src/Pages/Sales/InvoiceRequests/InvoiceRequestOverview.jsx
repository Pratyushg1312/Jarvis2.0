import React, { useEffect, useState } from "react";
import { useGetInvoiceRequestListQuery } from "../../../Redux/Slices/SalesSlices/InvoiceRequestApi";
import PageHeader from "../../../Components/CommonComponent/FormElement/PageHeader";
import View from "../../../Components/CommonComponent/View/View";
import formatString from "../../../Utils/formatString";
import DateISOtoNormal from "../../../Utils/DateISOtoNormal";
import GetDecodedToken from "../../../Utils/GetDecodedToken";

const InvoiceRequestOverview = () => {
  const token = GetDecodedToken();
  let loginUserId;

  const loginUserRole = token.role_id;
  if (loginUserRole !== 1) loginUserId = token.id;

  const {
    data: invoiceData,
    isLoading: invoiceLoading,
    isError: invoiceError,
  } = useGetInvoiceRequestListQuery(loginUserId);

  // async function apicall() {
  //     try {

  //         const response = await axios.get(`${baseUrl}sales/invoice_request${loginUserId ? `?userId=${loginUserId}` : ""}`,
  //             {
  //                 headers: {
  //                     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //                 },
  //             }
  //         );
  //         setInvoiceData(response.data.data, "response");
  //     } catch (error) {
  //         console.error(error);
  //     }

  // }
  // useEffect(() => {
  //     apicall()
  // }, []);
  const columns = [
    {
      key: "s.no",
      name: "S.No",
      renderRowCell: (row, index) => index + 1,
      width: 50,
    },
    {
      key: "sale_booking_id",
      name: "Sale Booking ID",

      width: 100,
    },
    {
      key: "purchase_order_number",
      name: "Purchase Order Number",
      width: 100,
    },
    {
      key: "invoice_number",
      name: "Invoice Number",
      width: 100,
    },
    {
      key: "invoice_uploaded_date",
      name: "Invoice Uploaded Date",
      renderRowCell: (row) => DateISOtoNormal(row.invoice_uploaded_date),
      width: 100,
      compare: true,
    },
    {
      key: "saleData.sale_booking_date",
      name: "Sale Booking Date",
      renderRowCell: (row) => DateISOtoNormal(row.saleData.sale_booking_date),
      width: 100,
      compare: true,
    },
    {
      key: "saleData.campaign_amount",
      name: "Campaign Amount",
      width: 100,
      renderRowCell: (row) => row.saleData.campaign_amount,
      compare: true,
    },

    {
      key: "saleData.base_amount",
      name: "Base Amount",
      width: 100,
      renderRowCell: (row) => row.saleData.base_amount,
      compare: true,
    },
    {
      key: "saleData.gst_amount",
      name: "GST Amount",
      width: 100,
      compare: true,
      renderRowCell: (row) => row.saleData.gst_amount,
    },
    {
      key: "saleData.account_name",
      name: "Account Name",
      width: 100,
      renderRowCell: (row) => row.saleData.account_name,
      compare: true,
    },
    {
      key: "invoice_type_id",
      name: "Invoice Type",
      rendeRowCell: (row) => formatString(row.invoice_type_id),
      width: 100,
    },
    {
      key: "invoice_action_reason",
      name: "Invoice Action Reason",
      rendeRowCell: (row) => formatString(row.invoice_action_reason),

      width: 100,
    },
    {
      key: "invoice_particular",
      name: "Invoice Particular",
      width: 100,
      renderRowCell: (row) => row.saleData.invoice_particular_name,
      compare: true,
    },
    {
      key: "invoice_creation_status",
      name: "Invoice Creation Status",
      renderRowCell: (row) => formatString(row.invoice_creation_status),
      width: 100,
    },
  ];
  return (
    <div>
      <PageHeader mainTitle={"Invoice Request"} link={true} />

      <View
        columns={columns}
        data={invoiceData}
        pagination
        title={"Invoice Request Overview"}
        tableName={"Invoice Request list"}
        isLoading={invoiceLoading}
      />
    </div>
  );
};

export default InvoiceRequestOverview;
