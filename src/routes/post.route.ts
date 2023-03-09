import { Router } from "express";
const router = Router();
import PostController from "../controllers/post.controller";
const {
    createPost,
    getPostById,
    getPost,
    updateById,
    deleteById
} = new PostController();

//create a post
router.post("/", createPost);

//get a post with an id
router.get("/:id", getPostById);

//get posts
router.get("/", getPost);

//update post details by id
router.put("/:id", updateById);

//delete post
router.delete("/:id", deleteById);

export default router;