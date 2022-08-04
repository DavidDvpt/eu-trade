import { appApi } from '.';

const familyApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getFamilies: builder.query<Family[], null>({
            query: () => '/families',
        }),
    }),
});

export const { useGetFamiliesQuery } = familyApi;
