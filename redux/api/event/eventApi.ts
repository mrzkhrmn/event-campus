import { baseApi } from "../baseApi";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (data) => ({
        url: "/Event/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),
    getEvents: builder.query({
      query: (categoryId) => ({
        url: "/Event/",
        method: "GET",
        params: {
          page: 1,
          pageSize: 10,
          categoryId: categoryId,
        },
      }),
      providesTags: ["Events"],
    }),
    getEventById: builder.query({
      query: (eventId) => ({
        url: `/Event/GetEventById/${eventId}`,
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    getParticipatedEvents: builder.query({
      query: (id) => ({
        url: `/Event/GetParticipatedEvents/${id}`,
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    joinEvent: builder.mutation({
      query: (eventId) => ({
        url: `/Event/${eventId}/join`,
        method: "POST",
      }),
      invalidatesTags: ["Events"],
    }),

    leaveEvent: builder.mutation({
      query: (eventId) => ({
        url: `/Event/${eventId}/leave`,
        method: "POST",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useGetParticipatedEventsQuery,
  useJoinEventMutation,
  useLeaveEventMutation,
  useCreateEventMutation,
} = eventApi;
