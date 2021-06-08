import Recado from './recado';
export default class Growdever {
    public username: string;
    private password: string;
    public nome: string;
    public idade: number;
    public turma: string;
    public cidade: string;
    private recados: Array<Recado> = [];

    constructor(username: string, password: string, nome: string, idade: number, turma: string, cidade: string, recados: []) {
        this.username = username;
        this.password = password;
        this.nome = nome;
        this.idade = idade;
        this.turma = turma;
        this.cidade = cidade;
        this.recados = recados
    }

    addRecado(recado: Recado) {
        this.recados.push(recado)
    }
}