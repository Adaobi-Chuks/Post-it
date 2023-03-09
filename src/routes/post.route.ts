import { Router } from "express";
const router = Router();
import PostController from "../controllers/post.controller";
const {
    createPost,
    getPostById,
    getPost,
    // editUserById,
    // deleteUserById
} = new PostController();

//create a post
router.post("/", createPost);

//get a post with an id
router.get("/:id", getPostById);

//get posts
router.get("/", getPost);

// //edit any post details
// router.patch("/:id", editUserById);

// // delete post
// router.patch("/delete/:id", deleteUserById);

export default router;