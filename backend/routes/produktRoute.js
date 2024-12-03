import express from 'express';
import {
    shtoProdukte,
    listaProdukteve,
    fshijProduktin,
    infoProduktIVetem
} from '../controllers/produktController.js';
import ngarkoFoto from '../middleware/multer.js';
import autentifikimiAdminit from '../middleware/autentifikimiAdminit.js';

const produktRouter = express.Router();

produktRouter.post(
    '/shto_produkte',
    autentifikimiAdminit,
    ngarkoFoto.fields(
        [{ name: 'foto1', maxCount: 1 },
        { name: 'foto2', maxCount: 1 },
        { name: 'foto3', maxCount: 1 },
        { name: 'foto4', maxCount: 1 }]
    ),
    shtoProdukte,
);
produktRouter.post(
    '/fshij_produktin',
    autentifikimiAdminit,
    fshijProduktin);
produktRouter.post('/info_produktit', infoProduktIVetem);
produktRouter.get('/lista_produkteve', listaProdukteve);

export default produktRouter;