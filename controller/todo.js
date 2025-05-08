
import {deleteTodo} from "../services/todo.js";
import query from "../services/query.js"; // או הנתיב הנכון לקובץ query.js

export class Todo {
    // getAll = async (req, res) => {
    //     try {
    //         let users = await getAllUsers();
    //         console.log('Successfully fetched all users');
    //         res.send(users);
    //     } catch (error) {
    //         console.error('there was an error:', error.message);
    //         res.status(500).send(error.message);
    //     }
    // };

    // add = async (req, res) => {
    //     try {
    //         const newUser = req.body;

    //         // הכנסה לטבלת addresses
    //         let addressResult = await query.insertQuery('addresses', {
    //             street: newUser.address.street,
    //             suite: newUser.address.suite,
    //             city: newUser.address.city
    //         });

    //         let user = await addUser( {
    //             name: newUser.name,
    //             username: newUser.username,
    //             email: newUser.email,
    //             phone: newUser.phone,
    //             website: newUser.website,
    //             address_id: addressResult.insertId
    //         });
    //         console.log(user)
    //         //  add validate

    //         res.send({ id: user });
    //     } catch (error) {
    //         console.log('there was an error:', error.message);
    //         res.status(500).send(error.message, "controllerUser");
    //     }
    // }



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