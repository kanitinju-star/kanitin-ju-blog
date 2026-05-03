import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

async function migrate() {
    try {
        console.log("Starting migration...");

        // Create notifications table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS notifications (
                id SERIAL PRIMARY KEY,
                user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                actor_name VARCHAR(255),
                action_type VARCHAR(50), 
                post_id INTEGER REFERENCES posts(id) ON DELETE SET NULL,
                post_title VARCHAR(255),
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("Notifications table created/verified.");

        // Add author_id to posts
        await pool.query(`
            ALTER TABLE posts ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES users(id);
        `);
        console.log("author_id column added/verified in posts table.");

        console.log("Migration completed successfully.");
        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        await pool.end();
        process.exit(1);
    }
}

migrate();
