const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'luan',
    password: 'Za,46467682',
    database: 'todolist'
});

connection.connect((err) => {
    if (err) {
        console.log('erro ao conectar ao banco de dados, ' , err);
    } else {
        console.log('Conexão ao banco de dados bem SUUS.');
    }
})
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
        let filePath = path.join(__dirname, '..', req.url);
        let contentType = getContentType(filePath);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': contentType});
                    res.end('Error 404: Not Found');
                } else {
                    res.writeHead(500, { 'Content-Type': contentType });
                    res.end('Error 500: Internal Server Error');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    } else if (req.url === '/pages/main.html') {
        let filePath = path.join(__dirname, '..', req.url);
        let contentType = getContentType(filePath);
        fs.readFile('../pages/main.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-type': contentType });
                res.end('Internal Server Error 500');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    } // ...

    else if (req.url === '/assets/JavaScript/clockWorker.js') {
        let filePath = path.join(__dirname, '..', 'assets', 'JavaScript', 'clockWorker.js'); // Caminho corrigido
        let contentType = getContentType(filePath);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': contentType });
                    res.end('Error 404: Not Found');
                } else {
                    res.writeHead(500, { 'Content-Type': contentType });
                    res.end('Error 500: Internal Server Error');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    }
    
    // ...
    
    
    else if (req.url === '/pages/login.html') {
        let filePath = path.join(__dirname, '..', req.url);
        let contentType = getContentType(filePath);
        fs.readFile('../pages/login.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-type': contentType });
                res.end('Internal Server Error 500');
            } else {
                res.writeHead(200, { 'Content-type': contentType});
                res.end(data);
            }
        });
    } else if (req.url === '/logar' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let filePath = path.join(__dirname, '..', req.url);
            let contentType = getContentType(filePath);
            let postData = JSON.parse(body);
            let { email, password } = postData;
        
            let sql = `SELECT * FROM user WHERE email = ?`;
            connection.query(sql, [email], (error, results) => {
                if (error) {
                    console.error('Erro ao encontrar usuário', error);
                    res.writeHead(500, { 'Content-Type': contentType });
                    res.end('Erro ao encontrar usuário');
                } else {
                    if (results.length > 0) {
                        const user = results[0];
                        if (user.password === password) {
                            console.error('Usuário encontrado com sucesso.')
                            res.writeHead(200, { 'Content-Type': contentType });
                            res.end(JSON.stringify({ success: true, redirect: '/pages/main.html' }));
                        } else {
                            res.writeHead(401, { 'Content-Type': contentType });
                            res.end(JSON.stringify({ success: false, message: 'Credenciais inválidas.' }));                            
                            console.error('Senha incorreta');
                        }
                    } else {
                        res.writeHead(401, { 'Content-Type': contentType });
                        res.end('Usuário não encontrado.');
                        console.error('Usuário não encontrado. ');
                    }                    
                }
            });
        });
        
    } else if (req.url === '/pages/cadastro.html') {
        let filePath = path.join(__dirname, '..', req.url);
        let contentType = getContentType(filePath);
        fs.readFile('../pages/cadastro.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-type': contentType });
                res.end('Internal Server Error 500');
            } else {
                res.writeHead(200, { 'Content-type': contentType });
                res.end(data);
            }
        });
        
    } else if (req.url === '/cadastrar' && req.method==='POST' ) {
        let body ='';
        req.on('data' , (chunk) => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            let filePath = path.join(__dirname, '..', req.url);
            let contentType = getContentType(filePath);
            let postData = JSON.parse(body);
            let {email , password} = postData;
            let sql =`INSERT INTO user (email, password) VALUES ('${email}', '${password}')`;
            
            connection.query(sql, [email, password], (error, results) => {
                if (error) {
                    console.error('Erro ao cadastrar usuário' , error);
                    res.writeHead(500, {'Content-Type': contentType});
                    res.end('Erro ao cadastrar usuário');
                } else {
                    res.writeHead(200, {'Content-Type': contentType});
                    res.end('Usuário cadastrado com sucesso.');
                }
            });
        });
    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Error 404 Page Not Found');
    }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function redirectToMain(res) {
    res.writeHead(302, { 'Location': '/pages/main.html' });
    res.end();
}