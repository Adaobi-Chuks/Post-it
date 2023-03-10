import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { MAXAGE, MESSAGES } from "../configs/constants.config";
import UserService from "../services/user.service";
import { generateAuthToken } from "../utils/authToken.util";
import { IUserWithId } from "../interfaces/user.interface";
const {
    findByEmail,
    findByUserName,
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
        const data = req.body;
        const email = data.email;
        const userName = data.userName;

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
        const createdUser = await createUser(data);
        const token = generateAuthToken(createdUser as any);
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: MAXAGE * 1000 
        });
        return res.header("token", token).status(201)
            .send({
                success: true,
                message: CREATED,
                data: {createdUser, token}
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
          data: user
        });
    }

    async getUserById(req: Request, res: Response) {
        //checks if user exists
        const user = await findById(req.params.id);
    
        if (!user) {
          return res.status(404).send({
            success: false,
            message: INVALID_ID
          });
        }
        return res.status(200).send({
          success: true,
          message: FETCHED,
          data: user
        });
    }

    async getUsers(req: Request, res: Response) {
        const users = await getAllUsers();
        return res.status(200).send({
          success: true,
          message: FETCHEDALL,
          data: users
        });
    }

    async editUserById(req: Request, res: Response) {
        const id = req.params.id;
        const data = req.body;
        //use the id to check if the user exists
        if(!(await findById(id))) {
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
        const updatedUser = await editById(id, data)
        return res.status(200).json({
            success: true,
            message: UPDATED,
            data: updatedUser
        })
    }

    async deleteById(req: Request, res: Response) {
        const id = req.params.id;

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
        //sends an error if the id doesn't exists
        return res.status(404)
            .send({
                success: false,
                message: INVALID_ID
            });   
    }

    async login(req: Request, res: Response) {
        const {userName, password} = req.body;
        const user = await findByUserName(userName);
        if (!user) {
            return res.status(400)
            .send({ 
                success: false, 
                message: INVALID_USERNAME
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400)
            .send({ 
                success: false, 
                message: INVALID_PASSWORD
            });
        }
        const token = generateAuthToken(user as unknown as IUserWithId);
        res.cookie("token", token, { 
            httpOnly: true, 
            maxAge: MAXAGE * 1000
        });
        return res.header('token', token).status(200).send({
            success: true,
            message: LOGGEDIN,
            data: { user, token }
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