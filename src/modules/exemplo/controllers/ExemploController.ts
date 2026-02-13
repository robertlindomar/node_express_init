import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors/AppError";

export class ExemploController {
  listar(req: Request, res: Response, next: NextFunction) {
    try {
      const lista = [];

      if (!lista.length) {
        throw new AppError("Nenhum registro encontrado", 404);
      }

      return res.json(lista);
    } catch (error) {
      next(error);
    }
  }

  criar(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome } = req.body;

      if (!nome) {
        throw new AppError("O campo nome é obrigatório", 400);
      }

      return res.status(201).json({ message: "Criado com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
