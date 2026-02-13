import "dotenv/config";
import express from "express";
import cors from "cors";
import { routes } from "./routes";
import { errorHandler } from "./shared/middlewares/errorHandler";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Rotas
app.use(routes());

// Error handler (sempre por último)
app.use(errorHandler);

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

export { app };
