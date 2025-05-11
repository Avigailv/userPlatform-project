import { addComment, getAllComment, updateComment } from "../services/comment.js";
import query from "../services/query.js"; // או הנתיב הנכון לקובץ query.js

export class Comment {
    getAll = async (req, res) => {
        const { post_id } = req.query;

        console.log(post_id);
        try {

            let comments = await getAllComment(post_id);
            console.log('Successfully fetched all comments');
            res.send(comments);
        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    patch = async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            let comments = await updateComment(body, id);
            console.log('Successfully fetched all comments', comments);
            res.send(comments);
        } catch (error) {
            console.log("there was an error", error);
            // console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    }
    add = async (req, res) => {
        try {
            const newComment = req.body;
            let comment = await addComment(newComment);
            console.log(comment);
            //  add validate

            res.send(comment);
        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message, "controllerComment");
        }
    }

    update = async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            let comments = await updateComment(body, id);
            console.log('Successfully fetched all comments', comments);
            res.send(comments);
        } catch (error) {
            console.log("there was an error", error);
            // console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    }
    delete = async (req, res) => {
        const id = req.params.id;
        try {
            let result = await query.deleteQuery("comments", `id=${id}`);
            console.log("מחיקה הצליחה:", result);
            res.send({ date: "user deleted in success" });
        } catch (error) {
            console.error("שגיאה במחיקת המשימה:", error.message);
            throw new Error('שגיאה במחיקת הנתונים');
        }
    }
}