
import { addPost, getAllPosts, deletePost, updatePost } from "../services/post.js";


export class Post {

    getAll = async (req, res) => {
        // const { user_id } = req.query;

        // console.log(user_id);
        try {
            // let posts = await getAllPosts(user_id);
            let posts = await getAllPosts();

            console.log('Successfully fetched all posts');
            res.send(posts);
        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    add = async (req, res) => {
        try {
            const newPost = req.body;

            // הכנסה לטבלת todos
            let postResult = await addPost({
                user_id: newPost.user_id,
                title: newPost.title,
                body: newPost.body
            });

            console.log("postResult", postResult)

            //  add validate

            res.send({ id: postResult });
        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message, "controllerPost");
        }
    }

    update = async (req, res) => {
        const id = req.params.id;
        const updatedData = req.body;

        try {
            let result = await updatePost(updatedData, id);
            console.log("Successfully update item:", result);
            res.status(200).json({ message: "post updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to update post" });
        }
    }

    delete = async (req, res) => {
        try {
            let id = req.params.id;
            let result = await deletePost(id);
            console.log("Successfully deleted item:", result);
            res.send({ date: "post deleted in success" });
        } catch (error) {
            console.error("Error deleting item:", error.message);
            res.status(500).send("Failed to delete post");
        }
    }

}