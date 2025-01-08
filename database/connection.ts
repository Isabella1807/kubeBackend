import {Sequelize} from "sequelize-typescript";

const minDB = new Sequelize({
    database: "kube2",
    dialect: "mysql",
    username: "root",
    password: "root",
    host: "localhost",
    port: 3306,
    models: [__dirname + "/models"]
});

export default minDB;
