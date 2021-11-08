import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required : [true, 'El nombre es obligatorio']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo electrónico es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }

});

// Método para comparar contraseñas
usuarioSchema.method('compararPassword', function(password: string = ''): boolean {
    // Password que ingresa el usuario vs Password que esta almacenado en la base de datos
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    }else {
        return false;
    }
});

export interface Iusuario extends Document {

    nombre  : string;
    email   : string;
    password: string;
    evatar  : string;

    compararPassword(password: string):boolean;
}

export const Usuario = model<Iusuario>('Usuario', usuarioSchema);