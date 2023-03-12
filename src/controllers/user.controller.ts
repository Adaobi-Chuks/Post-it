import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { MAXAGE, MESSAGES } from "../configs/constants.config";
import UserService from "../services/user.service";
import { generateAuthToken } from "../utils/authToken.util";
import { IUserWithId } from "../interfaces/user.interface";
import { generateRandomAvatar } from "../utils/randomAvatarURL.util";
const {
    findByEmail,
    findByUserName,
    findByUserNameWithP,
    createUser,
    findById,
    getAllUsers,
    editById,
    deleteById
} = new UserService();
const {
    DUPLICATE_EMAIL,
    DUPLICATE_USERNAME,
    CREATED,
    INVALID_USERNAME,
    INVALID_PASSWORD,
    INVALID_ID,
    FETCHED,
    FETCHEDALL,
    UPDATED,
    DELETED,
    LOGGEDIN,
    LOGGEDOUT
} = MESSAGES.USER;

export default class UserController {

    async createUser(req: Request, res: Response) {
        const {email, userName} = req.body;

        //checks if another user with email exists
        if (await findByEmail(email)) {
            //sends an error if the email exists
            return res.status(409)
            .send({
                success: false,
                message: DUPLICATE_EMAIL
            });
        }
        //checks if another user with userName exists
        if (await findByUserName(userName)) {
            //sends an error if the userName exists
            return res.status(409)
            .send({
                success: false,
                message: DUPLICATE_USERNAME
            });
        }
        //creates a user if the email and username doesn't exist
        const createdUser = await createUser(req.body);
        const token = generateAuthToken(createdUser as any);
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: MAXAGE * 1000 
        });
        return res.header("token", token).status(201)
            .send({
                success: true,
                message: CREATED,
                createdUser: createdUser
            });
    }

    async getUserByHandle(req: Request, res: Response) {
        //checks if user exists
        const user = await findByUserName(req.params.userHandle);
    
        if (!user) {
          return res.status(404).send({
            success: false,
            message: INVALID_USERNAME
          });
        }
        return res.status(200).send({
          success: true,
          message: FETCHED,
          returnedUser: user
        });
    }

    async getUserById(req: Request, res: Response) {
        //checks if user exists
        const user = await findById(req.params.userId);
    
        if (!user) {
          return res.status(404).send({
            success: false,
            message: INVALID_ID
          });
        }
        return res.status(200).send({
          success: true,
          message: FETCHED,
          returnedUser: user
        });
    }

    async getUsers(req: Request, res: Response) {
        const users = await getAllUsers();
        return res.status(200).send({
          success: true,
          message: FETCHEDALL,
          returnedUsers: users
        });
    }

    async editUserById(req: Request, res: Response) {
        const id = req.params.userId;
        const data = req.body;
        const userToEdit = await findById(id);
        
        //use the id to check if the user exists
        if(!userToEdit) {
            return res.status(404).json({
                success: false,
                message: INVALID_ID
            })
        }
        //check if email already exist if the email needs to be updated
        if(data.email){
            const userEmailWithEmail  = await findByEmail(data.email)
            if(userEmailWithEmail){
                if(userEmailWithEmail._id.toString() !== id){
                    return res.status(403).json({
                        success: false,
                        message: DUPLICATE_EMAIL
                    })
                }
            }
        }
        //check if username already exist if the username needs to be updated
        if(data.username){
            const userWithUsername  = await findByUserName(data.username)
            if(userWithUsername){
                if(userWithUsername._id.toString() !== id){
                    return res.status(403).json({
                        success: false,
                        message: DUPLICATE_USERNAME
                    })
                }
            }
        }
        const updatedUser = await editById(id, data);
        //regenerating token cuz user details was changed
        const token = generateAuthToken(updatedUser as any);
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: MAXAGE * 1000 
        });
        return res.header("token", token).status(200).json({
            success: true,
            message: UPDATED,
            editedUser: updatedUser
        })
    }

    async deleteById(req: Request, res: Response) {
        const id = req.params.userId;

        //check to see if a user with id exists
        const userToDelete = await findById(id);
        //deletes the user if the id exist
        if(userToDelete) {
            const userDeleted = await deleteById(id);
            if(userDeleted) {
                return res.status(201).send({
                    success: true,
                    message: DELETED
                });
            }
        }
        //A user shouldn't have access to unauthenticated requests if the user deletes his/her account
        const token = generateAuthToken(userToDelete as any);
        res.cookie(token, "", {
            httpOnly: true, maxAge: MAXAGE * 1000
        });
        //sends an error if the id doesn't exists
        return res.header(token, "")
            .status(404)
            .send({
                success: false,
                message: INVALID_ID
            });   
    }

    async login(req: Request, res: Response) {
        const {userName, password} = req.body;
        const _user = await findByUserNameWithP(userName);
        if (!_user) {
            return res.status(400)
            .send({ 
                success: false, 
                message: INVALID_USERNAME
            });
        }
        
        const validPassword = await bcrypt.compare(password, _user.password);
        if (!validPassword) {
            return res.status(400)
            .send({ 
                success: false, 
                message: INVALID_PASSWORD
            });
        }
        const token = generateAuthToken(_user as unknown as IUserWithId);
        res.cookie("token", token, { 
            httpOnly: true, 
            maxAge: MAXAGE * 1000
        });
        return res.header('token', token).status(200).send({
            success: true,
            message: LOGGEDIN,
            user: _user 
        });
    }

    async logout(req: Request, res: Response) {
        res.cookie("token", '', {
            httpOnly: true, maxAge: 1 
        });
        return res.header('token', '').status(200).send({
            success: true,
            message: LOGGEDOUT
        });
    }
}