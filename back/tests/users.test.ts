import { Role } from '@prisma/client';
import supertest from 'supertest';
import { usersSeed } from '../prisma/datasForSeed';
import app from '../src/app';
import { genToken } from '../src/lib/authTools';

describe('TEST USERS', () => {
    describe('GET USERS', () => {
        let token = '';
        beforeAll(() => {
            token = genToken({
                id: 1,
                pseudo: 'dudul',
                email: 'fgdsgf@dsf.sdf',
                password: 'ddd',
                role: Role.USER,
            });
        });
        it('should return 200', async () => {
            await supertest(app)
                .get('/api/v1/users')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBe(3);
                });
        });
    });

    describe('GET USER BY ID', () => {
        let token = '';
        beforeAll(() => {
            token = genToken({
                ...usersSeed[2],
            });
        });
        it('should return 200 (good user)', async () => {
            await supertest(app)
                .get('/api/v1/users/3')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200)
                .then((response) => {
                    console.log(response.body);
                    expect(response.body.pseudo).toBe('user');
                });
        });

        it('should return 403 (bad user)', async () => {
            await supertest(app)
                .get('/api/v1/users/2')
                .set({ Authorization: 'Bearer ' + token })
                .expect(403);
        });
    });

    describe('GET USER SESSIONS', () => {
        let token = '';
        beforeAll(() => {
            token = genToken({
                ...usersSeed[2],
            });
        });
        it('should return 200 (good user)', async () => {
            await supertest(app)
                .get('/api/v1/users/3/sessions')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBe(4);
                });
        });

        it('should return 403 (bad user)', async () => {
            await supertest(app)
                .get('/api/v1/users/2/sessions')
                .set({ Authorization: 'Bearer ' + token })
                .expect(403);
        });
    });
});
