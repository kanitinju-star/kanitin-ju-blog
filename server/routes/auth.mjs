import { Router } from "express";
import { createClient } from "@supabase/supabase-js";
import pool from "../utils/db.mjs";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);
const authRouter = Router();
authRouter.post("/register", async (req, res) => {
    const { email, password, username, name } = req.body;
    try {
        const usernameCheckQuery = `
      SELECT * FROM users
      WHERE username = $1
    `;
        const usernameCheckValues = [username];
        const { rows: existingUser } = await pool.query(
            usernameCheckQuery,
            usernameCheckValues
        );
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "This username is already taken" });
        }

        const { data, error: supabaseError } = await supabase.auth.signUp({
            email,
            password,
        });
        if (supabaseError) {
            if (supabaseError.code === "user_already_exists") {
                return res
                    .status(400)
                    .json({ error: "User with this email already exists" });
            }
            return res
                .status(400)
                .json({ error: "Failed to create user. Please try again." });
        }

        const supabaseUserId = data.user.id;
        const query = `
      INSERT INTO users (id, username, name, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
        const values = [supabaseUserId, username, name, "user"];
        const { rows } = await pool.query(query, values);
        res.status(201).json({
            message: "User created successfully",
            user: rows[0],
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "An error occurred during registration" });
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            if (
                error.code === "invalid_credentials" ||
                error.message.includes("Invalid login credentials")
            ) {
                return res.status(400).json({
                    error: "Your password is incorrect or this email doesn't exist",
                });
            }
            return res.status(400).json({ error: error.message });
        }
        return res.status(200).json({
            message: "Signed in successfully",
            access_token: data.session.access_token,
        });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during login" });
    }
});
authRouter.get("/get-user", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Token missing" });
    }
    try {
        const { data, error } = await supabase.auth.getUser(token);
        if (error) {
            return res.status(401).json({ error: "Unauthorized or token expired" });
        }
        const supabaseUserId = data.user.id;
        const query = `
      SELECT * FROM users
      WHERE id = $1
    `;
        const values = [supabaseUserId];
        const { rows } = await pool.query(query, values);
        res.status(200).json({
            id: data.user.id,
            email: data.user.email,
            username: rows[0].username,
            name: rows[0].name,
            role: rows[0].role,
            profilePic: rows[0].profile_pic,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
authRouter.put("/reset-password", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { oldPassword, newPassword } = req.body;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Token missing" });
    }
    if (!newPassword) {
        return res.status(400).json({ error: "New password is required" });
    }
    try {
        const { data: userData } = await supabase.auth.getUser(token);
        const { error: loginError } = await supabase.auth.signInWithPassword({
            email: userData.user.email,
            password: oldPassword,
        });
        if (loginError) {
            return res.status(400).json({ error: "Invalid old password" });
        }
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

authRouter.put("/profile", upload.single("profilePic"), async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { name, username } = req.body;
    const file = req.file;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    try {
        const { data: userData, error: authError } = await supabase.auth.getUser(token);
        if (authError || !userData.user) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        const userId = userData.user.id;
        let profilePicUrl = null;

        if (file) {
            const bucketName = "my-personal-blog";
            const filePath = `profiles/${userId}_${Date.now()}_${file.originalname}`;

            const { data, error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                    upsert: true,
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(data.path);
            profilePicUrl = publicUrl;
        }

        let query = "UPDATE users SET name = $1, username = $2";
        let values = [name, username];

        if (profilePicUrl) {
            query += ", profile_pic = $3 WHERE id = $4";
            values.push(profilePicUrl, userId);
        } else {
            query += " WHERE id = $3";
            values.push(userId);
        }

        await pool.query(query, values);

        res.status(200).json({ 
            message: "Profile updated successfully", 
            profilePic: profilePicUrl 
        });
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default authRouter;