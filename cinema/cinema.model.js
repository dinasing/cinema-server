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
      primaryKey: true,
    },
    city: {
      primaryKey: true,
      type: Sequelize.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      primaryKey: true,
      type: Sequelize.TEXT,
      unique: true,
      primaryKey: true,
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
