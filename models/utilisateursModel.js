import { DataTypes } from "sequelize";
import db from "../db.js";

export const utilisateursModels = db.define('box', {
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
}, {
    tableName: 'utilisateurs', //titre de la base de donnee
    createdAt: false,
    updatedAt: false,
})