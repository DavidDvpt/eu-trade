import express from 'express';
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);

router.post('/', addOne);
router.put('/:id', update);
router.delete('/:id', deleteOne);

export default router;
