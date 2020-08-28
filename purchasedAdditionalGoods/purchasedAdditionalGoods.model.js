export function createModel(db, Sequelize) {
  const PurchasedAdditionalGoods = db.define("purchased_additional_goods", {
    number: {
      type: Sequelize.INTEGER,
    },
  });
  return PurchasedAdditionalGoods;
}
