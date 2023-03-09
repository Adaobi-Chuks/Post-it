import { model, Schema, Types } from "mongoose";
import {DATABASES} from "../configs/constants.config";

const commentSchema = new Schema({
    textContent: {
        type: String, 
        required: true,
        lowercase: true,
        minlength: 10,
        maxlength: 100,
        trim: true
    },
    userId: {
        type: Types.ObjectId,
        ref: DATABASES.USER,
        required: true,
        trim: true
    },
    postId: {
        type: Types.ObjectId,
        ref: DATABASES.POST,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    // like: {
    //     type: Types.ObjectId,
    //     ref: DATABASES.LIKE,
    //     required: false,
    //     trim: true
    // }
}, { 
    timestamps: true
});

const Comment = model(DATABASES.COMMENT, commentSchema);
export default Comment;