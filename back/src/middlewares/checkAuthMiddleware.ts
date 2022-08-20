import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || '';

export function checkAuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization?.split(' ')[1];

            if (token) {
                jwt.verify(token, SECRET, (err, decoded) => {
                    if (err) {
                        res.status(401);
                    } else {
                        const auth = decoded as jwt.JwtPayload;
                        req.auth = { userId: auth.userId, role: auth.role };
                    }
                });
                next();
            } else {
                res.status(401);
                next(new Error());
            }
        } else {
            res.status(401);
            next(new Error());
        }
    } catch (error) {
        return function (req: Request, res: Response, next: any) {
            res.status(403);
            next(new Error());
        };
    }
}
