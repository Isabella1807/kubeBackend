import {Sequelize} from 'sequelize';

const seqDB: Sequelize = new Sequelize('kube2', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

seqDB.authenticate().then(() => {
    console.log('Sequelize Connected to db')
}).catch((error) => {
    console.error('Sequelize Database connection failed');
})

export default seqDB;
