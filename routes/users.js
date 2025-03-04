import express from 'express';
const routes = express.Router();
import userController from '../controller/user.js';
import validatior from '../validation/userValid.js';
import middleware from '../middleware/auth.js';

routes.post('/signup', userController.SignUp);
routes.post('/login', validatior.login, userController.Login);
routes.get('/', userController.getAllUser);
routes.get('/:userId', userController.getOnlyId);
routes.patch('/:userId', userController.userUpdate);
routes.delete('/:userId', userController.userDelete);
routes.post('/forget-Password', userController.forgetPassword);
routes.post('/reset-Password/:token', userController.resetPassword);

export default routes;
