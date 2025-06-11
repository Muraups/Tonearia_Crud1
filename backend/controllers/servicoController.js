// backend/controllers/servicoController.js
import Servico from '../models/servico.js';

export const criarServico = async (req, res) => {
  try {
    const novoServico = await Servico.create(req.body);
    res.status(201).json(novoServico);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar serviço', erro: error.message });
  }
};

export const listarServicos = async (req, res) => {
  try {
    const servicos = await Servico.findAll();
    res.json(servicos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar serviços', erro: error.message });
  }
};