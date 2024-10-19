import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "../../../Utils/authBaseQuery";

const InvoiceRequestApi = createApi({
  reducerPath: "invoiceRequestApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getInvoice: builder.query({
      query: ({ id }) =>
        `sales/invoice_request${
          id
            ? `?sale_booking_id=${id}&invoice_type_id=tax-invoice&status=uploaded`
            : ""
        }`,
      transformResponse: (response) => response.data.data,
      keepUnusedDataFor: 3600,
    }),
    addInvoiceRequest: builder.mutation({
      query: (payload) => ({
        url: `sales/invoice_request`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useAddInvoiceRequestMutation } = InvoiceRequestApi;

export default InvoiceRequestApi;
