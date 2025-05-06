import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// הגדרת החיבור למסד נתונים
const pool = mysql.createPool({
  host: 'localhost', // איפה יושב מסד הנתונים
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  waitForConnections: true,
  connectionLimit: 10, // כמה חיבורים מקסימום במקביל
  queueLimit: 0 // בלי הגבלה על תור הבקשות
});

// יצירת Promise שמחזיר חיבור למסד נתונים
//זה תומך באסינכרוני
const promisePool = pool.promise();

export default promisePool;