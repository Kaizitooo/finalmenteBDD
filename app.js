const express = require('express');

const bodyParser = require('body-parser');

const mysql = require('mysql');

const path = require('path');

 

const app = express();

const port = 3001;

 

// Configuração do body-parser

app.use(bodyParser.urlencoded({ extended: false }));

 

// Configuração do banco de dados

const db = mysql.createConnection({

    host: 'localhost',

    user: 'root', // Substitua pelo seu usuário do MySQL

    password: 'cimatec', // Substitua pela sua senha do MySQL

    database: 'leads', //nome de  seu banco de dados

});

 

db.connect((err) => {

    if (err) {

        throw err;

    }

    console.log('Conectado ao banco de dados MySQL.');

});

// Servir o arquivo HTML

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'index.html'));

});

 

// Rota para lidar com o formulário de envio

app.post('/submit', (req, res) => {

    const { nome, email, telefone } = req.body;

    const query = 'INSERT INTO email (nome, email, telefone) VALUES (?, ?, ?)';

    db.query(query, [nome, email, telefone], (err, result) => {

        if (err) {

            throw err;

        }

        res.send('Dados inseridos com sucesso!');

    });

});

 

app.listen(port, () => {

    console.log('Servidor rodando na porta ${port}');

});