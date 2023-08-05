import express from 'express';
import { getAll, getOne, createOne } from '../controllers/boxsController.js';
import db from '../db.js'

const router = express.Router();

router.get('/', async (req, res) => {
    getAll(req, res);
})

router.get('/:id', async (req, res) => {
    getOne(req, res);
})

router.post('/', (req, res) => {createOne(req, res)})

export default router;