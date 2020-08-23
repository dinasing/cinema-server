export function createModel(db, Sequelize) {
  const MovieTimeAdditionalGoodsPrices = db.define(
    "movie_time_additional_goods_price",
    {
      price: {
        type: Sequelize.REAL,
      },
    }
  );
  return MovieTimeAdditionalGoodsPrices;
}
