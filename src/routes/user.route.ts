import { Router } from "express";
const router = Router();
import UserController from '../controllers/user.controller';
const {
    createUser,
    getUserById,
    getUsers,
    editUserById,
    deleteById
} = new UserController();

//create a user or signup
router.post("/", createUser);

//get a user with an id
router.get("/:id", getUserById);

//get users
router.get("/", getUsers);

//edit any user details
router.patch("/:id", editUserById);

// delete user
router.delete("/delete/:id", deleteById);

export default router;