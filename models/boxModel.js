import { BelongsTo, DataTypes } from "sequelize";
import db from "../db.js";
import { utilisateursModels } from "./utilisateursModel.js";

const boxsModels = db.define('box', {
    id_box: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_utilisateur: {
        type: DataTypes.INTEGER,        
        allowNull: false,
    },
    titre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lien: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lien_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero_chapitre: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'box',
    createdAt: false,
    updatedAt: false,
})

boxsModels.belongsTo(utilisateursModels, {
    foreignKey: 'id_utilisateur', //clef etrangere
    // targetKey: 'id_utilisateur' //clef primaire
});
export {boxsModels};