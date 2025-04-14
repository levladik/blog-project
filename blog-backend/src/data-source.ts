import { DataSource } from "typeorm";
import { User } from "./entity/User";
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "blog_db",
    synchronize: true,
    logging: true,
    entities: [User], // Все сущности нужно регистрировать здесь
    migrations: [],
    subscribers: [],
});
