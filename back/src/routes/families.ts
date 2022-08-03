import { family, Role } from '@prisma/client';
import express from 'express';
import { isEmpty } from 'lodash';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const families = await prisma.family.findMany();
        return res.status(200).json(families);
    } catch (error) {
        return res.status(500).json({ message: 'no data' });
    }
});

router.get('/:id', async (req, res, next) => {
    const id: string = req.params.id;
    try {
        const family: family | null = await prisma.family.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        });

        if (family) {
            return res.status(200).json(family);
        } else {
            res.status(404);
            next(new Error());
        }
    } catch (error) {
        res.status(500);
        next(error);
    }
});

router.get('/:id/categories', async (req, res, next) => {
    const id = req.params.id;

    try {
        const family = await prisma.family.findUnique({
            where: {
                id: parseInt(id, 10),
            },
            select: {
                categories: true,
            },
        });
        // console.log('categories', family);
        if (family) {
            return res.status(200).json(family.categories);
        } else {
            res.status(404);
            next(new Error());
        }
    } catch (error) {
        console.log(error);
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
            const family = await prisma.family.update({
                where: {
                    id: parseInt(id, 10),
                },
                data: body,
            });

            if (family) {
                return res.status(200).json(family);
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

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        if (isEmpty(body)) {
            res.status(422);
            next(new Error());
        } else {
            const family = await prisma.family.create({
                data: body,
            });

            if (family) {
                return res.status(201).json(family);
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
        const deleted = await prisma.family.delete({
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
