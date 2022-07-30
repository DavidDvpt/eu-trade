import supertest from 'supertest';
import app from '../src/app';

describe('categories', () => {
    describe('get all categories', () => {
        it('should return 200', async () => {
            await supertest(app)
                .get('/api/v1/categories')
                .expect(200)
                .then((response) => {
                    // console.log(response.body);
                });
        });
    });

    describe('get category by id', () => {
        it('should return 200 (category tab)', async () => {
            await supertest(app)
                .get('/api/v1/categories/1')
                .expect(200)
                .then((response) => {
                    expect(response.body.name).toBe('Ore');
                });
        });

        it('should return 404 (not found)', async () => {
            await supertest(app)
                .get('/api/v1/categories/10000000000000')
                .expect(404)
                .then((response) => {
                    // expect(response.body.name).toBe('Resources');
                });
        });
    });
});
