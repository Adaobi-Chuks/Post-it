import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {MESSAGES, SECRET} from "../../configs/constants.config";
import AuthRequest from "../../interfaces/auth.interface";
import User from "../../services/user.service";
const UserService = new User();

// check if json web token exists & is verified
export default function authenticate(req: Request, res: Response, next: NextFunction){
    let token = req.cookies.token || req.header("token");
    if (!token) {
        return res.status(401)
            .send({
                success: false,
                message: MESSAGES.AUTH.TOKENERROR
            });
    }
    jwt.verify(token, SECRET, async (err: any, decoded: any) => {
        if (err) {
            return res.status(401)
                .send({ 
                    success: false,
                    message: MESSAGES.AUTH.INVALIDTOKEN
                });
        } else {
            const user = await UserService.findById(decoded.id);
            if(!user) {
                return res.status(401)
                .send({ 
                    success: false,
                    message: MESSAGES.USER.INVALID_ID
                });
            }
            // Add the decoded token to the request object for future use
            (req as AuthRequest).user = decoded;
            next();
        }
    });
    
}