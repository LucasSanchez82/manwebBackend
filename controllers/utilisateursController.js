import { utilisateursModels } from '../models/utilisateursModel.js';
import { utilisateursValidation } from '../validation/modelsValidation.js'
import bcrypt from 'bcrypt';

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

export const createOne = async (req, res) => {
    const { body } = req;
    const { error: utilisateurValidationError } = await utilisateursValidation(body);
    if (await utilisateurValidationError) return res.status(401).json(utilisateurValidationError);
    // console.log('---body--- : ', passwordHash(body.mdp));
    // console.log('---passwordHash()--- : ', await passwordHash(body.mdp));
    const { error: hashPasswordError, hash } = await passwordHash(body.mdp);
    console.log('---obet error, hash--- : ', { error: hashPasswordError, hash: hash });

    if (await hashPasswordError) return res.status(401).json({ hashError: hashError })
    body.mdp = await hash;
    console.log(body);
    utilisateursModels.create({ ...body })
        .then(() => {
            res.status(201).json({ message: "succesfuly created", item: { ...body }, test: body })
        })
        .catch(error => res.status(500).json(error));
};

export const login = async (req, res) => {
    const { email, mdp } = req.body;
    console.log('---email, mdp--- : ', {email: email, mdp: mdp, reqBody: req.body});
    // const { error, message } = await utilisateurAuthentification(email, mdp)
    console.log('---auth---', await utilisateurAuthentification(email, mdp))
    if (await error) return res.status(401).json({ error: error });
    if (await message) return res.status(200).json({ message: message });

    throw Error('Erreur : Il n\'y a ni error ni message ');
}

export const isEmail = async (email) => {
    let isEmail = await utilisateursModels.findOne({ where: { email: email } }) !== null;

    return isEmail;
}

const passwordHash = (password) => {
    console.log('---hashage---');
    const saltRounds = 13;
    return bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            console.log('Salt: ', salt);
            return bcrypt.hash(password, salt);
        })
        .then(hash => {
            console.log('Hash: ', hash);
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