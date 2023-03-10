import { Request } from "express";
import { IUserWithId } from "./user.interface";

export default interface AuthRequest extends Request {
    user: IUserWithId
}