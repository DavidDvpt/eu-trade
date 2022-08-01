import { categoriesSeed, familiesSeed } from './datasForSeed';
import prismaClient from './prismaClient';

async function createAdminUser() {
    const user = await prismaClient.user.create({
        data: {
            email: 'david.mosca69@gmail.com',
            password: '$2b$10$p753hUkr/wfM.plQPbLweemJQaxeykFgNb4Wd9bkIfjnbKSRg6JGa',
            pseudo: 'admin',
            role: 'ADMIN',
        },
    });

    console.log(user);
}

function CreateFamiliesAndCategories() {
    const familiesMap = familiesSeed.map((f) =>
        prismaClient.family.create({
            data: {
                id: f.id,
                name: f.name,
                categories: {
                    create: categoriesSeed
                        .filter((c) => c.family === f.name)
                        .map((m) => ({ id: m.id, name: m.name })),
                },
            },
        })
    );

    const promise = Promise.all(familiesMap);

    return promise.then((response) => console.log(response)).catch((error) => console.log(error));
}

createAdminUser();
CreateFamiliesAndCategories();
