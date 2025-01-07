import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeletePaymentDetailsMutation,
  useGetPaymentDetailListQuery,
  useUpdatePaymentDetailsMutation,
} from "../../../../Redux/Slices/SalesSlices/PaymentDetailsApi";
import FormContainer from "../../../../Components/CommonComponent/FormElement/FormContainer";
import View from "../../../../Components/CommonComponent/View/View";

const LinkButtons = [
  {
    link: "/sales/payment-mode-overview",
    name: "Payment Mode",
    type: "link",
    access: [1, 4],
  },
  {
    link: "/sales/create-payment-details",
    name: "Add Payment Details",
    type: "link",
    access: [1, 4],
  },
];

const PaymentDetailsOverview = () => {
  const {
    data: allPaymentDetailsData,
    refetch: refetchPaymentDetails,
    isError: paymentDetailsError,
    isLoading: paymentDetailsLoading,
  } = useGetPaymentDetailListQuery();

  const [
    updatedPaymentDetails,
    { isLoading: paymentUpdating, isError: paymentUpdateError },
  ] = useUpdatePaymentDetailsMutation();

  const [paymentDetailsData, setPaymentDetailsData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [search, setSearch] = useState("");
  const [copiedRowId, setCopiedRowId] = useState(null);
  const [deletePaymentDetails, { isLoading: deleting }] =
    useDeletePaymentDetailsMutation();

  function handleDelete(id) {
    deletePaymentDetails(id);
  }
  useEffect(() => {
    setPaymentDetailsData(allPaymentDetailsData);
  }, [allPaymentDetailsData]);

  useEffect(() => {
    const result = originalData.filter((d) => {
      return d.reason?.toLowerCase().includes(search.toLowerCase());
    });
    setPaymentDetailsData(result);
  }, [search]);

  const handleCopyDetails = (row) => {
    const detailsText = row?.details?.split("\n").join("\n");
    navigator?.clipboard
      ?.writeText(detailsText)
      .then(() => {
        setCopiedRowId(row._id);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleUpdateStatus = async (row) => {
    try {
      await updatedPaymentDetails({
        id: row._id,
        is_hide: !row.is_hide,
      }).unwrap();

      toastAlert("Status changed successfully");
    } catch (error) {
      toastError(error.message);
    }
  };

  const columns = [
    {
      name: "S.No",
      renderRowCell: (row, index) => index + 1,
      width: 50,
    },
    {
      key: "title",
      width: 250,
      name: "Payment Title",
      renderRowCell: (row) => (
        <Link
          style={{ color: "blue" }}
          to={`/sales/payment-update-bank-wise/${row._id}`}
        >
          {row.title}
        </Link>
      ),
    },
    {
      key: "details",
      width: 420,
      name: "Details",
      renderRowCell: (row) =>
        row.details?.split("\n").map((line, index) => (
          <div key={index}>
            {line}
            <br />
          </div>
        )),
    },

    {
      key: "payment_mode_name",
      width: 100,
      name: "Payment Mode",
    },
    {
      key: "gst_bank",
      width: 100,
      name: "GST Bank",
      renderRowCell: (row) => (row.gst_bank ? "GST" : "Non GST"),
      compare: true,
    },
    {
      key: "status-1",
      width: 160,
      name: "Status",
      compare: true,
      renderRowCell: (row, index) => {
        if (!row.is_hide) {
          return (
            <div
              className="badge success"
              onClick={() => handleUpdateStatus(row)}
            >
              Hide
            </div>
          );
        } else {
          return (
            <div
              className="badge danger"
              onClick={() => handleUpdateStatus(row)}
            >
              Unhide
            </div>
          );
        }
      },
    },
    {
      width: 1000,
      name: "Actions",
      renderRowCell: (row) => (
        <div className="flexCenter colGap12">
          <button
            className="iconBtn"
            title="Copy"
            onClick={() => handleCopyDetails(row)}
            disabled={row._id === copiedRowId}
          >
            {row._id === copiedRowId ? (
              <i className="bi bi-clipboard2-check" />
            ) : (
              <i className="bi bi-clipboard" />
            )}
          </button>
          {row._id === copiedRowId && (
            <span className="mt-1" style={{ color: "green" }}>
              Copied
            </span>
          )}

          <Link to={`/sales/edit-payment-details/${row._id}`}>
            <button className="iconBtn" title="Edit">
              <i className="bi bi-pencil" />
            </button>
          </Link>
          <button
            className="iconBtn"
            onClick={() => handleDelete(row._id)}
            title="Delete"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <FormContainer
        mainTitle="Payment Detail"
        link="/sales/create-payment-details"
        // buttonAccess={true}
        submitButton={false}
        LinkButtons={LinkButtons}
      />

      <View
        title={"Details"}
        columns={columns}
        data={allPaymentDetailsData}
        pagination
        isLoading={paymentDetailsLoading}
        tableName={"PaymentDetailsOverview"}
        rowSelectable={true}
      />
    </>
  );
};

export default PaymentDetailsOverview;
