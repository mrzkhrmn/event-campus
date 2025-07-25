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
    getAllEvents: builder.query({
      query: ({ categoryId, universityId }) => ({
        url: "/Event/GetAllEvents",
        method: "GET",
        params: {
          page: 1,
          pageSize: 10,
          categoryId,
          universityId,
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
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useGetParticipatedEventsQuery,
  useJoinEventMutation,
  useLeaveEventMutation,
  useCreateEventMutation,
} = eventApi;
