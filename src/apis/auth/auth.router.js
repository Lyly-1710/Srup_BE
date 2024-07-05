import express from 'express';
import authController from './auth.controller';


const route = express.Router();

route.post('/register', authController.register);
route.post('/login', authController.login);
route.post('/forgotPassword', authController.forgotPassword);
route.post('/resetPassword', authController.resetPassword);

// route.route('/:id')
//     .get(usersController.getDetailUser)
//     .put(usersController.updateUser)
//     .delete(usersController.deleteUser);




export default route;