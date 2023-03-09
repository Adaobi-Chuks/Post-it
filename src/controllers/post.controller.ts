import { Request, Response } from "express";
import { MESSAGES } from "../configs/constants.config";
import PostService from "../services/post.service";
const {
    createPost,
    getAllPosts,
    findById
} = new PostService();
const {
    CREATED,
    FETCHED,
    FETCHEDALL,
    INVALID_ID,
    // DUPLICATE_EMAIL,
    // DUPLICATE_USERNAME,
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
    
    async getPostById(req: Request, res: Response) {
        //checks if post exists
        const post = await findById(req.params.id);
        
        if (!post) {
            return res.status(404).send({
                success: false,
                message: INVALID_ID
            });
        }
        
        return res.status(200).send({
            success: true,
            message: FETCHED,
            data: post
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