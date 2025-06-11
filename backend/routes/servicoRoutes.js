// backend/routes/servicoRoutes.js
import express from 'express';
import { criarServico, listarServicos } from '../controllers/servicoController.js';

const router = express.Router();

router.post('/servicos', criarServico);
router.get('/servicos', listarServicos); 

export default router;
