import { Router } from "express";
import { createOne, emailTokenValidator, login, signInVerify } from "../controllers/utilisateursController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = Router();

router.post('/signin', (req, res) => createOne(req, res)) //createOne
// router.get('/signin', (req, res) => utilisateurSignIn(req, res)) //createOne

router.get('/signinvalidation/(:id)', (req, res) => emailTokenValidator(req, res)) //createOne

router.post('/login', (req, res) => login(req, res))
router.get('/isLogin', (req, res) => (res.status(200).json({ isLogin: req.session.isLogin || false, utilisateur: req.session.utilisateur || false })))
router.post('/signin/verify', (req, res) => signInVerify(req, res))

export default router;