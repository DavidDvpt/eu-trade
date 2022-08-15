import { appApi } from '.';

const sessionsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getSessions: builder.query<Session[], void>({
            query: () => '/sessions',
        }),
        addSession: builder.mutation<Session, Partial<Session>>({
            query: (body) => ({
                url: `/sessions`,
                method: 'POST',
                body,
            }),
        }),
        updateSession: builder.mutation<
            Session,
            Pick<Session, 'id'> & Partial<Session>
        >({
            query: ({ id, ...patch }) => ({
                url: `/sessions/${id}`,
                method: 'PUT',
                body: patch,
            }),
        }),
        deleteSession: builder.mutation<Session, Partial<Session>>({
            query: (body) => ({
                url: `/sessions`,
                method: 'DELETE',
                body,
            }),
        }),
    }),
});

export const {
    useGetSessionsQuery,
    useAddSessionMutation,
    useUpdateSessionMutation,
    useDeleteSessionMutation,
} = sessionsApi;
