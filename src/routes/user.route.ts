import { Router } from "express";
const router = Router();
import UserController from '../controllers/user.controller';
const {
    createUser,
} = new UserController();

//create a user or signup
router.post("/", createUser);

export default router;