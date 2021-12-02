const { io } = require('../index.js')

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => { 
        console.log('Cliente Desconectado')
     });
    client.on('mensaje', ( payload ) =>{
        console.log('mensaje!!! ' + payload.nombre)
        io.emit('mensaje', { admin: 'nuevo mensaje' });
    }) 
  });