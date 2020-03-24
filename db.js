const Sequelize = require('sequelize');

const db = new Sequelize('postgres://postgres:1@localhost:5432/cinema');

module.exports = {
    db,
}