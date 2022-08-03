import supertest from 'supertest';
import app from '../src/app';
import { genToken } from '../src/lib/authTools';

describe('FAMILY TESTS', () => {
    const createdId = 0;

    // describe('CREATE FAMILY', () => {
    //     // describe('create without token', () => {
    //     //     it('should return 401 (no token)', async () => {
    //     //         const payload = {
    //     //             name: 'trop fort',
    //     //             isActif: false,
    //     //         };

    //     //         await supertest(app)
    //     //             .put('/api/v1/families/1')
    //     //             .send(payload)
    //     //             .expect(401)
    //     //             .then((response) => {});
    //     //     });
    //     // });

    //     // describe('Create with token but not good role', () => {
    //     //     let token = '';
    //     //     beforeAll(() => {
    //     //         const generatedToken = genToken({
    //     //             id: 1,
    //     //             pseudo: 'dudul',
    //     //             email: 'fgdsgf@dsf.sdf',
    //     //             password: 'ddd',
    //     //             role: 'USER',
    //     //         });

    //     //         token = generatedToken;
    //     //     });

    //     //     it('Should return 403 (not good role)', async () => {
    //     //         const payload = {
    //     //             name: 'trop fort',
    //     //             isActif: false,
    //     //         };

    //     //         await supertest(app)
    //     //             .post('/api/v1/families')
    //     //             .set({ Authorization: 'Bearer ' + token })
    //     //             .send(payload)
    //     //             .expect(403)
    //     //             .then((response) => {});
    //     //     });
    //     // });

    //     describe('create with token and good role', () => {
    //         let token = '';
    //         beforeAll(() => {
    //             token = genToken({
    //                 id: 1,
    //                 pseudo: 'dudulAdmin',
    //                 email: 'fgdsgf@dsf.sdf',
    //                 password: 'ddd',
    //                 role: 'ADMIN',
    //             });
    //         });
    //         it('should return 201 (ok)', async () => {
    //             const payload = {
    //                 name: 'familyTest',
    //                 isActif: false,
    //             };
    //             console.log('201', token);
    //             await supertest(app)
    //                 .post('/api/v1/families')
    //                 .set({ Authorization: 'Bearer ' + token })
    //                 .send(payload)
    //                 .expect(201)
    //                 .then((response) => {
    //                     const body = response.body;
    //                     createdId = body.id;
    //                     expect(body.name).toBe('familyTest');
    //                     expect(body.isActif).toBe(false);
    //                 });
    //         });
    //     });
    // });

    // describe('UPDATE FAMILY', () => {
    //     describe('uptdate without token', () => {
    //         it('should return 401 (no token)', async () => {
    //             const payload = {
    //                 name: 'trop fort',
    //                 isActif: false,
    //             };

    //             await supertest(app)
    //                 .put('/api/v1/families/1')
    //                 .send(payload)
    //                 .expect(401)
    //                 .then((response) => {});
    //         });
    //     });

    //     describe('update with token but not good role', () => {
    //         let token = '';
    //         beforeAll(() => {
    //             token = genToken({
    //                 id: 1,
    //                 pseudo: 'dudul',
    //                 email: 'fgdsgf@dsf.sdf',
    //                 password: 'ddd',
    //                 role: 'USER',
    //             });
    //         });

    //         it('should return 403 (not good role)', async () => {
    //             const payload = {
    //                 name: 'entityUpdated',
    //                 isActif: true,
    //             };

    //             await supertest(app)
    //                 .put('/api/v1/families/1')
    //                 .set({ Authorization: 'Bearer ' + token })
    //                 .send(payload)
    //                 .expect(403)
    //                 .then((response) => {});
    //         });
    //     });
    // });

    // describe('DELETE FAMILY', () => {
    //     let token = '';
    //     beforeAll(() => {
    //         token = genToken({
    //             id: 1,
    //             pseudo: 'dudulAdmin',
    //             email: 'fgdsgf@dsf.sdf',
    //             password: 'ddd',
    //             role: 'ADMIN',
    //         });
    //     });

    //     it('should return 204 (ok)', async () => {
    //         await supertest(app)
    //             .delete(`/api/v1/families/${createdId}`)
    //             .set({ Authorization: 'Bearer ' + token })

    //             .expect(204)
    //             .then((response) => {});
    //     });
    // });

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
                        // console.log(response.body);
                    });
            });
        });

        describe('get family by id', () => {
            it('should return 200', async () => {
                await supertest(app)
                    .get('/api/v1/families/1')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(200)
                    .then((response) => {
                        // expect(response.body.name).toBe('Resources');
                    });
            });

            it('should return 404', async () => {
                await supertest(app)
                    .get('/api/v1/families/10000000000000')
                    .set({ Authorization: 'Bearer ' + token })
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
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.length).toBe(6);
                    });
            });

            it('should return 200 (no data)', async () => {
                await supertest(app)
                    .get('/api/v1/families/10000000000000/categories')
                    .set({ Authorization: 'Bearer ' + token })
                    .expect(404)
                    .then((response) => {});
            });
        });
    });
});
