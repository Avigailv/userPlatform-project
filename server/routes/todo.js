import express from "express";
import { Todo } from "../controller/todo.js";
const todoRouter = express.Router();
const todoController = new Todo();

todoRouter.get("/", todoController.getAll);
todoRouter.post("/", todoController.add);
todoRouter.put("/:id", todoController.update);
todoRouter.delete("/:id", todoController.delete);
todoRouter.patch("/:id",todoController.patch);
export { todoRouter };