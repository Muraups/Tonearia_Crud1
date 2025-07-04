// backend/routes/servicoRoutes.js
import express from 'express';
import { criarServico, listarServicos, buscarServicoPorId, atualizarServico, deletarServico } from '../controllers/servicoController.js';

const router = express.Router();

router.post('/servicos', criarServico);
router.get('/servicos', listarServicos);
router.get('/servicos/:id', buscarServicoPorId); 
router.put('/servicos/:id', atualizarServico);   
router.delete('/servicos/:id', deletarServico); 
export default router;
