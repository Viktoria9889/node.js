const http = require('http');
const fs = require('fs-extra');
const path = require('path');

const server = http.createServer((req,res)=>{
    if (req.url === '/') {
        let html = fs.readFileSync('./index.html')
        res.setHeader('Content-type', 'text/html');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(html);
      }
      else if (req.url.match('.css$')) {
        // Ім'я файлу є просто локальним каталогом і прив'язане до запитаної URL-адреси
        let cssPath = __dirname + req.url;
        res.writeHead(200, {'Content-Type': 'text/css'});
        // Цей рядок відкриває файл як потік, що читається, pipe - це канал, який пов'язує потік для читання та потік для запису
        fs.createReadStream(cssPath).pipe(res);
      }
      else if (req.url.match('.png$')) {
        let imgPath = __dirname + req.url;
        res.writeHead(200, {'Content-Type': 'image/png'});
        fs.createReadStream(imgPath).pipe(res);
      }
      else {
        res.statusCode = 404;
        res.end('page is not found 404');
      }
    })


server.listen(3000);
//щоб ми бачили що сервер запрацював.
console.log('RUN');


