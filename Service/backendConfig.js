import mysql from 'mysql2';
import dotenv from 'dotenv';


// -----------------------------------------          Config          ----------------------------------------------

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


pool.getConnection()
    .then(conn => {
        console.log("MySQL connection successful!");
        conn.release();
    })
    .catch(err => {
        console.error("Error connecting to MySQL:", err);
});

export default pool;
