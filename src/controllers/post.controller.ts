import { Request, Response } from "express";
import { MESSAGES } from "../configs/constants.config";
import PostService from "../services/post.service";
const {
    createPost,

} = new PostService();
const {
    CREATED,
    // DUPLICATE_EMAIL,
    // DUPLICATE_USERNAME,
    // INVALID_ID,
    // FETCHED,
    // FETCHEDALL,
    // UPDATED,
    // DELETED
} = MESSAGES.POST;

export default class PostController {

    async createPost(req: Request, res: Response) {

        const createdPost = await createPost(req.body);
        return res.status(201)
            .send({
                success: true,
                message: CREATED,
                data: {createdPost}
            });
    }
}