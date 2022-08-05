import express, { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/prismaClient';
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);

async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await prisma.user.findMany();

        return res.status(200).json(categories);
    } catch (error) {}
}

async function getById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const categories = await prisma.user.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        });

        return res.status(200).json(categories);
    } catch (error) {}
}

export default router;
