export function createModel(db, Sequelize) {
  const SeatTypes = db.define("seat_type", {
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
    numberOfPeople: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return SeatTypes;
}
