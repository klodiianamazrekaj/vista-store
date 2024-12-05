import express from 'express';
import { shtoNeKarroce, perditesoKarrocen, merrKarrocenPerdoruesit } from '../controllers/karrocaController.js';
import autentifikimiPerdoruesit from '../middleware/autentifikimiPerdoruesit.js';

const karrocaRouter = express.Router();

karrocaRouter.post('/merr_karrocen_perdoruesit', autentifikimiPerdoruesit, merrKarrocenPerdoruesit);
karrocaRouter.post('/shto_ne_karroce', autentifikimiPerdoruesit, shtoNeKarroce);
karrocaRouter.post('/perditeso_karrocen', autentifikimiPerdoruesit, perditesoKarrocen);

export default karrocaRouter;