export function createModel(db, Sequelize) {
  const MovieTimes = db.define("movie_time", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      primaryKey: true,
    },
    time: {
      type: Sequelize.TIME,
      primaryKey: true,
    },
  });
  return MovieTimes;
}
