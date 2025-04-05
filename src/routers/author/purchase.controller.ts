import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { validateAdmin } from '../../middleware/validateAdmin';
import { purchaseController } from '../../controllers/author/purchase.controller';
import { validateAuthor } from '../../middleware/validateAuthor';

const purchaseRoute=express.Router()

purchaseRoute.get('/get',validateAuthIdToken,validateAuthor,purchaseController)

export {purchaseRoute}