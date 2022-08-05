import { appApi } from '.';

const familyApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => '/categories',
        }),
        addCategory: builder.mutation<Category, Partial<Category>>({
            query: (body) => ({
                url: `/categories`,
                method: 'POST',
                body,
            }),
        }),
        updateCategory: builder.mutation<
            Category,
            Pick<Category, 'id'> & Partial<Category>
        >({
            query: ({ id, ...patch }) => ({
                url: `/categories/${id}`,
                method: 'PUT',
                body: patch,
            }),
        }),
        deleteCategory: builder.mutation<Category, Partial<Category>>({
            query: (body) => ({
                url: `/categories`,
                method: 'DELETE',
                body,
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = familyApi;
