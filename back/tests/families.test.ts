import supertest from 'supertest';
import app from '../src/app';

describe('families', () => {
    describe('get all families', () => {
        it('should return 200', async () => {
            await supertest(app)
                .get('/api/v1/families')
                .expect(200)
                .then((response) => {
                    // console.log(response.body);
                });
        });
    });

    describe('get family by id', () => {
        it('should return 200', async () => {
            await supertest(app)
                .get('/api/v1/families/1')
                .expect(200)
                .then((response) => {
                    expect(response.body.name).toBe('Resources');
                });
        });

        it('should return 404', async () => {
            await supertest(app)
                .get('/api/v1/families/10000000000000')
                .expect(404)
                .then((response) => {
                    // expect(response.body.name).toBe('Resources');
                });
        });
    });

    describe('get categories by family id', () => {
        it('should return 200 (category tab)', async () => {
            await supertest(app)
                .get('/api/v1/families/1/categories')
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBe(6);
                });
        });

        it('should return 200 (no data)', async () => {
            await supertest(app)
                .get('/api/v1/families/10000000000000/categories')
                .expect(404)
                .then((response) => {
                    // console.log('response', response);
                    // expect(response.body.length).toBe(0);
                });
        });
    });
});
