import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import database from "./config/database.config";
import rootRoute from "./routes/index.route";
import {PORT} from "./config/constants.config";

const app = express();

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