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

function createSimpleRefinedResource(item: Partial<item>) {
    return prisma.item.create({
        data: {
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

        resources.forEach(async (tuple) => {
            promises.push(
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
                        prisma.refineRelations.create({
                            data: {
                                refinedItemId: resultR.id,
                                unrefinedItemId: resultU.id,
                                quantity: count,
                            },
                        });
                    });
                })
            );
        });
        return promises;
    };

    const complexeStackedResource = (line: ComplexeResource[]) => {
        const promises: Promise<void>[] = [];

        const arrayLength: number[] = [];

        line.forEach((l, i) => {
            arrayLength.push(
                i === 0 ? l.u.length : l.u.length + arrayLength[i - 1]
            );
        });

        line.forEach(async (tuple) => {
            const cat = findCategoryId(categories, tuple.rCat);

            // CREATE REFINED ITEM
            promises.push(
                createSimpleRefinedResource({
                    ...tuple.r,
                    categoryId: cat,
                    isStackable: true,
                })
                    .then((result) => {
                        const uTuple = tuple?.u || [];

                        uTuple.forEach((t) => {
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
                                    .then((finalResult) => {});
                            });
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            );
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
    ).then((result) => console.log('promise all', result));

    // createMultipleItem(
    //     consumables,
    //     findCategoryId(categories, 'Consumables')
    // ).then((result) => {});
}

const createRefiners = async () => {
    const categories = await prisma.category.findMany();
    const cat = findCategoryId(categories, 'Refiners');
    await prisma.item.createMany({
        data: refiners.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });
};

const createExcavators = async () => {
    const categories = await prisma.category.findMany();

    const cat = findCategoryId(categories, 'Excavators');
    await prisma.item.createMany({
        data: excavators.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });
};

const createFinders = async () => {
    const categories = await prisma.category.findMany();

    const cat = findCategoryId(categories, 'Finders');
    await prisma.item.createMany({
        data: finders.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });
};

const createFindersAmplifiers = async () => {
    const categories = await prisma.category.findMany();

    const cat = findCategoryId(categories, 'Finder Amplifiers');
    await prisma.item.createMany({
        data: finderAmplifiers.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });
};

const createFindersEnhancers = async () => {
    const categories = await prisma.category.findMany();

    const cat = findCategoryId(categories, 'Finder Enhancers');
    await prisma.item.createMany({
        data: finderEnhancers.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });
};

const createExcavatorEnhancers = async () => {
    const categories = await prisma.category.findMany();

    const cat = findCategoryId(categories, 'Excavator Enhancers');
    await prisma.item.createMany({
        data: excavatorEnhancers.map((r) => {
            return { ...r, categoryId: cat };
        }),
    });
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
            .then(async (result) => {
                const categories = await prisma.category.findMany();
                const catId = findCategoryId(categories, 'Ore');
                prisma.category
                    .findUnique({
                        where: { id: catId },
                        select: {
                            items: true,
                        },
                    })
                    .then((response) => {
                        if (response?.items) {
                            prisma.sessionLineCost
                                .createMany({
                                    data: [
                                        {
                                            sessionId: result.id,
                                            quantity: Math.ceil(
                                                Math.random() * 1000
                                            ),
                                            itemId: response?.items[0].id,
                                        },
                                        {
                                            sessionId: result.id,
                                            quantity: Math.ceil(
                                                Math.random() * 1000
                                            ),
                                            itemId: response?.items[1].id,
                                        },
                                        {
                                            sessionId: result.id,
                                            quantity: Math.ceil(
                                                Math.random() * 1000
                                            ),
                                            itemId: response?.items[10].id,
                                        },
                                        {
                                            sessionId: result.id,
                                            quantity: Math.ceil(
                                                Math.random() * 1000
                                            ),
                                            itemId: response?.items[13].id,
                                        },
                                    ],
                                })
                                .then((response) => console.log(response));
                        }
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
            createRefiners();
            createExcavators();
            createFinders();
            createFindersAmplifiers();
            createFindersEnhancers();
            createExcavatorEnhancers();
        })
        .then((response) => {
            // mocks
            createTestSessions();
            createGlobalUSerDatas();
        })
        .catch((error) => console.log(error));
});
