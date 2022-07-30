import supertest from 'supertest';
import app from '../src/app';
import { LoginRequest } from '../src/routes/auth';

describe('auth', () => {
    describe('get login route', () => {
        // describe('login does  exist', () => {
        it('shoud return a 200 (user)', () => {
            const payload: LoginRequest = {
                email: 'david.mosca69@gmail.com',
                password: 'pwd',
            };
            supertest(app)
                .post('/api/v1/auth/login')
                .send(payload)
                .expect(200)
                .then((response) => {
                    // console.log(response.body.access_token);
                });
        });

        it('shoud return a 400 (user does not exist)', async () => {
            const payload: LoginRequest = {
                email: 'david.mosca69@gmail.co',
                password: 'pwd',
            };
            await supertest(app).post('/api/v1/auth/login').send(payload).expect(400, {
                message: 'Error. user don t exist',
            });
        });

        it('shoud return a 400 (bad paswword)', async () => {
            const payload: LoginRequest = {
                email: 'david.mosca69@gmail.com',
                password: 'pwddd',
            };
            await supertest(app).post('/api/v1/auth/login').send(payload).expect(400, {
                message: 'Error. bad password',
            });
        });
    });
});
