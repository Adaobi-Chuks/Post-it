import { Router } from "express";
const router = Router();
import PostController from "../controllers/post.controller";
const {
    createPost,
    // getUserById,
    // getUsers,
    // editUserById,
    // deleteUserById
} = new PostController();

//create a user or signup
router.post("/", createPost);

// //get a user with an id
// router.get("/:id", getUserById);

// //get users
// router.get("/", getUsers);

// //edit any user details
// router.patch("/:id", editUserById);

// // delete user
// router.patch("/delete/:id", deleteUserById);

export default router;