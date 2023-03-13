import { Router } from "express";
const router = Router();
const userRouter = Router();
import PostController from "../controllers/post.controller";
import authenticate from "../middlewares/auth/authentication.middleware";
import authorize from "../middlewares/auth/authorization.middleware";
import validate from "../middlewares/validate.middleware";
import { createSchema, editSchema } from "../schemas/post.schema";
import {postRouter as commentRoute} from './comment.route';
const {
    createPost,
    getPostsByHandle,
    getPostById,
    getPosts,
    getUsersPost,
    updateById,
    deleteById,
    getPostsWithTag
} = new PostController();

//create a post
userRouter.post("/:userId/posts", validate(createSchema), authenticate, authorize, createPost);
//get all posts for a user by handle
userRouter.get("/@:userHandle/posts", getPostsByHandle);
//get all posts relating to a tag
router.get("/tags", getPostsWithTag);
//get a post with an id
router.get("/:id", getPostById);
//get posts
router.get("/", getPosts);
//get all posts for a user by id
userRouter.get("/:userId/posts", getUsersPost);
//update post details by id
userRouter.put("/:userId/posts/:id", validate(editSchema), authenticate, authorize, updateById);
//delete post
userRouter.delete("/:userId/posts/:id", authenticate, authorize, deleteById);
//Comment routes
router.use(commentRoute);

export {
    router,
    userRouter
};