import { family } from '@prisma/client';
import express from 'express';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
const router = express.Router();

router.get('/', jwtVerify('USER'), async (req, res) => {
    try {
        const families = await prisma.family.findMany();
        return res.status(200).json(families);
    } catch (error) {
        return res.status(500).json({ message: 'no data' });
    }
});

router.get('/:id', jwtVerify('USER'), async (req, res, next) => {
    const id = req.params.id;

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
            next();
        }
    } catch (error) {
        res.status(500);
        next();
    }
});

router.get('/:id/categories', jwtVerify('USER'), async (req, res, next) => {
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
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        next();
    }
});

router.put('/:id', jwtVerify('ADMIN'), async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const family = await prisma.family.update({
            where: {
                id: parseInt(id, 10),
            },
            data: body,
        });

        if (family) {
            return res.status(200).json(family);
        } else {
            return res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'entity not updated' });
    }
});

router.post('/', jwtVerify('ADMIN'), async (req, res, next) => {
    try {
        const body = req.body;

        const family = await prisma.family.create({
            data: body,
        });

        if (family) {
            return res.status(201).json(family);
        } else {
            return res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'entity not updated' });
    }
});

router.delete('/:id', jwtVerify('ADMIN'), async (req, res, next) => {
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
    } catch (error) {
        return res.status(500).json({ message: 'entity not deleted' });
    }
});

export default router;
