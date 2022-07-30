import express from 'express';
import categoriesRoutes from './categories';
import familiesRoutes from './families';
import LoginRoute from './login';
import usersRoutes from './user';

const router = express.Router();

router.use('/login', LoginRoute);
router.use('/families', familiesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/users', usersRoutes);

router.get('/', (req, res) => {
    console.log('db', process.env.DATABASE_URL);
    res.status(200).json('Hello Word index !!!');
});

export default router;
