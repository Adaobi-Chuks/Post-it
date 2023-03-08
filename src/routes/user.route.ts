import { Router } from "express";
const router = Router();
import UserController from '../controllers/user.controller';
const {
    createUser,
    getUserById
} = new UserController();

//create a user or signup
router.post("/", createUser);

//get a user with an id
router.get("/:id", getUserById);

export default router;