import mysql from 'mysql2';
import {Sequelize} from 'sequelize';


export const SkubeDB = new Sequelize('kubeprojekt', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

export const kubeDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "kubeprojekt"
});


SkubeDB.authenticate().then(() => {
    console.log('Sequelize Connected to db')
}).catch((error) => {
    console.error('Sequelize Database connection failed');
})

// Do not delete, it starts the connection
kubeDB.connect((error) => {
    if (error) {
        console.error('Database connection failed');

    } else {
        console.log('Connected to db');
    }
});
