import { SessionType } from '@prisma/client';

export const mockSession = [
    {
        session: {
            id: 1,
            userId: 3,
            number: 1,
            type: SessionType.MINING,
            clics: 1000,
            isOpen: false,
            ttCost: 123.25,
            ttWin: 214.1,
        },
        cost: [
            { itemId: 57, quantity: 1 },
            { itemId: 67, quantity: 1 },
            { itemId: 5, quantity: 1000 },
        ],
    },
    {
        session: {
            id: 2,
            userId: 3,
            number: 1,
            type: SessionType.TRADE,
            clics: 1500,
            isOpen: false,
            ttCost: 112.54,
            ttWin: 68.74,
        },
        cost: [],
    },
    {
        session: {
            id: 3,
            userId: 3,
            number: 2,
            type: SessionType.MINING,
            clics: 300,
            isOpen: false,
            ttCost: 421.32,
            ttWin: 6574.21,
        },
        cost: [],
    },
    {
        session: {
            id: 4,
            userId: 3,
            number: 2,
            type: SessionType.TRADE,
            clics: 2000,
            isOpen: true,
            ttCost: 12.35,
            ttWin: 24.54,
        },
        cost: [],
    },
    {
        session: {
            id: 5,
            userId: 2,
            number: 1,
            type: SessionType.MINING,
            clics: 300,
            isOpen: false,
            ttCost: 421.32,
            ttWin: 6574.21,
        },
        cost: [],
    },
    {
        session: {
            id: 6,
            userId: 2,
            number: 1,
            type: SessionType.TRADE,
            clics: 2000,
            isOpen: true,
            ttCost: 12.35,
            ttWin: 24.54,
        },
        cost: [],
    },
];

export const mockGlobalUserDatas = [
    { userId: 1, initialPedCardValue: 1254.24 },
    { userId: 2, initialPedCardValue: 12454.17 },
    { userId: 3, initialPedCardValue: 4554.94 },
];
