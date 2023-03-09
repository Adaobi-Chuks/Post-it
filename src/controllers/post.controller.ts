import { Request, Response } from "express";
import { MESSAGES } from "../configs/constants.config";
import PostService from "../services/post.service";
const {
    createPost,
    getAllPosts,
    findById,
    updateById
} = new PostService();
const {
    CREATED,
    FETCHED,
    FETCHEDALL,
    INVALID_ID,
    UPDATED,
    // DUPLICATE_EMAIL,
    // DUPLICATE_USERNAME,
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

    async updateById(req: Request, res: Response) {
        const id = req.params.id;
        const data = req.body.textContent;
        //use the id to check if the post exists
        if(!(await findById(id))) {
            return res.status(404).json({
                success: false,
                message: INVALID_ID
            })
        }
        const updatedPost = await updateById(id, data)
        return res.status(200).json({
            success: true,
            message: UPDATED,
            data: updatedPost
        })
    }

}