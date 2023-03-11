import { Request, Response } from "express";
import { MESSAGES } from "../configs/constants.config";
import PostService from "../services/post.service";
import User from "../services/user.service";
const UserService = new User();
const {
    createPost,
    getAllPosts,
    findById,
    updateById,
    deleteById
} = new PostService();
const {
    CREATED,
    FETCHED,
    FETCHEDALL,
    INVALID_ID,
    UPDATED,
    DELETED
} = MESSAGES.POST;

export default class PostController {

    async createPost(req: Request, res: Response) {
        //check if the id in the params exist
        const {userId} = req.params;
        if (!await UserService.findById(userId) ) {
            return res.status(404).send({
                success: false,
                message: MESSAGES.USER.INVALID_ID
            });
        }
        const createdPost = await createPost({
            ...req.body,
            userId: userId
        });
        return res.status(201)
            .send({
                success: true,
                message: CREATED,
                post: createdPost
            });
    }
    
    async getPostsByHandle(req: Request, res: Response) {
        const userName = req.params.userHandle;

        //check if post exists
        const user = await UserService.findByUserName(userName);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: MESSAGES.USER.INVALID_USERNAME
            });
        }
        const post = await getAllPosts({
            userId: user._id
        })
        return res.status(200).send({
            success: true,
            message: FETCHED,
            returnedPost: post
        });
    }
    
    async getPostById(req: Request, res: Response) {
        //check if post exists
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
            returnedPost: post
        });
    }

    async getPosts(req: Request, res: Response) {
        const posts = await getAllPosts();
        return res.status(200).send({
            success: true,
            message: FETCHEDALL,
            returnedPosts: posts
        });
    }
    
    async getUsersPost(req: Request, res: Response) {
        const id = req.params.userId;

        //check if post exists
        const user = await UserService.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: MESSAGES.USER.INVALID_ID
            });
        }
        const post = await getAllPosts({
            userId: user._id
        })
        return res.status(200).send({
            success: true,
            message: FETCHED,
            returnedPosts: post
        });
    }

    async updateById(req: Request, res: Response) {
        const {id, userId} = req.params;
        const data = req.body.textContent;

        //check if all id's are valid both the deleted and available user
        if(!(await UserService.findAllById(userId))) {
            return res.status(404).json({
                success: false,
                message: MESSAGES.USER.INVALID_ID
            })
        }
        const post = await findById(id);
        if(!post) {
            return res.status(404).json({
                success: false,
                message: INVALID_ID
            })
        }
        //if all are valid, check if userId passed in matches the userId of the post
        if (JSON.stringify(post.userId) === JSON.stringify(userId)) {
            const updatedPost = await updateById(id, data)
            return res.status(200).json({
                success: true,
                message: UPDATED,
                post: updatedPost
            })
        }
    }

    async deleteById(req: Request, res: Response) {
        const {id, userId} = req.params;
        const data = req.body.textContent;

        //check if all id's are valid both the deleted and available user
        if(!(await UserService.findAllById(userId))) {
            return res.status(404).json({
                success: false,
                message: MESSAGES.USER.INVALID_ID
            })
        }
        const post = await findById(id);
        if(!post) {
            return res.status(404).json({
                success: false,
                message: INVALID_ID
            })
        }
        //if all are valid, check if userId passed in matches the userId of the post
        if (JSON.stringify(post.userId) === JSON.stringify(userId)) {
            const userDeleted = await deleteById(id);
            if(userDeleted) {
                return res.status(201).send({
                    success: true,
                    message: DELETED
                });
            }
        }
    }
}