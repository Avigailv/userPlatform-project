import express from "express";
import {userRouter} from './routes/user.js'

import cors from 'cors'
import { todoRouter } from "./routes/todo.js";


const app = express();
const port = process.env.port | 3000

app.use(cors());
app.use(express.json());

app.use("/users",userRouter);
app.use("/todos",todoRouter);


app.get("/",(req,res)=>{
    res.send("hello express")
})


// app.get("/hello",(req,res)=>{
// let parameters ="";
//     if(req.query.name){
//         parameters += `  name ${req.query.name}`;
//     }
//     if(req.query.phone){
//         parameters += `  phone ${req.query.phone}`;
//     }
//     res.send(" hello express hello " + parameters);
// })



app.get("/hello/:name",(req,res)=>{
    res.send(` hello express hello ${req.params.name}`)
})



app.listen(port, () => {
    //  console.log( process.env)
    console.log(`Example app listening on port ${port}`)
})

























// import express from 'express';
// import {
//   getAllUsers,
//   getUserById,
//   addUser,
//   updateUser,
//   deleteUser
// } from './services/user.js';

// import promisePool from './services/db.js';


// const app = express();
// app.use(express.json()); // מאפשר לקלוט body בפורמט JSON

// app.use(cors());//מה זה עושה???

// // app.get('/users', async (req, res) => {
// //   const users = await getAllUsers();
// //   res.json(users);
// // });


// // app.get('/', async (req, res) => {
// //   try {
// //     const [rows] = await promisePool.query('SELECT * FROM your_table');
// //     res.json(rows);
// //   } catch (err) {
// //     console.error('Error executing query:', err);
// //     res.status(500).send('Error occurred');
// //   }
// // });


// // app.get('/users/:id', async (req, res) => {
// //   const user = await getUserById(req.params.id);
// //   if (user) res.json(user);
// //   else res.status(404).send('User not found');
// // });

// // app.post('/users', async (req, res) => {
// //   const { name, email } = req.body;
// //   const id = await addUser(name, email);
// //   res.status(201).json({ id });
// // });

// // app.put('/users/:id', async (req, res) => {
// //   const { name, email } = req.body;
// //   await updateUser(req.params.id, name, email);
// //   res.send('User updated');
// // });

// // app.delete('/users/:id', async (req, res) => {
// //   await deleteUser(req.params.id);
// //   res.send('User deleted');
// // });

// app.listen(3000, () => console.log('Server running at http://localhost:3000'));
