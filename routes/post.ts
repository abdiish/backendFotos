import { Router, Response } from 'express';
import { verificarToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';

const postRoutes = Router();
const fileSystem = new FileSystem();

// Crear post
postRoutes.post('/', [verificarToken], (req: any, res: Response) => {

    const body   = req.body;
    body.usuario = req.usuario._id;

    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    body.imgs      = imagenes;

    Post.create(body).then(async postDB  => {

        await postDB.populate('usuario', '-password');

        res.json({
            ok: true,
            post: postDB
        });

    }).catch(err => {
        res.json(err);
    });


});

// Obtener post
postRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip   = pagina - 1;
    skip = skip * 10;

    const post = await Post.find()
                           .sort({ _id: -1})
                           .skip(skip)
                           .limit(10)
                           .populate('usuario', '-password')
                           .exec();

    res.json({
        ok: true,
        pagina,
        post
    });

});

// Servicio para subir archivos
postRoutes.post('/upload', [verificarToken], async (req: any, res: Response ) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if(!file){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - imagen'
        });
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El archivo no corresponde a una imagen'
        });
    }

    await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    res.json({
        ok: true,
        file: file.mimetype
    });

});

// Mostar Imgen
postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {

    const userId = req.params.userid;
    const img    = req.params.img;

    const pathFoto = fileSystem.getFotoUrl(userId, img);

    res.sendFile(pathFoto);

});

export default postRoutes;