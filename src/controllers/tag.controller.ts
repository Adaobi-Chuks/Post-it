import { Request, Response } from "express";
import { MESSAGES } from "../configs/constants.config";
import TagService from "../services/tag.service";
import Tag from "../models/tag.model";
import isObjectId from "../utils/isValidObjectId.util";
const {
    findByTagName,
    createTag,
    findById,
    getAll,
    updateById,
    deleteById
} = new TagService();
const {
    DUPLICATE_TAGNAME,
    CREATED,
    FETCHED,
    INVALID_ID,
    FETCHEDALL,
    UPDATED,
    DELETED,
    NOT_ID
} = MESSAGES.TAG;

export default class TagController {
    async createTag(req: Request, res: Response) {
        //check if the tag name exists
        const { tagName } = req.body;
    
        const existingTag = await Tag.findOne({
            tagName: tagName
        });
        if (existingTag) {
            return res.status(409).send({
                success: false,
                message: DUPLICATE_TAGNAME
            });
        }
    
        const createdTag = await createTag({ tagName });
    
        return res.status(201).send({
            success: true,
            message: CREATED,
            comment: createdTag
        });
    }

    async getTagById(req: Request, res: Response) {
        const {id} = req.params;
        //checks if the Id passed in is a valid Id
        if(!isObjectId(id)){
            return res.status(404).send({
                success: false,
                message: NOT_ID
            });
        }
        //checks if tag exists
        const tag = await findById(id);

        //if tag exists, return tag
        if (await findById(id)) {
            return res.status(200).send({
                success: true,
                message: FETCHED,
                comment: tag
            });
        }
        //returns an error if tag doesn't exist
        return res.status(404).send({
            success: false,
            message: INVALID_ID
        });
    }
    
    async getTags(req: Request, res: Response) {
        const tag = await getAll();
        return res.status(200).send({
            success: true,
            message: FETCHEDALL,
            comments: tag
        });
    }

    async updateById(req: Request, res: Response) {
        const {id} = req.params;
        const data = req.body.textContent;

        //checks if the Id passed in is a valid Id
        if(!isObjectId(id)){
            return res.status(404).send({
                success: false,
                message: NOT_ID
            });
        }

        //check if id is valid
        if(!(await findById(id))) {
            return res.status(404).send({
                success: false,
                message: INVALID_ID
            })
        }
        const updatedTag = await updateById(id, data);
        return res.status(200).send({
            success: true,
            message: UPDATED,
            updatedComment: updatedTag
        });
    }

    async deleteById(req: Request, res: Response) {
        const {id} = req.params;

        //checks if the Id passed in is a valid Id
        if(!isObjectId(id)){
            return res.status(404).send({
                success: false,
                message: NOT_ID
            });
        }

        //check if id is valid
        if(!(await findById(id))) {
            return res.status(404).send({
                success: false,
                message: INVALID_ID
            })
        }
        await deleteById(id);
        return res.status(200).send({
            success: true,
            message: DELETED
        });
    }
}