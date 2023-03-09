import { Router } from "express";
const router = Router();
import CommentController from "../controllers/comment.controller";
const {
    createComment,
    getCommentById,
    getComment,
    updateById,
    deleteById
} = new CommentController();

//create a comment
router.post("/", createComment);

//get a comment with an id
router.get("/:id", getCommentById);

//get comments
router.get("/", getComment);

//update comment details by id
router.put("/:id", updateById);

//delete comment
router.delete("/:id", deleteById);

export default router;