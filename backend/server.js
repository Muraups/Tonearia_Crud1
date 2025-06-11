// backend/server.js
import express from 'express';
import sequelize from './config/database.js';
import servicoRoutes from './routes/servicoRoutes.js';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', servicoRoutes);
app.use('/api/servicos', servicoRoutes);


sequelize.sync().then(() => {
  console.log('🟢 Banco sincronizado');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Erro ao conectar ao banco:', err);
});
