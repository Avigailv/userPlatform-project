import express from "express";

import { Todo } from "../controller/todo.js";
const todoRouter = express.Router();
const todoController = new Todo();


// todoRouter.get("/", todoController.getAll);
// todoRouter.post("/", todoController.add);

// todoRouter.put("/:id", todoController.getAll);


// let tmp=new Todo().deleteT(3)
todoRouter.delete("/:id", todoController.delete);


export { todoRouter };