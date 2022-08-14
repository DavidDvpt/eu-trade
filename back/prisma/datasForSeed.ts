export const familiesSeed = [{ name: 'Resources' }, { name: 'Tools' }];
export const categoriesSeed = [
    { name: 'Ore', family: 'Resources' },
    { name: 'Refined Ore', family: 'Resources' },
    { name: 'Enmatter', family: 'Resources' },
    { name: 'Refined Enmatter', family: 'Resources' },
    { name: 'Treasure', family: 'Resources' },
    { name: 'Refined Treasure', family: 'Resources' },
    { name: 'Natural Material', family: 'Resources' },
    { name: 'Food', family: 'Resources' },
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

export const naturalMaterialDatas = [{ name: 'Common Dung', value: 0.0001, imageUrlId: '387' }];
export const foodDatas = [
    { name: 'Bombardo', value: 0.00001, imageUrlId: '390' },
    { name: 'Caroot', value: 0.00001, imageUrlId: '523' },
    { name: 'Aimoros', value: 0.00001, imageUrlId: '946' },
    { name: 'Papplon', value: 0.00001, imageUrlId: '389' },
    { name: 'Nutrio Bar', value: 0.01, imageUrlId: '356' },
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

// export const complexeResourcesDatas: {
//     rCat: 'Refined Enmatter';
//     r: { name: 'Energized Fertilizer'; value: 0.47; imageUrlId: '1657' };
//     u: [
//         {
//             data: { name: 'Bombardo'; value: 0.00001; imageUrlId: '390' };
//             count: 1;
//             uCat: 'Natural Material';
//         },
//         {
//             data: { name: string; value: number; imageUrlId: string };
//             count: 1;
//             uCat: 'Natural Material';
//         }
//     ];
// };
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
