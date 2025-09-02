import { baseApi } from "../baseApi";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addEvent: builder.mutation({
      query: (data) => ({
        url: "/Event/AddEvent",
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
    getEventDetail: builder.query({
      query: (eventId) => ({
        url: `/Event/GetEventDetail/${eventId}`,
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
      query: ({ eventId, studentId }) => ({
        url: `/Event/JoinEvent`,
        method: "POST",
        body: { studentId: studentId, eventId: eventId },
      }),
      invalidatesTags: ["Events"],
    }),

    leaveEvent: builder.mutation({
      query: ({ eventId, studentId }) => ({
        url: `/Event/LeaveEvent`,
        method: "POST",
        body: { studentId: studentId, eventId: eventId },
      }),
      invalidatesTags: ["Events"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllEventsQuery,
  useGetEventDetailQuery,
  useGetParticipatedEventsQuery,
  useJoinEventMutation,
  useLeaveEventMutation,
  useAddEventMutation,
} = eventApi;
