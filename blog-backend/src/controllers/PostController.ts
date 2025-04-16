import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { PostRepository } from '../repositories/PostRepository';
import { UserRepository } from '../repositories/UserRepository';

export class PostController {
    private postRepository: PostRepository;
    private userRepository: UserRepository;

    constructor(dataSource: DataSource) {
        this.postRepository = new PostRepository(dataSource);
        this.userRepository = new UserRepository(dataSource);
    }

    // Получить все посты
    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await this.postRepository.findAll();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching posts', error });
        }
    }

    // Получить пост по ID
    async getPostById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const post = await this.postRepository.findOneById(id);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.json(post);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching post', error });
        }
    }

    // Создать новый пост
    async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, content, userId } = req.body;

            if (!title || !content || !userId) {
                res.status(400).json({ 
                    message: 'Title, content and userId are required' 
                });
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

    // Обновить пост
    async updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const { title, content } = req.body;

            const updatedPost = await this.postRepository.update(id, { 
                title, 
                content 
            });

            if (!updatedPost) {
                res.status(404).json({ message: 'Post not found' });
            }

            res.json(updatedPost);
        } catch (error) {
            res.status(500).json({ message: 'Error updating post', error });
        }
    }

    // Удалить пост
    async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const success = await this.postRepository.delete(id);

            if (!success) {
                res.status(404).json({ message: 'Post not found' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting post', error });
        }
    }
}
