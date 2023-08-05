import Joi from "joi";

export const boxsValidation = (body) => {
    const boxSchema = Joi.object({
        id_utilisateur : Joi.number().required(),
        titre : Joi.string().min(3).max(100).required(),
        lien : Joi.string().uri().required(),
        lien_image : Joi.string().uri().required(),
        numero_chapitre: Joi.number().required()
    })
    return boxSchema.validate(body);
}

export const utilisateursValidation = (body) => {
    const utilisateurSchema = Joi.object({
        pseudo: Joi.string().min(4).max(20).trim().required(),
        email: Joi.string().email().required(),
        mdp: Joi.string().min(7).required(),
    })
    return utilisateurSchema.validate(body);
}