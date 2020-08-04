import express from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import cors from "cors";
import errorhandler from "errorhandler";

import indexRouter from "./routes/index";
import cinemaRouter from "./cinema/cinema.route";
import authRouter from "./routes/auth.route";
import userRouter from "./user/user.route";
import movieRouter from "./movie/movie.route";
import movieTimeRouter from "./movieTime/movieTime.route";
import cinemaHallRouter from "./cinemaHall/cinemaHall.route";
import seatTypeRouter from "./seatType/seatType.route";

import("./passport.js");

export let app = express();

app.use(errorhandler());
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
app.use("/seat-type", seatTypeRouter);
app.use("/auth", authRouter);
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter);
app.get("/favicon.ico", (request, response) => response.status(204));

app.get("*", (request, response) => {
  response.sendFile(join(__dirname, "public/index.html"));
});

app.use((request, response, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, request, response, next) => {
  response.status(error.status || 500).send({ message: error.message });
});
