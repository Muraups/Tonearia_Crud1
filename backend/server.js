// backend/server.js
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import express from 'express';
//import sequelize from './config/database.js';
import servicoRoutes from './routes/servicoRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js'; // Importe as novas rotas
import { sequelize } from './models/index.js'; // Importa para iniciar a conexão
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());
app.use('/api', servicoRoutes);
app.use('/api', clienteRoutes);

app.use(express.static(path.join(__dirname, '../frontend/html'))); // Para servir os HTMLs diretamente
app.use('/css', express.static(path.join(__dirname, '../frontend/css'))); // Para servir CSS
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));   // Para servir JS


sequelize.sync().then(() => {
  console.log('🟢 Banco sincronizado');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Erro ao conectar ao banco:', err);
});
