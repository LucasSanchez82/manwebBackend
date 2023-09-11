import { Router } from "express";
import { createOne, emailTokenValidator, login, utilisateurSignIn } from "../controllers/utilisateursController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = Router();

router.post('/signin', (req, res) => createOne(req, res)) //createOne
router.get('/signin', (req, res) => utilisateurSignIn(req, res)) //createOne

router.get('/signinvalidation/(:id)', (req, res) => emailTokenValidator(req, res)) //createOne

router.post('/login', (req, res) => login(req, res))
router.get('/isLogin', (req, res) => (res.status(200).json({isLogin : req.session.isLogin})))
router.post('/test', requireAuth ,(req, res) => {
    res.status(200).json(req.body)
})
router.get('/test', requireAuth ,(req, res) => {
    res.status(200).json(req.body)
})

export default router;