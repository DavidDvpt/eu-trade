import { Role } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
import prismaErrorHandler from '../middlewares/prismaErrorHandler';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', jwtVerify(Role.MANAGER), update);
router.post('/', jwtVerify(Role.MANAGER), addOne);
router.delete('/:id', jwtVerify(Role.ADMIN), deleteOne);

function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        prisma.item
            .findMany({
                orderBy: {
                    name: 'asc',
                },
            })
            .then((result) => {
                console.log(result);
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

        prisma.item
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
            prisma.item
                .create({
                    data: {
                        name: body.name,
                        categoryId: parseInt(body.categoryId, 10),
                        isStackable: body.isStackable,
                        isLimited: body.isLimited,
                        value: body.value,
                        ttMax: body.ttMax,
                        imageUrlId: body.imageUrlId,
                        isActif: body.isActif,
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
                    res.status(prismaErrorHandler(err.meta?.cause));
                    next(new Error(err.meta?.cause));
                });
        }
    } catch (error) {
        res.status(500);
        next(new Error('Server Error'));
    }
}

function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const body = req.body;
        console.log('ttttt', body);
        if (isEmpty(body)) {
            res.status(422);
            next(new Error());
        } else {
            prisma.item
                .update({
                    where: {
                        id: parseInt(id, 10),
                    },
                    data: {
                        name: body.name,
                        categoryId: parseInt(body.categoryId, 10),
                        isStackable: body.isStackable,
                        isLimited: body.isLimited,
                        value: body.value,
                        ttMax: body.ttMax,
                        imageUrlId: body.imgUrlId,
                        isActif: body.isActif,
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
        prisma.item
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
