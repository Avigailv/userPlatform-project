import query from './query.js';


export const getAllUsers = async () => {
  try {
    let rows= await query.getQuery('users');
    console.log("rows",rows);
    return rows;
  } catch (error) {
    console.log("errorinuser");
    // throw new Error('שגיאה בשאילתת נתונים');
  }
};

export const getUserWithPassword = async (username, password) => {
  try {
    const queryStr = `users
  JOIN passwords ON users.id = passwords.user_id
  WHERE users.username = ${username} AND passwords.password_hash = ${password}
    `;
    const result = await query.getQuery(queryStr);
    console.log(result);
    return result;
  } catch (error) {
    console.log("errorAtFind", error);
    throw error;
  }
};

export const getUser = async (key1, val1, key2, val2) => {
  try {
    const queryStr = `SELECT * FROM users WHERE ${key1} = ? AND ${key2} = ?`;
    let result = await query.getQuery(queryStr, [val1, val2]);
    console.log(result);
    return result;
  } catch (error) {
    console.log("errorAtFind");
  }
};

export const getUserById = async (key1, val1, key2, val2) => {
  try {
    const queryStr = `SELECT * FROM password_hash WHERE ${key1} = ? AND ${key2} = ?`;
    let result = await query.getQuery(queryStr, [val1, val2]);
    console.log(result);
    return result;
  } catch (error) {
    console.log("errorAtFind");
  }
};

export const addUser = async (newUser) => {

  try {
    // let rows= await query.getQuery('users');

     let result = await query.insertQuery(
      "users",newUser
    );
    return result.insertId;
  } catch (error) {
    console.log("erroratadd");
    //  throw new Error('שגיאה בהוספת נתונים');
  }
};