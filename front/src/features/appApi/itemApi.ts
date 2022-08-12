import { appApi } from '.';

const itemApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query<Item[], void>({
            query: () => '/items',
            transformResponse: (response: Item[]) => {
                return response;
            },
        }),
        addItem: builder.mutation<Item, Partial<Item>>({
            query: (body) => ({
                url: `/items`,
                method: 'POST',
                body: {
                    ...body,
                    imageUrlId: body.imageUrlId,
                    value: body.value ? body.value : 0,
                    ttMax: body.ttMax ? body.ttMax : 0,
                },
            }),
            transformResponse: (response: Item) => response,
        }),
        updateItem: builder.mutation<Item, Pick<Item, 'id'> & Partial<Item>>({
            query: ({ id, ...patch }) => ({
                url: `/items/${id}`,
                method: 'PUT',
                body: {
                    ...patch,
                    value: patch.value ? patch.value : 0,
                    ttMax: patch.ttMax ? patch.ttMax : 0,
                },
            }),
            transformResponse: (response: Item) => ({
                ...response,
                value: response.value,
                ttMax: response.ttMax,
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
