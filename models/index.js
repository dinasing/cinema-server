import Sequelize from "sequelize";
import config from "config";
import { createModel as createCinemaModel } from "../cinema/cinema.model";
import { createModel as createUserModel } from "../user/user.model";
import { createModel as createMovieModel } from "../movie/movie.model";
import { createModel as createMovieTimeModel } from "../movieTime/movieTime.model";
import { createModel as createCinemaHallModel } from "../cinemaHall/cinemaHall.model";
import { createModel as createSeatTypeModel } from "../seatType/seatType.model";
import { createModel as createMovieTimePriceModel } from "../movieTimePrice/movieTimePrice.model";

const sequelize = new Sequelize(config.get("postgresURI"));

export const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.cinema = createCinemaModel(sequelize, Sequelize);
db.movie = createMovieModel(sequelize, Sequelize);
db.user = createUserModel(sequelize, Sequelize);
db.cinemaHall = createCinemaHallModel(sequelize, Sequelize);
db.movieTime = createMovieTimeModel(sequelize, Sequelize);
db.movieTimePrice = createMovieTimePriceModel(sequelize, Sequelize);
db.seatType = createSeatTypeModel(sequelize, Sequelize);

db.cinemaHall.hasMany(db.seatType, {
  onDelete: "cascade",
});

db.seatType.belongsTo(db.cinemaHall, {
  foreignKey: {
    allowNull: false,
  },
});

db.cinema.hasMany(db.cinemaHall, {
  onDelete: "cascade",
});

db.cinema.hasMany(db.movieTime, {
  onDelete: "cascade",
});

db.cinemaHall.belongsTo(db.cinema, {
  foreignKey: {
    allowNull: false,
  },
});

db.movie.hasMany(db.movieTime, {
  onDelete: "cascade",
});

db.movieTime.belongsTo(db.cinema, {
  foreignKey: {
    allowNull: false,
  },
});

db.movieTime.belongsTo(db.movie, {
  foreignKey: {
    allowNull: false,
  },
});

db.movieTime.belongsTo(db.cinemaHall, {
  foreignKey: {
    allowNull: false,
    primaryKey: true,
  },
});

db.movieTimePrice.belongsTo(db.movieTime, {
  foreignKey: {
    allowNull: false,
    primaryKey: true,
  },
});

db.movieTime.hasMany(db.movieTimePrice, {
  onDelete: "cascade",
});

db.movieTimePrice.belongsTo(db.seatType, {
  foreignKey: {
    allowNull: false,
    primaryKey: true,
  },
});

db.seatType.hasMany(db.movieTimePrice, {
  onDelete: "cascade",
});

db.sequelize.sync();
