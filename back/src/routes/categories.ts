import express from 'express';
import prisma from '../../prisma/prismaClient';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: 'no data' });
    }
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        });

        if (category) {
            return res.status(200).json(category);
        } else {
            res.status(404);
            next();
        }
    } catch (error) {
        return res.status(500).json({ message: 'no data' });
    }
});

export default router;
