import { Role } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function jwtVerify(role?: string) {
    const SECRET = process.env.JWT_SECRET || '';

    return function (req: Request, res: Response, next: any) {
        const token = req.headers.authorization?.split(' ')[1] || '';
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                // console.log(err);
                res.status(401);
                throw new Error(err.message);
            } else {
                const decodedRole: string | undefined = (decoded as jwt.JwtPayload)?.role;
                if (!role) {
                    next();
                } else if (decodedRole === Role.ADMIN) {
                    next();
                } else if (decodedRole === role) {
                    next();
                } else {
                    res.status(403);
                    throw new Error('forbiden');
                }
            }
        });
    };
}
