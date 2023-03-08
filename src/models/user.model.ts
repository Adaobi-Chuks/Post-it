import { model, Schema } from "mongoose";
import {ENUM, SALTROUNDS, DATABASES} from "../config/constants.config";
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
            // Call the *** function to generate a random avatarURL
            const _email = (this as IUser).email;
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
        trim: true
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
    role: {
        type: String,
        enum: [ENUM.GUEST, ENUM.ADMIN],
        default: ENUM.GUEST,
        lowercase: true,
        required: true
    },
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
    if (update.$set.password) {
        const salt = await bcrypt.genSalt(SALTROUNDS);
        const passwordHash = await bcrypt.hash(update.$set.password, salt);
        this.setUpdate({ $set: {
            password: passwordHash
        }});
    }
    next()
});

const User = model(DATABASES.USER, userSchema);
export default User;