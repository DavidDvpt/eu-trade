import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
dotenv.config();
interface LoginRequest {
    email: string;
    password: string;
}

const users = [{ id: 1, email: 'david.mosca69@gmail.com', password: 'pwd' }];
const SECRET = process.env.JWT_SECRET || '';

router.post('/login', (req, res) => {
    const body: LoginRequest = req.body;
    const user = users.find((f) => f.email === body.email);

    if (!body.email || !user) {
        return res.status(400).json({ message: 'Error. user don t exist' });
    }

    if (!body.password || user?.password !== body.password) {
        return res.status(400).json({ message: 'Error. bad password' });
    }

    const token = jwt.sign(
        {
            user_id: user.id,
            user_email: user.email,
        },
        SECRET,
        { expiresIn: '3 hours' }
    );

    return res.status(200).json({ access_token: token });
});

router.get('/', (req, res) => {
    res.status(200).json('Hello Word auth!!!');
});

export default router;
