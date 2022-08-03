import express from 'express';
const router = express.Router();

router.get('/', async (req, res, next) => {
    return res.status(200).json('its work!!');
    // try {
    //     const families = await prisma.family.findMany();
    //     return res.status(200).json(families);
    // } catch (error) {
    //     res.status(500);
    //     next(new Error());
    // }
});

export default router;
