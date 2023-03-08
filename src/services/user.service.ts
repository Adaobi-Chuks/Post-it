import IUser from "../interfaces/user.interface";
import User from "../models/user.model";

export default class UserService {

    async findByEmail(email: string) {
        return await User.findOne({email}, "-__v");
    }

    async findByUserName(userName: string) {
        return await User.findOne({userName}, "-__v");
    }

    async createUser(user: Partial<IUser>) {
        return await User.create(user);
    }

    async findById(id: string) {
        return await User.findById(id, "-__v");
    }

    async getAllUsers() {
        return await User.find({}, "-__v");
    }

    async editById(id: string, obj: Partial<IUser>) {
        return await User.findByIdAndUpdate(id, { $set: obj }, { new: true });
    }

}