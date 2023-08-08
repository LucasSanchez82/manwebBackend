import { Router } from "express";
import { createOne, login } from "../controllers/utilisateursController.js";
const router = Router();

router.post('/', (req, res) => createOne(req, res))
router.post('/login', (req, res) => login(req, res))

export default router;