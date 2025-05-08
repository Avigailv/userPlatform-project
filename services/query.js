import promisePool from "./db.js";
const connectToDb = promisePool;
import sql from 'mysql2';

const executeQuery = async (query,value) => {
    try {
        const [rows] = await promisePool.query(query,value);
        console.log('Query result:',rows);
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
        // const fullQuery = { query, values };
        const result = await executeQuery( query,values );
        console.log("insert, result:",result);
        return result;
    } catch (error) {
        console.error('Insert failed:', error.message);
        throw error;
    }
};

const updateQuery = async (tableName,body,conditions) => {
    try {

        if (!tableName || !body || Object.keys(body).length === 0 || !conditions) {
            throw new Error("Invalid parameters for update query");
        }

        const setClause = Object.entries(body)
        .map(([key, value]) => `${key}='${value}'`)
        .join(', ');
    
        const query = `UPDATE ${tableName} SET ${setClause} WHERE ${conditions}`;
        const result = await executeQuery(query);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found or not updated" });
          }
          
          return result;

    } catch (error) {console.log(error)
        console.error(error);
    }

}

const deleteQuery = async (tableName, conditions) => {
try {
    const query = `DELETE FROM ${tableName} WHERE ${conditions}`;
    const result = await executeQuery(query);
    return result;
} catch (error) {
    console.error(error, "fghgfd");
}
    
}


export default{
    executeQuery, getQuery ,insertQuery ,deleteQuery, updateQuery
}
