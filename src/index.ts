import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import Growdever from './growdever';
import Recado from './recado';
import * as middlewares from './middleware/middlewares';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

dotenv.config();

export const growdevers: any = [
    {
        username: 'pamidoida',
        password: '1234',
        recados: [],
    },
    {
        username: 'angusyoung',
        password: '4321',
        recados: [],
    }
];

export let globalToken: string = ';'

app.get('/growdevers', (request: Request, response: Response) => {
    return response.json(growdevers);
});

app.get('/growdevers/:username', middlewares.validarUsername,
    (request: Request, response: Response) => {
    const { username } = request.params;

    return response.json();
});

app.put('/growdevers/:username', middlewares.validarUsername,
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

app.post('/growdevers', middlewares.validarParametros, (request: Request, response: Response) => {
    const { username, password } = request.body;

    if(username === growdevers.username && password === username.password) {
        globalToken = Math.random().toString(36).substring(2);

        return response.json({
            token: globalToken
        })
    }    
});

app.put('/growdevers/:username', middlewares.validarUsername,
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

app.get('/growdevers/:username', middlewares.validarUsername, (request: Request, response: Response) => {
    const { username } = request.params;

    return response.json({
        username: '',
        nome: '',
        idade: '',
        turma: '',
        cidade: '',
    })
});

app.delete('/growdevers/:username', middlewares.validarUsername, (request: Request, response: Response) => {
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

app.get('/:username/recados', (request: Request, response: Response) => {
    return response.send('Usuário com acesso')
});