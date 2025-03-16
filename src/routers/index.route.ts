import express from 'express';
import { authRoute } from './auth.route'; //  Add .js extension
import { userRoute } from './user.route';
import { adminRoute } from './admin.route';
import { authorRoute } from './author.route';

const rootRouter = express.Router(); //  Use Router instead of express()

rootRouter.use("/auth", authRoute);
rootRouter.use("/user", userRoute);
rootRouter.use("/admin", adminRoute);
rootRouter.use('/author',authorRoute)

export { rootRouter };
