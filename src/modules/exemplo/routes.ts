import { Router } from "express";
import { ExemploController } from "./controllers/ExemploController";

export function exemploRoutes() {
  const router = Router();
  const controller = new ExemploController();

  router.get("/", (req, res, next) => controller.listar(req, res, next));

  router.get("/:id", (req, res, next) =>
    controller.buscarPorId(req, res, next),
  );

  router.post("/", (req, res, next) => controller.criar(req, res, next));

  router.put("/:id", (req, res, next) => controller.atualizar(req, res, next));

  router.delete("/:id", (req, res, next) => controller.deletar(req, res, next));

  return router;
}
