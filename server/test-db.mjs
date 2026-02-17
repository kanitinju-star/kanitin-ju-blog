console.log("Starting test-db.mjs...");
import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function testConnection() {
    try {
        console.log("Testing connection with URL:", process.env.DATABASE_URL);
        const res = await pool.query('SELECT NOW()');
        console.log("Connection Successful! Server time:", res.rows[0]);

        // Also check if 'users' table exists
        const tableRes = await pool.query("SELECT to_regclass('public.users');");
        console.log("Users table check:", tableRes.rows[0]);

        await pool.end();
    } catch (err) {
        console.error("Connection Failed:", err);
        await pool.end();
    }
}

testConnection();
