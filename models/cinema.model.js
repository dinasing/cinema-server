export function createModel(db, Sequelize) {
  const Cinemas = db.define("cinema", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    city: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    address: {
      type: Sequelize.TEXT,
    },
    photo: {
      type: Sequelize.TEXT,
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  return Cinemas;
}
