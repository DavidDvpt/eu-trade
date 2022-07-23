import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("Hello Word !!!");
});

export default router;
