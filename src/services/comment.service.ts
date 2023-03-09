import IComment from "../interfaces/comment.interface";
import Comment from "../models/comment.model";

export default class CommentService {
   
    async createComment(comment: IComment) {
        return await Comment.create(comment);
    }

    // async findById(id: string) {
    //     return await Post.findOne({ _id: id, isDeleted: false }, "-__v");
    // }

    // async getAllPosts() {
    //     let filter: any = {};
    //     filter.isDeleted = false;
    //     return await Post.find(filter, "-__v");
    // }

    // async updateById(id: string, text: string) {
    //     if(await Post.findOne({ _id: id, isDeleted: false })){
    //         return await Post.findByIdAndUpdate(id, { textContent: text }, { new: true });
    //     }
    // }

    // async deleteById(id: string) {
    //     return await Post.updateOne(
    //         { _id: id, isDeleted: false }, 
    //         {isDeleted: true}
    //     );
    // }
}