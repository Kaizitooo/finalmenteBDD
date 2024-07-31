const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cimatec',
    database: 'leads'
});

db.connect((err) => {
    if (err){
        throw err;
    }
    console.log('Conectando ao banco de dados MySQL');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
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