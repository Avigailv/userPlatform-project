import express from "express";
import { Comment } from "../controller/comment.js";
const commentRouter = express.Router();
const commentController = new Comment();

commentRouter.get("/", commentController.getAll);
commentRouter.post("/", commentController.add);
commentRouter.put("/:id", commentController.update);
commentRouter.patch("/:id", commentController.patch);
commentRouter.delete("/:id", commentController.delete);

export { commentRouter };