import { Role } from '@prisma/client';
import express from 'express';
import { checkAuthMiddleware } from '../middlewares/checkAuthMiddleware';
import { jwtVerify } from '../middlewares/jwtVerify';
import categoriesRoutes from './categories';
import familiesRoutes from './families';
import globalUserDatas from './globalUserDatas';
import itemsRoutes from './items';
import LoginRoute from './login';
import sessionsRoutes from './sessions';
import setupRoutes from './setups';
import usersRoutes from './users';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json('Hello Word index !!!');
});

router.use('/login', LoginRoute);

router.use(checkAuthMiddleware);
router.use(jwtVerify(Role.USER));

router.use('/families', familiesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/items', itemsRoutes);
router.use('/sessions', sessionsRoutes);
router.use('setup', setupRoutes);
router.use('/global_user_datas', globalUserDatas);

router.use('/users', usersRoutes);

export default router;
