import { addUser, getAllUsers, getUser } from "../services/user.js";
import query from "../services/query.js";
export class User {
    get = async (req, res) => {
        const queryParams = req.query;
        const keys = Object.keys(queryParams); // מחזיר מערך של כל המפתחות
        console.log(keys);

        const firstKey = keys[0];
        const value = queryParams[firstKey];   // '7' או 'avigail123'

    console.log(`Looking for user where ${firstKey} = ${value}`);
        console.log(req.query.username);
        try {
            let user = await getUser(firstKey,value);
            console.log('Successfully fetched user');
            res.send(user);
        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    }

    getAll = async (req, res) => {
        try {
            let users = await getAllUsers();
            console.log('Successfully fetched all users');
            res.send(users);
        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    add = async (req, res) => {
        try {
            const newUser = req.body;

            // הכנסה לטבלת addresses
            let addressResult = await query.insertQuery('addresses', {
                street: newUser.address.street,
                suite: newUser.address.suite,
                city: newUser.address.city
            });

            let user = await addUser({
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone,
                website: newUser.website,
                address_id: addressResult.insertId
            });
            console.log(user)
            //  add validate

            res.send({ id: user });
        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message, "controllerUser");
        }
    }

}
