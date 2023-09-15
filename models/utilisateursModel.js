import { DataTypes } from "sequelize";
import db from "../db.js";

const utilisateursModels = db.define('utilisateurs', {
    id_utilisateur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mdp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verifie: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    tableName: 'utilisateurs', //titre de la base de donnee
    createdAt: false,
    updatedAt: false,
})
export {utilisateursModels};