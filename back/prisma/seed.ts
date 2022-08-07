import {
    categoriesSeed,
    enmatters,
    familiesSeed,
    foundOns,
    ores,
    refinedEnmatters,
    refinedOres,
    refinedTreasures,
    treasures,
} from './datasForSeed';
import prisma from './prismaClient';

async function createAdminUser() {
    await prisma.user.create({
        data: {
            email: 'david.mosca69@gmail.com',
            password: '$2b$10$p753hUkr/wfM.plQPbLweemJQaxeykFgNb4Wd9bkIfjnbKSRg6JGa',
            pseudo: 'admin',
            role: 'ADMIN',
        },
    });
}

function createFamiliesAndCategories() {
    const familiesMap = familiesSeed.map((f, iFam) =>
        prisma.family.create({
            data: {
                id: iFam + 1,
                name: f.name,
                categories: {
                    create: categoriesSeed
                        .filter((c) => c.family === f.name)
                        .map((m, iCat) => ({ id: iCat + 1, name: m.name })),
                },
            },
        })
    );

    const promise = Promise.all(familiesMap);

    return promise;
}

async function createFoundOn() {
    await prisma.foundOn.createMany({
        data: foundOns.map((f, i) => ({ ...f, id: i + 1 })),
    });
}

async function createResources() {
    prisma.category
        .findMany()
        .then((result) => {
            const catId = (name: string) => {
                const cat = result.find((f) => {
                    return f.name === name;
                });

                return cat ? cat.id : 0;
            };

            const stackedItems = async (
                tab: { name: string; value: number; imageUrlId: string }[],
                catId: number
            ) => {
                if (catId !== 0) {
                    await prisma.item.createMany({
                        data: tab.map((item) => ({
                            ...item,
                            value: item?.value * 10000,
                            categoryId: catId,
                            isStackable: true,
                        })),
                    });
                }
            };

            stackedItems(ores, catId('Ore'));
            stackedItems(refinedOres, catId('Refined Ore'));
            stackedItems(enmatters, catId('Enmatter'));
            stackedItems(refinedEnmatters, catId('Refined Enmatter'));
            stackedItems(treasures, catId('Treasure'));
            stackedItems(refinedTreasures, catId('Refined Treasure'));
        })
        .catch((err) => console.log(err));
}

createAdminUser();
createFoundOn();
createFamiliesAndCategories()
    .then((response) => {
        createResources();
    })
    .catch((error) => console.log(error));
