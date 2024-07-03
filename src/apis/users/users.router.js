import express from 'express';
import usersController from './users.controller';
import verify from '../../middleware/verify.middleware';

const route = express.Router();

route.route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser);

route.route('/me')
    .get(verify, usersController.getOwnInfor);

route.route('/:id')
    .get(usersController.getDetailUser)
    .put(verify, usersController.updateUser)
    .delete(verify, usersController.deleteUser);

export default route;