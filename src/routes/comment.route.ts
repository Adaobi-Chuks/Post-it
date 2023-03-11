import { Router } from "express";
const userRouter = Router();
const postRouter = Router();
import CommentController from "../controllers/comment.controller";
import authenticate from "../middlewares/auth/authentication.middleware";
import authorize from "../middlewares/auth/authorization.middleware";
import validate from "../middlewares/validate.middleware";
import { createSchema } from "../schemas/comment.schema";
const {
    createComment,
    getCommentById,
    getComments,
    updateById,
    deleteById
} = new CommentController();

//create a comment
userRouter.post("/:userId/posts/:postId/comments", validate(createSchema), authenticate, authorize, createComment);

//get a comment with an id
postRouter.get("/:postId/comments/:id", getCommentById);

//get comments for a post
postRouter.get("/:postId/comments/", getComments);

//update comment details by id
userRouter.put("/:userId/posts/:postId/comments/:id", validate(createSchema), authenticate, authorize, updateById);

//delete comment
userRouter.delete("/:userId/posts/:postId/comments/:id", authenticate, authorize, deleteById);

export {
    userRouter,
    postRouter
};