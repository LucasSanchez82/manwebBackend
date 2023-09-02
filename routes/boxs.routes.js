import  { Router } from 'express';
import { getAll, getOne, createOne } from '../controllers/boxsController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
    getAll(req, res);
})

router.get('/:id', requireAuth, async (req, res) => {
    getOne(req, res);
})

router.post('/', requireAuth,(req, res) => {createOne(req, res)})

export default router;