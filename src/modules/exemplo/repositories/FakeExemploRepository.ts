import { Exemplo } from "../models/Exemplo";

export class FakeExemploRepository {
  private exemplos: Exemplo[] = [
    { id: 1, nome: "Robert" },
    { id: 2, nome: "Milena" },
    { id: 3, nome: "João" },
  ];

  listar() {
    return this.exemplos;
  }
  criar(nome: string) {
    const novo = {
      id: this.exemplos.length + 1,
      nome,
    };

    this.exemplos.push(novo);
    return novo;
  }

  buscarPorId(id: number) {
    return this.exemplos.find((e) => e.id === id);
  }

  atualizar(id: number, nome: string) {
    const exemplo = this.buscarPorId(id);
    if (!exemplo) throw new Error("Exemplo não encontrado");

    exemplo.nome = nome;
    return exemplo;
  }

  deletar(id: number) {
    const indice = this.exemplos.findIndex((e) => e.id === id);
    if (indice === -1) throw new Error("Exemplo não encontrado");

    this.exemplos.splice(indice, 1);
  }
}
