import { Router } from "express";
import { ExemploController } from "./controllers/ExemploController";

export function exemploRoutes() {
  const router = Router();
  const controller = new ExemploController();

  router.get("/", (req, res, next) => controller.listar(req, res, next));

  router.post("/", (req, res, next) => controller.criar(req, res, next));

  return router;
}
