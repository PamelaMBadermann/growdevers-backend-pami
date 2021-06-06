export default class Recado {
    public id: number;
    public descricao: string;
    public detalhamento: string;

    constructor (id: number, descricao: string, detalhamento: string) {
        this.id = id;
        this.descricao = descricao;
        this.detalhamento = detalhamento;
    }
}