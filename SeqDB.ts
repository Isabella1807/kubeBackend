import {Sequelize} from 'sequelize';
import initModels from "./models/modelsDB/init-models";

const seqDB: Sequelize = new Sequelize('kube2', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});


seqDB.authenticate().then(() => {
    console.log('Sequelize Connected to db')
}).catch((error) => {
    console.error('Sequelize Database connection failed');
})

const models = initModels();

export {seqDB, models};