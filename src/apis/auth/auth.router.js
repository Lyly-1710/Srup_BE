import express from 'express';
import authController from './auth.controller';

const route = express.Router();

route.route('/login')
    .post(authController.login)
    // .post(usersController.createUser);

// route.route('/:id')
//     .get(usersController.getDetailUser)
//     .put(usersController.updateUser)
//     .delete(usersController.deleteUser);

export default route;