import IPost from "../interfaces/post.interface";
import Post from "../models/post.model";

export default class PostService {
   
    async createPost(post: IPost) {
        return await Post.create(post);
    }

}