import express from 'express';
import prisma from '../../prisma/prismaClient';
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
    const id = req.params.id;

    try {
        const family = await prisma.family.findUnique({
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
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        next();
    }
});

export default router;
