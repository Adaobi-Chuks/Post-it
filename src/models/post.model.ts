import { model, Schema, Types } from "mongoose";
import {DATABASES} from "../configs/constants.config";

const postSchema = new Schema({
    textContent: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 300,
        trim: true
    },
    userId: {
        type: Types.ObjectId,
        ref: DATABASES.USER,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    //might be implemented later
    // tag: {
    //     type: Types.ObjectId,
    //     ref: DATABASES.TAG,
    //     required: false,
    //     trim: true
    // },
    // like: {
    //     type: Types.ObjectId,
    //     ref: DATABASES.LIKE,
    //     required: false,
    //     trim: true
    // }
}, { 
    timestamps: true
});

const Post = model(DATABASES.POST, postSchema);
export default Post;