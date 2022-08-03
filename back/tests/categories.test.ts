import { Role } from '@prisma/client';
import supertest from 'supertest';
import app from '../src/app';
import { genToken } from '../src/lib/authTools';

describe('CATEGORY TESTS', () => {
    let createdId = 0;

    describe('CREATE CATEGORY', () => {
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

        it('Should return 422 (no body)', async () => {
            await supertest(app)
                .post('/api/v1/categories')
                .set({ Authorization: 'Bearer ' + token })
                .expect(422)
                .then((response) => {});
        });

        it('Should return 201 (ok)', async () => {
            const payload = {
                name: 'entityTest',
                isActif: false,
                familyId: 1,
            };

            await supertest(app)
                .post('/api/v1/categories')
                .set({ Authorization: 'Bearer ' + token })
                .send(payload)
                .expect(201)
                .then((response) => {
                    const body = response.body;
                    createdId = body.id;
                    expect(body.name).toBe('entityTest');
                    expect(body.isActif).toBe(false);
                    expect(body.familyId).toBe(1);
                })
                .catch((err) => console.log(err));
        });
    });

    describe('UPDATE CATEGORY', () => {
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

        it('Should return 422 (no body)', async () => {
            await supertest(app)
                .put(`/api/v1/categories/${createdId}`)
                .set({ Authorization: 'Bearer ' + token })
                .expect(422)
                .then((response) => {});
        });

        it('Should return 200 (ok)', async () => {
            const payload = {
                name: 'entityUpdated',
                isActif: true,
                familyId: 2,
            };

            await supertest(app)
                .put(`/api/v1/categories/${createdId}`)
                .set({ Authorization: 'Bearer ' + token })
                .send(payload)
                .expect(200)
                .then((response) => {
                    const body = response.body;
                    createdId = body.id;
                    expect(body.name).toBe('entityUpdated');
                    expect(body.isActif).toBe(true);
                    expect(body.familyId).toBe(2);
                })
                .catch((err) => console.log(err));
        });
    });

    describe('GET CATEGORIES', () => {
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

        describe('get all categories', () => {
            it('should return 200', async () => {
                await supertest(app)
                    .get('/api/v1/categories')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.length).toBeGreaterThan(0);
                    });
            });
        });

        describe('get category by id', () => {
            it('should return 200 (category tab)', async () => {
                await supertest(app)
                    .get(`/api/v1/categories/${createdId}`)
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.name).toBe('entityUpdated');
                    });
            });

            it('should return 404 (not found)', async () => {
                await supertest(app)
                    .get('/api/v1/categories/10000')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(404)
                    .then((response) => {
                        // expect(response.body.name).toBe('Resources');
                    });
            });
        });
    });

    describe('DELETE CATEGORY', () => {
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
                .delete(`/api/v1/categories/${createdId}`)
                .set({ Authorization: 'Bearer ' + token })

                .expect(204)
                .then((response) => {});
        });
    });
});
