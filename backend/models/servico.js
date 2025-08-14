// backend/models/servico.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Servico = sequelize.define('Servico', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clienteId: { // Alterado de 'cliente' para 'clienteId'
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'id'
        }
    },
    servico: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    valorServico: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
       // field: 'valorservico' // Mapeia para a coluna do DB
    },
    gasto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
    }
    // Os campos createdAt e updatedAt são gerenciados pelo Sequelize por padrão
}, {
    tableName: 'servicos',
    // Timestamps já são true por padrão, o que corresponde às suas colunas
});

export default Servico;