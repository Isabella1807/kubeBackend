import mysql from 'mysql';

const kubeDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "kubeprojekt"
});

export default kubeDB;