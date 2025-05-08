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
//  run();
