export function createModel(db, Sequelize) {
  const CinemaHall = db.define("cinema_hall", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.TEXT,
    },
    schema: {
      type: Sequelize.JSON,
    },
  });

  return CinemaHall;
}
