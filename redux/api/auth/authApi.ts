import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/Auth/Login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/Auth/Register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
