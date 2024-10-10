import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "../../../Utils/authBaseQuery";

const LoginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "/login_user",
        method: "POST",
        body: loginData,
      }),
      onQueryStarted: async (loggedData, { dispatch, queryFulfilled }) => {
        try {
          const { data: addedDepartment } = await queryFulfilled;
          console.log("loggedData", loggedData);
          console.log("addedDepartment", addedDepartment);
        } catch (error) {
          console.error("Failed to add department:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = LoginApi;
