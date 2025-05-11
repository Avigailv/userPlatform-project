import query from './query.js';

export const getAllPosts = async () => {
  try {

    // const queryStr = `posts WHERE user_id = ${user_id}`;
    // console.log(queryStr)
    let rows = await query.getQuery("posts");
    console.log("rows", rows);
    return rows;
  } catch (error) {
    console.log("errorinposts");
    throw new Error('שגיאה בשאילתת נתונים');
  }
}



export const addPost = async (newPost) => {
  try {
    let result = await query.insertQuery(
      "posts", newPost
    );

    let resultGetById= await getPost("id",result.insertId);
    return resultGetById;
    // return result.insertId;
   
  } catch (error) {
    console.log("erroratadd");
    //  throw new Error('שגיאה בהוספת נתונים');
  }
};



//T add this function
export const getPost=async(typeCondition,condition)=>{
  console.log(typeCondition,condition);
   try {
     let result = await query.getQuery(
      `posts WHERE ${typeCondition} = "${condition}"`
    );
    console.log(result);
    return result[0];
  } catch (error) {
    console.log("errorAtFind");
    //  throw new Error('שגיאה בהוספת נתונים');
  }
};

// export const addPost = async (newPost) => {
//   try {
//     let result = await query.insertQuery(
//       "posts", newPost
//     );
//     return result.insertId;
//   } catch (error) {
//     console.log("erroratadd");
//     //  throw new Error('שגיאה בהוספת נתונים');
//   }
// };


export const updatePost = async (post, id) => {
  try {
    let result = await query.updateQuery(
      "posts", post, `id=${id}`
    );
    return result.affectedRows;
  } catch (error) {
    console.log("erroratUpdate");
    //  throw new Error('שגיאה בהוספת נתונים');
  }
}


export const deletePost = async (id) => {
  try {
    let result = await query.deleteQuery("posts", `id=${id}`);
    console.log("מחיקה הצליחה:", result);
    return result;
  } catch (error) {
    console.error("שגיאה במחיקת הפוסט:", error.message);
    throw new Error('שגיאה במחיקת הנתונים');
  }
}


