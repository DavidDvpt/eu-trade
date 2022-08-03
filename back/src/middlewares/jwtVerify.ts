import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function jwtVerify(role?: string) {
    const SECRET = process.env.JWT_SECRET || '';
    console.log('ROLE', role);
    return function (req: Request, res: Response, next: any) {
        const token = req.headers.authorization?.split(' ')[1] || '';
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401);
                throw new Error(err.message);
            } else {
                const decodedRole: string | undefined = (decoded as jwt.JwtPayload)?.role;
                // console.log(
                //     'test',
                //     role,
                //     !role,
                //     role === 'ADMIN',
                //     role && decodedRole === role,
                //     !role || role === 'ADMIN' || (role && decodedRole === role)
                // );
                if (!role) {
                    console.log('no role ' + role);
                    next();
                } else if (role === 'ADMIN') {
                    console.log('role is ADMIN');
                    next();
                } else if (decodedRole === role) {
                    console.log('role is ' + role + 'end user role is ' + decodedRole);
                    next();
                } else {
                    res.status(403);
                    throw new Error('forbiden');
                }
            }
        });
    };
}
