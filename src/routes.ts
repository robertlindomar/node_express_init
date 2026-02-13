import { Router } from "express";
import { exemploRoutes } from "./modules/exemplo/routes";

export function routes() {
  const router = Router();

  router.use("/exemplo", exemploRoutes());

  return router;
}
