import { Router } from "express";
import pool from "../utils/db.mjs";
import protectUser from "../middlewares/protectUser.mjs";

const commentsRouter = Router();

// GET /comments/:postId
commentsRouter.get("/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const result = await pool.query(
            `SELECT c.*, u.username, u.name, u.profile_pic 
             FROM comments c
             JOIN users u ON c.user_id = u.id
             WHERE c.post_id = $1
             ORDER BY c.created_at DESC`,
            [postId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Server error fetching comments" });
    }
});

// POST /comments
commentsRouter.post("/", protectUser, async (req, res) => {
    try {
        const { post_id, comment_text } = req.body;
        const user_id = req.user.id;

        if (!post_id || !comment_text) {
            return res.status(400).json({ message: "Post ID and comment text are required" });
        }

        const result = await pool.query(
            `INSERT INTO comments (post_id, user_id, comment_text, created_at)
             VALUES ($1, $2, $3, NOW())
             RETURNING *`,
            [post_id, user_id, comment_text]
        );

        // Notify author
        try {
            const postInfo = await pool.query("SELECT author_id, title FROM posts WHERE id = $1", [post_id]);
            if (postInfo.rows.length > 0) {
                const { author_id, title: postTitle } = postInfo.rows[0];
                const commenterInfo = await pool.query("SELECT name FROM users WHERE id = $1", [user_id]);
                const commenterName = commenterInfo.rows[0]?.name || "Someone";

                if (author_id && author_id !== user_id) {
                    await pool.query(
                        "INSERT INTO notifications (user_id, actor_name, action_type, post_id, post_title) VALUES ($1, $2, $3, $4, $5)",
                        [author_id, commenterName, 'comment', post_id, postTitle]
                    );
                }
            }
        } catch (notifyError) {
            console.error("Error sending comment notification:", notifyError);
        }

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Server error creating comment" });
    }
});

export default commentsRouter;
