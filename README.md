Perfeito 👌
Vou juntar tudo em um **guia único organizado**, pronto para você copiar e salvar como `ARQUITETURA_NODE_TS.md` ou qualquer nome que quiser.

---

# 📦 Arquitetura Node + TypeScript + Express (Estrutura Modular)

Este guia mostra como:

* Criar o projeto do zero
* Configurar TypeScript
* Montar `server.ts`
* Criar `routes.ts` centralizador
* Criar módulos organizados
* Implementar `errorHandler`
* Rodar o projeto

---

# 1️⃣ Criando o Projeto

```bash
mkdir api-modular
cd api-modular
npm init -y
```

---

# 2️⃣ Instalando Dependências

### Dependências principais

```bash
npm install express cors dotenv
```

### Dependências de desenvolvimento

```bash
npm install -D typescript tsx @types/node @types/express @types/cors
```

---

# 3️⃣ Configurando o TypeScript

```bash
npx tsc --init
```

Edite o `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

# 4️⃣ Criando a Estrutura de Pastas

```bash
mkdir -p src/shared/middlewares
mkdir -p src/modules/exemplo/controllers
```

Estrutura final:

```
src/
├── server.ts
├── routes.ts
├── shared/
│   └── middlewares/
│       └── errorHandler.ts
└── modules/
    └── exemplo/
        ├── routes.ts
        └── controllers/
            └── ExemploController.ts
```

---

# 5️⃣ Criando o errorHandler

📁 `src/shared/middlewares/errorHandler.ts`

```ts
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  return res.status(err.status || 500).json({
    message: err.message || "Erro interno do servidor"
  });
}
```

⚠️ Sempre deve ser o último middleware no `server.ts`.

---

# 6️⃣ Criando o Módulo Exemplo

## 📁 Controller

📁 `src/modules/exemplo/controllers/ExemploController.ts`

```ts
import { Request, Response, NextFunction } from "express";

export class ExemploController {

  listar(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ message: "Listando exemplos" });
    } catch (error) {
      next(error);
    }
  }

  criar(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(201).json({ message: "Criado com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
```

---

## 📁 Rotas do módulo

📁 `src/modules/exemplo/routes.ts`

```ts
import { Router } from "express";
import { ExemploController } from "./controllers/ExemploController";

export function exemploRoutes() {
  const router = Router();
  const controller = new ExemploController();

  router.get("/", (req, res, next) =>
    controller.listar(req, res, next)
  );

  router.post("/", (req, res, next) =>
    controller.criar(req, res, next)
  );

  return router;
}
```

---

# 7️⃣ Criando o routes.ts Central

📁 `src/routes.ts`

```ts
import { Router } from "express";
import { exemploRoutes } from "./modules/exemplo/routes";

export function routes() {
  const router = Router();

  router.use("/exemplo", exemploRoutes());

  return router;
}
```

Aqui é onde você registra todos os módulos da aplicação.

---

# 8️⃣ Criando o server.ts

📁 `src/server.ts`

```ts
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
```

---

# 9️⃣ Scripts no package.json

Adicione:

```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---

# 🔟 Rodando o Projeto

```bash
npm run dev
```

Testar no navegador ou Postman:

```
GET http://localhost:3000/exemplo
POST http://localhost:3000/exemplo
```

---

# 📌 Fluxo da Requisição

```
Cliente
   ↓
server.ts
   ↓
routes.ts
   ↓
modules/exemplo/routes.ts
   ↓
ExemploController
   ↓
errorHandler (se houver erro)
```

---

# 📚 Responsabilidade de Cada Arquivo

| Arquivo               | Função                                  |
| --------------------- | --------------------------------------- |
| server.ts             | Configura o Express e inicia o servidor |
| routes.ts             | Centraliza todas as rotas dos módulos   |
| modules/[x]/routes.ts | Define rotas específicas do recurso     |
| Controller            | Contém a lógica da requisição           |
| errorHandler          | Trata erros globais                     |

---

# 🚀 Base pronta para evoluir

A partir dessa estrutura você pode adicionar:

* Service
* Repository
* Prisma
* JWT
* Validações
* DTOs
* AppError customizado
