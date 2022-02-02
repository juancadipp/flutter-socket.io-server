const { io } = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');

const bands = new Bands()


bands.addBand( new Band('Queen'));
bands.addBand( new Band('Bon Jovi'));
bands.addBand( new Band('Héroes del silencio'));
bands.addBand( new Band('Metallica'));

console.log(bands);

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands() );


    client.on('disconnect', () => { 
        console.log('Cliente Desconectado')
     });
    client.on('mensaje', ( payload ) =>{
        console.log('mensaje!!! ' + payload.nombre)
        io.emit('mensaje', { admin: 'nuevo mensaje' });
    }) 
    client.on('emitir-mensaje', (payload) => {
        // io.emit('nuevo-mensaje', payload); emite a todos
        client.broadcast.emit('nuevo-mensaje', payload) //emite a todos menos al que lo emitio
    })
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands() );

    })
    client.on('add-band', payload => {
            const newBand = new Band(payload.name)
            bands.addBand(newBand);
            io.emit('active-bands', bands.getBands() );
    })
    client.on('delete-band', (payload) => {
            bands.deleteBand(payload.id);
            io.emit('active-bands', bands.getBands() );

    })
  });