import express, { json, urlencoded } from 'express';
import boxsRouteur from './routes/boxs.routes.js';
import cors from 'cors';
import utilisateursRouter from './routes/utilisateurs.routes.js';
import cookieSession from 'cookie-session';
import { requireAuth } from './middlewares/authMiddleware.js';
import { Mail, sendMail } from './controllers/nodemailer.js';
import jwt from 'jsonwebtoken'
// import { tokenModel } from './models/tokenModel.js';

const app = express();
// Configure CORS to allow requests from your frontend
app.use(urlencoded({ extended: false }));
app.use(json());

app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's actual origin
    credentials: true,
}));

app.use(cookieSession({
    name: "session",
    keys: ["un canard nageant", "un moineau volant", "un verre creusant"],
    maxAge: 7 * 24 * 60 * 60 * 1000 //une semaine
}))

app.use('/boxs', boxsRouteur);
app.use('/utilisateurs', utilisateursRouter);
app.post('/logout', requireAuth, (req, res) => {
    req.session = null;
    res.status(200).json({ message: 'deconnexion reussi' })
})
app.get('/test', async (req, res) => {
    
    try {
        // let tokenInstance = new tokenModel();
        let tokenStr = jwt.sign({
            email: 'email@gmail.com',
        }, 'secret', { expiresIn: '1h' });

        // const mailConfig = new Mail(
        //     'manweb <manweb_off@outlook.com>',
        //     'client <jiraya1008@gmail.com>',https://www.google.com/search?q=nodejs+email+verification+code&sourceid=chrome&ie=UTF-8&bshm=rime/1
        //     'Votre code de verification mail : ' + tokenStr,
        //     'text',
        //     `<h1> voici votre code de verification : <span>${tokenStr}</span> </h1>`,
        // )
        // sendMail(mailConfig);
        jwt.verify(tokenStr, 'secret', function (err, decoded) {
            console.log(decoded)
        });
        let html = /*html*/`
            <h1> Email envoyé </h1>
            <p> token : ${tokenStr} </p>
        `;
        return res.send(html);
    } catch (error) {
        console.log(error);
        return res.send('<h1> erreur, echoué </h1>');
    }
})
app.listen(3000, () => {
    console.log('app listen on 3000');
})