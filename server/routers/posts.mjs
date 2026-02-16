import { Router } from "express";
import pool from "../utils/db.mjs";

const postRouter = Router();

postRouter.post("/", async (req, res) => {
    try {
        const { title, image, category_id, description, content, status_id } = req.body;

        // Validation Rules
        if (!title) return res.status(400).json({ message: "Title is required" });
        if (typeof title !== "string") return res.status(400).json({ message: "Title must be a string" });

        if (!image) return res.status(400).json({ message: "Image is required" });
        if (typeof image !== "string") return res.status(400).json({ message: "Image must be a string" });

        if (!category_id) return res.status(400).json({ message: "Category id is required" });
        if (typeof category_id !== "number") return res.status(400).json({ message: "Category id must be a number" });

        if (!description) return res.status(400).json({ message: "Description is required" });
        if (typeof description !== "string") return res.status(400).json({ message: "Description must be a string" });

        if (!content) return res.status(400).json({ message: "Content is required" });
        if (typeof content !== "string") return res.status(400).json({ message: "Content must be a string" });

        if (!status_id) return res.status(400).json({ message: "Status id is required" });
        if (typeof status_id !== "number") return res.status(400).json({ message: "Status id must be a number" });

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

postRouter.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const category = req.query.category;
        const keyword = req.query.keyword;

        const offset = (page - 1) * limit;

        let queryText = `SELECT * FROM posts`;
        let countQueryText = `SELECT COUNT(*) FROM posts`;
        let queryParams = [];
        let whereClauses = [];
        let paramIndex = 1;

        if (category) {
            whereClauses.push(`category_id = (SELECT id FROM categories WHERE name = $${paramIndex})`);
            queryParams.push(category);
            paramIndex++;
        }

        if (keyword) {
            whereClauses.push(`(title ILIKE $${paramIndex} OR description ILIKE $${paramIndex} OR content ILIKE $${paramIndex})`);
            queryParams.push(`%${keyword}%`);
            paramIndex++;
        }

        if (whereClauses.length > 0) {
            const whereString = ` WHERE ` + whereClauses.join(" AND ");
            queryText += whereString;
            countQueryText += whereString;
        }

        queryText += ` ORDER BY date DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;

        // Execute Count Query
        const countResult = await pool.query(countQueryText, queryParams);
        const totalPosts = parseInt(countResult.rows[0].count);

        // Execute Main Query
        const postsResult = await pool.query(queryText, [...queryParams, limit, offset]);

        const totalPages = Math.ceil(totalPosts / limit);

        return res.status(200).json({
            totalPosts,
            totalPages,
            currentPage: page,
            limit,
            posts: postsResult.rows,
            nextPage: page < totalPages ? page + 1 : null
        });

    } catch (error) {
        console.error("Error getting posts:", error);
        return res.status(500).json({
            message: "Server could not read post because database connection"
        });
    }
});

postRouter.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const result = await pool.query(`SELECT * FROM posts WHERE id = $1`, [postId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Server could not find a requested post"
            });
        }

        return res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("Error getting post by id:", error);
        return res.status(500).json({
            message: "Server could not read post because database connection"
        });
    }
});

postRouter.put("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, image, category_id, description, content, status_id } = req.body;

        // Validation Rules
        if (!title) return res.status(400).json({ message: "Title is required" });
        if (typeof title !== "string") return res.status(400).json({ message: "Title must be a string" });

        if (!image) return res.status(400).json({ message: "Image is required" });
        if (typeof image !== "string") return res.status(400).json({ message: "Image must be a string" });

        if (!category_id) return res.status(400).json({ message: "Category id is required" });
        if (typeof category_id !== "number") return res.status(400).json({ message: "Category id must be a number" });

        if (!description) return res.status(400).json({ message: "Description is required" });
        if (typeof description !== "string") return res.status(400).json({ message: "Description must be a string" });

        if (!content) return res.status(400).json({ message: "Content is required" });
        if (typeof content !== "string") return res.status(400).json({ message: "Content must be a string" });

        if (!status_id) return res.status(400).json({ message: "Status id is required" });
        if (typeof status_id !== "number") return res.status(400).json({ message: "Status id must be a number" });

        const result = await pool.query(
            `UPDATE posts
             SET title = $1, image = $2, category_id = $3, description = $4, content = $5, status_id = $6
             WHERE id = $7`,
            [title, image, category_id, description, content, status_id, postId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Server could not find a requested post to update"
            });
        }

        return res.status(200).json({
            message: "Updated post successfully"
        });

    } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({
            message: "Server could not update post because database connection"
        });
    }
});

postRouter.delete("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const result = await pool.query(`DELETE FROM posts WHERE id = $1`, [postId]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Server could not find a requested post to delete"
            });
        }

        return res.status(200).json({
            message: "Deleted post successfully"
        });

    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({
            message: "Server could not delete post because database connection"
        });
    }
});

export default postRouter;
