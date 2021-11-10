"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const server = new server_1.default();
// Body parser
server.app.use(express_1.default.urlencoded({ extended: true }));
server.app.use(express_1.default.json());
// File Upload
server.app.use(express_fileupload_1.default({
    useTempFiles: true,
    tempFileDir: './temp/'
}));
// Rutas de la aplicación
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
// Conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', (err) => {
    if (err)
        throw err;
    console.log('Base de datos online');
});
// Levantar express
server.start(() => {
    console.log(`Servidor corriendo el puerto ${server.port}`);
});
