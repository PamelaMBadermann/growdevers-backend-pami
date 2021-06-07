import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Growdever from './growdever';
import Recado from './recado';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

dotenv.config();

const growdevers: any = [
    {
        username: 'pamidoida',
        nome: 'Pamela',
        idade: 18,
        turma: 'AAA',
        cidade: 'Taquara',
        recados: [],
    },
    {
        username: 'angusyoung',
        nome: 'Angus',
        idade: 3,
        turma: 'BBB',
        cidade: 'Taquara',
        recados: [],
    }
];

app.get('/growdevers', (request: Request, response: Response) => {
    return response.json(growdevers);
});

async function validarParametros(request: Request, response: Response, next: NextFunction) {
    const { username, password, nome, idade, turma, cidade } = request.body;

    if(!username || !password || !nome || !idade || !turma || !cidade) {
        return response.json({
            mensagem: 'Dados inválidos!'
        }).status(400);
    }

    next();
}

let globalToken: string = ';'

async function validarToken(request: Request, response: Response, next: NextFunction) {
    const { token } = request.query;

    if (!token || token !== globalToken) {
        return response.json({
            mensagem: 'Token inválido.'
        }).status(401);
    }
    
    next();
}

app.post('/login', validarParametros, (request: Request, response: Response) => {
    const { username, password } = request.body;

    if(username === growdevers.username && password === username.password) {
        globalToken = Math.random().toString(36).substring(2);

        return response.json({
            token: globalToken
        })
    }    
});

app.get('/:username/recados', (request: Request, response: Response) => {
    return response.send('Usuário com acesso')
});
// --------
async function validarUsername(request: Request, response: Response, next: NextFunction) {
    const { username } = request.params;

    if (!username) {
        return response.json({
            mensagem: 'Precisamos de um Username para começar =('
        }).status(400);
    }

    next();
}

app.put('/growdevers/:username', [validarParametros, validarUsername],
    (request: Request, response: Response) => {
    const { username } = request.params;
    const { nome, idade, turma, cidade } = request.body;

    const index = growdevers.findIndex((growdever: any) => growdever.username == username)

    if (index < 0) {
        return response.json({
            mensagem: 'Growdever não encontrado!'
        }).status(404);
    }

    growdevers[index] = {
        username,
        nome,
        idade,
        turma,
        cidade
    }

    return response.json(growdevers[index]);
});

app.get('/growdevers/:username', [validarUsername], (request: Request, response: Response) => {
    const { username } = request.params;

    return response.json({
        username: '',
        nome: '',
        idade: '',
        turma: '',
        cidade: '',
    })
});

app.delete('/growdevers/:username', (request: Request, response: Response) => {
    const { username } = request.params;

    if (!username) {
        return response.json({
            mensagem: 'Username inválido'
        });

    }

    const index = growdevers.findIndex((growdever: any) => growdever.username == username);

    growdevers.splice(index, 1);

    return response.sendStatus(204);
});

app.listen(process.env.PORT || 8080, () => {
    console.log('API rodando... ♥')
});