import { Role } from '@prisma/client';
import supertest from 'supertest';
import app from '../src/app';
import { genToken } from '../src/lib/authTools';

describe('FAMILY TESTS', () => {
    let createdId = 0;

    describe('TEST AUTH', () => {
        describe('No token', () => {
            it('get all', async () => {
                await supertest(app).get('/api/v1/families').expect(401);
            });
        });

        describe('No role', () => {
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
                        expect(response.body.length).toBe(6);
                    });
            });

            it('Create', async () => {
                await supertest(app)
                    .post('/api/v1/families/1/categories')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(403);
            });

            it('Update', async () => {
                await supertest(app)
                    .put('/api/v1/families/1/categories')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(403);
            });

            it('Delete', async () => {
                await supertest(app)
                    .delete('/api/v1/families/1/categories')
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
                        expect(response.body.length).toBe(6);
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
                        expect(response.body.length).toBe(6);
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

    describe('CREATE FAMILY', () => {
        describe('should return 201', () => {
            let token = '';
            beforeAll(() => {
                token = genToken({
                    id: 1,
                    pseudo: 'dudulAdmin',
                    email: 'fgdsgf@dsf.sdf',
                    password: 'ddd',
                    role: 'ADMIN',
                });
            });
            it('should return 201 (ok)', async () => {
                const payload = {
                    name: 'familyTest',
                    isActif: false,
                };

                await supertest(app)
                    .post('/api/v1/families')
                    .set({ Authorization: 'Bearer ' + token })
                    .send(payload)
                    .expect(201)
                    .then((response) => {
                        const body = response.body;
                        createdId = body.id;
                        expect(body.name).toBe('familyTest');
                        expect(body.isActif).toBe(false);
                    });
            });
        });
    });

    describe('UPDATE FAMILY', () => {
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

        it('should return 403 (not good role)', async () => {
            const payload = {
                name: 'entityUpdated',
                isActif: true,
            };

            await supertest(app)
                .put(`/api/v1/families/${createdId}`)
                .set({ Authorization: 'Bearer ' + token })
                .send(payload)
                .expect(200)
                .then((response) => {
                    const body = response.body;
                    expect(body.name).toBe('entityUpdated');
                    expect(body.isActif).toBe(true);
                });
        });
    });

    describe('GET FAMILY', () => {
        let token = '';
        beforeAll(() => {
            token = genToken({
                id: 1,
                pseudo: 'dudul',
                email: 'fgdsgf@dsf.sdf',
                password: 'ddd',
                role: 'USER',
            });
        });

        describe('get all families', () => {
            it('should return 200', async () => {
                await supertest(app)
                    .get('/api/v1/families')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.length).toBeGreaterThan(0);
                    });
            });
        });

        describe('get family by id', () => {
            it('should return 200', async () => {
                await supertest(app)
                    .get(`/api/v1/families/${createdId}`)
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.name).toBe('entityUpdated');
                    });
            });

            it('should return 404', async () => {
                await supertest(app)
                    .get('/api/v1/families/10000000000000')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(404)
                    .then((response) => {});
            });
        });

        describe('get categories by family id', () => {
            it('should return 200 (category tab)', async () => {
                await supertest(app)
                    .get('/api/v1/families/1/categories')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.length).toBeGreaterThan(0);
                    });
            });

            it('should return 404 (no data)', async () => {
                await supertest(app)
                    .get('/api/v1/families/10000000000000/categories')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(404)
                    .then((response) => {});
            });
        });
    });

    describe('DELETE FAMILY', () => {
        let token = '';
        beforeAll(() => {
            token = genToken({
                id: 1,
                pseudo: 'dudulAdmin',
                email: 'fgdsgf@dsf.sdf',
                password: 'ddd',
                role: 'ADMIN',
            });
        });

        it('should return 204 (ok)', async () => {
            await supertest(app)
                .delete(`/api/v1/families/${createdId}`)
                .set({ Authorization: 'Bearer ' + token })

                .expect(204)
                .then((response) => {});
        });
    });
});
