import { appApi } from '.';

const familyApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getFamilies: builder.query<Family[], void>({
            query: () => '/families',
        }),
        addFamily: builder.mutation<Family, Partial<Family>>({
            query: (body) => ({
                url: `/families`,
                method: 'POST',
                body,
            }),
        }),
        updateFamily: builder.mutation<
            Family,
            Pick<Family, 'id'> & Partial<Family>
        >({
            query: ({ id, ...patch }) => ({
                url: `/families/${id}`,
                method: 'PUT',
                body: patch,
            }),
        }),
        deleteFamily: builder.mutation<Family, Partial<Family>>({
            query: (body) => ({
                url: `/families`,
                method: 'DELETE',
                body,
            }),
        }),
    }),
});

export const {
    useGetFamiliesQuery,
    useUpdateFamilyMutation,
    useAddFamilyMutation,
    useDeleteFamilyMutation,
} = familyApi;
