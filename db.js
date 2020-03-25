import Sequelize from 'sequelize';

export const db = new Sequelize('postgres://postgres:1@localhost:5432/cinema');