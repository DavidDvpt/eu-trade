import { Role } from '@prisma/client';
import supertest from 'supertest';
import app from '../src/app';
import { genToken } from '../src/lib/authTools';

describe('ITEM TESTS', () => {
    let createdId = 0;

    describe('CREATE ITEM', () => {
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
                .post('/api/v1/items')
                .set({ Authorization: 'Bearer ' + token })
                .expect(422)
                .then((response) => {});
        });

        it('Should return 201 (ok)', async () => {
            const payload = {
                name: 'entityTest',
                isActif: false,
                categoryId: 1,
            };

            await supertest(app)
                .post('/api/v1/items')
                .set({ Authorization: 'Bearer ' + token })
                .send(payload)
                .expect(201)
                .then((response) => {
                    const body = response.body;

                    createdId = body.id;
                    expect(body.name).toBe('entityTest');
                    expect(body.isActif).toBe(false);
                    expect(body.categoryId).toBe(1);
                })
                .catch((err) => console.log(err));
        });
    });

    describe('UPDATE ITEM', () => {
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
                .put(`/api/v1/items/${createdId}`)
                .set({ Authorization: 'Bearer ' + token })
                .expect(422)
                .then((response) => {});
        });

        it('Should return 200 (ok)', async () => {
            const payload = {
                name: 'entityUpdated',
                isActif: true,
                categoryId: 1,
            };

            await supertest(app)
                .put(`/api/v1/items/${createdId}`)
                .set({ Authorization: 'Bearer ' + token })
                .send(payload)
                .expect(200)
                .then((response) => {
                    const body = response.body;
                    createdId = body.id;
                    expect(body.name).toBe('entityUpdated');
                    expect(body.isActif).toBe(true);
                    expect(body.categoryId).toBe(1);
                })
                .catch((err) => console.log(err));
        });
    });

    describe('GET ITEMS', () => {
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

        describe('Get all items', () => {
            it('Should return 200', async () => {
                await supertest(app)
                    .get('/api/v1/items')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.length).toBeGreaterThan(0);
                    });
            });
        });

        describe('Get item by id', () => {
            it('Should return 200 (category tab)', async () => {
                await supertest(app)
                    .get(`/api/v1/items/${createdId}`)
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.name).toBe('entityUpdated');
                    });
            });

            it('Should return 404 (not found)', async () => {
                await supertest(app)
                    .get('/api/v1/items/1000000')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(404)
                    .then((response) => {
                        // expect(response.body.name).toBe('Resources');
                    });
            });
        });
    });
    describe('DELETE ITEM', () => {
        let token = '';
        beforeAll(() => {
            token = genToken({
                id: 1,
                pseudo: 'dudulAdmin',
                email: 'fgdsgf@dsf.sdf',
                password: 'ddd',
                role: Role.ADMIN,
            });
        });

        it('should return 204 (ok)', async () => {
            await supertest(app)
                .delete(`/api/v1/items/${createdId}`)
                .set({ Authorization: 'Bearer ' + token })

                .expect(204)
                .then((response) => {});
        });
    });
});
