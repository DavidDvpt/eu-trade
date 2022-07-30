import prismaClient from './prismaClient';

async function createAdminUser() {
    const user = await prismaClient.user.create({
        data: {
            email: 'david.mosca69@gmail.com',
            password: 'pwd',
            pseudo: 'admin',
            role: 'ADMIN',
        },
    });

    console.log(user);
}

async function CreateFamilies() {
    const families = [
        { id: 1, name: 'resources' },
        { id: 2, name: 'tool' },
    ];

    const result = await prismaClient.family.createMany({
        data: families,
    });

    console.log(result);
}

createAdminUser();
CreateFamilies();
