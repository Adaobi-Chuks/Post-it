import { model, Schema } from "mongoose";
import {ENUM, SALTROUNDS, DATABASES} from "../configs/constants.config";
import bcrypt from "bcrypt";
import { generateRandomAvatar } from "../utils/randomAvatarURL.util";
import IUser from "../interfaces/user.interface";

const userSchema = new Schema({
    fullName: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 100, 
        trim: true
    },
    userName: {
        type: String, 
        required: true, 
        minlength: 8, 
        maxlength: 25,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    },
    avatarURL: {
        type: String,
        default: function() {
            // Call the generateRandomAvatar function to assign a random avatarURL to the user
            const _email: string = (this as IUser).email;
            const _avatarURL = generateRandomAvatar(_email);
            return _avatarURL;
        }
    },
    dateOfBirth: {
        type: Date,
        required: true,
        set: (value: string) => {
          //Convert the string value to a date object before saving
          return new Date(value);
        },
        get: (value: Date) => {
          // Convert the date object to a string value in the format "YYYY-MM-DD" when returned
          return value.toISOString().substring(0, 10);
        }
    },
    bio: {
        type: String, 
        required: false,
        trim: true,
        default: null
    },
    gender: {
        type: String, 
        required: true,
        enum: [ENUM.MALE, ENUM.FEMALE], 
        trim: true
    },
    location: {
        type: String, 
        required: true, 
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: [ENUM.REGISTEREDUSER, ENUM.ADMIN],
        default: ENUM.REGISTEREDUSER,
        trim: true,
        lowercase: true,
        required: false
    }
}, { 
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(SALTROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update: any = this.getUpdate();
    let passwordHash;
    //Only hash the password when the password field is to be updated to avoid rehashing already hashed password
    if (update.$set.password) {
        const salt = await bcrypt.genSalt(SALTROUNDS);
        passwordHash = await bcrypt.hash(update.$set.password, salt);
    }

    //get the email from the body or from the already saved user details
    let _email: string;
    if(update.$set.email) {
        _email = update.$set.email as string;
    } else {
        //this.Query() is used to get the argument and it's type passed in in the method that triggers this function
        const user = await this.model.findOne(this.getQuery());
        _email = user.email;
    }
    
    // Call the generateRandomAvatar function to assign a random avatarURL to the user when an update is made
    update.$set.avatarURL = generateRandomAvatar(_email);
    update.$set.password = passwordHash;
    update.$set.updatedAt = new Date();

    next();
});

const User = model(DATABASES.USER, userSchema);
export default User;