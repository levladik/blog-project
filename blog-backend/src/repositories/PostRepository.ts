import { DataSource, Repository } from 'typeorm';
import { Post } from '../entity/Post';

export class PostRepository {
  private readonly repository: Repository<Post>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Post);
  }

  // CRUD операции

  async create(postData: {
    title: string;
    content: string;
    userId: number;
  }): Promise<Post> {
    const post = this.repository.create(postData);
    return await this.repository.save(post);
  }

  async findOneById(id: number): Promise<Post | null> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Post[]> {
    return await this.repository.find();
  }

  async update(id: number, updateData: Partial<Post>): Promise<Post | null> {
    await this.repository.update(id, updateData);
    return this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
