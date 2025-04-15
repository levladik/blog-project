import { DataSource } from "typeorm";
import { User } from "../entity/User";

export class UserRepository {
  constructor(private readonly dataSource: DataSource) {}
}
