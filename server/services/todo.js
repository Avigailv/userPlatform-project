import query from './query.js';


export const getAllTodos = async (user_id) => {
  try {
    // עדכון השאילתה כדי לכלול את ה-user_id
    const queryStr = `todos WHERE user_id = ${user_id}`;
    console.log(queryStr)
    // שליחת השאילתה עם ה-user_id כפרמטר
    let rows = await query.getQuery(queryStr);
    console.log("rows", rows);
    return rows;
  } catch (error) {
    console.log("errorintodos", error);
    throw new Error('שגיאה בשאילתת נתונים');
  }
}

export const getTodo=async(typeCondition,condition)=>{
  console.log(typeCondition,condition);
   try {
     let result = await query.getQuery(
      `todos WHERE ${typeCondition} = "${condition}"`
    );
    console.log(result);
    return result[0];
  } catch (error) {
    console.log("errorAtFind");
    //  throw new Error('שגיאה בהוספת נתונים');
  }
};

export const addTodo = async (newTodo) => {
  try {
    let result = await query.insertQuery(
      "todos", newTodo
    );

    let resultGetAllById= await getTodo("id",result.insertId);
    return resultGetAllById;
    // return result.insertId;
   
  } catch (error) {
    console.log("erroratadd");
    //  throw new Error('שגיאה בהוספת נתונים');
  }
};

export const patchTodo = async (id, body) => {
    const key = Object.keys(body)[0];
    const value = body[key];
  try {
     let result = await query.patchQuery(
      id,key,value
    );
    return result;
  }
  catch(error){
    console.log("ERROR in patch todo service");
  }
   
};

export const updateTodo = async (todo,id) => {
  try {
    let result = await query.updateQuery(
      "todos", todo,`id=${id}`
    );
    return result;
    // return result.affectedRows;
  } catch (error) {
    console.log("erroratadd");
    //  throw new Error('שגיאה בהוספת נתונים');
  }
}

export const deleteTodo = async (id) => {
  try {
    let result = await query.deleteQuery("todos", `id=${id}`);
    console.log("מחיקה הצליחה:", result);
    return result;
  } catch (error) {
    console.error("שגיאה במחיקת המשימה:", error.message);
    throw new Error('שגיאה במחיקת הנתונים');
  }
}
