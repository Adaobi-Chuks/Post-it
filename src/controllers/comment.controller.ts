import { Request, Response } from "express";
import { MESSAGES } from "../configs/constants.config";
import CommentService from "../services/comment.service";
import UserService from "../services/user.service";
import PostService from "../services/post.service";
const User = new UserService();
const Post = new PostService();
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

        //check if the ids passed in exist
        if (!await User.findById(req.body.userId) ) {
            return res.status(404).send({
                success: false,
                message: MESSAGES.USER.INVALID_ID
            });
        } else if (!await Post.findById(req.body.postId) ) {
            return res.status(404).send({
                success: false,
                message: MESSAGES.POST.INVALID_ID
            });
        }

        const createdComment = await createComment(req.body);
        return res.status(201)
            .send({
                success: true,
                message: CREATED,
                data: {createdComment}
            });
    }

    async getCommentById(req: Request, res: Response) {
        //checks if comment exists
        const comment = await findById(req.params.id);
        
        if (!comment) {
            return res.status(404).send({
                success: false,
                message: INVALID_ID
            });
        }
        
        return res.status(200).send({
            success: true,
            message: FETCHED,
            data: comment
        });
    }
    
    async getComment(req: Request, res: Response) {
        const comment = await getAll();
        return res.status(200).send({
            success: true,
            message: FETCHEDALL,
            data: comment
        });
    }

    async updateById(req: Request, res: Response) {
        const id = req.params.id;
        const data = req.body.textContent;
        //use the id to check if the comment exists
        if(!(await findById(id))) {
            return res.status(404).json({
                success: false,
                message: INVALID_ID
            })
        }
        const updatedComment = await updateById(id, data)
        return res.status(200).json({
            success: true,
            message: UPDATED,
            data: updatedComment
        })
    }

    async deleteById(req: Request, res: Response) {
        const id = req.params.id;
        //check to see if a comment with id exists
        const commentToDelete = await findById(id);

        //deletes the comment if the id exist
        if(commentToDelete) {
            const commentDeleted = await deleteById(id);
            if(commentDeleted) {
                return res.status(201).send({
                    success: true,
                    message: DELETED
                });
            }
        }
        //sends an error if the id doesn't exists
        return res.status(404)
            .send({
                success: false,
                message: INVALID_ID
            });   
    }

}