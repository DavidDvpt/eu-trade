import { category, item } from '@prisma/client';
import {
    BasicResource,
    categoriesSeed,
    ComplexeResource,
    familiesSeed,
    foundOns,
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

const findCategoryId = (tab: category[], catName: string) => {
    return (
        tab.find((f) => {
            return f.name === catName;
        })?.id || 0
    );
};

async function createSimpleItem(item: Partial<item>) {
    return await prisma.item.create({
        data: {
            categoryId: item.categoryId ?? 0,
            name: item.name ?? '',
            imageUrlId: item.imageUrlId ?? '',
            value: item.value ? item.value : 0,
            isStackable: item.isStackable ?? false,
        },
    });
}

async function createResources() {
    const categories = await prisma.category.findMany();

    const basicStackedResource = (
        resources: BasicResource[],
        uCat: string,
        rCat: string,
        count: number
    ) => {
        const rCatId = findCategoryId(categories, rCat);
        const uCatId = findCategoryId(categories, uCat);

        resources.forEach((tuple) => {
            createSimpleItem({
                ...tuple.r,
                categoryId: rCatId,
                value: tuple.u.value * 3,
                isStackable: true,
            }).then((resultR) => {
                createSimpleItem({
                    ...tuple.u,
                    categoryId: uCatId,
                    isStackable: true,
                }).then((resultU) => {
                    prisma.refineRelations
                        .create({
                            data: {
                                refinedItemId: resultR.id,
                                unrefinedItemId: resultU.id,
                                quantity: count,
                            },
                        })
                        .then((finalResult) => {
                            console.log(resultR);
                            console.log(resultU);
                            console.log(finalResult);
                        });
                });
            });
        });
    };

    const newStackedItems = async (line: ComplexeResource[]) => {
        line.forEach((tuple) => {
            const cat =
                categories.find((f) => {
                    return f.name === tuple.refinedCat;
                })?.id || 0;

            if (cat !== 0) {
                const refinedValue = tuple?.u?.reduce((acc, cur) => {
                    return (acc += cur.data.value);
                }, 0);

                // CREATE REFINED ITEM
                createSimpleItem({
                    ...tuple.r,
                    categoryId: cat,
                    value: refinedValue ?? 0,
                    isStackable: true,
                })
                    .then((result) => {
                        tuple?.u?.forEach((t) => {
                            const uCat =
                                categories.find((f) => {
                                    return f.name === t.uCat;
                                })?.id || 0;

                            // CREATE UNREFINED ITEM
                            createSimpleItem({
                                ...t.data,
                                categoryId: uCat,
                                isStackable: true,
                            }).then((resultUnrefined) => {
                                // CREATE REFINE RELATIONS
                                prisma.refineRelations
                                    .create({
                                        data: {
                                            refinedItemId: result.id,
                                            unrefinedItemId: resultUnrefined.id,
                                            quantity: t.count,
                                        },
                                    })
                                    .then((finalResult) => {
                                        // console.log(result);
                                        // console.log(resultUnrefined);
                                        // console.log(finalResult);
                                    });
                            });
                        });
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    // basicStackedResource(basicOreAndRefined, 'Ore', 'Refined Ore', 3);
}

createAdminUser();
createFoundOn();
createFamiliesAndCategories()
    .then((response) => {
        createResources();
    })
    .catch((error) => console.log(error));
