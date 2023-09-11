import { utilisateursModels } from '../models/utilisateursModel.js';
import { utilisateursValidation } from '../validation/modelsValidation.js'
import bcrypt from 'bcrypt';
import { Mail, sendMail } from './nodemailer.js';
import jwt from 'jsonwebtoken'
import { tokenModel } from '../models/tokenModel.js';
export const getAll = (req, res) => {
    try {
        utilisateursModels.findAll()
            .then((el) => {
                res.json(el.map((e) => e.dataValues))
            })
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const getOne = (req, res) => { };
export const signIn = (req, res) => {
    //creer le jeton jwt


    //envoyer email avec code de verification
    const mailConfig = new Mail(
        'manweb <manweb_off@outlook.com>',
        'client <jiraya1008@gmail.com>', //l'envoyer au bon client
        'manweb verification de creation de compte',
        'voici le code : ', // afficher le code
        '<p> Le code est :  </p>', // afficher le code
    )
    sendMail(mailConfig);
    //attendre le code

    //verifier si le code est correcte

    // createOne(req, res)
}
export const createOne = async (req, res) => {
    const { body } = req;
    const { error: utilisateurValidationError } = await utilisateursValidation(body);
    if (await utilisateurValidationError) return res.status(401).json(utilisateurValidationError);
    const { error: hashPasswordError, hash } = await passwordHash(body.mdp);

    if (await hashPasswordError) return res.status(401).json({ hashError: hashError })
    body.mdp = await hash;
    utilisateursModels.create({ ...body })
        .then(() => {
            res.status(201).json({ message: "succesfuly created", item: { ...body }, test: body })
        })
        .catch(error => res.status(500).json(error));
};

export const login = async (req, res) => {
    const { email, mdp } = req.body;
    const { error, message, utilisateur } = await utilisateurAuthentification(email, mdp)
    if (await error) return res.status(401).json({ error: error });
    if (await message) {
        req.session.views = (req.session.views || 0) + 1
        req.session.isLogin = true;
        req.session.utilisateur = utilisateur.dataValues;
        return res.status(200).json({ message: message });
    }


    throw Error('Erreur : Il n\'y a ni error ni message ');
}

export const isEmail = async (email) => {
    let isEmail = await utilisateursModels.findOne({ where: { email: email } }) !== null;

    return isEmail;
}

const passwordHash = (password) => {
    const saltRounds = 13;
    return bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(password, salt);
        })
        .then(hash => {
            return { hash: hash };
        })
        .catch(err => {
            console.error(err.message);
            return { error: err };
        })

}

const utilisateurAuthentification = async (email, password) => {
    try {
        const utilisateur = await utilisateursModels.findOne({ where: { email: email } });

        if (!utilisateur) {
            return { error: "Utilisateur non trouvé" };
        }

        const isPasswordMatch = await bcrypt.compare(password, utilisateur.mdp);

        if (!isPasswordMatch) {
            return { error: "Mot de passe incorrect" };
        }

        return { message: "Authentification réussie", utilisateur: utilisateur };
    } catch (error) { console.error(error) }
};

export const utilisateurSignIn = async (req, res) => {

    try {
        let tokenStr = jwt.sign({
            email: 'email@gmail.com',
        }, 'secret', { expiresIn: '1h' });

        // const mailConfig = new Mail(
        //     'manweb <manweb_off@outlook.com>',
        //     'client <jiraya1008@gmail.com>', //https://www.google.com/search?q=nodejs+email+verification+code&sourceid=chrome&ie=UTF-8&bshm=rime/1
        //     'Votre code de verification mail : ' + tokenStr,
        //     'text',
        //     `<h1> voici votre code de verification : <span>${tokenStr}</span> </h1>`,
        // )
        // sendMail(mailConfig);
        try {
            const existingToken = await tokenModel.findOne({
                where: {
                    id_utilisateur: req.session.utilisateur.id_utilisateur
                }
            });

            if (existingToken) {
                console.log("--update--");
                await existingToken.update({
                    token: tokenStr,
                    created_at: new Date(),
                });
            } else {
                console.log("--create--");
                await tokenModel.create({
                    id_utilisateur: req.session.utilisateur.id_utilisateur,
                    token: tokenStr,
                    created_at: new Date() // Assuming you want to set the creation date to now
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }

        let html = /*html*/`
            <h1> Email envoyé </h1>
            <p> token : ${tokenStr} </p>
        `;
        return res.send(html);
    } catch (error) {
        console.log(error);
        return res.send('<h1> erreur, echoué </h1>');
    }
}

export const emailTokenValidator = async (req, res) => {
    if (!req.params.id) throw Error('pas d id');
    jwt.verify(req.params.id, 'secret', function (err, decoded) {
        console.log(decoded)
        console.log(err)
    });
    let html = /*html*/`
        <p>${req.params.id}</p>
    `;
    res.send(html)
}