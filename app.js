import express from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import cors from "cors";

import indexRouter from "./routes/index";
import cinemaRouter from "./cinema/cinema.route";
import authRouter from "./routes/auth.route";
import userRouter from "./user/user.route";
import movieRouter from "./movie/movie.route";
import movieTimeRouter from "./movieTime/movieTime.route";
import cinemaHallRouter from "./cinemaHall/cinemaHall.route";

require("./passport.js");

export let app = express();

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

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "public/index.html"));
});
app.get("/favicon.ico", (req, res) => res.status(204));
