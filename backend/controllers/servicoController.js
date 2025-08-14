import { Servico, Cliente } from '../models/index.js'; // Importa de models/index.js

export const criarServico = async (req, res) => {
    try {
        // Agora esperamos um 'clienteId' no corpo da requisição
        const novoServico = await Servico.create(req.body);
        res.status(201).json(novoServico);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao criar serviço', erro: error.message });
    }
};

export const listarServicos = async (req, res) => {
    try {
        const servicos = await Servico.findAll({
            include: [{
                model: Cliente,
                as: 'cliente', // Este 'as' deve corresponder ao definido na associação
                attributes: ['nome'] // Pega apenas o nome do cliente
            }],
            order: [['createdAt', 'DESC']]
        });
        res.json(servicos);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar serviços', erro: error.message });
    }
};

export const buscarServicoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const servico = await Servico.findByPk(id, {
            include: [{
                model: Cliente,
                as: 'cliente',
                attributes: ['id', 'nome'] // Inclui o cliente associado
            }]
            // Aqui você pode incluir outros modelos como Materiais também
        });

        if (!servico) {
            return res.status(404).json({ mensagem: 'Serviço não encontrado' });
        }
        res.json(servico);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar serviço', erro: error.message });
    }
};

export const atualizarServico = async (req, res) => {
    try {
        const { id } = req.params;
        const [numLinhasAtualizadas] = await Servico.update(req.body, {
            where: { id: id }
        });

        if (numLinhasAtualizadas === 0) {
            return res.status(404).json({ mensagem: 'Serviço não encontrado para atualização' });
        }

        const servicoAtualizado = await Servico.findByPk(id);
        res.json({ mensagem: 'Serviço atualizado com sucesso!', servico: servicoAtualizado });
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao atualizar serviço', erro: error.message });
    }
};

export const deletarServico = async (req, res) => {
    try {
        const { id } = req.params;
        const numLinhasDeletadas = await Servico.destroy({
            where: { id: id }
        });

        if (numLinhasDeletadas === 0) {
            return res.status(404).json({ mensagem: 'Serviço não encontrado para exclusão' });
        }

        res.status(200).json({ mensagem: 'Serviço excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir serviço', erro: error.message });
    }
};