import { Role } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
import prismaErrorHandler from '../middlewares/prismaErrorHandler';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/items', getItemsByCategoryId);
router.put('/:id', jwtVerify(Role.MANAGER), update);
router.post('/', jwtVerify(Role.MANAGER), addOne);
router.delete('/:id', jwtVerify(Role.ADMIN), deleteOne);

function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        prisma.category
            .findMany()
            .then((result) => {
                return res.status(200).json(result);
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
        const id = req.params.id;

        prisma.category
            .findUnique({
                where: {
                    id: parseInt(id, 10),
                },
            })
            .then((result) => {
                if (result) {
                    return res.status(200).json(result);
                } else {
                    res.status(404);
                    next(new Error());
                }
            })
            .catch(() => {
                res.status(500);
                next(new Error('Database Error'));
            });
    } catch (error: any) {
        res.status(500);
        next(new Error('Server Error'));
    }
}

function getItemsByCategoryId(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;

        prisma.category
            .findUnique({
                where: {
                    id: parseInt(id, 10),
                },
                select: {
                    items: true,
                },
            })
            .then((result) => {
                if (result) {
                    return res.status(200).json(result);
                } else {
                    res.status(404);
                    next(new Error());
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

function addOne(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;

        if (isEmpty(body)) {
            res.status(422);
            next(new Error());
        } else {
            prisma.category
                .create({
                    data: body,
                })
                .then((result) => {
                    if (result) {
                        return res.status(201).json(result);
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

        if (isEmpty(body)) {
            res.status(422);
            next(new Error());
        } else {
            prisma.category
                .update({
                    where: {
                        id: parseInt(id, 10),
                    },
                    data: {
                        name: body.name,
                        isActif: body.isActif,
                        familyId: parseInt(body.familyId, 10),
                    },
                })
                .then((result) => {
                    if (result) {
                        return res.status(200).json(result);
                    } else {
                        res.status(404);
                        next(new Error());
                    }
                })
                .catch(() => {
                    res.status(500);
                    next(new Error('Database Error'));
                });
        }
    } catch (error) {
        res.status(500);
        next(new Error('Server Error'));
    }
}

function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        prisma.category
            .delete({
                where: {
                    id: parseInt(id, 10),
                },
            })
            .then((result) => {
                return res.status(204).json();
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
