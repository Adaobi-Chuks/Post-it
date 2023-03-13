import ITag from "../interfaces/tag.interface";
import Tag from "../models/tag.model";

export default class CommentService {
    async findByTagName(name: ITag) {
        return await Tag.findOne({ tagName:name, isDeleted: false }, "-__v");
    }

    async createTag(tag: ITag) {
        return await Tag.create(tag);
    }

    async findById(id: string) {
        return await Tag.findOne({ _id: id, isDeleted: false }, "-__v");
    }

    //sorts in descending order based on the date created
    async getAll() {
        return await Tag.findOne({}, "-__v -password").sort({ createdAt: 'desc' });
    }

    async updateById(id: string, text: string) {
        if(await Tag.findOne({ _id: id, isDeleted: false })){
            return await Tag.findByIdAndUpdate(id, { tagName: text }, { new: true });
        }
    }

    async deleteById(id: string) {
        return await Tag.updateOne(
            { _id: id, isDeleted: false }, 
            {isDeleted: true}
        );
    }
}