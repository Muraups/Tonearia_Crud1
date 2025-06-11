// backend/config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('GestorTornearia', 'postgres', '2279', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
