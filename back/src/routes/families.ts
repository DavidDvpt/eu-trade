import { Role } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
import prismaErrorHandler from '../middlewares/prismaErrorHandler';
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/categories', getCategoriesByFamilyId);
router.post('/', jwtVerify(Role.MANAGER), addOne);
router.put('/:id', jwtVerify(Role.MANAGER), update);
router.delete('/:id', jwtVerify(Role.ADMIN), deleteOne);

function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        prisma.family
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

        prisma.family
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

function getCategoriesByFamilyId(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;

        prisma.family
            .findUnique({
                where: {
                    id: parseInt(id, 10),
                },
                select: {
                    categories: true,
                },
            })
            .then((result) => {
                if (result) {
                    res.status(200).json(result.categories);
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
        next(error);
    }
}

function addOne(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;

        if (isEmpty(body)) {
            res.status(422);
            next(new Error());
        } else {
            prisma.family
                .create({
                    data: body,
                })
                .then((result) => {
                    res.status(201).json(result);
                })
                .catch((err) => {
                    res.status(prismaErrorHandler(err.meta?.cause));
                    next(new Error(err.meta?.cause));
                });
        }
    } catch (error) {
        res.status(500);
        next(new Error());
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
            prisma.family
                .update({
                    where: {
                        id: parseInt(id, 10),
                    },
                    data: { name: body.name, isActif: body.isActif },
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
        next(new Error());
    }
}

function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;

        prisma.family
            .delete({
                where: {
                    id: parseInt(id, 10),
                },
            })
            .then((reult) => {
                return res.status(204).json();
            })
            .catch((err) => {
                res.status(prismaErrorHandler(err.meta?.cause));
                next(new Error(err.meta?.cause));
            });
    } catch (error: any) {
        res.status(500);
        next(error);
    }
}

export default router;
