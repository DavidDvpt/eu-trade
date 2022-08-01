import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../routes/login';
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
            userId: user.id,
            userPseudo: user.pseudo,
            role: user.role,
        },
        SECRET,
        { expiresIn: '3 hours' }
    );
};
