import { ExemploRepository } from "../repositories/ExemploRepository";
import { Exemplo } from "../models/Exemplo";
import { AppError } from "../../../shared/errors/AppError";

export class ExemploService {
  
  private repository = new ExemploRepository();

  listar(): Exemplo[] {
    const lista = this.repository.listar();
    if (!lista.length) throw new AppError("Nenhum exemplo encontrado", 404);
    return lista;
  }

  buscarPorId(id: number): Exemplo {
    const exemplo = this.repository.buscarPorId(id);
    if (!exemplo) throw new AppError("Exemplo não encontrado", 404);
    return exemplo;
  }

  criar(nome: string): Exemplo {
    if (!nome) throw new AppError("O nome é obrigatório", 400);
    return this.repository.criar(new Exemplo(nome));
  }

  atualizar(id: number, nome: string): Exemplo {
    if (!nome) throw new AppError("O nome é obrigatório", 400);
    const atualizado = this.repository.atualizar(id, nome);
    if (!atualizado) throw new AppError("Exemplo não encontrado", 404);
    return atualizado;
  }

  deletar(id: number): void {
    const deletou = this.repository.deletar(id);
    if (!deletou) throw new AppError("Exemplo não encontrado", 404);
  }
}
