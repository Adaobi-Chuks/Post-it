import { Router } from "express";
const router = Router();
import UserController from '../controllers/user.controller';
import authenticate from "../middlewares/auth/authentication.middleware";
import authorize from "../middlewares/auth/authorization.middleware";
import validate from "../middlewares/validate.middleware";
import { createSchema, editSchema, loginSchema } from "../schemas/user.schema";
import {userRouter as commentRoute} from './comment.route';
import {userRouter as postRoute} from './post.route';
const {
    createUser,
    getUserByHandle,
    getUserById,
    getUsers,
    editUserById,
    deleteById,
    login,
    logout
} = new UserController();

//create a user or signup
router.post("/", validate(createSchema), createUser);

//get a user with an handle
router.get("/@:userHandle", getUserByHandle);

//get a user with an id
router.get("/:userId", getUserById);

//get users
router.get("/", getUsers);

//edit any user details
router.patch("/:iuserId", validate(editSchema), authenticate, authorize, editUserById);

// delete user
router.delete("/:userId", authenticate, authorize, deleteById);

//create a user or signup
router.post("/login", validate(loginSchema), login);

//create a user or signup
router.post("/logout", logout);

//Comment routes
router.use(commentRoute);

//Post routes
router.use(postRoute);

export default router;