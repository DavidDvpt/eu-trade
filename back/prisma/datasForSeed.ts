export const familiesSeed = [{ name: 'Resources' }, { name: 'Tools' }];
export const categoriesSeed = [
    { name: 'Ore', family: 'Resources' },
    { name: 'Refined Ore', family: 'Resources' },
    { name: 'Enmatter', family: 'Resources' },
    { name: 'Refined Enmatter', family: 'Resources' },
    { name: 'Treasure', family: 'Resources' },
    { name: 'Refined Treasure', family: 'Resources' },
];

export const foundOns = [
    { name: 'Entropia Universe' },
    { name: 'Planet Calypso' },
    { name: 'Planet Cyrene' },
    { name: 'Planet Toulan' },
    { name: 'Planet Arkadia' },
    { name: 'Next Island' },
    { name: 'Monria' },
    { name: 'Hell' },
    { name: 'F.O.M.A. - Fortuna' },
    { name: 'Crystal Palace' },
    { name: 'Arkadia Moon' },
    { name: 'Ancient Greece' },
];

export interface BasicResource {
    refinedCat: string;
    refinedResource: { name: string; imageUrlId: string };
    unrefined: {
        data: { name: string; value: number; imageUrlId: string };
        count: number;
        unrefinedCat: string;
    }[];
}

export const basicOreAndRefined: BasicResource[] = [
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Adomasite Ingot', imageUrlId: '1731' },
        unrefined: [
            {
                data: { name: 'Adomasite Stone', value: 0.6, imageUrlId: '1818' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Alferix Ingot', imageUrlId: '1500' },
        unrefined: [
            {
                data: { name: 'Alferix Stone', value: 0.95, imageUrlId: '1637' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Alternative Ingot', imageUrlId: '4097' },
        unrefined: [
            {
                data: { name: 'Alternative Rock', value: 0.01, imageUrlId: '3732' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Azzurdite Ingot', imageUrlId: '1501' },
        unrefined: [
            {
                data: { name: 'Azzurdite Stone', value: 1.02, imageUrlId: '1381' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Belkar Ingot', imageUrlId: '1502' },
        unrefined: [
            {
                data: { name: 'Belkar Stone', value: 0.02, imageUrlId: '1545' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Blausariam Ingot', imageUrlId: '1503' },
        unrefined: [
            {
                data: { name: 'Blausariam Stone', value: 0.04, imageUrlId: '1546' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Caldorite Ingot', imageUrlId: '1504' },
        unrefined: [
            {
                data: { name: 'Caldorite Stone', value: 0.17, imageUrlId: '1543' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Cobalt Ingot', imageUrlId: '1505' },
        unrefined: [
            {
                data: { name: 'Cobalt Stone', value: 0.2, imageUrlId: '1638' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Copper Ingot', imageUrlId: '1506' },
        unrefined: [
            {
                data: { name: 'Copper Stone', value: 0.16, imageUrlId: '1554' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Cumbriz Ingot', imageUrlId: '1507' },
        unrefined: [
            {
                data: { name: 'Cumbriz Stone', value: 0.15, imageUrlId: '1550' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Dianum Ingot', imageUrlId: '1509' },
        unrefined: [
            {
                data: { name: 'Dianum Ore', value: 1.25, imageUrlId: '1952' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Durulium Ingot', imageUrlId: '1510' },
        unrefined: [
            {
                data: { name: 'Durulium Stone', value: 0.8, imageUrlId: '1548' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Erdorium Ingot', imageUrlId: '1511' },
        unrefined: [
            {
                data: { name: 'Erdorium Stone', value: 0.4, imageUrlId: '1636' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Erionite Ingot', imageUrlId: '3232' },
        unrefined: [
            {
                data: { name: 'Erionite Stone', value: 0.2, imageUrlId: '3231' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Frigulite Ingot', imageUrlId: '1512' },
        unrefined: [
            {
                data: { name: 'Frigulite Stone', value: 0.12, imageUrlId: '1951' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Ganganite Ingot', imageUrlId: '1513' },
        unrefined: [
            {
                data: { name: 'Ganganite Stone', value: 0.12, imageUrlId: '1257' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Gazzurdite Ingot', imageUrlId: '1514' },
        unrefined: [
            {
                data: { name: 'Gazzurdite Stone', value: 0.25, imageUrlId: '1544' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Gold Ingot', imageUrlId: '1515' },
        unrefined: [
            {
                data: { name: 'Gold Stone', value: 1, imageUrlId: '1553' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Hansidian Ingot', imageUrlId: '1720' },
        unrefined: [
            {
                data: { name: 'Hansidian Rock', value: 0.01, imageUrlId: '1719' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Himi Ingot', imageUrlId: '1949' },
        unrefined: [
            {
                data: { name: 'Himi Rock', value: 0.142, imageUrlId: '2308' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Ignisium Ingot', imageUrlId: '1516' },
        unrefined: [
            {
                data: { name: 'Ignisium Stone', value: 0.7, imageUrlId: '1549' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Iolite Ingot', imageUrlId: '3234' },
        unrefined: [
            {
                data: { name: 'Iolite Stone', value: 0.2, imageUrlId: '3233' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Iron Ingot', imageUrlId: '1517' },
        unrefined: [
            {
                data: { name: 'Iron Stone', value: 0.13, imageUrlId: '1541' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Kanerium Ingot', imageUrlId: '929' },
        unrefined: [
            {
                data: { name: 'Kanerium Ore', value: 2.5, imageUrlId: '1541' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Kirtz Ingot', imageUrlId: '1519' },
        unrefined: [
            {
                data: { name: 'Kirtz Stone', value: 5.6, imageUrlId: '1817' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Langotz Ingot', imageUrlId: '1520' },
        unrefined: [
            {
                data: { name: 'Langotz Stone', value: 0.9, imageUrlId: '1552' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Lanorium Ingot', imageUrlId: '1521' },
        unrefined: [
            {
                data: { name: 'Lanorium Stone', value: 0.22, imageUrlId: '1273' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Lysterium Ingot', imageUrlId: '1522' },
        unrefined: [
            {
                data: { name: 'Lysterium Stone', value: 0.01, imageUrlId: '1540' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
    {
        refinedCat: 'Refined Ore',
        refinedResource: { name: 'Maganite Ingot', imageUrlId: '1523' },
        unrefined: [
            {
                data: { name: 'Maganite Ore', value: 1.05, imageUrlId: '1539' },
                count: 3,
                unrefinedCat: 'Ore',
            },
        ],
    },
];

export const enmatters = [
    { name: 'Acid Root', value: 0.32, imageUrlId: '1271' },
    { name: 'Alicenies Liquid', value: 0.05, imageUrlId: '368' },
    { name: 'Angelic Grit', value: 0.5, imageUrlId: '707' },
];

export const refinedEnmatters = [
    { name: 'Root Acid', value: 0.64, imageUrlId: '1276' },
    { name: 'Alicenies Gel', value: 0.1, imageUrlId: '1373' },
    { name: 'Angelic Flakes', value: 1, imageUrlId: '364' },
];

export const treasures = [
    { name: 'Aakas Alloy', value: 0.1, imageUrlId: '5517' },
    { name: 'Aarkan Pellets', value: 0.02, imageUrlId: '5527' },
    { name: 'Alkar Crystals', value: 0.05, imageUrlId: '6079' },
];

export const refinedTreasures = [
    { name: 'Aakas Plating', value: 0.03, imageUrlId: '5518' },
    { name: 'Aarkan Polymer', value: 0.06, imageUrlId: '5528' },
    { name: 'Alkar Lattice', value: 1, imageUrlId: '6051' },
];
