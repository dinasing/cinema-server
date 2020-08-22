export function createModel(db, Sequelize) {
  const Tickets = db.define("ticket", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    row: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    seat: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });
  return Tickets;
}
