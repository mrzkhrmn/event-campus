import { baseApi } from "../baseApi";

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFacultiesByUniversityId: builder.query({
      query: (universityId) => ({
        url: `/Faculty/GetFacultiesByUniversityId/${universityId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFacultiesByUniversityIdQuery } = facultyApi;
