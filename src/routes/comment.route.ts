import { Router } from "express";
const userRouter = Router();
const postRouter = Router();
import CommentController from "../controllers/comment.controller";
const {
    createComment,
    getCommentById,
    getComments,
    updateById,
    deleteById
} = new CommentController();

//create a comment
userRouter.post("/:userId/posts/:postId/comments", createComment);

//get a comment with an id
postRouter.get("/:postId/comments/:id", getCommentById);

//get comments
postRouter.get("/:postId/comments/", getComments);

//update comment details by id
userRouter.put("/:userId/posts/:postId/comments/:id", updateById);

//delete comment
userRouter.delete("/:userId/posts/:postId/comments/:id", deleteById);

export {
    userRouter,
    postRouter
};