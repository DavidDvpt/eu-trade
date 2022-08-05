import { Role } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/items', getItemsByCategoryId);
router.put('/:id', jwtVerify(Role.MANAGER), update);
router.post('/', jwtVerify(Role.MANAGER), addOne);
router.delete('/:id', jwtVerify(Role.ADMIN), deleteOne);

async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await prisma.category.findMany();

        return res.status(200).json(categories);
    } catch (error) {
        res.status(500);
        next(new Error());
    }
}

async function getById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        });

        if (category) {
            return res.status(200).json(category);
        } else {
            res.status(404);
            next(new Error());
        }
    } catch (error: any) {
        switch (error.meta.cause) {
            case 'Record to delete does not exist.':
                res.status(404);
                break;
            default:
                res.status(500);
        }
    }
}

async function getItemsByCategoryId(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(id, 10),
            },
            select: {
                items: true,
            },
        });

        if (category) {
            return res.status(200).json(category);
        } else {
            res.status(404);
            next(new Error());
        }
    } catch (error: any) {
        switch (error.meta.cause) {
            case 'Record to delete does not exist.':
                res.status(404);
                break;
            default:
                res.status(500);
        }
    }
}

async function addOne(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;
        if (isEmpty(body)) {
            res.status(422);
            next(new Error());
        } else {
            const category = await prisma.category.create({
                data: body,
            });

            if (category) {
                return res.status(201).json(category);
            } else {
                res.status(404);
                next(new Error());
            }
        }
    } catch (error) {
        res.status(500);
        next(new Error());
    }
}

async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const body = req.body;

        if (isEmpty(body)) {
            res.status(422);
            next(new Error());
        } else {
            const category = await prisma.category.update({
                where: {
                    id: parseInt(id, 10),
                },
                data: body,
            });

            if (category) {
                return res.status(200).json(category);
            } else {
                res.status(404);
                next(new Error());
            }
        }
    } catch (error) {
        res.status(500);
        next(new Error());
    }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const deleted = await prisma.category.delete({
            where: {
                id: parseInt(id, 10),
            },
        });

        if (deleted) {
            return res.status(204).json();
        }
    } catch (error: any) {
        if (error.meta?.cause) {
            switch (error.meta.cause) {
                case 'Record to delete does not exist.':
                    res.status(404);
                    break;
                default:
                    res.status(500);
            }
        }
        next(error);
    }
}

export default router;
