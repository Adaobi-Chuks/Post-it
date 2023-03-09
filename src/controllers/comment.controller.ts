import { Request, Response } from "express";
import { MESSAGES } from "../configs/constants.config";
import CommentService from "../services/comment.service";
import UserService from "../services/user.service";
import PostService from "../services/post.service";
const User = new UserService();
const Post = new PostService();
const {
    createComment,
    // getAllPosts,
    // findById,
    // updateById,
    // deleteById
} = new CommentService();
const {
    CREATED,
    // FETCHED,
    // FETCHEDALL,
    // INVALID_ID,
    // UPDATED,
    // DELETED
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
    
    // async getPostById(req: Request, res: Response) {
    //     //checks if post exists
    //     const post = await findById(req.params.id);
        
    //     if (!post) {
    //         return res.status(404).send({
    //             success: false,
    //             message: INVALID_ID
    //         });
    //     }
        
    //     return res.status(200).send({
    //         success: true,
    //         message: FETCHED,
    //         data: post
    //     });
    // }
    
    // async getPost(req: Request, res: Response) {
    //     const posts = await getAllPosts();
    //     return res.status(200).send({
    //         success: true,
    //         message: FETCHEDALL,
    //         data: posts
    //     });
    // }

    // async updateById(req: Request, res: Response) {
    //     const id = req.params.id;
    //     const data = req.body.textContent;
    //     //use the id to check if the post exists
    //     if(!(await findById(id))) {
    //         return res.status(404).json({
    //             success: false,
    //             message: INVALID_ID
    //         })
    //     }
    //     const updatedPost = await updateById(id, data)
    //     return res.status(200).json({
    //         success: true,
    //         message: UPDATED,
    //         data: updatedPost
    //     })
    // }

    // async deleteById(req: Request, res: Response) {
    //     const id = req.params.id;
    //     //check to see if a post with id exists
    //     const postToDelete = await findById(id);

    //     //deletes the post if the id exist
    //     if(postToDelete) {
    //         const userDeleted = await deleteById(id);
    //         if(userDeleted) {
    //             return res.status(201).send({
    //                 success: true,
    //                 message: DELETED
    //             });
    //         }
    //     }
    //     //sends an error if the id doesn't exists
    //     return res.status(404)
    //         .send({
    //             success: false,
    //             message: INVALID_ID
    //         });   
    // }

}