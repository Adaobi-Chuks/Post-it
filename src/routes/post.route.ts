import { Router } from "express";
const router = Router();
const userRouter = Router();
import PostController from "../controllers/post.controller";
import authenticate from "../middlewares/auth/authentication.middleware";
import authorize from "../middlewares/auth/authorization.middleware";
import {postRouter as commentRoute} from './comment.route';
const {
    createPost,
    getPostsByHandle,
    getPostById,
    getPost,
    // getUsersPost,
    updateById,
    deleteById
} = new PostController();

//create a post
userRouter.post("/:userId/posts", authenticate, authorize, createPost);

//get posts
userRouter.get("/@:userHandle/posts", getPostsByHandle);

//get a post with an id
router.get("/:id", getPostById);

//get posts
router.get("/", getPost);

// //get all posts for a user
// userRouter.get("/:userId/posts", getUsersPost);

//update post details by id
userRouter.put("/:userId/posts/:id", authenticate, authorize, updateById);

//delete post
userRouter.delete("/:userId/posts/:id", authenticate, authorize, deleteById);

//Comment routes
router.use(commentRoute);

export {
    router,
    userRouter
};