import Sequelize from 'sequelize';

import { createModel as createCinemaModel} from './cinema.model';
import { createModel as createUserModel} from './user.model';

const sequelize = new Sequelize('postgres://postgres:1@localhost:5432/cinema');

export const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.cinema = createCinemaModel(sequelize, Sequelize);
db.user = createUserModel(sequelize, Sequelize);
db.sequelize.sync();
