const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');



const users = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
      extended: true
}));

app.use(cors());

app.disable('x-powered-by');

app.set('port', port);

users(app);

server.listen(3000, '192.168.10.21' || 'localhost', function (){
        console.log('Aplicacion en Node.js' + port + 'Iniciada...')
});

app.get('/', (req, res) =>{
     res.send('Ruta raiz del backend');
});

app.get('/test', (req, res) =>{
        res.send('Esta es la ruta del test');
});

//Error en el handler

app.use((err, req, res, next) =>{
        console.log(err);
        res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server

}

// 200 - Es una respuesta exitosa
//404 - Significa que la URL no existe
//500 - Error interno del servidor


