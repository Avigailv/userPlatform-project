import express from "express";
import { User } from "../controller/user.js";

//import { User } from "../../controller/user.js";
const userRouter = express.Router();
const userController = new User();

userRouter.get("/",userController.get);
// userRouter.get("/", userController.getAll);
userRouter.post("/", userController.add);

userRouter.put("/:id", userController.getAll);

export { userRouter };
