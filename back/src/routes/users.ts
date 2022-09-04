import { Role } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
import prismaErrorHandler from '../middlewares/prismaErrorHandler';

const router = express.Router();

router.get('/:userId', getById);
router.put('/:userId', updateUser);
router.get('/:userId/sessions', getUserSessions);
router.get('/:userId/setups', getUserSetups);
router.get('/:userId/mining_zones', getUserMiningZones);
router.get('/:userId/global_datas', getUserGlobalData);

jwtVerify(Role.ADMIN);
router.get('/', getAll);

async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await prisma.user.findMany();

        return res.status(200).json(categories);
    } catch (error) {}
}

function getById(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = parseInt(req.params.userId, 10);

        if (userId === req.auth?.userId || req.auth?.role === Role.ADMIN) {
            prisma.user
                .findUnique({
                    where: {
                        id: userId,
                    },
                    include: {
                        globalUserData: true,
                    },
                })
                .then((response) => {
                    if (response) {
                        const parsed = {
                            email: response.email,
                            createdAt: response.createdAt,
                            pseudo: response.pseudo,
                            datas: {
                                id: response?.id,
                                initialPedCardValue:
                                    response.globalUserData
                                        ?.initialPedCardValue,
                            },
                        };
                        res.status(200).json(parsed);
                    } else {
                        res.status(200).json(null);
                    }
                });
        } else {
            res.status(403);
            next(new Error());
        }
    } catch (error) {}
}

function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.userId, 10);
        const body = req.body;

        console.log(id, body);

        prisma.user
            .update({
                where: {
                    id,
                },
                data: { email: body.email, pseudo: body.pseudo },
            })
            .then((response) => {
                const parsed = {
                    email: response.email,
                    createdAt: response.createdAt,
                    pseudo: response.pseudo,
                };
                res.status(200).json(parsed);
            })
            .catch(() => {
                res.status(500);
                next(new Error());
            });
    } catch (err) {
        res.status(500);
        next(new Error());
    }
}

function getUserSessions(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (userId === req.auth?.userId || req.auth?.role === Role.ADMIN) {
            prisma.session
                .findMany({ where: { userId } })
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(prismaErrorHandler(err.meta?.cause));
                    next(new Error(err.meta?.cause));
                });
        } else {
            res.status(403);
            next(new Error());
        }
    } catch (error) {
        res.status(500);
        next(new Error('Server Error'));
    }
}

function getUserGlobalData(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.userId, 10);
        if (id === req.auth?.userId || req.auth?.role === Role.ADMIN) {
            prisma.globalUserData
                .findUnique({ where: { id } })
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(prismaErrorHandler(err.meta?.cause));
                    next(new Error(err.meta?.cause));
                });
        } else {
            res.status(403);
            next(new Error());
        }
    } catch (error) {
        res.status(500);
        next(new Error('Server Error'));
    }
}

function getUserSetups(req: Request, res: Response, next: NextFunction) {
    res.status(200).json('get user setups');
}

function getUserMiningZones(req: Request, res: Response, next: NextFunction) {
    res.status(200).json('get user mining zones');
}

export default router;
