import { Role } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
import prismaErrorHandler from '../middlewares/prismaErrorHandler';

const router = express.Router();

router.get('/', jwtVerify(Role.ADMIN), getAll);
router.get('/:id', getById);
router.post('/', addOne);
router.put('/:userId', update);
router.delete('/:userId', jwtVerify(Role.ADMIN), deleteOne);

function getAll(req: Request, res: Response, next: NextFunction) {
    prisma.globalUserData
        .findMany()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch(() => {
            res.status(500);
            next(new Error());
        });
}

function getById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);
    if (req.auth?.userId === id || req.auth?.role === Role.ADMIN) {
        prisma.globalUserData
            .findUnique({
                where: {
                    id,
                },
            })
            .then((response) => {
                res.status(200).json(response);
            });
    } else {
        res.status(403);
        next(new Error());
    }
}

function update(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.userId);
    const auth = req.auth;

    if (id === auth?.userId || auth?.role !== Role.USER) {
        prisma.globalUserData
            .update({
                where: { id },
                data: {
                    initialPedCardValue: parseFloat(
                        req.body.initialPedCardValue
                    ),
                },
            })
            .then(
                (result) => {
                    res.status(200).json(result);
                },
                (err) => {
                    res.status(prismaErrorHandler(err.meta?.cause));
                    next(new Error());
                }
            )
            .catch((err) => {
                res.status(prismaErrorHandler(err.meta?.cause));
                next(new Error());
            });
    } else {
        res.status(403);
        next(new Error());
    }
}

function addOne(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const auth = req.auth;

    if (body.userId === auth?.userId || auth?.role !== Role.USER) {
        prisma.globalUserData
            .create({
                data: {
                    id: parseInt(body.userId, 10),
                    initialPedCardValue: parseFloat(body.initialPedCardValue),
                },
            })
            .then(
                (result) => {
                    res.status(201).json(result);
                },
                (err) => {
                    res.status(prismaErrorHandler(err.meta?.cause));
                    next(new Error());
                }
            )
            .catch((err) => {
                res.status(prismaErrorHandler(err.meta?.cause));
                next(new Error());
            });
    } else {
        res.status(403);
        next(new Error());
    }
}

function deleteOne(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.userId, 10);

    prisma.globalUserData
        .delete({ where: { id } })
        .then((result) => {
            res.status(204).json(result);
        })
        .catch(() => {
            res.status(404);
            next(new Error());
        });
}

export default router;
