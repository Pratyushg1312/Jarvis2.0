import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "../../../Utils/authBaseQuery";
import { Session } from "../../../Utils/Session";

const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    loginUserData: builder.query({
      query: (id) => ({
        url: `get_single_user/${id}`,
      }),
      transformResponse: (response) => response,
      keepUnusedDataFor: Session / 1000,
    }),

    getAllUsers: builder.query({
      query: (id) => "get_all_users",
      transformResponse: (response) => response.data,
      keepUnusedDataFor: Session / 1000,
    }),

    getUserAuth: builder.query({
      query: (id) => `get_single_user_auth_detail/${id}`,
      keepUnusedDataFor: Session / 1000,
    }),

    getUserDetailsById: builder.query({
      query: (id) => ({
        url: `login_user_data_with_jarvis/${id}`,
      }),
      transformResponse: (response) => response?.[0],
      keepUnusedDataFor: Session / 1000,
    }),
  }),
});

export const {
  useLoginUserDataQuery,
  useGetAllUsersQuery,
  useGetUserAuthQuery,
  useGetUserDetailsByIdQuery,
} = UserApi;

export default UserApi;
