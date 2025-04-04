import React, { useState } from "react";

import { useAddInvoiceRequestMutation } from "../../../Redux/Slices/SalesSlices/InvoiceRequestApi";

const InvoiceDownload = ({ taxInvoiceData, closeModal }) => {
  const token = sessionStorage.getItem("token");
  const [links, setLinks] = useState([]);
  const {
    data: invoiceList,
    isLoading: invoiceListLoading,
    isSuccess: invoiceListSuccess,
    isError: invoiceListError,
  } = useAddInvoiceRequestMutation(taxInvoiceData?.sale_booking_id, {
    skip: !taxInvoiceData?.sale_booking_id,
  });
  // useEffect(() => {
  //   const fetchInvoiceLinks = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${baseUrl}sales/invoice_request?sale_booking_id=${taxInvoiceData?.sale_booking_id}&invoice_type_id=tax-invoice&status=uploaded`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setLinks(response.data.data); // Assuming the response structure contains a 'links' array
  //     } catch (error) {
  //       console.error("Error fetching invoice links:", error);
  //     }
  //   };

  //   fetchInvoiceLinks();
  // }, []);

  return (
    <div>
      <ul>
        {invoiceList?.map((link, index) => (
          <li key={index} className="d-flex">
            <div className="d-flex mr-3">S.No : {index}</div>
            <div>{DateISOtoNormal(link.createdAt)}</div>
            <a
              className="icon-1"
              href={link.invoice_file_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-eye" />
            </a>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={closeModal}>
        Close
      </button>
    </div>
  );
};

export default InvoiceDownload;
