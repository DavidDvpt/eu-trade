import { Role } from '@prisma/client';
import express from 'express';
import { isEmpty } from 'lodash';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany();

        return res.status(200).json(categories);
    } catch (error) {
        res.status(500);
        next(new Error());
    }
});

router.get('/:id', async (req, res, next) => {
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
});

router.get('/:id/items', async (req, res, next) => {
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
});

router.use(jwtVerify(Role.MANAGER));

router.post('/', async (req, res, next) => {
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
});

router.put('/:id', async (req, res, next) => {
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
});

router.use(jwtVerify(Role.ADMIN));

router.delete('/:id', async (req, res, next) => {
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
});

export default router;
