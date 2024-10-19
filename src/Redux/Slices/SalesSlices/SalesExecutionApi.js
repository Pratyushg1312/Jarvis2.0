import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "../../../Utils/authBaseQuery";

const SalesExecutionApi = createApi({
  reducerPath: "salesExecutionApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    addExecution: builder.mutation({
      query: (payload) => ({
        url: "sales/sales_booking_execution",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useAddExecutionMutation } = SalesExecutionApi;

export default SalesExecutionApi;
