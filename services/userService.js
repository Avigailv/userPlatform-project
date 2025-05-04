import promisePool from './db.js';

// קריאת כל המשתמשים
export async function getAllUsers() {
  const [rows] = await promisePool.query('SELECT * FROM users');
  return rows;
}

// קריאה לפי ID
export async function getUserById(id) {
  const [rows] = await promisePool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

// הוספה
export async function addUser(name, email) {
  const [result] = await promisePool.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  return result.insertId;
}

// עדכון
export async function updateUser(id, name, email) {
  await promisePool.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
  );
}

// מחיקה
export async function deleteUser(id) {
  await promisePool.query('DELETE FROM users WHERE id = ?', [id]);
}
