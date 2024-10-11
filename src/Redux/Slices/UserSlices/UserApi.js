import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "../../../Utils/authBaseQuery";
import { Session } from "../../../Utils/Session";

const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "get_all_users",
      transformResponse: (response) => response.data,
      keepUnusedDataFor: Session / 1000,
    }),

    getUserAuth: builder.query({
      query: (id) => `get_single_user_auth_detail/${id}`,
      keepUnusedDataFor: Session / 1000,
    }),

    getUserDetailsById: builder.mutation({
      query: (id) => ({
        url: `login_user_data`,
        method: "POST",
        body: {
          user_id: id,
        },
      }),
      transformResponse: (response) => response?.[0],
      keepUnusedDataFor: Session / 1000,
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserAuthQuery,
  useGetUserDetailsByIdMutation,
} = UserApi;

export default UserApi;
