export function createModel(db, Sequelize) {
  const MovieTimePrices = db.define("movie_time_price", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    price: {
      type: Sequelize.REAL,
    },
  });
  return MovieTimePrices;
}
