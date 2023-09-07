import { boxsModels } from '../models/boxModel.js';
import { boxsValidation } from '../validation/modelsValidation.js'

export const getAll = (req, res) => {
    try {
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

export const updateOne = async (req, res) => {
    const {id_box, new_numero_chapitre} = req.body;
    const id_utilisateur = req.session.utilisateur.id_utilisateur;
    const json = {id_box: parseInt(id_box) || -1, id_utilisateur: id_utilisateur};

    try{
        if(!id_box) {
            return res.status(401).json({error: "id_box necessaire"});
        } else if(!new_numero_chapitre){
            return res.status(401).json({error: "new_numero_chapitre necessaire"});
        }else if (parseInt(id_box) === NaN){
            return res.status(401).json({error: "id_box doit etre un nombre"});
        }else if( parseInt(new_numero_chapitre) === NaN){
            return res.status(401).json({error: "new_numero_chapitre doit etre un nombre"});
        }
        const response = await boxsModels.update({numero_chapitre: parseInt(new_numero_chapitre)}, {
            where: {
                id_box: json.id_box,
                id_utilisateur: json.id_utilisateur,
            }
        })
        res.status(200).json(response)
    }catch (error){
        res.status(401).json({message : 'erreur de communication avec le serveur', error: error})
    }
}

export const deleteOne = async (req, res) => {
    const {id_box} = req.body;
    const id_utilisateur = req.session.utilisateur.id_utilisateur;
    const json = {id_box: parseInt(id_box) || -1, id_utilisateur: id_utilisateur};

    try{
        if(!id_box) {
            return res.status(401).json({error: "id_box necessaire"});
        }else if (parseInt(id_box) === NaN){
            return res.status(401).json({error: "id_box doit etre un nombre"});
        }
        const response = await boxsModels.destroy({
            where: {
                id_box: json.id_box,
                id_utilisateur: json.id_utilisateur,
            }
        })
        res.status(200).json({message: 'Supprimé avec succès', box: response})
    }catch (error){
        console.error(error);
        res.status(401).json({message : 'erreur de communication avec le serveur', error: error})
    }
}
