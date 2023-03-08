import mongoose from "mongoose";
mongoose.set("strictQuery", true);
import {DATABASE_URI, MESSAGES} from "./constants.config";

export default function database() {
    mongoose.connect(DATABASE_URI!)
        .then(() => {
            console.log(MESSAGES.DATABASE.CONNECTED);
        })
        .catch((err) => {
            console.log(MESSAGES.DATABASE.ERROR, err);
        });
}