import express from 'express';
import {
    kycjaPerdoruesit,
    regjistrimiPerdoruesit,
    kycjaAdminit
} from '../controllers/perdoruesiController.js';

const perdoruesiRouter = express.Router();

perdoruesiRouter.post('/regjistrohu', regjistrimiPerdoruesit);
perdoruesiRouter.post('/kycu', kycjaPerdoruesit);
perdoruesiRouter.post('/admin', kycjaAdminit);

export default perdoruesiRouter;