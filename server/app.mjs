import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import postRouter from './routers/posts.mjs';

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://kanitin-ju-blog.vercel.app"
    ]
}));
app.use(express.json());

app.get('/profile', (req, res) => {
    const data = {
        data: {
            name: "john",
            age: 20
        }
    };
    res.json(data);
});

app.use('/posts', postRouter);

app.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});

export default app;
