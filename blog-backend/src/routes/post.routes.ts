import { Router } from 'express';
import { DataSource } from 'typeorm';
import { PostController } from '../controllers/PostController';

export const createPostRoutes = (dataSource: DataSource) => {
  const router = Router();
  const postController = new PostController(dataSource);

  // Основные CRUD операции для постов
  router.get('/', postController.getAllPosts.bind(postController));
  router.post('/', postController.createPost.bind(postController));
  router.put('/:id', postController.updatePost.bind(postController));
  router.delete('/:id', postController.deletePost.bind(postController));

  return router;
};
