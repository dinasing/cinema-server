export function createModel(db, Sequelize) {
  const AdditionalGoods = db.define("additional_goods", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT,
    },
  });

  return AdditionalGoods;
}
