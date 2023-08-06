import { utilisateursModels } from '../models/utilisateursModel.js';
import { utilisateursValidation } from '../validation/modelsValidation.js'

export const getAll = (req, res) => {
    try {
        utilisateursModels.findAll()
        .then((el) => {
            res.json(el.map((e) => e.dataValues))
        })
        .catch((error) => console.error(error));
    }catch(error) {
        console.error(error);
    }
};

export const getOne = (req, res) => {};

export const createOne = async (req, res) => {
    const { body } = req;
    const { error } = await utilisateursValidation(body);

    if(await error) return res.status(401).json(error);

    utilisateursModels.create({...body})
    .then(() => {
        res.status(201).json({message: "succesfuly created", item: {...body}, test: body})
    })
    .catch(error => res.status(500).json(error));
};

export const isEmail = async (email) => {
    // console.log('email: ', email);
    let isEmail = await utilisateursModels.findOne({ where: { email: email } }) !== null;
    console.log({email: email, isEmail : isEmail});

    return isEmail;
}
