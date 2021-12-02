const express = require('express');
const path = require('path');
require('dotenv').config();

//App de express
const app = express();

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js')



//Path publico
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT , (error) => {
    if( error ) throw Error(error);
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT );
}
)