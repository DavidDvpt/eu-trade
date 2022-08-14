import bcrypt from 'bcrypt';
import express from 'express';
import prisma from '../../prisma/prismaClient';
import { genToken } from '../lib/authTools';
const router = express.Router();

export interface LoginRequest {
    email: string;
    password: string;
}

export interface User extends LoginRequest {
    id: number;
    pseudo: string;
    role: string;
}

router.post('/', (req, res, next) => {
    try {
        const body: LoginRequest = req.body;
        const user = prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        user.then((response) => {
            console.log(response);
            if (!body.email || !response) {
                return res.status(400).json({ message: 'Error. user don t exist' });
            }

            if (!body.password) {
                return res.status(400).json({ message: 'Error. bad password' });
            } else {
                if (bcrypt.compareSync(body.password, response.password)) {
                    const token = genToken(response);
                    return res.status(200).json({ access_token: token });
                } else {
                    return res.status(400).json({ message: 'Error. bad password' });
                }
            }
        }).catch((error) => {
            console.log(error);
            res.status(500);
            next(new Error('database error'));
        });
    } catch (error) {
        res.status(500);
        next(new Error());
    }
});

export default router;
