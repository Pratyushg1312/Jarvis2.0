import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "../../../Utils/authBaseQuery"; // Assuming you already have this for authorized API calls.

const SalesDashboardApi = createApi({
  reducerPath: "salesDashboardApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getTop20Accounts: builder.query({
      query: ({ userId, isAdmin }) =>
        `sales/top20_account_list?userId=${userId}&isAdmin=${isAdmin}`,
      transformResponse: (response) => response.data,
    }),

    getIncentiveSettelment: builder.query({
      query: (loginUserId) =>
        `sales/incentive_settlement_dashboard${
          loginUserId ? `?userId=${loginUserId}` : ""
        }`,
      transformResponse: (response) => response.data.data,
    }),

    getWeeklyMonthlyQuarterlyList: builder.query({
      query: ({
        userId,
        isAdmin,
        Cat_id,
        startdate,
        enddate,
        laststartDate,
        lastendDate,
      }) =>
        `sales/weekly_monthly_quarterly_list?userId=${userId}&isAdmin=${
          isAdmin ? "true" : "false"
        }${isAdmin && Cat_id ? `&sales_category_id=${Cat_id}` : ""}${
          startdate
            ? "&startOfMonth=" +
              startdate +
              "&endOfMonth=" +
              enddate +
              "&lastMonthStart=" +
              laststartDate +
              "&lastMonthEnd=" +
              lastendDate
            : ""
        }`,
      transformResponse: (response) => response.data,
    }),

    getBadgesSalesBookingData: builder.query({
      query: (userId) => `sales/badges_sales_booking_data?userId=${userId}`,
      transformResponse: (response) => response.data,
    }),

    getSaleBookingGridStatusCount: builder.query({
      query: () => `sales/sale_booking_grid_status_count_list`,
      transformResponse: (response) => response.data,
    }),

    getSaleBookingStatusList: builder.query({
      query: () => `sales/sale_booking_status_list`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetTop20AccountsQuery,
  useGetIncentiveSettelmentQuery,
  useGetWeeklyMonthlyQuarterlyListQuery,
  useGetBadgesSalesBookingDataQuery,
  useGetSaleBookingGridStatusCountQuery,
  useGetSaleBookingStatusListQuery,
} = SalesDashboardApi;

export default SalesDashboardApi;
