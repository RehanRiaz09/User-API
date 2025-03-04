import express from 'express';
const routes = express.Router();
import userRouter from './users.js';
import productRouter from './products.js';
import forecastRouter from './forecasts.js';
import inventoryRouter from './inventories.js';

routes.use('/user', userRouter);
routes.use('/product', productRouter);
routes.use('/forecast', forecastRouter);
routes.use('/inventory', inventoryRouter);
export default routes;
