import express from "express";
import dotenv from "dotenv";
dotenv.config();
import database from "./configs/database.config";
import {PORT} from "./configs/constants.config";

const app = express();

app.listen(PORT, () => {
    database();
    console.log(`Server started on port: ${PORT}`);
});