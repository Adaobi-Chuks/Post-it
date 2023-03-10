import { Router } from "express";
const userRouter = Router();
const postRouter = Router();
import CommentController from "../controllers/comment.controller";
import authenticate from "../middlewares/auth/authentication.middleware";
import authorize from "../middlewares/auth/authorization.middleware";
const {
    createComment,
    getCommentById,
    getComments,
    updateById,
    deleteById
} = new CommentController();

//create a comment
userRouter.post("/:userId/posts/:postId/comments", authenticate, authorize, createComment);

//get a comment with an id
postRouter.get("/:postId/comments/:id", getCommentById);

//get comments for a post
postRouter.get("/:postId/comments/", getComments);

//update comment details by id
userRouter.put("/:userId/posts/:postId/comments/:id", authenticate, authorize, updateById);

//delete comment
userRouter.delete("/:userId/posts/:postId/comments/:id", authenticate, authorize, deleteById);

export {
    userRouter,
    postRouter
};