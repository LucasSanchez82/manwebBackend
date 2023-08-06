import { Router } from "express";
import { createOne } from "../controllers/utilisateursController.js";
const router = Router();

router.post('/', (req, res) => createOne(req, res))

export default router;