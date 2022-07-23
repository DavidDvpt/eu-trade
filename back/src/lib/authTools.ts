import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../routes/auth';
dotenv.config();
const SECRET = process.env.JWT_SECRET || '';
const saltRounds = 10;

export const encodeFnc = (value: string) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(value, salt);

    return hash;
};

export const genToken = (user: User) => {
    return jwt.sign(
        {
            user_id: user.id,
            user_email: user.email,
        },
        SECRET,
        { expiresIn: '3 hours' }
    );
};
