import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "../../../Utils/authBaseQuery";
import { Session } from "../../../Utils/Session";

const ThemeApi = createApi({
  reducerPath: "ThemeApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getTheme: builder.query({
      query: (id) => `theme/${id}`,
      transformResponse: (response) => response.data,
      keepUnusedDataFor: Session / 1000,
    }),

    editTheme: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `theme/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetThemeQuery, useEditThemeMutation } = ThemeApi;

export default ThemeApi;
