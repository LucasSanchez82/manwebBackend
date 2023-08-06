import  { Router } from 'express';
import { getAll, getOne, createOne } from '../controllers/boxsController.js';

const router = Router();

router.get('/', async (req, res) => {
    getAll(req, res);
})

router.get('/:id', async (req, res) => {
    getOne(req, res);
})

router.post('/', (req, res) => {createOne(req, res)})

export default router;