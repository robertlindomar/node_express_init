import { Exemplo } from "../models/Exemplo";

export class ExemploRepository {
  private exemplos: Exemplo[] = [];
  private currentId = 1;

  listar(): Exemplo[] {
    return this.exemplos;
  }

  buscarPorId(id: number): Exemplo | undefined {
    return this.exemplos.find((e) => e.id === id);
  }

  criar(exemplo: Exemplo): Exemplo {
    exemplo.id = this.currentId++;
    this.exemplos.push(exemplo);
    return exemplo;
  }

  atualizar(id: number, novoNome: string): Exemplo | undefined {
    const exemplo = this.buscarPorId(id);
    if (!exemplo) return undefined;
    exemplo.nome = novoNome;
    return exemplo;
  }

  deletar(id: number): boolean {
    const index = this.exemplos.findIndex((e) => e.id === id);
    if (index === -1) return false;
    this.exemplos.splice(index, 1);
    return true;
  }
}
