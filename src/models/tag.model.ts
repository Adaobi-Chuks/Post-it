import { model, Schema } from "mongoose";
import {DATABASES} from "../configs/constants.config";

const tagSchema = new Schema({
    tagName: {
        type: String, 
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 50,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const Tag = model(DATABASES.TAG, tagSchema);
export default Tag;