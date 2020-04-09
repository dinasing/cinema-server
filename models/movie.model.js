export function createModel(db, Sequelize) {
  const Movies = db.define("movie", {
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
    genre: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    release_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    language: {
      type: Sequelize.TEXT,
    },
    description: {
      type: Sequelize.TEXT,
    },
    poster: {
      type: Sequelize.TEXT,
    },
  });

  return Movies;
}
