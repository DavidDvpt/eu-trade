import { category, item } from '@prisma/client';
import {
    basicEnmatter,
    basicOre,
    BasicResource,
    categoriesSeed,
    familiesSeed,
    foodDatas,
    foundOns,
    naturalMaterialDatas,
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

async function createSingleItem(item: Partial<item>, catId: number) {
    await prisma.item.create({
        data: {
            name: item.name ?? '',
            value: item.value ?? 0,
            ttMax: item.ttMax ?? 0,
            categoryId: catId,
            isStackable: item.isStackable ?? false,
            isLimited: item.isLimited ?? false,
            isActif: item.isActif ?? false,
        },
    });
}

async function createMultipleItem(items: Partial<item>[], catId: number) {
    await prisma.item.createMany({
        data: items.map((i) => ({
            name: i.name ?? '',
            value: i.value ?? 0,
            ttMax: i.ttMax ?? 0,
            categoryId: catId,
            isStackable: i.isStackable ?? false,
            isLimited: i.isLimited ?? false,
            isActif: i.isActif ?? false,
        })),
    });
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

    const naturalMaterials = () => {
        const natMatCat = findCategoryId(categories, 'Natural Material');
        prisma.item
            .createMany({
                data: naturalMaterialDatas.map((m) => ({ ...m, categoryId: natMatCat })),
            })
            .then((result) => console.log(result));
    };

    const foods = () => {
        const natMatCat = findCategoryId(categories, 'Food');
        prisma.item
            .createMany({
                data: foodDatas.map((m) => ({ ...m, categoryId: natMatCat })),
            })
            .then((result) => console.log(result));
    };

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

    createSingleItem;

    // const complexeStackedResource = async (line: ComplexeResource[]) => {
    //     line.forEach((tuple) => {
    //         const cat = findCategoryId(categories, 'Food');

    //         if (cat !== 0) {
    //             // CREATE REFINED ITEM
    //             createSimpleRefinedResource({
    //                 ...tuple.r,
    //                 categoryId: cat,
    //                 isStackable: true,
    //             })
    //                 .then((result) => {
    //                     tuple?.u?.forEach((t) => {
    //                         const uCat =
    //                             categories.find((f) => {
    //                                 return f.name === t.uCat;
    //                             })?.id || 0;

    //                         // CREATE UNREFINED ITEM
    //                         createSimpleRefinedResource({
    //                             ...t.data,
    //                             categoryId: uCat,
    //                             isStackable: true,
    //                         }).then((resultUnrefined) => {
    //                             // CREATE REFINE RELATIONS
    //                             prisma.refineRelations
    //                                 .create({
    //                                     data: {
    //                                         refinedItemId: result.id,
    //                                         unrefinedItemId: resultUnrefined.id,
    //                                         quantity: t.count,
    //                                     },
    //                                 })
    //                                 .then((finalResult) => {
    //                                     // console.log(result);
    //                                     // console.log(resultUnrefined);
    //                                     // console.log(finalResult);
    //                                 });
    //                         });
    //                     });
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     });
    // };

    foods();
    naturalMaterials();
    basicStackedResource(basicOre, 'Ore', 'Refined Ore', 3);
    basicStackedResource(basicEnmatter, 'Enmatter', 'Refined Enmatter', 2);
    // complexeStackedResource(basicEnmatter, 'Enmatter', 'Refined Enmatter', 2);
}

createAdminUser();
createFoundOn();
createFamiliesAndCategories()
    .then((response) => {
        createResources();
    })
    .catch((error) => console.log(error));
