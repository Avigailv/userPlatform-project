import express from "express";
import cors from 'cors'

import {userRouter} from './routes/user.js'
import { todoRouter } from "./routes/todo.js";


const app = express();
// const port = process.env.port | 3000
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/users",userRouter);
app.use("/todos",todoRouter);


app.get("/",(req,res)=>{
    res.send("hello express")
})
app.get("/hello/:name",(req,res)=>{
    res.send(` hello express hello ${req.params.name}`)
})

app.listen(port, () => {
    //  console.log( process.env)
    console.log(`Example app listening on port ${port}`)
})
