import express from 'express';
import { DataSource } from 'typeorm';
import createUserRoutes from './routes/user.routes';
import createPostRoutes from './routes/post.routes';
import { User } from './entity/User';
import { Post } from './entity/Post';

const app = express();

// Настройка подключения к базе данных
const dataSource = new DataSource({
  type: 'postgres',
  entities: [User, Post],
  synchronize: true, // Только для разработки!
});

// Подключение роутов
app.use(express.json());
app.use('/api/users', createUserRoutes(dataSource));
app.use('/api/posts', createPostRoutes(dataSource));

// Запуск сервера
dataSource.initialize()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Database connection failed:', error);
  });
