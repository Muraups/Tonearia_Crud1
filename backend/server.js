// backend/server.js

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import servicoRoutes from "./routes/servicoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import { sequelize } from "./models/index.js";
import cors from "cors";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/api", servicoRoutes);
app.use("/api", clienteRoutes);

app.use(express.static(path.join(__dirname, "../frontend/html")));
app.use("/css", express.static(path.join(__dirname, "../frontend/css")));
app.use("/js", express.static(path.join(__dirname, "../frontend/js")));

// inicia conexão com banco
sequelize.sync().then(() => {
  console.log("🟢 Banco sincronizado");
}).catch((err) => {
  console.error("❌ Erro ao conectar ao banco:", err);
});

// Exporta para o Vercel usar
export default app;
