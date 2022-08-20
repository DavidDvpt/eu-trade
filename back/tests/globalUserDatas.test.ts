import supertest from 'supertest';
import { usersSeed } from '../prisma/datasForSeed';
import app from '../src/app';
import { genToken } from '../src/lib/authTools';

describe('GLOBAL USER DATA TESTS', () => {
    describe('CREATE GLOBAL DATAS', () => {
        it('should return 403 (bad user)', async () => {
            await supertest(app)
                .post('/api/v1/global_user_datas')
                .set({ Authorization: 'Bearer ' + genToken(usersSeed[2]) })
                .send({
                    userId: 547,
                    initialPedCardValue: 3541.21,
                })
                .expect(403);
        });

        it('should return 500 (bad do not exist)', async () => {
            await supertest(app)
                .post('/api/v1/global_user_datas')
                .set({ Authorization: 'Bearer ' + genToken(usersSeed[0]) })
                .send({
                    userId: 547,
                    initialPedCardValue: 3541.21,
                })
                .expect(500);
        });

        it('should return 201 (ok)', async () => {
            await supertest(app)
                .post('/api/v1/global_user_datas')
                .set({ Authorization: 'Bearer ' + genToken(usersSeed[3]) })
                .send({
                    userId: 4,
                    initialPedCardValue: 2000.01,
                })
                .expect(201)
                .then((result) => {
                    expect(result.body.initialPedCardValue).toBe(2000.01);
                });
        });
    });

    describe('UPDATE GLOBAL DATAS', () => {
        it('should return 403 (bad user)', async () => {
            await supertest(app)
                .put('/api/v1/global_user_datas/547')
                .set({ Authorization: 'Bearer ' + genToken(usersSeed[2]) })
                .send({
                    userId: 547,
                    initialPedCardValue: 3541.21,
                })
                .expect(403);
        });

        it('should return 500 (bad do not exist)', async () => {
            await supertest(app)
                .put('/api/v1/global_user_datas/547')
                .set({ Authorization: 'Bearer ' + genToken(usersSeed[0]) })
                .send({
                    userId: 547,
                    initialPedCardValue: 3541.21,
                })
                .expect(404);
        });

        it('should return 200 (ok)', async () => {
            await supertest(app)
                .put('/api/v1/global_user_datas/4')
                .set({ Authorization: 'Bearer ' + genToken(usersSeed[3]) })
                .send({
                    userId: 4,
                    initialPedCardValue: 4000.51,
                })
                .expect(200)
                .then((result) => {
                    expect(result.body.initialPedCardValue).toBe(4000.51);
                });
        });
    });
    describe('GET GLOBAL DATAS', () => {});

    describe('DELETE GLOBAL DATAS', () => {
        it('should return 403 (not admin)', async () => {
            await supertest(app)
                .delete('/api/v1/global_user_datas/4')
                .set({ Authorization: 'Bearer ' + genToken(usersSeed[3]) })
                .expect(403);
        });
        it('should return 204 (ok)', async () => {
            await supertest(app)
                .delete('/api/v1/global_user_datas/4')
                .set({ Authorization: 'Bearer ' + genToken(usersSeed[0]) })
                .expect(204);
        });
    });
});
