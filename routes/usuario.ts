import { Request, Response, Router } from 'express';
import { Usuario, Iusuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificarToken } from '../middlewares/autenticacion';

const userRoutes = Router();

// Login usuario
userRoutes.post('/login', (req: Request, res: Response) => {
    // Extraer información 
    const body = req.body;

    Usuario.findOne({email: body.email}, (err: any, userDB: Iusuario) => {
        
        if(err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

        // Comparar contraseña
        if (userDB.compararPassword(body.password)) {

            const tokenUser = Token.getJWT({
                _id   : userDB._id,
                nombre: userDB.nombre,
                email : userDB.email,
                avatar: userDB.evatar
            });
            
            res.json({
                ok: true,
                token: tokenUser
            });

        } else {
            
            return res.json({
                ok: false,
                mensaje: 'Ocurrio un error'
            });
        }
    });
});

// Crear un usuario
userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        nombre  : req.body.nombre,
        email   : req.body.email,
        password: bcrypt.hashSync(req.body.password,10),
        avatar  : req.body.avatar
    };

    Usuario.create(user).then(userDB => {

        const tokenUser = Token.getJWT({
            _id   : userDB._id,
            nombre: userDB.nombre,
            email : userDB.email,
            avatar: userDB.evatar
        });
        
        res.json({
            ok: true,
            token: tokenUser
        });

    }).catch(err => {

        res.json({
            ok: false,
            err
        });

    });

});

// Actualizar usuario
userRoutes.post('/update', verificarToken, (req: any, res: Response) => {

    res.json({
        ok: true,
        usuario: req.usuario
    });

});

export default userRoutes;