import { NextFunction, Request, Response } from "express";
import AuthRequest from "../../interfaces/auth.interface";
import {MESSAGES} from "../../configs/constants.config";
import User from "../../services/user.service";
const UserService = new User();

export default async function authorize(req: Request, res: Response, next: NextFunction){
    //confirms that id passed in exist in order to make the respose more specific
    const user = await UserService.findById(req.params.userId);
    if(!user) {
        return res.status(401)
            .send({ 
                success: false,
                message: MESSAGES.USER.INVALID_ID
            });
    }
    //authorizes a user to only perform action on resources that belongs to him
    if((req as AuthRequest).user.id !== req.params.userId) {
        return res.status(403)
            .send({
                success: false,
                message: MESSAGES.AUTH.DENIED
            });
    }
    next();
}