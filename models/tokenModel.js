import { DataTypes, Sequelize } from "sequelize";
import db from "../db.js";
import { utilisateursModels } from "./utilisateursModel.js";

const tokenModel = db.define('token', {
    id_token: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_utilisateur: {
        type: DataTypes.INTEGER,        
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,    
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now'),
    }
}, {
    tableName: 'token',
    createdAt: false,
    updatedAt: false,
})

tokenModel.belongsTo(utilisateursModels, {
    foreignKey: 'id_utilisateur',
    foreignKeyConstraint: true,
});

export {tokenModel};