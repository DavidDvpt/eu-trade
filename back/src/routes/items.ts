import { item, Role } from '@prisma/client';
import express from 'express';
import { isEmpty } from 'lodash';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const items = await prisma.item.findMany();
        return res.status(200).json(items);
    } catch (error) {
        res.status(500);
        next(new Error());
    }
});

router.get('/:id', async (req, res, next) => {
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
});

router.use(jwtVerify(Role.MANAGER));

router.put('/:id', async (req, res, next) => {
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
});

router.post('/', async (req, res, next) => {
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
});

router.use(jwtVerify(Role.ADMIN));

router.delete('/:id', async (req, res, next) => {
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
});
export default router;
