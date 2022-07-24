import prismaClient from './prismaClient';

async function createAdminUser() {
    const user = await prismaClient.user.create({
        data: {
            email: 'david.mosca69@gmail.com',
            password: 'pwd',
            pseudo: 'admin',
        },
    });

    console.log(user);
}

createAdminUser();
