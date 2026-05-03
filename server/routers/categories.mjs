import { Router } from "express";
import pool from "../utils/db.mjs";

const categoriesRouter = Router();

categoriesRouter.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM categories ORDER BY name ASC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Server error fetching categories" });
    }
});

export default categoriesRouter;
