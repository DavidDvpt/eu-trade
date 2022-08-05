import { Role } from '@prisma/client';
import supertest from 'supertest';
import app from '../src/app';
import { genToken } from '../src/lib/authTools';

describe('AUTH ROLES TESTS', () => {
    describe('No token', () => {
        it('get all - Should return 401', async () => {
            await supertest(app).get('/api/v1/families').expect(401);
        });
    });

    describe('Bad role - Should return 403', () => {
        let token = '';
        beforeAll(() => {
            token = genToken({
                id: 1,
                pseudo: 'dudul',
                email: 'fgdsgf@dsf.sdf',
                password: 'ddd',
                role: 'BAD',
            });
        });

        it('Get all should return 403', async () => {
            await supertest(app)
                .get('/api/v1/families')
                .set({ Authorization: 'Bearer ' + token })
                .expect(403);
        });
    });

    describe('Role USER', () => {
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

        it('Get all', async () => {
            await supertest(app)
                .get('/api/v1/families')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200);
        });

        it('Get by id', async () => {
            await supertest(app)
                .get('/api/v1/families/1')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200);
        });

        it('Get categories by family id', async () => {
            await supertest(app)
                .get('/api/v1/families/1/categories')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBeGreaterThan(0);
                });
        });

        it('Create', async () => {
            await supertest(app)
                .post('/api/v1/families')
                .set({ Authorization: 'Bearer ' + token })
                .expect(403);
        });

        it('Update', async () => {
            await supertest(app)
                .put('/api/v1/families/1')
                .set({ Authorization: 'Bearer ' + token })
                .expect(403);
        });

        it('Delete', async () => {
            await supertest(app)
                .delete('/api/v1/families/1')
                .set({ Authorization: 'Bearer ' + token })
                .expect(403);
        });
    });

    describe('Manager role', () => {
        let token = '';
        beforeAll(() => {
            token = genToken({
                id: 1,
                pseudo: 'dudul',
                email: 'fgdsgf@dsf.sdf',
                password: 'ddd',
                role: Role.MANAGER,
            });
        });

        it('Get all should return 200', async () => {
            await supertest(app)
                .get('/api/v1/families')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200);
        });

        it('Get by id should return 200', async () => {
            await supertest(app)
                .get('/api/v1/families/1')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200);
        });

        it('Get categories by family id should return 200', async () => {
            await supertest(app)
                .get('/api/v1/families/1/categories')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBeGreaterThan(0);
                });
        });

        it('Create should return 422', async () => {
            await supertest(app)
                .post('/api/v1/families')
                .set({ Authorization: 'Bearer ' + token })
                .expect(422);
        });

        it('Update should return 422', async () => {
            await supertest(app)
                .put('/api/v1/families/1')
                .set({ Authorization: 'Bearer ' + token })
                .expect(422);
        });

        it('Delete should return 403', async () => {
            await supertest(app)
                .delete('/api/v1/families/100000')
                .set({ Authorization: 'Bearer ' + token })
                .expect(403);
        });
    });

    describe('Admin role', () => {
        let token = '';
        beforeAll(() => {
            token = genToken({
                id: 1,
                pseudo: 'dudul',
                email: 'fgdsgf@dsf.sdf',
                password: 'ddd',
                role: Role.ADMIN,
            });
        });

        it('Get all should return 200', async () => {
            await supertest(app)
                .get('/api/v1/families')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200);
        });

        it('Get by id should return 200', async () => {
            await supertest(app)
                .get('/api/v1/families/1')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200);
        });

        it('Get categories by family id should return 200', async () => {
            await supertest(app)
                .get('/api/v1/families/1/categories')
                .set({ Authorization: 'Bearer ' + token })
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBeGreaterThan(0);
                });
        });

        it('Create should return 422', async () => {
            await supertest(app)
                .post('/api/v1/families')
                .set({ Authorization: 'Bearer ' + token })
                .expect(422);
        });

        it('Update should return 422', async () => {
            await supertest(app)
                .put('/api/v1/families/1')
                .set({ Authorization: 'Bearer ' + token })
                .expect(422);
        });

        it('Delete should return 404', async () => {
            await supertest(app)
                .delete('/api/v1/families/100000')
                .set({ Authorization: 'Bearer ' + token })
                .expect(404);
        });
    });
});
