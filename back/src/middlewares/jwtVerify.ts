import { Role } from '@prisma/client';
import { Request, Response } from 'express';

export function jwtVerify(role: Role) {
    try {
        return function (req: Request, res: Response, next: any) {
            const auth = req.auth;
            if (!auth) {
                res.status(401);
                next(new Error());
            } else {
                if (role && auth.role) {
                    if (auth.role === Role.ADMIN) {
                        next();
                    } else if (
                        auth.role === Role.MANAGER &&
                        role !== Role.ADMIN
                    ) {
                        next();
                    } else if (auth.role === Role.USER && role === Role.USER) {
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
        };
    } catch (error) {
        console.log('catch verify');
        return function (req: Request, res: Response, next: any) {
            res.status(403);
            next(new Error());
        };
    }
}
