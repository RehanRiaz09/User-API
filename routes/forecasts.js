import express from 'express';
const routes = express.Router();
import forecastController from '../controller/forecasts.js';

routes.post('/', forecastController.forecastCreate);
routes.get('/', forecastController.getAllForecast);
routes.get('/:forecastId', forecastController.forecastById);
routes.patch('/:forecastId', forecastController.forecastUpdate);
routes.delete('/:forecastId', forecastController.forecastDelete);

export default routes;
