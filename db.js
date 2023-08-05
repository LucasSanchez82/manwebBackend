import { Sequelize } from "sequelize";

let db = new Sequelize(
    'manweb',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
);

db.sync().then(() => {
    console.log("Database synchronized");
}).catch((error) => {
    console.error("Error synchronizing database:", error);
});
export default db;