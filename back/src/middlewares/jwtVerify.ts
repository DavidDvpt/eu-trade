import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || '';

export function jwtVerify(role: string) {
    return function (req: Request, res: Response, next: any) {
        const token = req.headers.authorization?.split(' ')[1] || '';

        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error(err.message);
            } else {
                const decodedRole: string | undefined = (decoded as jwt.JwtPayload)?.role;

                if (decodedRole === 'ADMIN' || Boolean(decodedRole === role)) {
                    next();
                } else {
                    res.status(403);
                    throw new Error('forbiden');
                }
            }
        });
    };
}
