import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { initiateFine } from '../../services/fine.service';
import { initiateFineController } from '../../controllers/user/fine.controller';
const fineRoute=express.Router();

fineRoute.post('/initiate',validateAuthIdToken,initiateFineController)

export {fineRoute}