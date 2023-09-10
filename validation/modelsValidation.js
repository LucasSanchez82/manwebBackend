import Joi from "joi";
import dotenv from 'dotenv';
import { isEmail } from "../controllers/utilisateursController.js";
dotenv.config();

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

export const utilisateursValidation = async (body) => {
    const utilisateurSchema = Joi.object({
        pseudo: Joi.string().min(4).max(20).trim().required(),
        email: Joi.string().email().trim().lowercase().required().external(async (value, helpers) => {
            if (await isEmail(value)) {
                return helpers.error('any.invalid', { message: 'L\'adresse e-mail existe déjà' });
            }
            return true; // Validation réussie si l'adresse e-mail est unique
        }, 'unique email validation').required(),

        mdp: Joi.string().min(7).required(),
        verifMdp: Joi.string().required().valid(Joi.ref('mdp')).messages({
            'any.only': 'La confirmation du mot de passe doit correspondre au mot de passe',
        }),

        mdpForCreateUser: Joi.string().valid(process.env.PASSWORD_FOR_CREATE_USERS).messages({'any.only': 'mot de passe erronée'}).required()
    })
    try{
        const utilisateurSchemaResponse =  await utilisateurSchema.validateAsync(body);
        return utilisateurSchemaResponse;

    }catch(error){
        const utilisateurSchemaResponse = {error: error.details[0].context.message || error.details[0].message};
        return utilisateurSchemaResponse;
    }
}