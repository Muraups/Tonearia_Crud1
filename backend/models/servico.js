// backend/models/Servico.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Servico = sequelize.define('Servico', {
  cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valorServico: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  gasto: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  }
});

export default Servico;
