import IPost from "../interfaces/post.interface";
import Post from "../models/post.model";

export default class PostService {
    async createPost(post: IPost) {
        return await Post.create(post);
    }

    async findById(id: string) {
        return await Post.findOne({ _id: id, isDeleted: false }, "-__v");
    }

    //returns whether deleted or not
    async findAllById(id: string) {
        return await Post.findOne({ _id: id }, "-__v");
    }

    //sorts in descending order based on the date created
    async getAllPosts(query?: object) {
        let filter: any = {
            ...query,
            isDeleted: false
        };
        //sorts in descending order based on the date created
        return await Post.find(filter, "-__v").sort({ createdAt: 'desc' });
    }

    async updateById(id: string, text: string) {
        if(await Post.findOne({ _id: id, isDeleted: false })){
            return await Post.findByIdAndUpdate(id, { textContent: text }, { new: true });
        }
    }

    async deleteById(id: string) {
        return await Post.updateOne(
            { _id: id, isDeleted: false }, 
            {isDeleted: true}
        );
    }
}