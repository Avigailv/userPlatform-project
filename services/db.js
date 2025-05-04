import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// הגדרת החיבור למסד נתונים
const pool = mysql.createPool({
  host: 'localhost',
  user: DB_USER,
  password: DB_PASSWORD, 
  database: DB_NAME, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// יצירת Promise שמחזיר חיבור למסד נתונים
const promisePool = pool.promise();

export default promisePool;
