import { Router } from "express";
import { createOne, login } from "../controllers/utilisateursController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = Router();

router.post('/signin', (req, res) => createOne(req, res))
router.post('/login', (req, res) => login(req, res))
router.post('/test', requireAuth ,(req, res) => {
    res.status(200).json(req.body)
})

export default router;