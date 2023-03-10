import { Router } from "express";
const router = Router();
import UserController from '../controllers/user.controller';
import {userRouter as commentRoute} from './comment.route';
import {userRouter as postRoute} from './post.route';
const {
    createUser,
    getUserByHandle,
    getUserById,
    getUsers,
    editUserById,
    deleteById
} = new UserController();

//create a user or signup
router.post("/", createUser);

//get a user with an handle
router.get("/@:userHandle", getUserByHandle);

//get a user with an id
router.get("/:id", getUserById);

//get users
router.get("/", getUsers);

//edit any user details
router.patch("/:id", editUserById);

// delete user
router.delete("/:id", deleteById);

//Comment routes
router.use(commentRoute);

//Post routes
router.use(postRoute);

export default router;