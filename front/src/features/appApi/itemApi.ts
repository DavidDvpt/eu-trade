import { appApi } from '.';

const itemApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query<Item[], void>({
            query: () => '/items',
            transformResponse: (response: Item[]) => {
                return response.map((item) => ({
                    ...item,
                    value: item.value / 10000,
                    ttMax: item.ttMax / 10000,
                }));
            },
        }),
        addItem: builder.mutation<Item, Partial<Item>>({
            query: (body) => ({
                url: `/items`,
                method: 'POST',
                body: {
                    ...body,
                    imageUrlId: body.imageUrlId,
                    value: body.value ? body.value * 10000 : 0,
                    ttMax: body.ttMax ? body.ttMax * 10000 : 0,
                },
            }),
            transformResponse: (response: Item) => ({
                ...response,
                value: response.value / 10000,
                ttMax: response.ttMax / 10000,
            }),
        }),
        updateItem: builder.mutation<Item, Pick<Item, 'id'> & Partial<Item>>({
            query: ({ id, ...patch }) => ({
                url: `/items/${id}`,
                method: 'PUT',
                body: {
                    ...patch,
                    value: patch.value ? patch.value * 10000 : 0,
                    ttMax: patch.ttMax ? patch.ttMax * 10000 : 0,
                },
            }),
            transformResponse: (response: Item) => ({
                ...response,
                value: response.value / 10000,
                ttMax: response.ttMax / 10000,
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
