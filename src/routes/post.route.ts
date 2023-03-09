import { Router } from "express";
const router = Router();
import PostController from "../controllers/post.controller";
const {
    createPost,
    getPostById,
    getPost,
    updateById
    // deleteUserById
} = new PostController();

//create a post
router.post("/", createPost);

//get a post with an id
router.get("/:id", getPostById);

//get posts
router.get("/", getPost);

//update post details by id
router.patch("/:id", updateById);

// // delete post
// router.patch("/delete/:id", deleteUserById);

export default router;