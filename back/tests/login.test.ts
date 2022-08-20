import supertest from 'supertest';
import app from '../src/app';
import { LoginRequest } from '../src/routes/login';

describe('LOGIN', () => {
    it('shoud return a 200 (user)', () => {
        const payload: LoginRequest = {
            email: 'david.admin@gmail.com',
            password: 'pwd',
        };
        supertest(app)
            .post('/api/v1/login')
            .send(payload)
            .expect(200)
            .then((response) => {
                expect(typeof response.body.access_token).toBe('string');
            });
    });

    it('shoud return a 400 (user does not exist)', async () => {
        const payload: LoginRequest = {
            email: 'david.admin@gmail.co',
            password: 'pwd',
        };
        await supertest(app).post('/api/v1/login').send(payload).expect(400, {
            message: 'Error. user don t exist',
        });
    });

    it('shoud return a 400 (bad paswword)', async () => {
        const payload: LoginRequest = {
            email: 'david.admin@gmail.com',
            password: 'pwddd',
        };
        await supertest(app).post('/api/v1/login').send(payload).expect(400, {
            message: 'Error. bad password',
        });
    });
});
