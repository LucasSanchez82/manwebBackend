import express, { json, urlencoded } from 'express';
import boxsRouteur from './routes/boxs.routes.js'
import cors from 'cors'
import utilisateursRouter from './routes/utilisateurs.routes.js'
import cookieSession from 'cookie-session'
import { requireAuth } from './middlewares/authMiddleware.js';

const app = express();
// Configure CORS to allow requests from your frontend
app.use(urlencoded({ extended: false }));
app.use(json());

app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's actual origin
    credentials: true,
}));

app.use(cookieSession({
    name : "session",
    keys : ["un canard nageant", "un moineau volant", "un verre creusant"],
    maxAge : 7 * 24 * 60 * 60 * 1000 //une semaine
}))

app.use('/boxs', boxsRouteur);
app.use('/utilisateurs', utilisateursRouter);
app.post('/logout', requireAuth,(req, res) => {
    req.session = null;
    res.status(200).json({message: 'deconnexion reussi'})
})
app.listen(3000, () => {
    console.log('app listen on 3000');
})