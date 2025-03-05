import express from 'express';
const routes = express.Router();
import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import forecastRouter from './forecastRouter.js';
import inventoryRouter from './inventorieRouter.js';

routes.use('/user', userRouter);
routes.use('/product', productRouter);
routes.use('/forecast', forecastRouter);
routes.use('/inventory', inventoryRouter);
export default routes;
