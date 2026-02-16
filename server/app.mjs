import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://kanitin-ju-blog.vercel.app"
    ]
}));
app.use(express.json());

import pool from './utils/db.mjs';

app.get('/profile', (req, res) => {
    const data = {
        data: {
            name: "john",
            age: 20
        }
    };
    res.json(data);
});

app.post('/posts', async (req, res) => {
    try {
        const { title, image, category_id, description, content, status_id } = req.body;

        if (!title || !image || !category_id || !description || !content || !status_id) {
            return res.status(400).json({
                message: "Server could not create post because there are missing data from client"
            });
        }

        await pool.query(
            `INSERT INTO posts (title, image, category_id, description, content, status_id, date, likes_count)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), 0)`,
            [title, image, category_id, description, content, status_id]
        );

        return res.status(201).json({
            message: "Created post successfully"
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({
            message: "Server could not create post because database connection"
        });
    }
});
app.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});

export default app;
