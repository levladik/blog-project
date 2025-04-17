import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/User';
import { Post } from '../entity/Post';

export class UserRepository {
  private readonly repository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  // CRUD операции

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<User[]>
 {
    return await this.repository.find()
 }

 async update(id: number, updateData: Partial<User>): Promise<User | null> {
    await this.repository.update(id, updateData)
    return this.findOneById(id)
 }

  async delete(id: number): Promise<boolean> {
    // First delete all user's posts
    await this.dataSource.getRepository(Post)
      .createQueryBuilder()
      .delete()
      .where("userId = :id", { id })
      .execute();

    // Then delete the user
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
