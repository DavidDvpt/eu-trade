import { family, Role } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';
import prisma from '../../prisma/prismaClient';
import { jwtVerify } from '../middlewares/jwtVerify';
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/categories', getCategoriesByFamilyId);
router.post('/', jwtVerify(Role.MANAGER), addOne);
router.put('/:id', jwtVerify(Role.MANAGER), update);
router.delete('/:id', jwtVerify(Role.ADMIN), deleteOne);

async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const families = await prisma.family.findMany();
        return res.status(200).json(families);
    } catch (error) {
        res.status(500);
        next(new Error());
    }
}

async function getById(req: Request, res: Response, next: NextFunction) {
    try {
        const id: string = req.params.id;
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
}

async function getCategoriesByFamilyId(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
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
}

async function addOne(req: Request, res: Response, next: NextFunction) {
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
}

async function update(req: Request, res: Response, next: NextFunction) {
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
