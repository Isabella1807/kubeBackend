import mysql from 'mysql2';

const kubeDB = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "kubeprojekt"
});

export default kubeDB.promise(); 