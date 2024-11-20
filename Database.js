import mysql from 'mysql2';

const kubeDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "kubeprojekt"
});

export default kubeDB;