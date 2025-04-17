import { Router } from 'express';
import { DataSource } from 'typeorm';
import { UserController } from '../controllers/UserController';

const createUserRoutes = (dataSource: DataSource) => {
  const router = Router();
  const userController = new UserController(dataSource);

  // CRUD operations for users
  router.get('/', userController.getAllUsers.bind(userController));
  router.post('/', userController.createUser.bind(userController));
  router.get('/:id', userController.getUserById.bind(userController));
  router.put('/:id', userController.updateUser.bind(userController));
  router.delete('/:id', userController.deleteUser.bind(userController));

  // User posts operations
  router.post(
    '/:id/posts',
    userController.createUserPost.bind(userController)
  );

  return router;
};

export default createUserRoutes;
