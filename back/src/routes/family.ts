import express from 'express';
const router = express.Router();

router.get('/families', (req, res) => {
    return res.status(200).json({ access_token: token });
});
