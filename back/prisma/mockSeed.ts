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
        cost: [],
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
    },
];

export const mockGlobalUserDatas = [
    { id: 1, initialPedCardValue: 1254.24 },
    { id: 2, initialPedCardValue: 12454.17 },
    { id: 3, initialPedCardValue: 4554.94 },
];
