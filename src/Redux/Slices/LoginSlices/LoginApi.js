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
          const { data: response } = await queryFulfilled;
          // sessionStorage.setItem("token", response.token);
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = LoginApi;
export default LoginApi;
