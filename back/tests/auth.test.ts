import assert from 'assert';
import supertest from 'supertest';
import app from '../src/app';
import { LoginRequest } from '../src/routes/auth';

describe('auth', () => {
    describe('get login route', () => {
        // describe('login does  exist', () => {
        it('shoud return a 200 and user', () => {
            const payload: LoginRequest = {
                email: 'david.mosca69@gmail.com',
                password: 'pwd',
            };
            supertest(app)
                .post('/api/v1/auth/login')
                .send(payload)
                .expect(200)
                .then((response) => {
                    console.log(response.body.token);
                    assert(typeof response.body.token, 'string');
                });
            // });
        });

        it('user does not exist shoud return a 400', async () => {
            const payload: LoginRequest = {
                email: 'david.mosca69@gmail.co',
                password: 'pwd',
            };
            await supertest(app).post('/api/v1/auth/login').send(payload).expect(400, {
                message: 'Error. user don t exist',
            });
        });

        it('bad paswword shoud return a 400', async () => {
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
