"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    guardarImagenTemporal(file, userId) {
        // Crear carpetas
        const path = this.crearCarpetaUsuario(userId);
        // Nombre archivo
        const nombreArchivo = this.generarNombreUnico(file.name);
        console.log(nombreArchivo);
    }
    generarNombreUnico(nombreOriginal) {
        //Extraer extnesión del archivo
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaUsuario(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser, { recursive: true });
            fs_1.default.mkdirSync(pathUserTemp, { recursive: true });
        }
        return pathUserTemp;
    }
}
exports.default = FileSystem;
