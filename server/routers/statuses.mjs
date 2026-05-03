import { Router } from "express";
import pool from "../utils/db.mjs";

const statusesRouter = Router();

statusesRouter.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM statuses ORDER BY id ASC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching statuses:", error);
        res.status(500).json({ message: "Server error fetching statuses" });
    }
});

export default statusesRouter;
