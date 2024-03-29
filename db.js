import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

let db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
    }
);

db.sync().then(() => {
    console.log("Database synchronized");
}).catch((error) => {
    console.error("Error synchronizing database:", error);
});
export default db;