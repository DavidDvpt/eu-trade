import { Role } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function jwtVerify(role: Role) {
    try {
        const SECRET = process.env.JWT_SECRET || '';

        return function (req: Request, res: Response, next: any) {
            const token = req.headers.authorization?.split(' ')[1];

            if (token) {
                jwt.verify(token, SECRET, (err, decoded) => {
                    if (err) {
                        console.log(err);
                        res.status(401);
                        throw new Error(err.message);
                    } else {
                        const decodedRole: string | undefined = (decoded as jwt.JwtPayload)?.role;

                        if (role && decodedRole) {
                            if (decodedRole === Role.ADMIN) {
                                next();
                            } else if (decodedRole === Role.MANAGER && role !== Role.ADMIN) {
                                next();
                            } else if (decodedRole === Role.USER && role === Role.USER) {
                                next();
                            } else {
                                res.status(403);
                                next(new Error());
                            }
                        } else {
                            res.status(403);
                            next(new Error());
                        }
                    }
                });
            } else {
                res.status(401);
                next(new Error());
            }
        };
    } catch (error) {
        console.log('catch verify');
        return function (req: Request, res: Response, next: any) {
            res.status(403);
            next(new Error());
        };
    }
}
