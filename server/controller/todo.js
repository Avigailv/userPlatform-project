
import { deleteTodo, getAllTodos, addTodo, updateTodo } from "../services/todo.js";

export class Todo {

    getAll = async (req, res) => {
      const {user_id } = req.query;
       
    console.log(user_id);
        try {
            let todos = await getAllTodos(user_id);
            console.log('Successfully fetched all todos');
            res.send(todos);
        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    add = async (req, res) => {
        try {
            const newTodo = req.body;

            // הכנסה לטבלת todos
            let todoResult = await addTodo({
                user_id: newTodo.user_id,
                title: newTodo.title,
                completed: newTodo.completed
            });
            console.log("todoResult", todoResult)

            //  add validate

            // res.send({ id: todoResult });
            res.send(todoResult);
        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message, "controllerTodo");
        }
    }

    update = async (req, res) => {
        const id = req.params.id;
        const updatedData = req.body;

        try {
            let result = await updateTodo(updatedData,id );
            console.log("Successfully update item:", result);
            res.status(200).json({ message: "Todo updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to update todo" });
        }
    }

    delete = async (req, res) => {
        try {
            let id = req.params.id;
            let result = await deleteTodo(id);
            console.log("Successfully deleted item:", result);
            res.send({ date: "user deleted in success" });
        } catch (error) {
            console.error("Error deleting item:", error.message);
            res.status(500).send("Failed to delete user");
        }
    }

}