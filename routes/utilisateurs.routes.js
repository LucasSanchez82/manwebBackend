import { Router } from "express";
import { createOne, emailTokenValidator, login, signInVerify } from "../controllers/utilisateursController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { utilisateursModels } from "../models/utilisateursModel.js";
import { tokenModel } from "../models/tokenModel.js";
import { verifieValidation } from "../validation/modelsValidation.js";
const router = Router();

router.post('/signin', (req, res) => createOne(req, res)) //createOne
// router.get('/signin', (req, res) => utilisateurSignIn(req, res)) //createOne

router.get('/signinvalidation/(:id)', (req, res) => emailTokenValidator(req, res)) //createOne

router.post('/login', (req, res) => login(req, res))
router.get('/isLogin', (req, res) => (res.status(200).json({ isLogin: req.session.isLogin })))
router.post('/test', requireAuth, (req, res) => {
    res.status(200).json(req.body)
})
router.get('/test', requireAuth, (req, res) => {
    res.status(200).json(req.body)
})

router.post('/signin/verify', (req, res) => signInVerify(req, res))

export default router;