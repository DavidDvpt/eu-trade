import express, { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';
import prisma from '../../prisma/prismaClient';
import prismaErrorHandler from '../middlewares/prismaErrorHandler';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.post('/', addOne);
router.delete('/:id', deleteOne);

function getAll(req: Request, res: Response, next: NextFunction) {
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
        const id: string = req.params.id;

        prisma.session
            .findUnique({
                where: {
                    id: parseInt(id, 10),
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
                        ...body,
                        userId: parseInt(body.userId, 10),
                    },
                })
                .then((result) => {
                    if (result) {
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
