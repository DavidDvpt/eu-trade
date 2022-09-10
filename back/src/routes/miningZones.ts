import { Role } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
import prismaErrorHandler from '../middlewares/prismaErrorHandler';
const router = express.Router();

const getAll = (req: Request, res: Response, next: NextFunction) => {
    prisma.miningZone
        .findMany()
        .then(
            (response) => {
                res.status(200).json(response);
            },
            (err) => {
                res.status(prismaErrorHandler(err.meta?.cause));
                next(new Error(err.meta?.cause));
            }
        )
        .catch(() => {
            res.status(500);
            next(new Error('Server Error'));
        });
};

const getById = (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId, 10);
    if (userId === req.auth?.userId) {
        prisma.miningZone
            .findUnique({ where: { id: userId } })
            .then(
                (response) => {
                    res.status(200).json(response);
                },
                (err) => {
                    res.status(prismaErrorHandler(err.meta?.cause));
                    next(new Error(err.meta?.cause));
                }
            )
            .catch(() => {
                res.status(500);
                next(new Error('Server Error'));
            });
    } else {
        res.status(401);
        next(new Error());
    }
};

const addOne = (
    req: Request<any, any, any, { name: string; userId: number }>,
    res: Response,
    next: NextFunction
) => {
    const { name, userId } = req.query;
    if (name && userId) {
        prisma.miningZone
            .create({
                data: {
                    userId,
                    name,
                },
            })
            .then(
                (response) => {
                    res.status(201).json(response);
                },
                (err) => {
                    res.status(prismaErrorHandler(err.meta?.cause));
                    next(new Error(err.meta?.cause));
                }
            )
            .catch(() => {
                res.status(500);
                next(new Error('Server Error'));
            });
    }
};
const update = (
    req: Request<
        { userId: string },
        any,
        any,
        { name: string; userId: number }
    >,
    res: Response,
    next: NextFunction
) => {
    const { name, userId } = req.query;
    const id = parseInt(req.params.userId, 10);

    if (id === userId) {
        if (name && userId) {
            prisma.miningZone
                .update({
                    where: {
                        id,
                    },
                    data: {
                        userId,
                        name,
                    },
                })
                .then(
                    (response) => {
                        res.status(201).json(response);
                    },
                    (err) => {
                        res.status(prismaErrorHandler(err.meta?.cause));
                        next(new Error(err.meta?.cause));
                    }
                )
                .catch(() => {
                    res.status(500);
                    next(new Error('Server Error'));
                });
        }
    } else {
        res.status(403);
        next(new Error('Server Error'));
    }
};

const deleteOne = (
    req: Request<{ userId: string }, any, any, any>,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.userId, 10);

    prisma.miningZone
        .delete({
            where: {
                id,
            },
        })
        .then(
            (response) => {
                res.status(204).json(response);
            },
            (err) => {
                res.status(prismaErrorHandler(err.meta?.cause));
                next(new Error(err.meta?.cause));
            }
        )
        .catch(() => {
            res.status(500);
            next(new Error('Server Error'));
        });
};

router.get('/', jwtVerify(Role.ADMIN), getAll);
router.get('/:id', getById);

router.post('/', addOne);
router.put('/:userId', update);
router.delete('/:userId', jwtVerify(Role.ADMIN), deleteOne);

export default router;
