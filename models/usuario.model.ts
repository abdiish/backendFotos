import { Schema, model, Document } from 'mongoose';

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

interface Iusuario extends Document {
    
    nombre  : string;
    email   : string;
    password: string;
    evatar  : string;
}

export const Usuario = model<Iusuario>('Usuario', usuarioSchema);