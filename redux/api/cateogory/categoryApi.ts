import { baseApi } from "../baseApi";
import { CategoryItemType } from "../../../types/CategoryTypes";
export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryItemType[], void>({
      query: () => "/Category/GetAll",
    }),
  }),
  overrideExisting: true,
});

export const { useGetCategoriesQuery } = categoryApi;
