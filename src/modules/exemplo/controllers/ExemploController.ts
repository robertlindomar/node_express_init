import { Request, Response, NextFunction } from "express";
import { ExemploService } from "../services/ExemploService";

export class ExemploController {
  private service = new ExemploService();

  listar(req: Request, res: Response, next: NextFunction) {
    try {
      const lista = this.service.listar();
      return res.json(lista);
    } catch (error) {
      next(error);
    }
  }

  buscarPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const exemplo = this.service.buscarPorId(Number(id));
      return res.json(exemplo);
    } catch (error) {
      next(error);
    }
  }

  criar(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome } = req.body;
      const exemplo = this.service.criar(nome);
      return res.status(201).json(exemplo);
    } catch (error) {
      next(error);
    }
  }

  atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const atualizado = this.service.atualizar(Number(id), nome);
      return res.json(atualizado);
    } catch (error) {
      next(error);
    }
  }

  deletar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      this.service.deletar(Number(id));
      return res.json({ message: "Excluído com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
