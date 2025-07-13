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
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
