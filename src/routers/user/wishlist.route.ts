import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { createWishlistController, deletewishlistItemController, getUserWishlistController } from '../../controllers/user/wishlist.controller';
const wishlistRoute=express.Router();

// @ts-ignore
wishlistRoute.post('/create',validateAuthIdToken,createWishlistController);
// @ts-ignore
wishlistRoute.get('/getByUser',validateAuthIdToken,getUserWishlistController)
// @ts-ignore
wishlistRoute.delete('/delete',validateAuthIdToken,deletewishlistItemController)

export {wishlistRoute};