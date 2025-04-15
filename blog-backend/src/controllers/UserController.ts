import { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { PostRepository } from '../repositories/PostRepository';

export class UserController {
    private userRepository: UserRepository;
    private postRepository: PostRepository;

    constructor(dataSource: DataSource) {
        this.userRepository = new UserRepository(dataSource);
        this.postRepository = new PostRepository(dataSource);
    }

    // Получить всех пользователей
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userRepository.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    }

    // Получить пользователя по ID
    async getUserById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userRepository.findOneById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    }

    // Создать нового пользователя
    async createUser(req: Request, res: Response) {
        try {
            const { firstName, lastName } = req.body;

            if (!firstName || !lastName) {
                return res.status(400).json({ message: 'First name and last name are required' });
            }

            const newUser = await this.userRepository.create({ firstName, lastName });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }

    // Обновить пользователя
    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { firstName, lastName } = req.body;

            const updatedUser = await this.userRepository.update(id, { firstName, lastName });

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    }

    // Удалить пользователя
    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const success = await this.userRepository.delete(id);

            if (!success) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }

    // Создать пост для пользователя
    async createUserPost(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);
            const { title, content } = req.body;

            if (!title || !content) {
                return res.status(400).json({ message: 'Title and content are required' });
            }

            const newPost = await this.postRepository.create({
                title,
                content,
                userId
            });

            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ message: 'Error creating post', error });
        }
    }
}
