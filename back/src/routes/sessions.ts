import { Role, sessionLineCost } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
import prismaErrorHandler from '../middlewares/prismaErrorHandler';

const router = express.Router();

router.get('/', jwtVerify(Role.ADMIN), getAll);
router.get('/:sessionId', getById);
router.put('/:id', update);
router.post('/', addOne);
router.delete('/:id', deleteOne);

function getAll(req: Request, res: Response, next: NextFunction) {
    // console.log(req.auth);
    try {
        prisma.session
            .findMany()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(prismaErrorHandler(err.meta?.cause));
                next(new Error(err.meta?.cause));
            });
    } catch (error) {
        res.status(500);
        next(new Error('Server Error'));
    }
}

function getById(req: Request, res: Response, next: NextFunction) {
    try {
        const sessionId = parseInt(req.params.sessionId, 10);

        prisma.session
            .findUnique({
                where: { id: sessionId },
                include: {
                    sessionLineCost: {
                        include: {
                            item: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                    sessionLineWin: {
                        include: {
                            item: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                },
            })
            .then((result) => {
                if (req.auth?.userId === result?.userId) {
                    res.status(200).json(result);
                } else {
                    res.status(403);
                    next(new Error());
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(prismaErrorHandler(err.meta?.cause));
                next(new Error(err.meta?.cause));
            });
    } catch (error) {
        res.status(500);
        next(new Error('Server Error'));
    }
}

function addOne(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;

        if (isEmpty(body)) {
            res.status(422);
            next(new Error());
        } else {
            prisma.session
                .create({
                    data: {
                        ...body.session,
                    },
                })
                .then((result) => {
                    if (result) {
                        prisma.sessionLineCost.createMany({
                            data: body.cost.map((c: sessionLineCost) => {
                                return { ...c, sessionId: result.id };
                            }),
                        });
                        res.status(201).json(result);
                    } else {
                        res.status(404);
                        next(new Error());
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(prismaErrorHandler(err.meta?.cause));
                    next(new Error(err.meta?.cause));
                });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        next(new Error('Server Error'));
    }
}

function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const body = req.body;

        if (isEmpty(body)) {
            res.status(422);
            next(new Error());
        } else {
            prisma.session
                .update({
                    where: {
                        id: parseInt(id, 10),
                    },
                    data: {
                        ...body,
                    },
                })
                .then((result) => {
                    if (result) {
                        res.status(200).json(result);
                    } else {
                        res.status(404);
                        next(new Error());
                    }
                })
                .catch((err) => {
                    res.status(prismaErrorHandler(err.meta?.cause));
                    next(new Error(err.meta?.cause));
                });
        }
    } catch (error: any) {
        res.status(500);
        next(new Error('Server Error'));
    }
}

function deleteOne(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        prisma.session
            .delete({
                where: {
                    id: parseInt(id, 10),
                },
            })
            .then((result) => {
                if (result) {
                    res.status(204).json();
                }
            })
            .catch((err) => {
                res.status(prismaErrorHandler(err.meta?.cause));
                next(new Error(err.meta?.cause));
            });
    } catch (error: any) {
        res.status(500);
        next(new Error('Server Error'));
    }
}

export default router;
