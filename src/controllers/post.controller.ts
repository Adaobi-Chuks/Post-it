import { Request, Response } from "express";
import { MESSAGES } from "../configs/constants.config";
import PostService from "../services/post.service";
const {
    createPost,
    getAllPosts,

} = new PostService();
const {
    CREATED,
    FETCHED,
    FETCHEDALL,
    // DUPLICATE_EMAIL,
    // DUPLICATE_USERNAME,
    // INVALID_ID,
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

    async getPost(req: Request, res: Response) {
        const posts = await getAllPosts();
        return res.status(200).send({
          success: true,
          message: FETCHEDALL,
          data: posts
        });
    }

}