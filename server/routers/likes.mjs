import { Router } from "express";
import pool from "../utils/db.mjs";
import protectUser from "../middlewares/protectUser.mjs";

const likesRouter = Router();

// POST /likes/:postId
likesRouter.post("/:postId", protectUser, async (req, res) => {
    try {
        const { postId } = req.params;
        const user_id = req.user.id;

        // Check if already liked
        const checkLike = await pool.query(
            "SELECT * FROM likes WHERE post_id = $1 AND user_id = $2",
            [postId, user_id]
        );

        if (checkLike.rows.length > 0) {
            // Unlike
            await pool.query(
                "DELETE FROM likes WHERE post_id = $1 AND user_id = $2",
                [postId, user_id]
            );
            
            // Update likes_count in posts
            await pool.query(
                "UPDATE posts SET likes_count = GREATEST(0, likes_count - 1) WHERE id = $1",
                [postId]
            );

            return res.json({ message: "Unliked successfully", liked: false });
        } else {
            // Like
            await pool.query(
                "INSERT INTO likes (post_id, user_id, liked_at) VALUES ($1, $2, NOW())",
                [postId, user_id]
            );

            // Update likes_count in posts
            await pool.query(
                "UPDATE posts SET likes_count = likes_count + 1 WHERE id = $1",
                [postId]
            );

            // Notify author
            try {
                const postInfo = await pool.query("SELECT author_id, title FROM posts WHERE id = $1", [postId]);
                if (postInfo.rows.length > 0) {
                    const { author_id, title: postTitle } = postInfo.rows[0];
                    const likerInfo = await pool.query("SELECT name FROM users WHERE id = $1", [user_id]);
                    const likerName = likerInfo.rows[0]?.name || "Someone";

                    if (author_id && author_id !== user_id) {
                        await pool.query(
                            "INSERT INTO notifications (user_id, actor_name, action_type, post_id, post_title) VALUES ($1, $2, $3, $4, $5)",
                            [author_id, likerName, 'like', postId, postTitle]
                        );
                    }
                }
            } catch (notifyError) {
                console.error("Error sending like notification:", notifyError);
            }

            return res.json({ message: "Liked successfully", liked: true });
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ message: "Server error toggling like" });
    }
});

// GET /likes/:postId/status
likesRouter.get("/:postId/status", protectUser, async (req, res) => {
    try {
        const { postId } = req.params;
        const user_id = req.user.id;

        const result = await pool.query(
            "SELECT * FROM likes WHERE post_id = $1 AND user_id = $2",
            [postId, user_id]
        );

        res.json({ liked: result.rows.length > 0 });
    } catch (error) {
        console.error("Error checking like status:", error);
        res.status(500).json({ message: "Server error checking like status" });
    }
});

export default likesRouter;
