import { baseApi } from "../baseApi";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentsByFacultyId: builder.query({
      query: (facultyId) => ({
        url: `/Department/GetDepartmentsByFacultyId/${facultyId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDepartmentsByFacultyIdQuery } = departmentApi;
