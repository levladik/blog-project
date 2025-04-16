import express from "express";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import { AppDataSource } from "./data-source";

const app = express()
app.use(express.json())

app.use("/users", userRoutes(AppDataSource))
app.use("/posts", postRoutes(AppDataSource)) 

export default app;
