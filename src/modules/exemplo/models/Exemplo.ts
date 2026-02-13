export class Exemplo {
  id?: number;
  nome: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(nome: string, id?: number) {
    this.nome = nome;
    if (id) this.id = id;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
