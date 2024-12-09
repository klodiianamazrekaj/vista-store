import express from 'express';

import autentifikimiAdminit from '../middleware/autentifikimiAdminit.js';
import autentifikimiPerdoruesit from '../middleware/autentifikimiPerdoruesit.js';
import {
    bejPorosi,
    bejPorosiMeStripe,
    teGjithaPorosite,
    porositePerdoruesit,
    perditesoStatusinPorosise,
    verifikoStripe
} from '../controllers/porosiaController.js'

const porosiaRouter = express.Router();

// routes-features per adminin
porosiaRouter.post('/lista_porosive', autentifikimiAdminit, teGjithaPorosite);
porosiaRouter.post('/statusi', autentifikimiAdminit, perditesoStatusinPorosise);

// routes-features per pagesa qe behen nga perdoruesi
porosiaRouter.post('/bej_porosi', autentifikimiPerdoruesit, bejPorosi);
porosiaRouter.post('/stripe', autentifikimiPerdoruesit, bejPorosiMeStripe);

// routes-features per porosi te bera nga perdoruesi
porosiaRouter.post('/porosite_perdoruesit', autentifikimiPerdoruesit, porositePerdoruesit);

// verifiko pagesen
porosiaRouter.post('/verifiko_stripe', autentifikimiPerdoruesit, verifikoStripe);

export default porosiaRouter;