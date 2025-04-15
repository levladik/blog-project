import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

async function main() {
    try {
        // Инициализация подключения
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");

        // Работа с репозиторием
        const userRepository = AppDataSource.getRepository(User);
        
        const user = new User();
        user.firstName = "John";
        user.lastName = "Doe";
        
        await userRepository.save(user);
        console.log("Saved a new user with id: ", user.id);
        
        const users = await userRepository.find({relations: ["posts"]});
        console.log("Loaded users: ", users);
        
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
    }
}

main();
