const Sequelize = require('sequelize');

const db = new Sequelize('postgres://postgres:1@localhost:5432/cinema');

const Roles = db.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}
)

db.sync()

module.exports = {
    db,
}