import { model, Schema, Types } from "mongoose";
import {DATABASES} from "../configs/constants.config";

const commentSchema = new Schema({
    textContent: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 200,
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
    }
}, { 
    timestamps: true
});
const Comment = model(DATABASES.COMMENT, commentSchema);
export default Comment;