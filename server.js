const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du  1er serveur !');
});

server.listen(process.env.PORT || 3000);