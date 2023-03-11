import { NextFunction, Request, Response } from "express";
import AuthRequest from "../../interfaces/auth.interface";
import {MESSAGES} from "../../configs/constants.config";

export default function authorize(req: Request, res: Response, next: NextFunction){
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