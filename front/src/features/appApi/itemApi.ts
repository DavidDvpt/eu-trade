import { appApi } from '.';

const itemApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query<Item[], void>({
            query: () => '/items',
        }),
        addItem: builder.mutation<Item, Partial<Item>>({
            query: (body) => ({
                url: `/items`,
                method: 'POST',
                body,
            }),
        }),
        updateItem: builder.mutation<Item, Pick<Item, 'id'> & Partial<Item>>({
            query: ({ id, ...patch }) => ({
                url: `/items/${id}`,
                method: 'PUT',
                body: patch,
            }),
        }),
        deleteItem: builder.mutation<Item, Partial<Item>>({
            query: (body) => ({
                url: `/items`,
                method: 'DELETE',
                body,
            }),
        }),
    }),
});

export const {
    useGetItemsQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemApi;
