import mysql from 'mysql2';

const kubeDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "kubeprojekt"
});

// Do not delete, it starts the connection
kubeDB.connect((error) => {
    if (error) {
        console.error('Database connection failed');

    } else {
        console.log('Connected to db');
    }
});

export default kubeDB;
