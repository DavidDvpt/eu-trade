import express from 'express';
import { jwtVerify } from '../middlewares/jwtVerify';
import categoriesRoutes from './categories';
import familiesRoutes from './families';
import LoginRoute from './login';
import usersRoutes from './users';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('db', process.env.DATABASE_URL);
    res.status(200).json('Hello Word index !!!');
});
router.use('/login', LoginRoute);

router.use(jwtVerify());

router.use('/families', familiesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/users', usersRoutes);

export default router;
