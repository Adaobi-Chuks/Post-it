import Joi from "joi";

const createSchema = Joi.object({
    tagName: Joi.string().min(1).max(50).trim().required().lowercase(),
    isDeleted: Joi.forbidden()
});

const editSchema = Joi.object({
    tagName: Joi.string().min(1).max(50).trim().optional().lowercase(),
    isDeleted: Joi.forbidden()
});

export {
    createSchema,
    editSchema
}