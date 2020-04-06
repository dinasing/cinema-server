import Sequelize from "sequelize";
import config from "config";
import { createModel as createCinemaModel } from "./cinema.model";
import { createModel as createUserModel } from "./user.model";
import { createModel as createMovieModel } from "./movie.model";

const sequelize = new Sequelize(config.get("postgresURI"));

export const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.cinema = createCinemaModel(sequelize, Sequelize);
db.movie = createMovieModel(sequelize, Sequelize);
db.user = createUserModel(sequelize, Sequelize);
db.sequelize.sync();
