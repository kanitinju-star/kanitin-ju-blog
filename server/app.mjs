import express from 'express';
import cors from 'cors';
import postRouter from './routers/posts.mjs';
import commentsRouter from './routers/comments.mjs';
import likesRouter from './routers/likes.mjs';
import categoriesRouter from './routers/categories.mjs';
import statusesRouter from './routers/statuses.mjs';
import authRouter from './routes/auth.mjs';
import protectUser from './middlewares/protectUser.mjs';
import protectAdmin from './middlewares/protectAdmin.mjs';
import notificationsRouter from './routers/notifications.mjs';

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
app.use('/comments', commentsRouter);
app.use('/likes', likesRouter);
app.use('/categories', categoriesRouter);
app.use('/statuses', statusesRouter);
app.use('/auth', authRouter);
app.use('/notifications', notificationsRouter);
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
