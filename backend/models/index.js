import { DataTypes } from 'sequelize'; // ✅ ADICIONE ESTA LINHA
import sequelize from '../config/database.js';
import Cliente from './cliente.js';
import Servico from './servico.js';
import Material from './material.js';

// Relação Cliente <-> Servico (Um-para-Muitos)
Cliente.hasMany(Servico, { foreignKey: 'clienteId', as: 'servicos' });
Servico.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

// Relação Servico <-> Material (Muitos-para-Muitos)
// A tabela 'servico_materiais' será a tabela de junção.
const ServicoMaterial = sequelize.define('ServicoMaterial', {
    quantidade_utilizada: {
        type: DataTypes.INTEGER, // Agora 'DataTypes' será reconhecido
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'servico_materiais',
    timestamps: false
});

Servico.belongsToMany(Material, {
    through: ServicoMaterial,
    foreignKey: 'id_servico',
    otherKey: 'id_material',
    as: 'materiais'
});
Material.belongsToMany(Servico, {
    through: ServicoMaterial,
    foreignKey: 'id_material',
    otherKey: 'id_servico',
    as: 'servicos'
});

// Exporta todos os modelos para serem usados em outros lugares
export {
    sequelize,
    Cliente,
    Servico,
    Material,
    ServicoMaterial
};