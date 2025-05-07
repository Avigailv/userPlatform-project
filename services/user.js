import query from './query.js';
// const db = promisePool;
console.log("users.services");
let som;
// פונקציה לשליפת כל המשתמשים
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


// addUser: (userData, callback) => {
//   const { title, completed ,user_id } = userData;

//   DB.query(
//       "INSERT INTO users (title, completed ,user_id) VALUES (?, ?, ?)",
//       [title,completed,user_id],
//       (err, result) => {
//           if (err) return callback(err);
//           const id = result.insertId;
//       }
//   );
// }


// פונקציה להוספת משתמש חדש
export const addUser = async (newUser) => {

  try {
    // let rows= await query.getQuery('users');

    const [result] = await query.insertQuery(
      "users",newUser
    );
    return result.insertId;
  } catch (error) {
    console.log("erroratadd");
    //  throw new Error('שגיאה בהוספת נתונים');
  }
};

// קריאה בצורה תקינה
const run = async () => {
  let som = await addUser({
    name: "Avigail Cohen",
    username: "avigail123",
    email: "avigail.cohen@example.com",
    phone: "052-1234567",
    website: "avigail.io",
    address: {
      street: "Derech Hebron 10",
      suite: "Apt. 5",
      city: "Jerusalem"
    }});
  console.log("som", som);
};

run();

// // פונקציה לעדכון משתמש לפי ID
// export const updateUser = async (id, user) => {
//   const { name, email } = user;
//   try {
//     const [result] = await db.query(
//       'UPDATE users SET name = ?, email = ? WHERE id = ?',
//       [name, email, id]
//     );
//     return result.affectedRows > 0;
//   } catch (error) {
//     throw new Error('שגיאה בעדכון נתונים');
//   }
// };

// // פונקציה למחיקת משתמש לפי ID
// export const deleteUser = async (id) => {
//   try {
//     const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
//     return result.affectedRows > 0;
//   } catch (error) {
//     throw new Error('שגיאה במחיקת נתונים');
//   }
// }