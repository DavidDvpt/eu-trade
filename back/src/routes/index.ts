import express from 'express';
import { jwtVerify } from '../middlewares/jwtVerify';
import categoriesRoutes from './categories';
import familiesRoutes from './families';
import itemsRoutes from './items';
import LoginRoute from './login';
import usersRoutes from './users';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json('Hello Word index !!!');
});

router.use('/login', LoginRoute);

router.use(jwtVerify());

router.use('/families', familiesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/users', usersRoutes);
router.use('/items', itemsRoutes);

export default router;
