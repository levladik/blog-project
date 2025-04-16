import express from 'express';
import createUserRoutes from './routes/user.routes';
import createPostRoutes from './routes/post.routes';
import { AppDataSource } from './data-source';

const app = express();

// Подключение роутов
app.use(express.json());
app.use('/api/users', createUserRoutes(AppDataSource));
app.use('/api/posts', createPostRoutes(AppDataSource));

// Запуск сервера
AppDataSource.initialize()
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Database connection failed:', error);
  });
