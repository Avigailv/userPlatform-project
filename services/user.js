import promisePool from "./db";
const db = promisePool;

// פונקציה לשליפת כל המשתמשים
export const getAllUsers = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    throw new Error('שגיאה בשאילתת נתונים');
  }
};

// פונקציה להוספת משתמש חדש
export const addUser = async (user) => {
  const { name, email } = user;
  try {
    const [result] = await db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    return result.insertId;
  } catch (error) {
    throw new Error('שגיאה בהוספת נתונים');
  }
};


// פונקציה לעדכון משתמש לפי ID
export const updateUser = async (id, user) => {
  const { name, email } = user;
  try {
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error('שגיאה בעדכון נתונים');
  }
};

// פונקציה למחיקת משתמש לפי ID
export const deleteUser = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error('שגיאה במחיקת נתונים');
  }
}