// backend/routes/servicoRoutes.js
import express from 'express';
// Importe a nova função deletarServico do controller
import { criarServico, listarServicos, buscarServicoPorId, atualizarServico, deletarServico } from '../controllers/servicoController.js';

const router = express.Router();

router.post('/servicos', criarServico);
router.get('/servicos', listarServicos);
router.get('/servicos/:id', buscarServicoPorId); // Rota para buscar um serviço por ID
router.put('/servicos/:id', atualizarServico);   // Rota para atualizar um serviço
router.delete('/servicos/:id', deletarServico); // NOVO: Rota para deletar um serviço

export default router;
