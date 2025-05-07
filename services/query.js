import promisePool from "./db.js";
const connectToDb = promisePool;
import sql from 'mysql2';

const executeQuery = async (query) => {
    try {
        const [rows] = await promisePool.query(query);
        console.log('Query result:');
        return rows;
    } catch (error) {
        console.error('Query failed! Error:',error);
    }
    finally {
        // await pool.end(); // סוגר את כל החיבורים ב-pool
    }
};

const getQuery = async (tableName) => {

    const query = `SELECT * FROM ${tableName}`;
    const result = await executeQuery(query);
    return result;
}

import executeQuery from './query.js';

const insertQuery = async (tableName, body) => {
    try {
        if (!body || Object.keys(body).length === 0)
            throw new Error('Body is empty');

        const columns = Object.keys(body).join(', ');
        const placeholders = Object.keys(body).map(() => '?').join(', ');

        // נוודא שכל ערך שהוא אובייקט יהפוך למחרוזת JSON
        const values = Object.values(body).map(value =>
            typeof value === 'object' && value !== null ? JSON.stringify(value) : value
        );

        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        const result = await executeQuery(query, values);
        return result;
    } catch (error) {
        console.error('Insert failed:', error.message);
        throw error;
    }
};


// const deleteQuery = async (tableName, conditions) => {
// try {
//     const query = `DELETE FROM ${tableName} WHERE ${conditions}`;
//     const result=await executeQuery(query);
//     return result;
// } catch (error) {
//     console.error(error);
// }
    
// }

// const updateQuery = async (tableName,body,conditions) => {
//     try {

//         if (!tableName || !body || Object.keys(body).length === 0 || !conditions) {
//             throw new Error("Invalid parameters for update query");
//         }

//         const setClause = Object.entries(body)
//         .map(([key, value]) => `${key}='${value}'`)
//         .join(', ');
    
//         const query = `UPDATE ${tableName} SET ${setClause} WHERE ${conditions}`;
//         const result = await executeQuery(query);
//         return result;

//     } catch (error) {console.log(error)
//         console.error(error);
//     }

// }

export default{
    executeQuery, getQuery ,insertQuery
    // ,deleteQuery, updateQuery
}

// לדוגמה: הוספת משתמש חדש
