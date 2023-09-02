import { boxsModels } from '../models/boxModel.js';
import { boxsValidation } from '../validation/modelsValidation.js'

export const getAll = (req, res) => {
    try {
        console.log(req.session.id_utilisateur)
        boxsModels.findAll({
            where: {
                id_utilisateur: req.session.utilisateur.id_utilisateur
            }
        })
        .then((el) => {
            res.json(el.map((e) => e.dataValues))
        })
        .catch((error) => console.error(error))
    }catch(error) {
        console.error(error)
    }
};

export const getOne = (req, res) => {
    const id = req.params.id;
    if(!id){
        throw Error('Erreur: id non trouvé');
    }
    try {
        boxsModels.findAll({
            where: {
                id_box: id,
            }
        })
        .then((el) => {
            res.json(el.map((e) => e.dataValues))
        })
        .catch((error) => console.error(error))
    }catch(error) {
        console.error(error)
    }
};

export const createOne = (req, res) => {
    const { body } = req;
    body.id_utilisateur = req.session.utilisateur.id_utilisateur;
    const { error } = boxsValidation(body);
    if(error) return res.status(401).json({error: error.details[0].message});

    boxsModels.create({...body})
    .then(() => {
        res.status(201).json({message: "created Ressource", item: {...body}})
    })
    .catch(error => res.status(500).json(error))
};
