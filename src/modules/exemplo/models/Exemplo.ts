export class Exemplo {
    id: number;
    nome: string;

    constructor(nome: string, id?: number) {
        this.nome = nome;
        if (id) this.id = id;
    }
}
