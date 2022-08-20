import { Role, SessionType } from '@prisma/client';
import supertest from 'supertest';
import { usersSeed } from '../prisma/datasForSeed';
import app from '../src/app';
import { genToken } from '../src/lib/authTools';

describe('SESSION TESTS', () => {
    let createdId = 0;

    describe('CREATE SESSION', () => {
        let token = '';
        beforeAll(() => {
            token = genToken(usersSeed[2]);
        });

        it('Should return 422 (no body)', async () => {
            await supertest(app)
                .post('/api/v1/sessions')
                .set({ Authorization: 'Bearer ' + token })
                .expect(422)
                .then((response) => {});
        });

        it('Should return 201 (ok)', async () => {
            const payload = {
                userId: 1,
                number: 1,
                type: SessionType.MINING,
                clics: 1000,
                isOpen: true,
                ttCost: 0,
                ttWin: 0,
            };

            await supertest(app)
                .post('/api/v1/sessions')
                .set({ Authorization: 'Bearer ' + token })
                .send(payload)
                .expect(201)
                .then((response) => {
                    const body = response.body;

                    createdId = body.id;
                    expect(body.number).toBe(1);
                })
                .catch((err) => console.log(err));
        });
    });

    describe('UPDATE SESSION', () => {
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
                .put(`/api/v1/sessions/${createdId}`)
                .set({ Authorization: 'Bearer ' + token })
                .expect(422)
                .then((response) => {});
        });

        it('Should return 200 (ok)', async () => {
            const payload = {
                userId: 1,
                number: 10,
                type: SessionType.TRADE,
                clics: 2000,
                isOpen: false,
                ttCost: 124.1,
                ttWin: 3254.21,
            };

            await supertest(app)
                .put(`/api/v1/sessions/${createdId}`)
                .set({ Authorization: 'Bearer ' + token })
                .send(payload)
                .expect(200)
                .then((response) => {
                    const body = response.body;
                    createdId = body.id;
                    expect(body.number).toBe(10);
                    expect(body.type).toBe(SessionType.TRADE);
                    expect(body.isOpen).toBe(false);
                    expect(body.ttCost).toBe(124.1);
                    expect(body.ttWin).toBe(3254.21);
                })
                .catch((err) => console.log(err));
        });
    });

    describe('GET SESSIONS', () => {
        describe('GET ALL SESSIONS', () => {
            it('Should return 403 (only admin)', async () => {
                await supertest(app)
                    .get('/api/v1/sessions')
                    .set({
                        Authorization:
                            'Bearer ' +
                            genToken({
                                ...usersSeed[2],
                            }),
                    })
                    .expect(403);
            });

            it('Should return 200 (ok)', async () => {
                await supertest(app)
                    .get('/api/v1/sessions')
                    .set({
                        Authorization:
                            'Bearer ' +
                            genToken({
                                ...usersSeed[0],
                            }),
                    })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.length).toBeGreaterThan(0);
                    });
            });
        });

        describe('GET USER SESSION BY ID', () => {
            let token = '';
            beforeAll(() => {
                token = genToken({
                    ...usersSeed[2],
                });
            });
            it('should return 200 (good user)', async () => {
                await supertest(app)
                    .get('/api/v1/sessions/3')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.clics).toBe(300);
                        expect(response.body.number).toBe(2);
                        expect(response.body.ttCost).toBe(421.32);
                        expect(response.body.ttWin).toBe(6574.21);
                    });
            });

            it('should return 403 (bad user)', async () => {
                await supertest(app)
                    .get('/api/v1/users/2/sessions')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(403);
            });

            it('should return 404 (not exist)', async () => {
                await supertest(app)
                    .get('/api/v1/users/2/sessions/10000')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(404);
            });
        });
    });

    describe('DELETE SESSION', () => {
        let token = '';
        beforeAll(() => {
            token = genToken(usersSeed[2]);
        });

        it('should return 204 (ok)', async () => {
            await supertest(app)
                .delete(`/api/v1/sessions/${createdId}`)
                .set({ Authorization: 'Bearer ' + token })

                .expect(204)
                .then((response) => {});
        });
    });
});
