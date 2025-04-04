import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "../../../Utils/authBaseQuery";

const PaymentDetailsApi = createApi({
  reducerPath: "paymentDetailsApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    // Fetch all payment details
    getPaymentDetailList: builder.query({
      query: () => "sales/payment_details",
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 0, // Keep the data for 24 hours
    }),

    // Fetch details of a single payment
    getPaymentDetails: builder.query({
      query: (id) => `sales/payment_details/${id}`,
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 0,
    }),

    // Add new payment details
    createPaymentDetails: builder.mutation({
      query: (newPaymentDetails) => ({
        url: "sales/payment_details",
        method: "POST",
        body: newPaymentDetails,
      }),
      onQueryStarted: async (
        newPaymentDetails,
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data: addedPaymentDetails } = await queryFulfilled;

          dispatch(
            PaymentDetailsApi.util.updateQueryData(
              "getPaymentDetailList",
              undefined,
              (draft) => {
                draft.unshift(addedPaymentDetails);
              }
            )
          );
        } catch (error) {
          console.error("Failed to add payment details:", error);
        }
      },
    }),

    // Update existing payment details
    updatePaymentDetails: builder.mutation({
      query: ({ id, ...updatedPaymentDetails }) => ({
        url: `sales/payment_details/${id}`,
        method: "PUT",
        body: updatedPaymentDetails,
      }),
      onQueryStarted: async (
        { id, ...updatedPaymentDetails },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data: returnedPaymentDetails } = await queryFulfilled;
          dispatch(
            PaymentDetailsApi.util.updateQueryData(
              "getPaymentDetailList",
              undefined,
              (draft) => {
                const paymentIndex = draft.findIndex(
                  (payment) => payment._id == id
                );
                if (paymentIndex !== -1) {
                  draft[paymentIndex] = returnedPaymentDetails.data;
                }
              }
            )
          );
        } catch (error) {
          console.error("Failed to update payment details:", error);
        }
      },
    }),

    // Delete payment details
    deletePaymentDetails: builder.mutation({
      query: (id) => ({
        url: `sales/payment_details/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            PaymentDetailsApi.util.updateQueryData(
              "getPaymentDetailList",
              undefined,
              (draft) => {
                return draft.filter((payment) => payment._id !== id);
              }
            )
          );
        } catch (error) {
          console.error("Failed to delete payment details:", error);
        }
      },
    }),
  }),
});

// Export the hooks generated by createApi
export const {
  useGetPaymentDetailListQuery,
  useGetPaymentDetailsQuery,
  useCreatePaymentDetailsMutation,
  useUpdatePaymentDetailsMutation,
  useDeletePaymentDetailsMutation,
} = PaymentDetailsApi;

export default PaymentDetailsApi;
