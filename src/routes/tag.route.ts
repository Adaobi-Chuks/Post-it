import { Router } from "express";
const router = Router();
const userRouter = Router();
import TagController from "../controllers/tag.controller";
import authenticate from "../middlewares/auth/authentication.middleware";
import authorize, {authorizeAdmin} from "../middlewares/auth/authorization.middleware";
import validate from "../middlewares/validate.middleware";
import { createSchema } from "../schemas/tag.schema";
const {
    createTag,
    getTagById,
    getTags,
    updateById,
    deleteById
} = new TagController();

//create a tag
userRouter.post("/:userId/tags", validate(createSchema), authenticate, authorize, createTag);
//get a tag with an id
router.get("/:id", getTagById);
//get tags
router.get("/", getTags);
//update tag details by id
userRouter.put("/:userId/tags/:id", validate(createSchema), authenticate, authorizeAdmin, updateById);
//delete tag by id
userRouter.delete("/:userId/tags/:id", authenticate, authorizeAdmin, deleteById);

export {
    router,
    userRouter
};