import { Request, Response } from "express";
import { MESSAGES } from "../configs/constants.config";
import CommentService from "../services/comment.service";
import User from "../services/user.service";
import Post from "../services/post.service";
const UserService = new User();
const PostService = new Post();
const {
    createComment,
    findById,
    getAll,
    updateById,
    deleteById
} = new CommentService();
const {
    CREATED,
    INVALID_ID,
    FETCHED,
    FETCHEDALL,
    UPDATED,
    DELETED
} = MESSAGES.COMMENT;

export default class CommentController {

    async createComment(req: Request, res: Response) {
        //check if the ids in the params exist irrespective of if the resource has been deleted
        const {userId, postId} = req.params;
        if (!await UserService.findAllById(userId) ) {
            return res.status(404).send({
                success: false,
                message: MESSAGES.USER.INVALID_ID
            });
        }
        if (!await PostService.findAllById(postId) ) {
            return res.status(404).send({
                success: false,
                message: MESSAGES.POST.INVALID_ID
            });
        }
        const createdComment = await createComment({
            ...req.body,
            postId: postId,
            userId: userId
        });
        return res.status(201)
            .send({
                success: true,
                message: CREATED,
                comment: createdComment
            });
    }

    async getCommentById(req: Request, res: Response) {
        const {id, postId} = req.params;
        //checks if comment exists
        const comment = await findById(id);

        //if comment exists, check if postId passed in matches the postId of the comment
        if(comment) {
            if (JSON.stringify(comment.postId) === JSON.stringify(postId)) {
                return res.status(200).send({
                    success: true,
                    message: FETCHED,
                    comment: comment
                });
            }
            //returns an error if postId passed in is wrong
            return res.status(404).send({
                success: false,
                message: MESSAGES.POST.INVALID_ID
            });
        }
        //returns an error if comment doesn't exist
        return res.status(404).send({
            success: false,
            message: INVALID_ID
        });
    }
    
    async getComments(req: Request, res: Response) {
        const id = req.params.postId;
        //gets all the comments of a post regardless of if the post has been deleted
        if(await PostService.findAllById(id)) {
            const comment = await getAll({
                postId: id
            });
            return res.status(200).send({
                success: true,
                message: FETCHEDALL,
                comments: comment
            });
        }
        //returns an error if postId passed in is wrong
        return res.status(404).send({
            success: false,
            message: MESSAGES.POST.INVALID_ID
        });
    }

    async updateById(req: Request, res: Response) {
        const {id, userId, postId} = req.params;
        const data = req.body.textContent;

        //check if all ids are valid both the deleted and available users and post
        if(!(await UserService.findAllById(userId))) {
            return res.status(404).json({
                success: false,
                message: MESSAGES.USER.INVALID_ID
            })
        }
        if(!(await PostService.findAllById(postId))) {
            return res.status(404).json({
                success: false,
                message: MESSAGES.POST.INVALID_ID
            })
        }
        //checks if comment exists
        const comment = await findById(id);
        if(!(comment)) {
            return res.status(404).json({
                success: false,
                message: INVALID_ID
            })
        }
        //if all are valid, check if userId passed in matches the userId of the comment
        if (JSON.stringify(comment.userId) === JSON.stringify(userId)) {
            const updatedComment = await updateById(id, data);
            return res.status(200).send({
                success: true,
                message: UPDATED,
                updatedComment: updatedComment
            });
        }
    }

    async deleteById(req: Request, res: Response) {
        const {id, userId, postId} = req.params;

        //check if all id's are valid both the deleted and available users and post
        if(!(await UserService.findAllById(userId))) {
            return res.status(404).json({
                success: false,
                message: MESSAGES.USER.INVALID_ID
            })
        }
        if(!(await PostService.findAllById(postId))) {
            return res.status(404).json({
                success: false,
                message: MESSAGES.POST.INVALID_ID
            })
        }
        //checks if comment exists
        const comment = await findById(id);
        if(!(comment)) {
            return res.status(404).json({
                success: false,
                message: INVALID_ID
            })
        }
        //if all are valid, check if userId passed in matches the userId of the comment
        if (JSON.stringify(comment.userId) === JSON.stringify(userId)) {
            await deleteById(id);
            return res.status(201).send({
                success: true,
                message: DELETED
            });
        }
    }
}