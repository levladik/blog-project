import { NextFunction, Request, Response } from 'express';
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

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userRepository.findAll();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userRepository.findOneById(id);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json(user);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { firstName, lastName } = req.body;

            if (!firstName || !lastName) {
                res.status(400).json({ message: 'First name and last name are required' });
                return;
            }

            const newUser = await this.userRepository.create({ firstName, lastName });
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const { firstName, lastName } = req.body;

            const updatedUser = await this.userRepository.update(id, { firstName, lastName });

            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json({
                id: updatedUser.id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName
            });
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const success = await this.userRepository.delete(id);

            if (!success) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            console.error('Database deletion error:', error);
            res.status(500).json({ 
                message: 'Cannot delete user with existing posts', 
                error: error.message 
            });
        }
    }

    async createUserPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = parseInt(req.params.id);
            const { title, content } = req.body;

            if (!title || !content) {
                res.status(400).json({ message: 'Title and content are required' });
                return;
            }

            const newPost = await this.postRepository.create({
                title,
                content,
                userId
            });

            res.status(201).json({
                id: newPost.id,
                title: newPost.title,
                content: newPost.content,
                userId: newPost.userId
            });
        } catch (error: any) {
            res.status(500).json({ message: 'Error creating post', error: error.message });
        }
    }
}
