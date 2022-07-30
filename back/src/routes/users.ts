import express from 'express';
import prisma from '../../prisma/prismaClient';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await prisma.user.findMany();

        return res.status(200).json(categories);
    } catch (error) {}
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const categories = await prisma.user.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        });

        return res.status(200).json(categories);
    } catch (error) {}
});

export default router;
