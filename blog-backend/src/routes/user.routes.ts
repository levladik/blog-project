import { Router } from 'express';
import { DataSource } from 'typeorm';
import { UserController } from '../controllers/UserController';

export const createUserRoutes = (dataSource: DataSource) => {
  const router = Router();
  const userController = new UserController(dataSource);

  // CRUD для пользователей
  router.get('/', userController.getAllUsers.bind(userController));
  router.post('/', userController.createUser.bind(userController));
  router.get('/:id', userController.getUserById.bind(userController));
  router.put('/:id', userController.updateUser.bind(userController));
  router.delete('/:id', userController.deleteUser.bind(userController));

  // Посты пользователя
  router.post(
    '/:userId/posts',
    userController.createUserPost.bind(userController)
  );

  return router;
};
