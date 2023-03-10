import IComment from "../interfaces/comment.interface";
import Comment from "../models/comment.model";

export default class CommentService {
   
    async createComment(comment: IComment) {
        return await Comment.create(comment);
    }

    async findById(id: string) {
        return await Comment.findOne({ _id: id, isDeleted: false }, "-__v");
    }

    async getAll(postId: string) {
        let filter: any = {};
        filter.isDeleted = false;
        filter.postId = postId;
        return await Comment.find(filter, "-__v");
    }

    async updateById(id: string, text: string) {
        if(await Comment.findOne({ _id: id, isDeleted: false })){
            return await Comment.findByIdAndUpdate(id, { textContent: text }, { new: true });
        }
    }

    async deleteById(id: string) {
        return await Comment.updateOne(
            { _id: id, isDeleted: false }, 
            {isDeleted: true}
        );
    }
}