export function createModel(db, Sequelize) {
  const BookingTransaction = db.define("bookingTransaction", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });

  return BookingTransaction;
}
