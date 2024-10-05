import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "../../../Utils/authBaseQuery";

const SaleBookingApi = createApi({
  reducerPath: "saleBookingApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getAllSaleBooking: builder.query({
      query: ({ loginUserId, stats }) =>
        `sales/sales_booking${
          loginUserId
            ? `?userId=${loginUserId}`
            : stats
            ? `?booking_status=${stats}`
            : ""
        }`,
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 0,
    }),

    getAllDeletedSaleBooking: builder.query({
      query: (id) =>
        `sales/deleted_sale_booking_list${id ? `?userId=${id}` : ""}`,
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 60 * 60,
    }),

    getIndividualSaleBooking: builder.query({
      query: (id) => `sales/sales_booking/${id}`,
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 0,
    }),

    getListOfIndividualSaleBooking: builder.query({
      query: (accountId, userId) =>
        `sales/account_sale_booking/${accountId}${
          userId ? `?userId=${userId}` : ""
        }`,
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 0,
    }),

    getTotalSaleAmountDateWise: builder.query({
      query: ({ startDate, endDate }) =>
        `sales/date_range_total_sale_amount?startDate=${startDate}&endDate=${endDate}`,
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 0,
    }),

    addSaleBooking: builder.mutation({
      query: (newSaleBooking) => ({
        url: "sales/sales_booking",
        method: "POST",
        body: newSaleBooking,
      }),
      onQueryStarted: async (newSaleBooking, { dispatch, queryFulfilled }) => {
        try {
          const { data: addedSaleBooking } = await queryFulfilled;

          if (addedSaleBooking && addedSaleBooking.data) {
            dispatch(
              SaleBookingApi.util.updateQueryData(
                "getAllSaleBooking",
                undefined,
                (draft) => {
                  draft.unshift(addedSaleBooking.data);
                }
              )
            );
          } else {
            console.error("No data returned from API");
          }
        } catch (error) {
          console.error("Failed to add Sale Booking:", error);
        }
      },
    }),

    editSaleBooking: builder.mutation({
      query: ({ id, ...updatedSaleBooking }) => ({
        url: `sales/sales_booking/${id}`,
        method: "PUT",
        body: updatedSaleBooking,
      }),
      onQueryStarted: async (
        { id, ...updatedSaleBooking },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data: returnedSaleBooking } = await queryFulfilled;

          dispatch(
            SaleBookingApi.util.updateQueryData(
              "getAllSaleBooking",
              undefined,
              (draft) => {
                const saleBookingIndex = draft.findIndex(
                  (saleBooking) => saleBooking._id === id
                );
                if (saleBookingIndex !== -1) {
                  draft[saleBookingIndex] = returnedSaleBooking.data;
                }
              }
            )
          );
        } catch (error) {
          console.error("Failed to edit Sale Booking:", error);
        }
      },
    }),

    deleteSaleBooking: builder.mutation({
      query: (id) => ({
        url: `sales/sales_booking/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(
          SaleBookingApi.util.updateQueryData(
            "getAllSaleBooking",
            undefined,
            (draft) => {
              const saleBookingIndex = draft.findIndex(
                (saleBooking) => saleBooking._id == id
              );
              if (saleBookingIndex !== -1) {
                draft.splice(saleBookingIndex, 1); // Remove the deleted item
              }
            }
          )
        );
      },
    }),

    getAllNewDeletedSale: builder.query({
      query: (id) =>
        `sales/deleted_sale_booking_list${id ? `?userId=${id}` : ""}`,
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetAllSaleBookingQuery,
  useGetAllDeletedSaleBookingQuery,
  useGetIndividualSaleBookingQuery,
  useGetListOfIndividualSaleBookingQuery,
  useGetTotalSaleAmountDateWiseQuery,
  useAddSaleBookingMutation,
  useEditSaleBookingMutation,
  useDeleteSaleBookingMutation,
  useGetAllNewDeletedSaleQuery,
} = SaleBookingApi;

export default SaleBookingApi;
