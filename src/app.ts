import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import database from "./configs/database.config";
import rootRoute from "./routes/index.route";
import {PORT} from "./configs/constants.config";
// import asyncExpressError from "express-async-error";

const app = express();

// app.use(asyncExpressError());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.use("/api/v1", rootRoute);

app.listen(PORT, () => {
    database();
    console.log(`Server started on port: ${PORT}`);
});