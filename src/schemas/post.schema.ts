import Joi from "joi";

const createSchema = Joi.object({
    textContent: Joi.string().min(3).max(300).trim().required(),
    tagName: Joi.string().min(1).max(50).trim().optional(),
    userId: Joi.forbidden(),
    isDeleted: Joi.forbidden()
});

const editSchema = Joi.object({
    textContent: Joi.string().min(3).max(300).trim().optional(),
    tagName: Joi.forbidden(),
    userId: Joi.forbidden(),
    isDeleted: Joi.forbidden()
});

export {
    createSchema,
    editSchema
}