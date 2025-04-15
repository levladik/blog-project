import { DataSource } from "typeorm";
import { Post } from "../entity/Post";

export class PostRepository {
  constructor(private readonly dataSource: DataSource) {}
}
