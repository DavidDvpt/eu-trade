import { category, item } from '@prisma/client';
import {
    basicEnmatter,
    basicOre,
    BasicResource,
    categoriesSeed,
    ComplexeResource,
    complexeResourcesDatas,
    excavatorEnhancers,
    excavators,
    familiesSeed,
    finderAmplifiers,
    finderEnhancers,
    finders,
    foundOns,
    refiners,
    usersSeed,
} from './datasForSeed';
import { mockGlobalUserDatas, mockSession } from './mockSeed';
import prisma from './prismaClient';

function createAdminUser() {
    return prisma.user.createMany({
        data: usersSeed,
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

const findCategoryId = (tab: category[], catName: string) => {
    return (
        tab.find((f) => {
            return f.name === catName;
        })?.id || 0
    );
};

async function createFoundOn() {
    await prisma.foundOn.createMany({
        data: foundOns.map((f, i) => ({ ...f, id: i + 1 })),
    });
}

let insertedItemId = 1;

const createMultipleItem = async (items: Partial<item>[], catId: number) => {
    items.forEach(async (it) => {
        if (it.name) {
            await prisma.item.create({
                data: { ...it, name: it.name as string, categoryId: catId },
            });
        }
    });
    // return prisma.item.createMany({
    //     data: items.map((i) => ({
    //         ...i,
    //         name: i.name as string,
    //         categoryId: catId,
    //     })),
    // });
};

function createSimpleRefinedResource(item: Partial<item>, id: number) {
    return prisma.item.create({
        data: {
            id,
            categoryId: item.categoryId ?? 0,
            name: item.name ?? '',
            imageUrlId: item.imageUrlId ?? '',
            ttMax: item.value ? item.value : 0,
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
        const promises: Promise<void>[] = [];
        console.log('length', resources.length);

        resources.forEach(async (tuple, i, tab) => {
            promises.push(
                createSimpleRefinedResource(
                    {
                        ...tuple.r,
                        categoryId: rCatId,
                        value: tuple.u.value * count,
                        isStackable: true,
                    },
                    insertedItemId
                ).then((resultR) => {
                    createSimpleRefinedResource(
                        {
                            ...tuple.u,
                            categoryId: uCatId,
                            isStackable: true,
                        },
                        tab.length + resultR.id
                    ).then((resultU) => {
                        prisma.refineRelations
                            .create({
                                data: {
                                    refinedItemId: resultR.id,
                                    unrefinedItemId: resultU.id,
                                    quantity: count,
                                },
                            })
                            .then((finalResult) => {});
                    });
                })
            );
            insertedItemId += 1;
        });
        insertedItemId += resources.length;
        return promises;
    };

    const complexeStackedResource = (line: ComplexeResource[]) => {
        const promises: Promise<void>[] = [];

        line.forEach(async (tuple, i, tab) => {
            const cat = findCategoryId(categories, tuple.rCat);

            // CREATE REFINED ITEM
            promises.push(
                createSimpleRefinedResource(
                    {
                        ...tuple.r,
                        categoryId: cat,
                        isStackable: true,
                    },
                    insertedItemId
                )
                    .then((result) => {
                        let subTab = 0;

                        const uTuple = tuple?.u || [];
                        uTuple.forEach((t, ind, uTab) => {
                            const uCat =
                                categories.find((f) => {
                                    return f.name === t.uCat;
                                })?.id || 0;

                            console.log(
                                tab.length,
                                result.id,
                                subTab,
                                tab.length + result.id + subTab - ind
                            );
                            // CREATE UNREFINED ITEM
                            createSimpleRefinedResource(
                                {
                                    ...t.data,
                                    categoryId: uCat,
                                    isStackable: true,
                                },
                                tab.length + result.id + subTab + ind
                            ).then((resultUnrefined) => {
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
                            insertedItemId += uTab.length;
                            subTab += uTuple.length;
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            );

            // insertedItemId += 1;
        });
        return promises;
    };

    // foods();

    Promise.all(
        basicStackedResource(basicOre, 'Ore', 'Refined Ore', 3).concat(
            basicStackedResource(
                basicEnmatter,
                'Enmatter',
                'Refined Enmatter',
                2
            ),
            complexeStackedResource(complexeResourcesDatas)
        )
    ).then((result) => console.log('promise all', result, insertedItemId));

    // createMultipleItem(
    //     consumables,
    //     findCategoryId(categories, 'Consumables')
    // ).then((result) => {});
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
// **********************************************************************
//         MOCKS
// **********************************************************************
const createTestSessions = () => {
    mockSession.map((ms) => {
        return prisma.session
            .create({
                data: ms.session,
            })
            .then((result) => {
                return prisma.sessionLineCost.createMany({
                    data: ms.cost.map((c) => {
                        return { ...c, sessionId: result.id };
                    }),
                });
            });
    });
};

const createGlobalUSerDatas = async () => {
    await prisma.globalUserData.createMany({ data: mockGlobalUserDatas });
};

createAdminUser().then((result) => {
    createFoundOn();
    createFamiliesAndCategories()
        .then((response) => {
            createResources();
            // createRefiners();
            // createExcavators();
            // createFinders();
            // createFindersAmplifiers();
            // createFindersEnhancers();
            // createExcavatorEnhancers();
            // mocks
            // createTestSessions();
            // createGlobalUSerDatas();
        })
        .catch((error) => console.log(error));
});
