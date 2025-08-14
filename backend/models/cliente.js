// backend/models/cliente.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    endereco: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'clientes',
    timestamps: false // A tabela não tem createdAt/updatedAt
});

export default Cliente;