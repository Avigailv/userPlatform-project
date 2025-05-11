import express from "express";
import { Post } from "../controller/post.js";
const postRouter = express.Router();
const postController = new Post();

postRouter.get("/", postController.getAll);
postRouter.post("/", postController.add);
postRouter.put("/:id", postController.update);
postRouter.patch("/:id", postController.patch);
postRouter.delete("/:id", postController.delete);

export { postRouter };