import { baseApi } from "../baseApi";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentById: builder.query({
      query: (studentId) => ({
        url: `/Student/GetStudentById/${studentId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStudentByIdQuery } = studentApi;
