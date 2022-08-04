import { appApi } from '.';

const familyApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], null>({
            query: () => '/categories',
        }),
    }),
});

export const { useGetCategoriesQuery } = familyApi;
