export default interface IUser {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    avatarURL: string;
    imageTag: string;
    dateOfBirth: Date;
    bio: string;
    gender: string;
    location: string;
    isDeleted: boolean;
    role: string
}
export interface IUserWithId extends IUser {
    _id?: string;
    id?: string;
}