import promisePool from "./db";
const connectToDb = promisePool;
import sql from 'mysql2';

const executeQuery = async (query) => {
    try {
        let pool = await connectToDb();
        let result = await pool.request().query(query);

        console.log('Query result:', result);
        console.log('Query result:', result.recordset); // השתמש ב- result.recordset לקבלת ערכי תוצאה


    } catch (error) {
        ''
        console.error('Query failed! Error:', err);
    }
    finally {
        sql.close();
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
        const values = Object.values(body)
            .map(value => `'${value}'`)
            .join(', ');

        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
        const result = await executeQuery(query);
        return result;
    } catch (error) {
        console.error('Insert failed:', error.message);
        throw error;
    }
};
const deleteQuery = async (tableName, conditions) => {

    const query = `DELETE FROM ${tableName} WHERE ${conditions}`;
    const result=await executeQuery(query);
    return result;
}

const updateQuery = async (tableName,body) => {
const query=`UPDATE ${tableName}`

}

export {
    executeQuery, getQuery, insertQuery, updateQuery
}