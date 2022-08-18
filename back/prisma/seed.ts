import { category, item } from '@prisma/client';
import {
    basicEnmatter,
    basicOre,
    BasicResource,
    categoriesSeed,
    ComplexeResource,
    complexeResourcesDatas,
    consumables,
    excavatorEnhancers,
    excavators,
    familiesSeed,
    finderAmplifiers,
    finderEnhancers,
    finders,
    foundOns,
    mockSession,
    refiners,
} from './datasForSeed';
import prisma from './prismaClient';

async function createAdminUser() {
    await prisma.user.create({
        data: {
            email: 'david.mosca69@gmail.com',
            password:
                '$2b$10$p753hUkr/wfM.plQPbLweemJQaxeykFgNb4Wd9bkIfjnbKSRg6JGa',
            pseudo: 'admin',
            role: 'ADMIN',
        },
    });
}

function createFamiliesAndCategories() {
    const familiesMap = familiesSeed.map((f) =>
        prisma.family.create({
            data: {
                name: f.name,
                categories: {
                    create: categoriesSeed
                        .filter((c) => c.family === f.name)
                        .map((m) => ({ name: m.name })),
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
//  async function createRefinerelation(rName: string, uName: {name: string, count: number}[]) {
//     await prisma.refineRelations.create({data: {
//         re
//     }})
//  }

// async function createSingleItem(item: Partial<item>, catId: number) {
//     await prisma.item.create({
//         data: {
//             ...item,
//             name: item.name as string,
//             categoryId: catId,
//         },
//     });
// }

function createMultipleItem(items: Partial<item>[], catId: number) {
    return prisma.item.createMany({
        data: items.map((i) => ({
            ...i,
            name: i.name as string,
            categoryId: catId,
        })),
    });
}

const findCategoryId = (tab: category[], catName: string) => {
    return (
        tab.find((f) => {
            return f.name === catName;
        })?.id || 0
    );
};

async function createSimpleRefinedResource(item: Partial<item>) {
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

    // const naturalMaterials = () => {
    //     const natMatCat = findCategoryId(categories, 'Natural Material');

    //     createMultipleItem(naturalMaterialDatas, natMatCat).then((result) =>
    //         console.log(result)
    //     );
    // };

    // const foods = () => {
    //     const natMatCat = findCategoryId(categories, 'Food');

    //     createMultipleItem(foodDatas, natMatCat).then((result) =>
    //         console.log(result)
    //     );
    // };

    const basicStackedResource = (
        resources: BasicResource[],
        uCat: string,
        rCat: string,
        count: number
    ) => {
        const rCatId = findCategoryId(categories, rCat);
        const uCatId = findCategoryId(categories, uCat);

        resources.forEach((tuple) => {
            createSimpleRefinedResource({
                ...tuple.r,
                categoryId: rCatId,
                value: tuple.u.value * count,
                isStackable: true,
            }).then((resultR) => {
                createSimpleRefinedResource({
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
                            // console.log(resultR);
                            // console.log(resultU);
                            // console.log(finalResult);
                        });
                });
            });
        });
    };

    const complexeStackedResource = async (line: ComplexeResource[]) => {
        line.forEach((tuple) => {
            const cat = findCategoryId(categories, tuple.rCat);

            if (cat !== 0) {
                // CREATE REFINED ITEM
                createSimpleRefinedResource({
                    ...tuple.r,
                    categoryId: cat,
                    isStackable: true,
                })
                    .then((result) => {
                        tuple?.u?.forEach((t) => {
                            const uCat =
                                categories.find((f) => {
                                    return f.name === t.uCat;
                                })?.id || 0;

                            // CREATE UNREFINED ITEM
                            createSimpleRefinedResource({
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

    // foods();

    basicStackedResource(basicOre, 'Ore', 'Refined Ore', 3);
    basicStackedResource(basicEnmatter, 'Enmatter', 'Refined Enmatter', 2);
    complexeStackedResource(complexeResourcesDatas);
    createMultipleItem(
        consumables,
        findCategoryId(categories, 'Consumables')
    ).then((result) => console.log(result));
}

const createRefiners = async () => {
    const categories = await prisma.category.findMany();
    const cat = findCategoryId(categories, 'Refiners');
    const result = await prisma.item.createMany({
        data: refiners.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });

    // console.log(result);
};

const createExcavators = async () => {
    const categories = await prisma.category.findMany();

    const cat = findCategoryId(categories, 'Excavators');
    const result = await prisma.item.createMany({
        data: excavators.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });

    // console.log(result);
};

const createFinders = async () => {
    const categories = await prisma.category.findMany();

    const cat = findCategoryId(categories, 'Finders');
    const result = await prisma.item.createMany({
        data: finders.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });

    // console.log(result);
};

const createFindersAmplifiers = async () => {
    const categories = await prisma.category.findMany();

    const cat = findCategoryId(categories, 'Finder Amplifiers');
    const result = await prisma.item.createMany({
        data: finderAmplifiers.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });

    // console.log(result);
};

const createFindersEnhancers = async () => {
    const categories = await prisma.category.findMany();

    const cat = findCategoryId(categories, 'Finder Enhancers');
    const result = await prisma.item.createMany({
        data: finderEnhancers.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });

    // console.log(result);
};

const createTestSessions = async () => {
    const sessions = await prisma.session.createMany({ data: mockSession });
};

const createExcavatorEnhancers = async () => {
    const categories = await prisma.category.findMany();

    const cat = findCategoryId(categories, 'Excavator Enhancers');
    const result = await prisma.item.createMany({
        data: excavatorEnhancers.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });

    // console.log(result);
};

createAdminUser();
createFoundOn();
createFamiliesAndCategories()
    .then((response) => {
        createResources();
        createRefiners();
        createExcavators();
        createFinders();
        createFindersAmplifiers();
        createFindersEnhancers();
        createExcavatorEnhancers();
    })
    .catch((error) => console.log(error));

// mocks
createTestSessions();
