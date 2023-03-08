import express from "express";
import dotenv from "dotenv";
dotenv.config();
import database from "./config/database.config";
import {PORT} from "./config/constants.config";

const app = express();

app.listen(PORT, () => {
    database();
    console.log(`Server started on port: ${PORT}`);
});