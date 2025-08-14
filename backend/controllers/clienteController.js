import { Cliente } from '../models/index.js';

// Listar todos os clientes
export const listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            order: [['nome', 'ASC']]
        });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar clientes', erro: error.message });
    }
};

// Criar um novo cliente (opcional, pode ser feito junto com o serviço)
export const criarCliente = async (req, res) => {
    try {
        const novoCliente = await Cliente.create(req.body);
        res.status(201).json(novoCliente);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao criar cliente', erro: error.message });
    }
};