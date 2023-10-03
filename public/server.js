const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'todolistusuario',
    password: 'todolistluan',
    database: 'todolist'
});

connection.connect((err) => {
    if (err) {
        console.log('erro ao conectar ao banco de dados, ' , err);
    } else {
        console.log('Conexão ao banco de dados bem sucedida.');
    }
})

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-type': 'text/plain' });
                res.end('Internal Server Error 500');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url.startsWith('/assets/')) {
        const filePath = path.join(__dirname, '..', req.url);
        const contentType = getContentType(filePath);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Error 404: Not Found');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error 500: Internal Server Error');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    } else if (req.url === '/pages/main.html') {
        fs.readFile('../pages/main.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-type': 'text/plain' });
                res.end('Internal Server Error 500');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/pages/login.html') {
        fs.readFile('../pages/login.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-type': 'text/plain' });
                res.end('Internal Server Error 500');
            } else {
                res.writeHead(200, { 'Content-type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/pages/cadastro.html') {
        fs.readFile('../pages/cadastro.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-type': 'text/plain' });
                res.end('Internal Server Error 500');
            } else {
                res.writeHead(200, { 'Content-type': 'text/html' });
                res.end(data);
            }
        });
        
    } else if (req.url === '/cadastrar' && req.method==='POST' ) {
        let body ='';
        req.on('data' , (chunk) => {
            const postData = JSON.parse(body);
            const {email , senha} = postData;
            const sql =`INSERT INTO usuarios (email, senha) VALUES ('${email}', '${senha}')`;
            connection.query(sql, [email, senha], (error, results) => {
                if (error) {
                    console.error('Erro ao cadastrar usuariio' , error);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Usuario cadastrado com sucesso');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end('Usuario cadastrado com sucesso.');
                }
            });

        })
    }
     else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Error 404 Page Not Found');
    }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        case '.json':
            return 'application/json';
        default:
            return 'application/octet-stream';
    }
}
