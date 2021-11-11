import Server from './classes/server';
import mongoose from 'mongoose';

import cors from 'cors';

import express from 'express';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';

const server = new Server();

// Body parser
server.app.use(express.urlencoded({extended: true}));
server.app.use(express.json());

// File Upload
server.app.use(fileUpload({
    useTempFiles: true, 
    tempFileDir: './temp/'
}));

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de la aplicación
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// Conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram', (err) => {
    
    if(err) throw err;
    console.log('Base de datos online');
    
});

// Levantar express
server.start(() => {
    console.log( `Servidor corriendo el puerto ${ server.port }`);
});