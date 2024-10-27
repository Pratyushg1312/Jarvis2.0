import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "../../../Utils/authBaseQuery";
import { Session } from "../../../Utils/Session";

const CountryCodeApi = createApi({
  reducerPath: "CountryCodeApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getCountryCode: builder.query({
      query: () => `v1/country_code`,
      transformResponse: (response) => response.data,
    }),
    addCountryCode: builder.mutation({
      query: (data) => ({
        url: `v1/country_code`,
        method: "POST",
        body: data,
      }),
    }),
    updateCountryCode: builder.mutation({
      query: (data) => ({
        url: `v1/country_code`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddCountryCodeMutation,
  useGetCountryCodeQuery,
  useUpdateCountryCodeMutation,
} = CountryCodeApi;

export default CountryCodeApi;
