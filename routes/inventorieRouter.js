import express from 'express';
const routes = express.Router();
import inventoryController from '../controller/inventorieController.js';

routes.post('/create', inventoryController.inventoryCreate);
routes.get('/', inventoryController.getAllinventory);
routes.get('/:inventoryId', inventoryController.inventoryById);
routes.patch('/:inventoryId', inventoryController.inventoryUpdate);
routes.delete('/:inventoryId', inventoryController.inventoryDelete);

export default routes;
