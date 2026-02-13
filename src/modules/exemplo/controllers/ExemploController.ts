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
