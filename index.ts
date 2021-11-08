import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import express from 'express';

const server = new Server();

// Body parser
server.app.use(express.urlencoded({extended: true}));
server.app.use(express.json());


// Rutas de la aplicación
server.app.use('/user', userRoutes);

// Conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram', (err) => {
    
    if(err) throw err;
    console.log('Base de datos online');
    
});

// Levantar express
server.start(() => {
    console.log( `Servidor corriendo el puerto ${ server.port }`);
});