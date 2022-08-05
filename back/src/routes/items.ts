import { item, Role } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', jwtVerify(Role.MANAGER), update);
router.post('/', jwtVerify(Role.MANAGER), addOne);
router.delete('/:id', jwtVerify(Role.ADMIN), deleteOne);

async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const items = await prisma.item.findMany();
        return res.status(200).json(items);
    } catch (error) {
        res.status(500);
        next(new Error());
    }
}

async function getById(req: Request, res: Response, next: NextFunction) {
    try {
        const id: string = req.params.id;
        const item: item | null = await prisma.item.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        });

        if (item) {
            return res.status(200).json(item);
        } else {
            res.status(404);
            next(new Error());
        }
    } catch (error) {
        res.status(500);
        next(error);
    }
}

async function addOne(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;
        if (isEmpty(body)) {
            res.status(422);
            next(new Error());
        } else {
            const item = await prisma.item.create({
                data: body,
            });

            if (item) {
                return res.status(201).json(item);
            } else {
                return res.status(404).json({ message: 'not found' });
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
            const item = await prisma.item.update({
                where: {
                    id: parseInt(id, 10),
                },
                data: body,
            });

            if (item) {
                return res.status(200).json(item);
            } else {
                res.status(404);
                next(new Error());
            }
        }
    } catch (error: any) {
        if (error.meta?.cause) {
            switch (error.meta.cause) {
                case 'Record to delete does not exist.':
                case 'Record to update not found.':
                    res.status(404);
                    break;
                default:
                    res.status(500);
            }
        }
        next(new Error());
    }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const deleted = await prisma.item.delete({
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
                case 'Record to update not found.':
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
