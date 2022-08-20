import { Role } from '@prisma/client';

export const familiesSeed = [
    { name: 'Resources' },
    { name: 'Tools' },
    { name: 'Attachments' },
];

export const usersSeed = [
    {
        id: 1,
        email: 'david.admin@gmail.com',
        password:
            '$2b$10$p753hUkr/wfM.plQPbLweemJQaxeykFgNb4Wd9bkIfjnbKSRg6JGa',
        pseudo: 'admin',
        role: Role.ADMIN,
    },
    {
        id: 2,
        email: 'david.manager@gmail.com',
        password:
            '$2b$10$p753hUkr/wfM.plQPbLweemJQaxeykFgNb4Wd9bkIfjnbKSRg6JGa',
        pseudo: 'manager',
        role: Role.MANAGER,
    },
    {
        id: 3,
        email: 'david.user@gmail.com',
        password:
            '$2b$10$p753hUkr/wfM.plQPbLweemJQaxeykFgNb4Wd9bkIfjnbKSRg6JGa',
        pseudo: 'user',
        role: Role.USER,
    },
    {
        id: 4,
        email: 'lambda.user@gmail.com',
        password:
            '$2b$10$p753hUkr/wfM.plQPbLweemJQaxeykFgNb4Wd9bkIfjnbKSRg6JGa',
        pseudo: 'lambdaUser',
        role: Role.USER,
    },
];

export const categoriesSeed = [
    { name: 'Ore', family: 'Resources' },
    { name: 'Refined Ore', family: 'Resources' },
    { name: 'Enmatter', family: 'Resources' },
    { name: 'Refined Enmatter', family: 'Resources' },
    { name: 'Treasure', family: 'Resources' },
    { name: 'Refined Treasure', family: 'Resources' },
    { name: 'Natural Material', family: 'Resources' },
    { name: 'Consumables', family: 'Resources' },
    { name: 'Food', family: 'Resources' },
    { name: 'Refiners', family: 'Tools' },
    { name: 'Excavators', family: 'Tools' },
    { name: 'Finders', family: 'Tools' },
    { name: 'Finder Enhancers', family: 'Attachments' },
    { name: 'Finder Amplifiers', family: 'Attachments' },
    { name: 'Excavator Enhancers', family: 'Attachments' },
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

export const singleEnmatter = [
    {
        name: 'Growth Molecules',
        value: 0.47,
        imageUrlId: '1258',
        isStackable: true,
    },
    {
        name: 'Energized Fertilizer',
        value: 0.47,
        imageUrlId: '1657',
        isStackable: true,
    },
    {
        name: 'Sweetstuff',
        value: 0.01,
        imageUrlId: '372',
        isStackable: true,
    },
];

export const singleRefinedEnmatter = [
    {
        name: 'Sweetstuff',
        value: 0.01,
        imageUrlId: '372',
        isStackable: true,
    },
];

export const consumables = [
    {
        name: 'Survey Probe',
        value: 0.05,
        imageUrlId: '1239',
        isStackable: true,
    },
    {
        name: 'Universal Ammo',
        value: 0.0001,
        imageUrlId: '7285',
        isStackable: true,
    },
];

export interface ComplexeResource {
    rCat: string;
    r: { name: string; imageUrlId: string; value: number };
    u: {
        data: { name: string; value: number; imageUrlId: string };
        count: number;
        uCat: string;
    }[];
}

export interface BasicResource {
    r: { name: string; imageUrlId: string };
    u: { name: string; value: number; imageUrlId: string };
}

export const basicOre: BasicResource[] = [
    {
        r: { name: 'Adomasite Ingot', imageUrlId: '1731' },
        u: {
            name: 'Adomasite Stone',
            value: 0.6,
            imageUrlId: '1818',
        },
    },
    {
        r: { name: 'Alferix Ingot', imageUrlId: '1500' },
        u: { name: 'Alferix Stone', value: 0.95, imageUrlId: '1637' },
    },

    {
        r: { name: 'Alternative Ingot', imageUrlId: '4097' },
        u: {
            name: 'Alternative Rock',
            value: 0.01,
            imageUrlId: '3732',
        },
    },

    {
        r: { name: 'Azzurdite Ingot', imageUrlId: '1501' },
        u: {
            name: 'Azzurdite Stone',
            value: 1.02,
            imageUrlId: '1381',
        },
    },

    {
        r: { name: 'Belkar Ingot', imageUrlId: '1502' },
        u: {
            name: 'Belkar Stone',
            value: 0.02,
            imageUrlId: '1545',
        },
    },

    {
        r: { name: 'Blausariam Ingot', imageUrlId: '1503' },
        u: {
            name: 'Blausariam Stone',
            value: 0.04,
            imageUrlId: '1546',
        },
    },

    {
        r: { name: 'Caldorite Ingot', imageUrlId: '1504' },
        u: {
            name: 'Caldorite Stone',
            value: 0.17,
            imageUrlId: '1543',
        },
    },

    {
        r: { name: 'Cobalt Ingot', imageUrlId: '1505' },
        u: {
            name: 'Cobalt Stone',
            value: 0.2,
            imageUrlId: '1638',
        },
    },

    {
        r: { name: 'Copper Ingot', imageUrlId: '1506' },
        u: {
            name: 'Copper Stone',
            value: 0.16,
            imageUrlId: '1554',
        },
    },

    {
        r: { name: 'Cumbriz Ingot', imageUrlId: '1507' },
        u: {
            name: 'Cumbriz Stone',
            value: 0.15,
            imageUrlId: '1550',
        },
    },

    {
        r: { name: 'Dianum Ingot', imageUrlId: '1509' },
        u: {
            name: 'Dianum Ore',
            value: 1.25,
            imageUrlId: '1952',
        },
    },

    {
        r: { name: 'Durulium Ingot', imageUrlId: '1510' },
        u: {
            name: 'Durulium Stone',
            value: 0.8,
            imageUrlId: '1548',
        },
    },

    {
        r: { name: 'Erdorium Ingot', imageUrlId: '1511' },
        u: {
            name: 'Erdorium Stone',
            value: 0.4,
            imageUrlId: '1636',
        },
    },

    {
        r: { name: 'Erionite Ingot', imageUrlId: '3232' },
        u: {
            name: 'Erionite Stone',
            value: 0.2,
            imageUrlId: '3231',
        },
    },

    {
        r: { name: 'Frigulite Ingot', imageUrlId: '1512' },
        u: {
            name: 'Frigulite Stone',
            value: 0.12,
            imageUrlId: '1951',
        },
    },

    {
        r: { name: 'Ganganite Ingot', imageUrlId: '1513' },
        u: {
            name: 'Ganganite Stone',
            value: 0.12,
            imageUrlId: '1257',
        },
    },

    {
        r: { name: 'Gazzurdite Ingot', imageUrlId: '1514' },
        u: {
            name: 'Gazzurdite Stone',
            value: 0.25,
            imageUrlId: '1544',
        },
    },

    {
        r: { name: 'Gold Ingot', imageUrlId: '1515' },
        u: {
            name: 'Gold Stone',
            value: 1,
            imageUrlId: '1553',
        },
    },

    {
        r: { name: 'Hansidian Ingot', imageUrlId: '1720' },
        u: {
            name: 'Hansidian Rock',
            value: 0.01,
            imageUrlId: '1719',
        },
    },

    {
        r: { name: 'Himi Ingot', imageUrlId: '1949' },
        u: {
            name: 'Himi Rock',
            value: 0.142,
            imageUrlId: '2308',
        },
    },

    {
        r: { name: 'Ignisium Ingot', imageUrlId: '1516' },
        u: {
            name: 'Ignisium Stone',
            value: 0.7,
            imageUrlId: '1549',
        },
    },

    {
        r: { name: 'Iolite Ingot', imageUrlId: '3234' },
        u: {
            name: 'Iolite Stone',
            value: 0.2,
            imageUrlId: '3233',
        },
    },

    {
        r: { name: 'Iron Ingot', imageUrlId: '1517' },
        u: {
            name: 'Iron Stone',
            value: 0.13,
            imageUrlId: '1541',
        },
    },

    {
        r: { name: 'Kanerium Ingot', imageUrlId: '929' },
        u: {
            name: 'Kanerium Ore',
            value: 2.5,
            imageUrlId: '1541',
        },
    },

    {
        r: { name: 'Kirtz Ingot', imageUrlId: '1519' },
        u: {
            name: 'Kirtz Stone',
            value: 5.6,
            imageUrlId: '1817',
        },
    },

    {
        r: { name: 'Langotz Ingot', imageUrlId: '1520' },
        u: {
            name: 'Langotz Stone',
            value: 0.9,
            imageUrlId: '1552',
        },
    },

    {
        r: { name: 'Lanorium Ingot', imageUrlId: '1521' },
        u: {
            name: 'Lanorium Stone',
            value: 0.22,
            imageUrlId: '1273',
        },
    },

    {
        r: { name: 'Lysterium Ingot', imageUrlId: '1522' },
        u: {
            name: 'Lysterium Stone',
            value: 0.01,
            imageUrlId: '1540',
        },
    },

    {
        r: { name: 'Maganite Ingot', imageUrlId: '1523' },
        u: {
            name: 'Maganite Ore',
            value: 1.05,
            imageUrlId: '1539',
        },
    },
    {
        r: { name: 'Megan Ingot', imageUrlId: '1524' },
        u: {
            name: 'Megan Stone',
            value: 0.18,
            imageUrlId: '1542',
        },
    },
    {
        r: { name: 'Morpheus Ingot', imageUrlId: '1967' },
        u: {
            name: 'Morpheus Stone',
            value: 0.83,
            imageUrlId: '1966',
        },
    },
    {
        r: { name: 'Narcanisum Ingot', imageUrlId: '1525' },
        u: {
            name: 'Narcanisum Stone',
            value: 0.08,
            imageUrlId: '1556',
        },
    },
    {
        r: { name: 'Niksarium Ingot', imageUrlId: '1526' },
        u: {
            name: 'Niksarium Stone',
            value: 0.65,
            imageUrlId: '1551',
        },
    },
    {
        r: { name: 'Petonium Ingot', imageUrlId: '1527' },
        u: {
            name: 'Petonium Stone',
            value: 1.79,
            imageUrlId: '1256',
        },
    },
    {
        r: { name: 'Platinum Ingot', imageUrlId: '1908' },
        u: {
            name: 'Platinum Stone',
            value: 3,
            imageUrlId: '1950',
        },
    },
    {
        r: { name: 'Pyrite Ingot', imageUrlId: '3236' },
        u: {
            name: 'Pyrite Stone',
            value: 0.2,
            imageUrlId: '3235',
        },
    },
    {
        r: { name: 'Quantium Ingot', imageUrlId: '1528' },
        u: {
            name: 'Quantium Stone',
            value: 0.6,
            imageUrlId: '1639',
        },
    },
    {
        r: { name: 'Redulite Ingot', imageUrlId: '2846' },
        u: {
            name: 'Redulite Ore',
            value: 2.2,
            imageUrlId: '2848',
        },
    },
    {
        r: { name: 'Rugaritz Ingot', imageUrlId: '1529' },
        u: {
            name: 'Rugaritz Ore',
            value: 1.5,
            imageUrlId: '3235',
        },
    },
    {
        r: { name: 'Terrudite Ingot', imageUrlId: '1530' },
        u: {
            name: 'Terrudite Stone',
            value: 1.1,
            imageUrlId: '1555',
        },
    },
    {
        r: { name: 'Tridenite Ingot', imageUrlId: '2309' },
        u: {
            name: 'Tridenite Ore',
            value: 2,
            imageUrlId: '2655',
        },
    },
    {
        r: { name: 'Valurite Ingot', imageUrlId: '1531' },
        u: {
            name: 'Valurite Stone',
            value: 6,
            imageUrlId: '1640',
        },
    },
    {
        r: { name: 'Vesperdite Ingot', imageUrlId: '2845' },
        u: {
            name: 'Vesperdite Ore',
            value: 1.8,
            imageUrlId: '2844',
        },
    },
    {
        r: { name: 'Xemerite Ingot', imageUrlId: '1909' },
        u: {
            name: 'Xemerite Ore',
            value: 4,
            imageUrlId: '2567',
        },
    },
    {
        r: { name: 'Zanderium Ingot', imageUrlId: '3050' },
        u: {
            name: 'Zanderium Ore',
            value: 2.5,
            imageUrlId: '2696',
        },
    },
    {
        r: { name: 'Zinc Ingot', imageUrlId: '1532' },
        u: {
            name: 'Zinc Stone',
            value: 0.1,
            imageUrlId: '1547',
        },
    },
];

export const basicEnmatter: BasicResource[] = [
    {
        r: { name: 'Root Acid', imageUrlId: '1276' },
        u: {
            name: 'Acid Root',
            value: 0.64,
            imageUrlId: '1271',
        },
    },
    {
        r: { name: 'Alicenies Gel', imageUrlId: '1373' },
        u: {
            name: 'Alicenies Liquid',
            value: 0.05,
            imageUrlId: '368',
        },
    },
    {
        r: { name: 'Angelic Flakes', imageUrlId: '364' },
        u: {
            name: 'Angelic Grit',
            value: 0.5,
            imageUrlId: '707',
        },
    },
    {
        r: { name: 'Light Mail', imageUrlId: '1902' },
        u: {
            name: 'Angel Scales',
            value: 0.01,
            imageUrlId: '1900',
        },
    },
    {
        r: { name: 'Ares Powder', imageUrlId: '1375' },
        u: {
            name: 'Ares Head',
            value: 0.26,
            imageUrlId: '708',
        },
    },
    {
        r: { name: 'Pearl Sand', imageUrlId: '1252' },
        u: {
            name: 'Azur Pearl',
            value: 0.96,
            imageUrlId: '1255',
        },
    },
    {
        r: { name: 'Binary Energy', imageUrlId: '1177' },
        u: {
            name: 'Binary Fluid',
            value: 0.75,
            imageUrlId: '1392',
        },
    },
    {
        r: { name: 'Medical Compress', imageUrlId: '1819' },
        u: {
            name: 'Blood Moss',
            value: 0.09,
            imageUrlId: '1820',
        },
    },
    {
        r: { name: 'Putty', imageUrlId: '1277' },
        u: {
            name: 'Cave Sap',
            value: 0.39,
            imageUrlId: '1270',
        },
    },
    {
        r: { name: 'Oil', imageUrlId: '371' },
        u: {
            name: 'Crude Oil',
            value: 0.01,
            imageUrlId: '395',
        },
    },
    {
        r: { name: 'Dianthus Crystal Powder', imageUrlId: '3205' },
        u: {
            name: 'Dianthus Liquid',
            value: 0.3,
            imageUrlId: '3202',
        },
    },
    {
        r: { name: 'Dunkel Plastix', imageUrlId: '1656' },
        u: {
            name: 'Dunkel Particle',
            value: 0.55,
            imageUrlId: '3526',
        },
    },
    {
        r: { name: 'Energized Crystal Cell', imageUrlId: '3206' },
        u: {
            name: 'Energized Crystal',
            value: 0.3,
            imageUrlId: '3203',
        },
    },
    {
        r: { name: 'Antimagnetic Oil', imageUrlId: '1903' },
        u: {
            name: 'Ferrum Nuts',
            value: 1,
            imageUrlId: '1965',
        },
    },
    {
        r: { name: 'File Root Pellet', imageUrlId: '3204' },
        u: {
            name: 'File Root Globule',
            value: 0.3,
            imageUrlId: '3230',
        },
    },
    {
        r: { name: 'Garcen Lubricant', imageUrlId: '1227' },
        u: {
            name: 'Garcen Grease',
            value: 0.1,
            imageUrlId: '699',
        },
    },
    {
        r: { name: 'Henren Cube', imageUrlId: '2693' },
        u: {
            name: 'Henren Stems',
            value: 0.63,
            imageUrlId: '2697',
        },
    },
    {
        r: { name: 'Light Liquid', imageUrlId: '1498' },
        u: {
            name: 'Lumis Leach',
            value: 0.42,
            imageUrlId: '1488',
        },
    },
    {
        r: { name: 'Lytairian Powder', imageUrlId: '950' },
        u: {
            name: 'Lytairian Dust',
            value: 0.19,
            imageUrlId: '949',
        },
    },
    {
        r: { name: 'Magerian Spray', imageUrlId: '1660' },
        u: {
            name: 'Magerian Mist',
            value: 0.25,
            imageUrlId: '526',
        },
    },
    {
        r: { name: 'Melchi Crystal', imageUrlId: '1904' },
        u: {
            name: 'Melchi Water',
            value: 0.2,
            imageUrlId: '706',
        },
    },
    {
        r: { name: 'Chalmon', imageUrlId: '1730' },
        u: {
            name: 'Solis Bean',
            value: 0.78,
            imageUrlId: '2044',
        },
    },
    {
        r: { name: 'Typonolic Gas', imageUrlId: '1662' },
        u: {
            name: 'Typonolic Steam',
            value: 0.15,
            imageUrlId: '1254',
        },
    },
    {
        r: { name: 'Inhaler', imageUrlId: '1901' },
        u: {
            name: 'Vegetation Spores',
            value: 0.4,
            imageUrlId: '2307',
        },
    },
];

export const complexeResourcesDatas = [
    {
        rCat: 'Food',
        r: {
            name: 'Nutrio Bar',
            value: 0.01,
            imageUrlId: '356',
            isStackable: true,
        },
        u: [
            {
                data: {
                    name: 'sweetstuff',
                    value: 0.01,
                    imageUrlId: '372',
                    isStackable: true,
                },
                count: 1,
                uCat: 'Food',
            },
            {
                data: {
                    name: 'Bombardo',
                    value: 0.00001,
                    imageUrlId: '390',
                    isStackable: true,
                },
                count: 1,
                uCat: 'Food',
            },
            {
                data: {
                    name: 'Caroot',
                    value: 0.00001,
                    imageUrlId: '523',
                    isStackable: true,
                },
                count: 1,
                uCat: 'Food',
            },
            {
                data: {
                    name: 'Aimoros',
                    value: 0.00001,
                    imageUrlId: '946',
                    isStackable: true,
                },
                count: 1,
                uCat: 'Food',
            },
            {
                data: {
                    name: 'Papplon',
                    value: 0.00001,
                    imageUrlId: '389',
                    isStackable: true,
                },
                count: 1,
                uCat: 'Food',
            },
        ],
    },
    {
        rCat: 'Refined Enmatter',
        r: {
            name: 'Energized Fertilizer',
            value: 0.47,
            imageUrlId: '1657',
            isStackable: true,
        },
        u: [
            {
                data: {
                    name: 'Growth Molecules',
                    value: 0.47,
                    imageUrlId: '1258',
                    isStackable: true,
                },
                count: 1,
                uCat: 'Enmatter',
            },
            {
                data: {
                    name: 'Common Dung',
                    value: 0.0001,
                    imageUrlId: '387',
                    isStackable: true,
                },
                count: 1,
                uCat: 'Natural Material',
            },
        ],
    },
];

export const refiners = [
    {
        name: 'Chikara Refiner, Adjusted',
        value: 0.015,
        ttMax: 24,
        imageUrlId: '7033',
    },
    {
        name: 'Chikara Refiner, Modified',
        value: 0.013,
        ttMax: 41,
        imageUrlId: '7033',
    },
    {
        name: 'Chikara Refiner MR200',
        value: 0.023,
        ttMax: 16,
        imageUrlId: '7033',
    },
    {
        name: 'Chikara Refiner MR300',
        value: 0.022,
        ttMax: 35,
        imageUrlId: '7033',
    },
    {
        name: 'Chikara Refiner MR400',
        value: 0.02,
        ttMax: 48,
        imageUrlId: '7033',
    },
    {
        name: 'Demonic Refiner MK-1',
        value: 0.03,
        ttMax: 2,
        imageUrlId: '7033',
        isLimited: true,
    },
    {
        name: 'Genesis Rookie OreRefiner',
        value: 0.02,
        ttMax: 48,
        imageUrlId: '7033',
        isLimited: true,
    },
    {
        name: 'Genesis Star Basic Refiner',
        value: 0.31,
        ttMax: 2,
        imageUrlId: '7033',
    },
    {
        name: 'Imperium Resource Refiner 1A',
        value: 0.03,
        ttMax: 3,
        imageUrlId: '7031',
    },
    {
        name: 'Imperium Resource Refiner B1',
        value: 0.022,
        ttMax: 6,
        imageUrlId: '7031',
    },
    {
        name: "Initiate's Refiner",
        value: 0.031,
        ttMax: 2,
        imageUrlId: '7031',
    },
    {
        name: 'NI Basic Refiner',
        value: 0.031,
        ttMax: 2,
        imageUrlId: '7033',
    },
    {
        name: 'NI Refiner New Settler Issue',
        value: 0.31,
        ttMax: 1,
        imageUrlId: '7033',
    },
    {
        name: 'PTech Refiner 1',
        value: 0.03,
        ttMax: 2,
        imageUrlId: '4848',
    },
    {
        name: 'PTech Refiner TT',
        value: 0.031,
        ttMax: 2,
        imageUrlId: '4848',
    },
    {
        name: 'Punk Blender',
        value: 0.031,
        ttMax: 2,
        imageUrlId: '7033',
    },
    {
        name: 'Refiner MR100',
        value: 0.031,
        ttMax: 2,
        imageUrlId: '7033',
    },
    {
        name: 'Transformer T-101',
        value: 0.03,
        ttMax: 8,
        imageUrlId: '7033',
    },
    {
        name: 'Transformer T-102',
        value: 0.028,
        ttMax: 22.75,
        imageUrlId: '7033',
    },
    {
        name: 'Transformer T-103',
        value: 0.026,
        ttMax: 45.5,
        imageUrlId: '7033',
    },
    {
        name: 'Transformer T-104',
        value: 0.023,
        ttMax: 55.3,
        imageUrlId: '7033',
    },
    {
        name: 'Transformer T-105',
        value: 0.21,
        ttMax: 75,
        imageUrlId: '7033',
    },
];

export const excavators = [
    {
        name: 'Earth Excavator ME/01',
        value: 0.3,
        ttMax: 2.4,
        imageUrlId: '409',
    },
    {
        name: 'eMINE E',
        value: 2.101,
        ttMax: 85,
        imageUrlId: '409',
        isLimited: true,
    },
    {
        name: 'Genesis Rookie Excavator',
        value: 0,
        ttMax: 0.01,
        imageUrlId: '409',
        isLimited: true,
    },
    {
        name: 'Genesis Star Basic Excavator',
        value: 0.3,
        ttMax: 3,
        imageUrlId: '409',
        isLimited: true,
    },
    {
        name: 'Genesis Star Earth Excavator ME/02',
        value: 0.5,
        ttMax: 8,
        imageUrlId: '409',
    },
    {
        name: 'Genesis Star Earth Excavator ME/03',
        value: 0.75,
        ttMax: 41,
        imageUrlId: '409',
    },
    {
        name: 'Genesis Star Earth Excavator ME/04',
        value: 0.85,
        ttMax: 55,
        imageUrlId: '409',
    },
    {
        name: 'Genesis Star Earth Excavator ME/05',
        value: 1,
        ttMax: 66,
        imageUrlId: '409',
    },
    {
        name: 'Genesis Star Earth Excavator ME/05, SGA Edition',
        value: 0.8,
        ttMax: 66,
        imageUrlId: '409',
    },
    {
        name: 'Genesis Star Excavator, Modified',
        value: 3.212,
        ttMax: 4362,
        imageUrlId: '409',
    },
    {
        name: 'Genesis Star Excavator, Adjusted',
        value: 0.5,
        ttMax: 18,
        imageUrlId: '409',
    },
    {
        name: 'Genesis Star Excavator, Improved',
        value: 0.5,
        ttMax: 27,
        imageUrlId: '409',
    },
    {
        name: 'Resource Extractor RE-101',
        value: 0.6,
        ttMax: 5.5,
        imageUrlId: '407',
    },
    {
        name: 'Resource Extractor RE-102',
        value: 1.1,
        ttMax: 12.6,
        imageUrlId: '407',
    },
    {
        name: 'Resource Extractor RE-103',
        value: 1.5,
        ttMax: 50,
        imageUrlId: '407',
    },
    {
        name: 'Resource Extractor RE-104',
        value: 1.73,
        ttMax: 50,
        imageUrlId: '407',
    },
    {
        name: 'Resource Extractor RE-105',
        value: 2.22,
        ttMax: 80,
        imageUrlId: '407',
    },
    {
        name: 'Resource Extractor RE-201',
        value: 1.29,
        ttMax: 89,
        imageUrlId: '407',
        isLimited: true,
    },
    {
        name: 'Resource Extractor RE-202',
        value: 1.6,
        ttMax: 110,
        imageUrlId: '407',
        isLimited: true,
    },
    {
        name: 'Resource Extractor RE-203',
        value: 2.06,
        ttMax: 185,
        imageUrlId: '407',
        isLimited: true,
    },
    {
        name: 'Resource Extractor RE-204',
        value: 2.331,
        ttMax: 195,
        imageUrlId: '407',
        isLimited: true,
    },
    {
        name: 'Resource Extractor RE-204 Adapted',
        value: 2.331,
        ttMax: 195,
        imageUrlId: '407',
        isLimited: true,
    },
    {
        name: 'Resource Extractor RE-205',
        value: 2.5,
        ttMax: 83,
        imageUrlId: '407',
        isLimited: true,
    },
    {
        name: 'Resource Extractor RE-301',
        value: 2.503,
        ttMax: 83,
        imageUrlId: '407',
        isLimited: true,
    },
];

export const finders = [
    {
        name: 'Finder F-101',
        value: 1,
        ttMax: 5.5,
        imageUrlId: '406',
    },
    {
        name: 'Finder F-102',
        value: 1.15,
        ttMax: 30,
        imageUrlId: '406',
    },
    {
        name: 'Finder F-103',
        value: 1.45,
        ttMax: 55,
        imageUrlId: '406',
    },
    {
        name: 'Finder F-104',
        value: 1.63,
        ttMax: 66.6,
        imageUrlId: '406',
    },
    {
        name: 'Finder F-105',
        value: 2.05,
        ttMax: 82,
        imageUrlId: '406',
    },
    {
        name: 'Finder F-105 TEN Edition',
        value: 2,
        ttMax: 82,
        imageUrlId: '406',
    },
    {
        name: 'Finder F-106',
        value: 1.799,
        ttMax: 79.95,
        imageUrlId: '406',
    },
    {
        name: 'Omegaton Detectonator MD-1',
        value: 0.239,
        ttMax: 0.1,
        imageUrlId: '406',
        isLimited: true,
    },
    {
        name: 'Omegaton Detectonator MD-10',
        value: 1,
        ttMax: 2.4,
        imageUrlId: '408',
    },
    {
        name: 'Omegaton Detectonator MD-20',
        value: 2,
        ttMax: 26,
        imageUrlId: '408',
    },
    {
        name: 'Omegaton Detectonator MD-30',
        value: 1,
        ttMax: 40,
        imageUrlId: '408',
    },
    {
        name: 'Omegaton Detectonator MD-40',
        value: 0.83,
        ttMax: 56,
        imageUrlId: '408',
    },
    {
        name: 'Omegaton Detectonator MD-50',
        value: 0.8,
        ttMax: 64,
        imageUrlId: '408',
    },
    {
        name: 'TerraMaster TT',
        value: 0.239,
        ttMax: 0.01,
        imageUrlId: '4701',
        isLimited: true,
    },
    {
        name: 'TerraMaster Trainer',
        value: 0.75,
        ttMax: 0.4,
        imageUrlId: '4701',
        isLimited: true,
    },
    {
        name: 'TerraMaster 1',
        value: 1.5,
        ttMax: 2.5,
        imageUrlId: '4701',
        isLimited: true,
    },
    {
        name: 'TerraMaster 2',
        value: 2.2,
        ttMax: 55,
        imageUrlId: '4701',
        isLimited: true,
    },
    {
        name: 'TerraMaster 3',
        value: 3.225,
        ttMax: 95,
        imageUrlId: '4701',
        isLimited: true,
    },
    {
        name: 'TerraMaster 3 Gold Rush',
        value: 3.225,
        ttMax: 95,
        imageUrlId: '6914',
    },
    {
        name: 'TerraMaster 4',
        value: 3.72,
        ttMax: 150,
        imageUrlId: '4701',
        isLimited: true,
    },
    {
        name: 'TerraMaster 5',
        value: 4.125,
        ttMax: 205,
        imageUrlId: '4701',
        isLimited: true,
    },
    {
        name: 'TerraMaster 6',
        value: 4.372,
        ttMax: 260,
        imageUrlId: '4701',
        isLimited: true,
    },
    {
        name: 'TerraMaster 7',
        value: 4.552,
        ttMax: 320,
        imageUrlId: '4701',
        isLimited: true,
    },
    {
        name: 'TerraMaster 8',
        value: 4.89,
        ttMax: 390,
        imageUrlId: '4701',
        isLimited: true,
    },
    {
        name: 'TerraMaster 8 Gold Rush',
        value: 4.89,
        ttMax: 390,
        imageUrlId: '4701',
    },
];

export const finderAmplifiers = [
    {
        name: 'Level 1 Finder Amplifier',
        value: 25,
        ttMax: 78,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 1 Finder Amplifier Light',
        value: 25,
        ttMax: 30,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 2 Finder Amplifier',
        value: 50,
        ttMax: 100,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 2 Finder Amplifier Light',
        value: 50,
        ttMax: 50,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 3 Finder Amplifier',
        value: 100,
        ttMax: 114,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 3 Finder Amplifier Light',
        value: 100,
        ttMax: 75,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 4 Finder Amplifier',
        value: 150,
        ttMax: 150,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 5 Finder Amplifier',
        value: 200,
        ttMax: 200,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 6 Finder Amplifier',
        value: 250,
        ttMax: 250,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 7 Finder Amplifier',
        value: 300,
        ttMax: 120,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 8 Finder Amplifier',
        value: 400,
        ttMax: 160,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 9 Finder Amplifier',
        value: 500,
        ttMax: 260,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 10 Finder Amplifier',
        value: 750,
        ttMax: 300,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 11 Finder Amplifier',
        value: 1000,
        ttMax: 350,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 12 Finder Amplifier',
        value: 1500,
        ttMax: 255,
        imageUrlId: '919',
        isLimited: true,
    },
    {
        name: 'Level 13 Finder Amplifier',
        value: 2000,
        ttMax: 340,
        imageUrlId: '919',
        isLimited: true,
    },
];

export const finderEnhancers = [
    {
        name: 'Mining Finder Depth Enhancer 1',
        value: 0.8,
        imageUrlId: '3286',
        isStackable: true,
    },
    {
        name: 'Mining Finder Depth Enhancer 2',
        value: 0.8,
        imageUrlId: '3305',
        isStackable: true,
    },
    {
        name: 'Mining Finder Depth Enhancer 3',
        value: 0.8,
        imageUrlId: '3317',
        isStackable: true,
    },
    {
        name: 'Mining Finder Depth Enhancer 4',
        value: 0.8,
        imageUrlId: '3306',
        isStackable: true,
    },
    {
        name: 'Mining Finder Depth Enhancer 5',
        value: 0.8,
        imageUrlId: '3341',
        isStackable: true,
    },
    {
        name: 'Mining Finder Depth Enhancer 6',
        value: 0.8,
        imageUrlId: '4113',
        isStackable: true,
    },
    {
        name: 'Mining Finder Depth Enhancer 7',
        value: 0.8,
        imageUrlId: '4112',
        isStackable: true,
    },
    {
        name: 'Mining Finder Depth Enhancer 8',
        value: 0.8,
        imageUrlId: '4114',
        isStackable: true,
    },
    {
        name: 'Mining Finder Depth Enhancer 9',
        value: 0.8,
        imageUrlId: '3307',
        isStackable: true,
    },
    {
        name: 'Mining Finder Depth Enhancer 10',
        value: 0.8,
        imageUrlId: '4529',
        isStackable: true,
    },
    {
        name: 'Mining Finder Range Enhancer 1',
        value: 1,
        imageUrlId: '3286',
        isStackable: true,
    },
    {
        name: 'Mining Finder Range Enhancer 2',
        value: 1,
        imageUrlId: '3305',
        isStackable: true,
    },
    {
        name: 'Mining Finder Range Enhancer 3',
        value: 1,
        imageUrlId: '3317',
        isStackable: true,
    },
    {
        name: 'Mining Finder Range Enhancer 4',
        value: 1,
        imageUrlId: '3306',
        isStackable: true,
    },
    {
        name: 'Mining Finder Range Enhancer 5',
        value: 1,
        imageUrlId: '3341',
        isStackable: true,
    },
    {
        name: 'Mining Finder Range Enhancer 6',
        value: 1,
        imageUrlId: '4113',
        isStackable: true,
    },
    {
        name: 'Mining Finder Range Enhancer 7',
        value: 1,
        imageUrlId: '4112',
        isStackable: true,
    },
    {
        name: 'Mining Finder Range Enhancer 8',
        value: 1,
        imageUrlId: '4114',
        isStackable: true,
    },
    {
        name: 'Mining Finder Range Enhancer 9',
        value: 1,
        imageUrlId: '3307',
        isStackable: true,
    },
    {
        name: 'Mining Finder Range Enhancer 10',
        value: 1,
        imageUrlId: '4529',
        isStackable: true,
    },
    {
        name: 'Mining Finder Skill Modification Enhancer 1',
        value: 0.6,
        imageUrlId: '3286',
        isStackable: true,
    },
    {
        name: 'Mining Finder Skill Modification Enhancer 2',
        value: 0.6,
        imageUrlId: '3305',
        isStackable: true,
    },
    {
        name: 'Mining Finder Skill Modification Enhancer 3',
        value: 0.6,
        imageUrlId: '3317',
        isStackable: true,
    },
    {
        name: 'Mining Finder Skill Modification Enhancer 4',
        value: 0.6,
        imageUrlId: '3306',
        isStackable: true,
    },
    {
        name: 'Mining Finder Skill Modification Enhancer 5',
        value: 0.6,
        imageUrlId: '3341',
        isStackable: true,
    },
    {
        name: 'Mining Finder Skill Modification Enhancer 6',
        value: 0.6,
        imageUrlId: '4113',
        isStackable: true,
    },
    {
        name: 'Mining Finder Skill Modification Enhancer 7',
        value: 0.6,
        imageUrlId: '4112',
        isStackable: true,
    },
    {
        name: 'Mining Finder Skill Modification Enhancer 8',
        value: 0.6,
        imageUrlId: '4114',
        isStackable: true,
    },
    {
        name: 'Mining Finder Skill Modification Enhancer 9',
        value: 0.6,
        imageUrlId: '3307',
        isStackable: true,
    },
    {
        name: 'Mining Finder Skill Modification Enhancer 10',
        value: 0.6,
        imageUrlId: '4529',
        isStackable: true,
    },
];

export const excavatorEnhancers = [
    {
        name: 'Mining Excavator Speed Enhancer 1',
        value: 0.8,
        imageUrlId: '3286',
        isStackable: true,
    },
    {
        name: 'Mining Excavator Speed Enhancer 2',
        value: 0.8,
        imageUrlId: '3305',
        isStackable: true,
    },
    {
        name: 'Mining Excavator Speed Enhancer 3',
        value: 0.2,
        imageUrlId: '3317',
        isStackable: true,
    },
    {
        name: 'Mining Excavator Speed Enhancer 4',
        value: 0.2,
        imageUrlId: '3306',
        isStackable: true,
    },
    {
        name: 'Mining Excavator Speed Enhancer 5',
        value: 0.2,
        imageUrlId: '3341',
        isStackable: true,
    },
    {
        name: 'Mining Excavator Speed Enhancer 6',
        value: 0.2,
        imageUrlId: '4113',
        isStackable: true,
    },
    {
        name: 'Mining Excavator Speed Enhancer 7',
        value: 0.2,
        imageUrlId: '4112',
        isStackable: true,
    },
    {
        name: 'Mining Excavator Speed Enhancer 8',
        value: 0.2,
        imageUrlId: '4114',
        isStackable: true,
    },
    {
        name: 'Mining Excavator Speed Enhancer 9',
        value: 0.2,
        imageUrlId: '3307',
    },
    {
        name: 'Mining Excavator Speed Enhancer 10',
        value: 0.2,
        imageUrlId: '4529',
    },
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
