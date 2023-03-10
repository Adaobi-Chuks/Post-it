import { NextFunction, Request, Response } from "express";
import AuthRequest from "../../interfaces/auth.interface";
import {MESSAGES, ENUM} from "../../configs/constants.config";

export default function authorize(req: Request, res: Response, next: NextFunction){
    //authorizes a user to only perform action on resources that belongs to him
    console.log((req as AuthRequest).user.id);
    console.log(req);
    if((req as AuthRequest).user.id !== req.params.Id) {
        if((req as AuthRequest).user.role !== ENUM.ADMIN) {
            return res.status(403)
                .send({
                    success: false,
                    message: MESSAGES.AUTH.DENIED
                });
        }
    }
    next();
}