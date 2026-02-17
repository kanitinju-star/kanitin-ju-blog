import express from 'express';
import cors from 'cors';
import postRouter from './routers/posts.mjs';
import authRouter from './routes/auth.mjs';
import protectUser from './middlewares/protectUser.mjs';
import protectAdmin from './middlewares/protectAdmin.mjs';

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
app.use('/auth', authRouter);
app.get("/protected-route", protectUser, (req, res) => {
    res.json({
        message: "This is protected content",
        user: req.user
    });
});

app.get("/admin-only", protectAdmin, (req, res) => {
    res.json({
        message: "This is admin-only content",
        user: req.user
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});

export default app;
