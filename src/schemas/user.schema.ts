import Joi from "joi";
import { ENUM } from "../configs/constants.config";

const createSchema = Joi.object({
    fullName: Joi.string().required().min(3).max(100).trim(),
    userName: Joi.string().required().min(8).max(25).trim(),
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required().min(6).max(50),
    avatarURL: Joi.forbidden(),
    //".iso" ensures that the dateOfBirth field is a valid ISO-formatted date
    dateOfBirth: Joi.date().iso().required(),
    bio: Joi.string().trim().allow(null).optional(),
    gender: Joi.string().required().valid(ENUM.MALE, ENUM.FEMALE).trim(),
    location: Joi.string().trim().optional(),
    isDeleted: Joi.forbidden(),
    role: Joi.string().valid(ENUM.REGISTEREDUSER, ENUM.ADMIN).default(ENUM.REGISTEREDUSER).trim().lowercase().optional()
});

const editSchema = Joi.object({
    fullName: Joi.string().optional().min(3).max(100).trim(),
    userName: Joi.string().optional().min(8).max(25).trim(),
    email: Joi.string().email().optional().lowercase().trim(),
    password: Joi.string().optional().min(6).max(50),
    avatarURL: Joi.forbidden(),
    dateOfBirth: Joi.date().iso().optional(),
    bio: Joi.string().trim().allow(null).optional(),
    gender: Joi.string().optional().valid(ENUM.MALE, ENUM.FEMALE).trim(),
    location: Joi.string().trim().optional(),
    isDeleted: Joi.forbidden(),
    role: Joi.string().valid(ENUM.REGISTEREDUSER, ENUM.ADMIN).default(ENUM.REGISTEREDUSER).trim().lowercase().optional()
});

const loginSchema = Joi.object({
    userName: Joi.string().required().min(8).max(25).trim(),
    password: Joi.string().required().min(6).max(50),
});

export {
    createSchema,
    editSchema,
    loginSchema
}