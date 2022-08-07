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

interface BasicResource {
    unrefinedCat: string;
    refinedCat: string;
    datas: {
        unrefined: { name: string; value: number; imageUrlId: string };
        refined: { name: string; imageUrlId: string };
        count: number;
    }[];
}
export function basicOreAndRefined(): BasicResource {
    return {
        unrefinedCat: 'Ore',
        refinedCat: 'Refined Ore',
        datas: [
            {
                unrefined: { name: 'Adomasite Stone', value: 0.6, imageUrlId: '1818' },
                refined: { name: 'Adomasite Ingot', imageUrlId: '1731' },
                count: 3,
            },
            {
                unrefined: { name: 'Alferix Stone', value: 0.95, imageUrlId: '1637' },
                refined: { name: 'Alferix Ingot', imageUrlId: '1500' },
                count: 3,
            },
            {
                unrefined: { name: 'Alternative Rock', value: 0.01, imageUrlId: '3732' },
                refined: { name: 'Alternative Ingot', imageUrlId: '4097' },
                count: 3,
            },
        ],
    };
}

export const ores = [
    { name: 'Adomasite Stone', value: 0.6, imageUrlId: '1818' },
    { name: 'Alferix Stone', value: 0.95, imageUrlId: '1637' },
    { name: 'Alternative Rock', value: 0.01, imageUrlId: '3732' },
];

export const refinedOres = [
    { name: 'Adomasite Ingot', value: 1.8, imageUrlId: '1731' },
    { name: 'Alferix Ingot', value: 2.85, imageUrlId: '1500' },
    { name: 'Alternative Ingot', value: 0.03, imageUrlId: '4097' },
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
