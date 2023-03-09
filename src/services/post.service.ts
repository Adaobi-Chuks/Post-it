import IPost from "../interfaces/post.interface";
import Post from "../models/post.model";

export default class PostService {
   
    async createPost(post: IPost) {
        return await Post.create(post);
    }

    async findById(id: string) {
        return await Post.findOne({ _id: id}, "-__v");
    }

    async getAllPosts() {
        return await Post.find({}, "-__v");
    }

}