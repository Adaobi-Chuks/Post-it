import { Router } from "express";
const router = Router();
import CommentController from "../controllers/comment.controller";
const {
    createComment,
    // getPostById,
    // getPost,
    // updateById,
    // deleteById
} = new CommentController();

//create a post
router.post("/", createComment);

// //get a post with an id
// router.get("/:id", getPostById);

// //get posts
// router.get("/", getPost);

// //update post details by id
// router.put("/:id", updateById);

// //delete post
// router.delete("/delete/:id", deleteById);

export default router;