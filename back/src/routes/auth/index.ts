import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import { genToken } from '../../lib/authTools';
const router = express.Router();
dotenv.config();

interface LoginRequest {
    email: string;
    password: string;
}

export interface User extends LoginRequest {
    id: number;
}

const users = [
    {
        id: 1,
        email: 'david.mosca69@gmail.com',
        password: '$2b$10$p753hUkr/wfM.plQPbLweemJQaxeykFgNb4Wd9bkIfjnbKSRg6JGa',
    },
];

router.post('/login', (req, res) => {
    const body: LoginRequest = req.body;
    const user = users.find((f) => f.email === body.email);

    if (!body.email || !user) {
        return res.status(400).json({ message: 'Error. user don t exist' });
    }

    if (!body.password) {
        return res.status(400).json({ message: 'Error. bad password' });
    } else {
        if (bcrypt.compareSync(body.password, user.password)) {
            const token = genToken(user);
            return res.status(200).json({ access_token: token });
        } else {
            return res.status(400).json({ message: 'Error. bad password' });
        }
    }
});

router.get('/', (req, res) => {
    res.status(200).json('Hello Word auth!!!');
});

export default router;
