import Joi from "joi";

const createSchema = Joi.object({
    textContent: Joi.string().min(3).max(200).trim().required(),
    userId: Joi.forbidden(),
    postId: Joi.forbidden(),
    isDeleted: Joi.forbidden()
});

const editSchema = Joi.object({
    textContent: Joi.string().min(3).max(200).trim().required(),
    userId: Joi.forbidden(),
    postId: Joi.forbidden(),
    isDeleted: Joi.forbidden()
});

export {
    createSchema,
    editSchema
}