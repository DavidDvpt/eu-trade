import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();

const getAll = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json('get all setups (admin)');
};
const getById = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json('get all setups (admin)');
};
const addOne = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json('create one setup');
};
const update = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json('update one miningZone (manager)');
};
const deleteOne = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json('delete one setups');
};

router.get('/', getAll);
router.get('/:id', getById);

router.post('/', addOne);
router.put('/:id', update);
router.delete('/:id', deleteOne);

export default router;
