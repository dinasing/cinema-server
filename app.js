import express from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import cors from "cors";

import indexRouter from "./routes/index";
import cinemaRouter from "./routes/cinema.route";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import movieRouter from "./routes/movie.route";
import movieTimeRouter from "./routes/movieTime.route";
import cinemaHallRouter from "./routes/cinemaHall.route";

require("./passport.js");

export let app = express();

const db = require("./models/index");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/cinema", cinemaRouter);
app.use("/movie", movieRouter);
app.use("/cinema-hall", cinemaHallRouter);
app.use("/movie-time", movieTimeRouter);
app.use("/auth", authRouter);
app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);
