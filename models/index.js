import Sequelize from 'sequelize';

import { createModel } from './cinema.model';

const sequelize = new Sequelize('postgres://postgres:1@localhost:5432/cinema');

export const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.cinema = createModel(sequelize, Sequelize);
db.sequelize.sync();
