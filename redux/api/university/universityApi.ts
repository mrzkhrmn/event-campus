import { baseApi } from "../baseApi";

export const universityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUniversities: builder.query({
      query: () => ({
        url: "/University/GetAll",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllUniversitiesQuery } = universityApi;
