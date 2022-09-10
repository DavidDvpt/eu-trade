import { ConsumableType, Role } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
import prismaErrorHandler from '../middlewares/prismaErrorHandler';
const router = express.Router();
const getAll = (req: Request, res: Response, next: NextFunction) => {
    prisma.setup
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
        prisma.setup
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
    req: Request<
        any,
        any,
        any,
        {
            userId: number;
            finderId: number;
            ampId: number;
            miningZoneId?: number;
            depthEnhancer: number;
            rangeEnhancer: number;
            skillEnhancer: number;
            consomableType: ConsumableType;
            clicCost: number;
        }
    >,
    res: Response,
    next: NextFunction
) => {
    const {
        userId,
        finderId,
        ampId,
        miningZoneId,
        depthEnhancer,
        rangeEnhancer,
        skillEnhancer,
        consomableType,
        clicCost,
    } = req.query;
    if (
        userId &&
        finderId &&
        ampId &&
        depthEnhancer &&
        rangeEnhancer &&
        skillEnhancer &&
        consomableType &&
        clicCost
    ) {
        prisma.setup
            .create({
                data: {
                    userId,
                    finderId,
                    ampId,
                    depthEnhancer,
                    rangeEnhancer,
                    skillEnhancer,
                    consomableType,
                    clicCost,
                    miningZoneId: miningZoneId ?? null,
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
        any,
        any,
        any,
        {
            userId: number;
            finderId: number;
            ampId: number;
            miningZoneId?: number;
            depthEnhancer: number;
            rangeEnhancer: number;
            skillEnhancer: number;
            consomableType: ConsumableType;
            clicCost: number;
        }
    >,
    res: Response,
    next: NextFunction
) => {
    const {
        userId,
        finderId,
        ampId,
        miningZoneId,
        depthEnhancer,
        rangeEnhancer,
        skillEnhancer,
        consomableType,
        clicCost,
    } = req.query;
    const id = parseInt(req.params.userId, 10);

    prisma.setup
        .update({
            where: {
                id,
            },
            data: {
                userId,
                finderId,
                ampId,
                depthEnhancer,
                rangeEnhancer,
                skillEnhancer,
                consomableType,
                clicCost,
                miningZoneId: miningZoneId ?? null,
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
router.put('/:id', update);
router.delete('/:userId', jwtVerify(Role.ADMIN), deleteOne);

export default router;
