import { Router } from "express";
import pool from "../utils/db.mjs";
import protectUser from "../middlewares/protectUser.mjs";

const notificationsRouter = Router();

// GET /notifications
notificationsRouter.get("/", protectUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
            [userId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /notifications/:id/read
notificationsRouter.put("/:id/read", protectUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const notificationId = req.params.id;
        await pool.query(
            "UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2",
            [notificationId, userId]
        );
        res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("Error updating notification:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default notificationsRouter;
