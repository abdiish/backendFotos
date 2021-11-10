import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {

    constructor() {}

    guardarImagenTemporal(file: FileUpload, userId: string){

        return new Promise<void>((resolve, reject) => {

            // Crear carpetas
            const path = this.crearCarpetaUsuario(userId);
            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            // Mover archivo 
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {
    
                if (err) {
                    reject(err);
                }else {
                    resolve();
                }
            });
        });

    }

    private generarNombreUnico(nombreOriginal: string) {

        //Extraer extnesión del archivo
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid();

        return `${idUnico}.${extension}`;
    }

    private crearCarpetaUsuario(userId: string) {

        const pathUser     = path.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);

        const existe = fs.existsSync(pathUser);

        if (!existe) {
            fs.mkdirSync(pathUser, {recursive: true});
            fs.mkdirSync(pathUserTemp, {recursive: true});
        }

        return pathUserTemp;

    }

    imagenesDeTempPost(userId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPost = path.resolve(__dirname, '../uploads/', userId, 'posts');

        if (!fs.existsSync(pathTemp)) {
            return[];
        }

        if (!fs.existsSync(pathPost)) {
            fs.mkdirSync(pathPost);
        }

        const imagenesTemp = this.obtenerImagenesTemp(userId);

        imagenesTemp.forEach(imagen => {
            fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}.${imagen}`)
        });

        return imagenesTemp;
    }

    private obtenerImagenesTemp(userId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs.readdirSync(pathTemp) || [];
    }
}