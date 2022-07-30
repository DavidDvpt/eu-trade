import express from 'express';
import authRoutes from './auth';
import categoriesRoutes from './categories';
import familiesRoutes from './families';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/families', familiesRoutes);
router.use('/categories', categoriesRoutes);

router.get('/', (req, res) => {
    console.log('db', process.env.DATABASE_URL);
    res.status(200).json('Hello Word index !!!');
});

export default router;
