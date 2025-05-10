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






// פונקציה להוספת משתמש חדש
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


// //T add this function
// export const getUser=async(typeCondition,condition)=>{
//    try {
//      let result = await query.getQuery(
//       `users WHERE ${typeCondition} = "${condition}"`
//     );
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.log("errorAtFind");
//     //  throw new Error('שגיאה בהוספת נתונים');
//   }
// };




// let user=await getUser(`name='dfghjklkuyt Cohen'`);
// console.log(user);
// קריאה בצורה תקינה
// const run = async () => {
//   let som;
//   try {
//      som = await query.insertQuery('addresses', {
//       street: "Derech Hebron 10",
//       suite: "Apt. 5",
//       city: "Jerusalem"
//     });
//     console.log("כתובת נוספה בהצלחה", som);
//     try {
//       let addressId;
//       addressId = som.insertId;

//     // הוספת משתמש עם address_id
//     await addUser({
//       name: "Avigail Cohen",
//       username: "avigail123",
//       email: "avigail.cohen@example.com",
//       phone: "052-1234567",
//       website: "avigail.io",
//       address_id: addressId // שולחים את ה־address_id שנוצר
//     });
//     } catch (error) {
//       console.log("משתמש ת בעית הוספה", som);
//     }
//   } catch (error) {
//     console.error("שגיאה בהכנסת כתובת:", error);
//   }
//   finally{
    
//   }
// }


